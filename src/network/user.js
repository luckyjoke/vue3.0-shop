import { request } from 'network/request'

export function register(data) {
	return request({
		url:'/api/auth/register',
		method: 'post',
		data
	})
}