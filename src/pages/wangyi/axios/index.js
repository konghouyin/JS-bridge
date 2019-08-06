import axios from 'axios'

axios.defaults.timeout = 2000

axios.interceptors.response.use(function(response) {
    if (response.data.style == 1) {
        return response.data.data
    } else {
        return Promise.reject("后台错误");
    }
}, function(error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default {
    send:function(url, type) {
        return axios[type.toLowerCase()](url)
    }
}
