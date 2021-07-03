import Vue from 'vue';
import App from './App';
import nodata from "./pages/commponent/public/nodata";
import request from 'utils/request.js'  //引入异步请求函数
// 引入全局uView
import uView from 'uview-ui'
import md5Libs from "uview-ui/libs/function/md5";
Vue.use(uView);
Vue.prototype.request = request.request //挂载到全局
Vue.component("nodata", nodata);
Vue.config.productionTip = false;
Vue.mixin({
	methods: {
		getCacheToken: function(){
			return uni.getStorageSync("token");
		},
		signSort: function (e) {
			var t = [];
			for (var n in e) t.push(n);
			t.sort();
			var r = "";
			for (var a in t) null != e[t[a]] && (r += t[a] + "=" + e[t[a]] + "&");
			return r.substr(0, r.length - 1);
		},
		sign: function(params){
			let token = uni.getStorageSync("token");
			let noncestr = "g5v4emw4uxakbq2spcam87dxeolzduai12345";
			let timestamp = parseInt(new Date().getTime()/1000);
			let appId = 2;
			
			let data = {"accesstoken":token,"noncestr":noncestr,"timestamp": timestamp};
			data = Object.assign(data, params)
			data = this.signSort(data) + 'C99283E93A44FD59'
			let sign = md5Libs.md5(data)
			return {"appId":appId,"accesstoken":token,"sign":sign,"noncestr":noncestr,"timestamp": timestamp}
		},
		setData: function(obj, callback) {
			let that = this;
			const handleData = (tepData, tepKey, afterKey) => {
				tepKey = tepKey.split('.');
				tepKey.forEach(item => {
					if (tepData[item] === null || tepData[item] === undefined) {
						let reg = /^[0-9]+$/;
						tepData[item] = reg.test(afterKey) ? [] : {};
						tepData = tepData[item];
					} else {
						tepData = tepData[item];
					}
				});
				return tepData;
			};
			const isFn = function(value) {
				return typeof value == 'function' || false;
			};
			Object.keys(obj).forEach(function(key) {
				let val = obj[key];
				key = key.replace(/\]/g, '').replace(/\[/g, '.');
				let front, after;
				let index_after = key.lastIndexOf('.');
				if (index_after != -1) {
					after = key.slice(index_after + 1);
					front = handleData(that, key.slice(0, index_after), after);
				} else {
					after = key;
					front = that;
				}
				if (front.$data && front.$data[after] === undefined) {
					Object.defineProperty(front, after, {
						get() {
							return front.$data[after];
						},
						set(newValue) {
							front.$data[after] = newValue;
							that.$forceUpdate();
						},
						enumerable: true,
						configurable: true
					});
					front[after] = val;
				} else {
					that.$set(front, after, val);
				}
			});
			isFn(callback) && this.$nextTick(callback);
		}
	}
});
App.mpType = 'app';
const app = new Vue({
    ...App
});
app.$mount();
