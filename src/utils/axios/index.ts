import axios, { AxiosRequestConfig } from 'axios';

const UNKNOWN_ERROR = '未知错误，请重试';

const service = axios.create({
    // baseURL: baseApiUrl,
    timeout: 6000
});

service.interceptors.request.use(
    config => {
        // 添加各种规则，比如加token等操作写这里     
        return config;
    },
    error => {
        Promise.reject(error);
    }
);

service.interceptors.response.use(
    response => {
        const res = response.data;

        if (res.code !== 200) {
            // throw other
            const error = new Error(res.message || UNKNOWN_ERROR) as Error & { code: any };
            error.code = res.code;
            return Promise.reject(error);
        } else {
            return res;
        }
    },
    error => {
        // 处理 422 或者 500 的错误异常提示
        const errMsg = error?.response?.data?.message ?? UNKNOWN_ERROR;
        // $message.error(errMsg);
        error.message = errMsg;
        return Promise.reject(error);
    }
);

/**
 *
 * @param method - request methods
 * @param url - request url
 * @param data - request data or params
 */
export const request = async <T = any>(config: AxiosRequestConfig): Promise<T> => {
    try {
        const res = await service.request(config);
        return res.data;
    } catch (error: any) {
        return Promise.reject(error);
    }
};
