import baseUrl from './config.js'

function Request( url,data, method) {
	return new Promise((resolve, reject) => {
		let token = uni.getStorageSync("token");
		uni.showLoading({title:"加载中..."});
		uni.request({
			url: baseUrl + url,
			method:method,
			data:data,
			header:{Authorization:token},
			success: res => {
				resolve(res.data)
				uni.hideLoading()
			},
			fail: err => {
				uni.hideLoading()
				console.log('err')
				reject(err)
			}
		})
	}).catch(err => console.log(err))
}


export default function(data, url, method) {
	return Request(data, url, method)
}