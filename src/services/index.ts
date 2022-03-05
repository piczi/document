import axios from './axios';
import type { AxiosPromise, AxiosRequestConfig } from 'axios';
import apiConfig from './api';

const requestList = Object.keys(apiConfig);

type resultType = Record<string, (params?: Record<string, any>) => AxiosPromise>;

const request = requestList.reduce((result: resultType, name: string) => {

    if (typeof apiConfig[name] === 'string') {

        // 直接使用字符串写法处理，默认为post请求方法
        result[name] = (config: Record<string, any> = {}) => {
            return axios({
                url: apiConfig[name] as string,
                method: 'POST',
                data: config,
            });
        };
    } else if (apiConfig[name] instanceof Object) {
        // 对象配置接口
        result[name] = (config: Record<string, any> = {}) => {
            const requestConfig = {
                method: 'POST',
                ...apiConfig[name] as AxiosRequestConfig,
            } as AxiosRequestConfig;
            const haveDataMethods = [
                'PUT', 'POST', 'DELETE', 'PATCH'
            ];

            // 所传参数优先传给data参数，不支持则作为params的参数。
            if (requestConfig.method && haveDataMethods.includes(requestConfig.method)) {
                requestConfig.data = config;
            } else {
                requestConfig.params = config;
            }

            return axios(requestConfig);
        };
    }

    return result;
}, {} as resultType);



export default request;