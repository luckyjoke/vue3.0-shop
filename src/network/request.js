import axios from 'axios';
import { Notify } from 'vant'

export function request(config) {
	const instance = axios.create({
		baseURL: 'https://api.shop.eduwork.cn',
		timeout: 5000
	})

	// 请求拦截
	instance.interceptors.request.use( config => {
		// 如果有一个接口需要验证才可以访问，就在这里统一设置

		// 直接放行
		return config;
	} , err => {
		console.log(err)
	})


	// 响应拦截
	instance.interceptors.response.use( res => {
		return res.data ? res.data : res;
	} , err => {
		// 如果有错误会处理
		Notify({type: 'warning' ,
			message: err.response.data.errors[Object.keys(err.response.data.errors)[0]][0]})
	})


	return instance(config)
}