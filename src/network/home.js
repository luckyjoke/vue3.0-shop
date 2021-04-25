import { request } from 'network/request'

export function getHomeAllDate() {
	return request({
		url: '/api/index'
	})
}