import axios from 'axios';

const instance = axios.create({
	baseURL: process.env.REACT_APP_BASE_URL,
	withCredentials: true,
});

// instance.interceptors.request.use((config) => {
// 	console.log(config);
// 	config.headers!.Authorization = window.localStorage.getItem('user');
// 	return config;
// });

export default instance;
