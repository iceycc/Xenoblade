import {
	request
} from './index.js'
export function getTags(params) {
	return request({
		url: '/api/client/tags',
		method: "GET",
		params,
	})
}

export function getRecomments(params) {
	return request({
		url: '/api/client/recomments',
		method: "GET",
		params,
	})
}

export function getArticles(params) {
	return request({
		url: '/api/client/articles',
		method: "GET",
		params,
	})
}

export function getCategory(params) {
	return request({
		url: '/api/client/category',
		method: "GET",
		params,
	})
}