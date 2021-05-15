import { request } from './request';

// 收藏与取消
export function collectionWithCancel(goods) {
	return request({
		url: `/api/collects/goods/${goods}`,
		method: 'post'
	})
}


// 我的收藏
export function myCollection(page) {
	return request({
		url:'/api/collects',
		page
	})
}
