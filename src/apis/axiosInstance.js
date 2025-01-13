import axios from 'axios';

const csrfToken = document.cookie
    .split('; ')
    .find(row => row.startsWith('csrftoken='))
    ?.split('=')[1] || '';

const axiosInstance = axios.create({
    baseURL: 'https://dreamcatcherrr.store',
    withCredentials: true,
    headers: {
        'X-CSRFToken': csrfToken, 
        'Content-Type': 'application/json',
    },
});

// 요청마다 CSRF 토큰 업데이트
axiosInstance.interceptors.request.use((config) => {
    const updatedCsrfToken = document.cookie
        .split('; ')
        .find(row => row.startsWith('csrftoken='))
        ?.split('=')[1] || '';
    config.headers['X-CSRFToken'] = updatedCsrfToken;
    return config;
});

export default axiosInstance;