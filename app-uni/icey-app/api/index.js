
import {BaseURl} from '@/config/contant.js'
let flag = false
export function request({
	url,
	method,
	params,
	type = 'default'
}) {
	return new Promise((resove, reject) => {
		uni.request({
			url: BaseURl[type] + url,
			method,
			data: params,
			success(respones) {
				console.log('respones----------',respones)
				resove(respones.data)
			},
			fail(err) {
				reject(err)
			}
		})
	})
}
