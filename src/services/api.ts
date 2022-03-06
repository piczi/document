import type { AxiosRequestConfig } from 'axios';

const apiList = {
    sayHello: {
        url: '/api/hello',
        method: 'POST',
    },
    getUserinfo: '/api/userinfo', // 字符串默认为post请求
    getJuejinList: '/api/news',
    getNewsList: '/api/last7DaysNews',

    // node接口
    juejinList: {
        url: 'https://api.juejin.cn/user_api/v1/author/recommend',
        method: 'GET',
    },

    newsList: {
        url: 'https://api.nytimes.com/svc/mostpopular/v2/emailed/7.json',
        method: 'GET',
    },
} as Record<string, AxiosRequestConfig | string>;

export default apiList;