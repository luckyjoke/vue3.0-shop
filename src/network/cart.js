import { request } from 'network/request'

// 添加购物车
export function addCart(data) {
	return request({
		url: '/api/carts',
		method: 'post',
		data
	})
}

// 获取购物车列表
export function getCartList(data) {
	return request({
		url: '/api/carts?'+data,
	})
}

// 购物车数量改变
export function changeCartNum(id , data) {
	return request({
		url: `/api/carts/${id}`,
		method: 'put',
		data
	})
}


// 移除购物车
export function delCart(id) {
	return request({
		url: `/api/carts/${id}`,
		method: 'delete'
	})
}

//购物车改变选中
export function changeCartChecked(data) {
	return request({
		url: '/api/carts/checked',
		method: 'patch',
		data
	})
}