import { useSetState } from 'react-use';

type useRequestResult<ParamsType> = {
    data?: Record<string, any>;
    success: boolean;
    error?: Record<string, any>;
    loading: boolean;
    searchParams?: ParamsType;
    triggerRequest: (params: ParamsType) => void;
};

// 接口请求的hooks封装，省去你写数据相关状态的麻烦。
export function useRequest<ParamsType extends Record<string, any> | undefined>(
    requestHandle: (params?: ParamsType) => Promise<Record<string, any>>,
): useRequestResult<ParamsType> {
    const [state, setState] = useSetState<Omit<useRequestResult<ParamsType>, 'triggerRequest'>>({
        loading: false,
        success: false,
    });

    const triggerRequest = (params: ParamsType) => {
        setState({
            loading: true,
        });
        requestHandle(params)
            .then((res: Record<string, any>) => {
                // const {
                //     data: { data: responseData },
                // } = res;
                setState({
                    data: res,
                    success: true,
                });
            })
            .catch((err: Record<string, any>) => {
                setState({
                    success: false,
                    error: err,
                });
            })
            .finally(() => {
                setState({
                    searchParams: params,
                    loading: false,
                });
            });
    };

    return {
        ...state,
        triggerRequest,
    };
}