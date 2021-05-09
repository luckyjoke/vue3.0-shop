import { request } from 'network/request'

export function register(data) {
	return request({
		url:'/api/auth/register',
		method: 'post',
		data
	})
}

export function  login(data) {
	return request({
		url:'/api/auth/login',
		method: 'post',
		data
	})
}

export function logout() {
	return request({
		url:'/api/auth/logout',
		method: 'post'
	})
}

// 用户信息详情
export function  userDetails(){
	return request({
		url:'/api/user'
	})
}


// 修改用户信息
export function userInfoSetting(data){
	return request({
		url: '/api/user',
		method: 'put',
		data
	})
}