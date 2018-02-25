// 引入 axios
import axios from 'axios';
import config from '#config';

const baseConfig = {
    baseURL: config.dynamicDomain,
    // headers: {
    //     'X-Requested-With': 'XMLHttpRequest'
    // },
    params: {
        _r: Math.random()
    },
    timeout: 30000,
    validateStatus(status) {
        return status >= 200 && status < 300; // 默认的
    },
    maxRedirects: 5 // 默认的
};

const get = (url, params) => {
    const getConfig = {};
    Object.assign(getConfig, baseConfig, {
        url,
        method: 'get',
        params
    });

    return axios(getConfig);
};

const post = (url, data) => {
    const postConfig = {};
    Object.assign(postConfig, baseConfig, {
        url,
        method: 'post',
        data
    });

    return axios(postConfig);
};

export default { get, post };
