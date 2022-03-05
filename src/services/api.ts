import type { AxiosRequestConfig } from 'axios';

const apiList = {
    sayHello: {
        url: '/api/hello',
        method: 'POST',
    },
    getUserinfo: '/api/userinfo', // 字符串默认为post请求
} as Record<string, AxiosRequestConfig | string>;

export default apiList;