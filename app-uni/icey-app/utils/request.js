/**
 * 封装的异步请求处理函数
 * 使用方法为:
 * request('接口名称',{key:value},'请求方式(默认为GET)')
 * .then(res=>{console.log(res)})
 */
import { getToken, removeToken } from "./auth";
async function request(mehtod, params, type, headers, callBack) {
  //创建一个名为request请求的方法函数
  if (!type) {
    type = 'GET';
  }
  let header = {
    "Accept": "application/json",
    "Content-Type": "application/json; charset=UTF-8"
  };
  
  let http = {
    url: mehtod,
    data: params,
    method: type,
    header: Object.assign(header, headers)
  };
  let promise = new Promise((resolve, reject) => {
    uni.request(http).then(res => {
		console.log(res)
      resolve(res[1].data);
    }).catch(err => {
      reject(err);
      console.log(err);
    });
  });
  return promise;
}

async function requestJson(mehtod, params, type, headerParams, callBack) {
  //创建一个名为request请求的方法函数
  let header = {
    //设置请求头信息
    'X-Requested-With': 'XMLHttpRequest',
    "Accept": "application/json",
    "Content-Type": "application/json; charset=UTF-8"
  };
  if(headerParams){
	  header = Object.assign(header, headerParams);
  }
  let http = {
    url:  mehtod,
    data: params,
    method: type,
    header: header
  };
  let promise = new Promise((resolve, reject) => {
    uni.request(http).then(res => {
      resolve(res);
    }).catch(err => {
      reject(err);
      console.log(err);
    });
  });
  return promise;
}

async function requestForm(mehtod, params, type, callBack) {
  //创建一个名为request请求的方法函数
  let header = {
    //设置请求头信息
    'X-Requested-With': 'XMLHttpRequest',
    "Accept": "application/json",
    "Content-Type": "application/x-www-form-urlencoded"
  };
  let http = {
    url:  mehtod,
    data: params,
    method: type,
    header: header
  };
  let promise = new Promise((resolve, reject) => {
    uni.request(http).then(res => {
      resolve(res);
    }).catch(err => {
      reject(err);
      console.log(err);
    });
  });
  return promise;
}
export default {
  request,
  requestJson,
  requestForm
};