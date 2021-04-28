import { request } from 'network/request'

export function getCategoryDate() {
	return request({
		url: '/api/goods'
	})
}


export function getCategoryGoods(order = 'sale' , currentCid , page = 1) {
	return request({
		url: '/api/goods?&category_id='+currentCid+'&page='+page+'&'+order+'=1'
	})
}