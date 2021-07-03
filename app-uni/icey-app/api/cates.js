import {
	request
} from './index.js'

export function getCates(params) {
	return request({
		url: '/api/client/cates',
		method: "GET",
		params,
	})
}
