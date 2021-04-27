import { request } from 'network/request'

export function getCategoryDate() {
	return request({
		url: '/api/goods'
	})
}
