// 获取当前帐号信息
const accountInfo = wx.getAccountInfoSync();
// env类型
const env = accountInfo.miniProgram.envVersion; // develop	trial release

export const BaseURl = (() => {
	const Conifgs = {
		develop: {
			// default: 'https://service-fkl7zd0u-1256800654.gz.apigw.tencentcs.com/release',
			default: 'http://localhost:9123',
		},
		trial: {
			default: 'https://service-fkl7zd0u-1256800654.gz.apigw.tencentcs.com/release',
		},
		release: {
			default: 'https://service-fkl7zd0u-1256800654.gz.apigw.tencentcs.com/release',
		},
	}
	
	return Conifgs[env] || Conifgs[release]
})()

