import {
	request
} from './index.js'

export function getDatails(params) {
	return request({
		url: '/api/client/details',
		method: "GET",
		params,
	})
}
