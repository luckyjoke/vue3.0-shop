import { request } from './request';


// 创建订单
export function creatOrder(params) {
	return request({
		url: '/api/orders',
		method: 'post',
		params
	})
}

// 订单详情
export function getOrderDetails(order) {
	return request({
		url: `/api/orders/${order}`,
		method: 'get',
		params: {
			include: 'user , orderDetails.goods'
		}		
	})
}

// 订单预览
export function getOrderPreview() {
	return request({
		url: '/api/orders/preview',
		method: 'get',
	})
}

// 订单列表 { page: 1 , status:2 ,include:'user,orderDetail'}
export function getOrderList(params) {
	return request({
		url: '/api/orders',
		method: 'get',
		params
	})
}

// 确认订单
export function confirmorder(order) {
	return request({
		url:`/api/orders/${order}/confirm`,
		method: 'patch'
	})
}


// 订单支付获取二维码
export function getOrderPay(order , params){
	return request({
		url: `/api/orders/${order}/pay`,
		params
	})
}

// 查询支付状态
export function payOrderStatus(order ){
	return request({
		url: `/api/orders/${order}/status`
	})
}