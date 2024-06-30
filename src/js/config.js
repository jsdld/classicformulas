// config.js
const apiUrl = 'http://localhost:8000';

// 封装一个函数用于拼接 API 地址和路由路径
function getApiUrl(route) {
    return apiUrl + route;
}

export default {
    apiUrl,
    getApiUrl
};
