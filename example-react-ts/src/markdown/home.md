---
title: 浅谈promise实现原理
date: 2018-08-09 00:20:06
categories:
- 知识整理
  tags:
- promise
---
基于promiseA+，分析promise原理  
![](http://image.icey.cc/2018-10-07-003732.jpg)
<!-- more -->

## promise是什么？简单分析promise原理 {docsify-ignore-all}
### 预备知识
* 回调函数
* 高级函数
* 发布-订阅模式
* promise A+ 规范

### promise是什么，能干什么
Promise是异步编程的一种解决方案，它可以解决异步回调地狱的问题，防止层层嵌套对程序代码带来的难维护性。既然带来了方便，我们就有必要学习它的原理以及底层实现，所以笔者就按照PromiseA+规范写了一个简单的Promise，并实现了Promise.all()，Promise.race()等API

* 解决回调地狱
* 解决多个回调函数同步结果

### promise的几个方法
* promise.all()
* promise.race()
* promise.resolve()
* promise.reject()
### promise的三种状态
* 等待态 pending
* 成功态 resolved
* 失败态 rejected

### promise的特点
* 1.executor 默认时new的时候就自动执行
* 2.每个promise的实例 都有then方法
* 3.then方法中有两个参数 分别是成功的回调和失败的回调
* 4.then方法是异步的(微任务) // 微任务先于宏任务执行
* 5.同一个promise的实例可以then多次,成功时回调用所有的成功方法，失败时会调用所有的失败方法
* 6.new Promise中可以支持异步行为
* 7.如果发现错误就会走入失败态

下一次的输入需要上一次的输出 (有依赖关系)
* 1.如果一个promise执行完后 返回的还是一个promise，会把这个promise 的执行结果，传递给下一次then中
* 2.如果then中返回的不是promise 是一个普通值，会将这个普通值作为下次then的成功的结果
* 3.如果当前then中失败了 会走下一个then的失败
* 4.如果返回的是undefined 不管当前是成功还是失败 都会走下一次的成功
* 5.catch是错误没有处理的情况下才会走
* 6.then中可以不写东西，相当于白写 （值的穿透）


### promise A+ 规范
* [原文](https://promisesaplus.com/)
* [翻译](http://www.ituring.com.cn/article/66566)
* 校验插件 `npm install promises-aplus-tests -g` 用于检查自己写的promise是否符合promise规范
### 简单实现 待完善

````javascript
    function Promise(executor){
    let self = this;
    self.value = undefined; // 成功时的参数
    self.reason = undefined; // 失败时的参数
    self.status = 'pending'; // 状态 
    self.onResolvedCallbacks = [];// 存放then中成功的回调 
    self.onRejectedCallbacks = []; // 存放then中失败的回调 
    function resolve(value){ // 
        if(self.status === 'pending'){
            self.value = value;
            self.status = 'resolved';
            self.onResolvedCallbacks.forEach(fn=>fn());
        }
    }
    function reject(reason){
        if(self.status === 'pending'){
            self.reason = reason;
            self.status = 'rejected';
            self.onRejectedCallbacks.forEach(fn=>fn());
        }
    }
    // 如果函数执行时发生异常 就走到失败中
    try{
        executor(resolve,reject);
    }catch(e){
        reject(e);
    }
}
Promise.prototype.then = function(onFulfilled,onRejected){
    let self = this;
    if(self.status === 'resolved'){
        onFulfilled(self.value);
    }
    if(self.status === 'rejected'){
        onRejected(self.reason);
    }
    if(self.status === 'pending'){
        // 保存回调函数
        self.onResolvedCallbacks.push(()=>{
            onFulfilled(self.value);
        });
        self.onRejectedCallbacks.push(()=>{
            onRejected(self.reason)
        });
    }
}
module.exports = Promise;
````

### 基本实现
```` javascript 
function Promise(executor) {
    let self = this;
    self.value = undefined; // 成功的值
    self.reason = undefined; // 失败的原因
    self.status = 'pending'; // 值是pending状态
    self.onResolvedCallbacks = []; // 可能new Promise的时候会有异步操作，保存成功和失败的回调 
    self.onRejectedCallbacks = [];
    function resolve(value) { // 把状态改成成功态
        if (self.status === 'pending') { // 只有等待态 可以改变状态
            self.value = value;
            self.status = 'resolved';
            self.onResolvedCallbacks.forEach(fn => fn());
        }
    }
    function reject(reason) { // 把状态改成失败态
        if (self.status === 'pending') {
            self.reason = reason;
            self.status = 'rejected';
            self.onRejectedCallbacks.forEach(fn => fn());
        }
    }
    try {
        // 默认new Promise时 应该执行对应的执行器(同步执行)
        executor(resolve, reject);
    } catch (e) { // 如果执行exectuor时 发生错误 就会让当前的promise变成失败态
        reject(e);
    }
}
/**
 * 
 * @param {*} promise2  then的返回值 (返回的新的promise)
 * @param {*} x  then中成功或者失败函数的返回值
 * @param {*} resolve promise2的resolve
 * @param {*} reject  promise2的reject
 */
// 所有的promise都遵循这个规范 (所有的promise可以通用)

function resolvePromise(promise2,x,resolve,reject){
    // promise2和函数执行后返回的结果是同一个对象
    if(promise2 === x){ 
        return reject(new TypeError('Chaining cycle'));
    }
    let called;
    // x可能是一个promise 或者是一个普通值
    if(x!==null && (typeof x=== 'object' || typeof x === 'function')){
        try{
            let then = x.then; // 取对象上的属性 怎么能报异常呢？(这个promise不一定是自己写的 可能是别人写的 有的人会乱写)
            // x可能还是一个promise 那么就让这个promise执行即可
            // {then:{}}
            // 这里的逻辑不单单是自己的 还有别人的 别人的promise 可能既会调用成功 也会调用失败
            if(typeof then === 'function'){
                then.call(x,y=>{ // 返回promise后的成功结果
                    // 递归直到解析成普通值为止
                    if(called) return; // 防止多次调用
                    called = true;
                    // 递归 可能成功后的结果是一个promise 那就要循环的去解析
                    resolvePromise(promise2,y,resolve,reject);
                },err=>{ // promise的失败结果
                    if(called) return;
                    called = true;
                    reject(err);
                });
            }else{
                resolve(x);
            }
        }catch(e){
            if(called) return;
            called = true;
            reject(e);
        }
    }else{ // 如果x是一个常量
        resolve(x);
    }
}
// then调用的时候 都是异步调用 (原生的then的成功或者失败 是一个微任务)
Promise.prototype.then = function (onFulfilled, onRejected) {
    // 成功和失败的回调 是可选参数
    
    // onFulfilled成功的回调 onRejected失败的回调
    let self = this;
    let promise2;
    // 需要没次调用then时都返回一个新的promise
    promise2 = new Promise((resolve, reject) => {
        if (self.status === 'resolved') {
            setTimeout(()=>{
                try {
                    // 当执行成功回调的时候 可能会出现异常，那就用这个异常作为promise2的错误的结果
                    let x = onFulfilled(self.value);
                    //执行完当前成功回调后返回结果可能是promise
                    resolvePromise(promise2,x,resolve,reject);
                } catch (e) {
                    reject(e);
                }
            },0)
        }
        if (self.status === 'rejected') {
            setTimeout(()=>{
                try {
                    let x = onRejected(self.reason);
                    resolvePromise(promise2,x,resolve,reject);
                } catch (e) {
                    reject(e);
                }
            },0)
        }
        if (self.status === 'pending') {
            self.onResolvedCallbacks.push(() => {
                setTimeout(()=>{
                    try {
                        let x = onFulfilled(self.value);
                        resolvePromise(promise2,x,resolve,reject);
                    } catch (e) {
                        reject(e);
                    }
                },0)
            });
            self.onRejectedCallbacks.push(() => {
                setTimeout(()=>{
                    try {
                        let x = onRejected(self.reason);
                        resolvePromise(promise2,x,resolve,reject);
                    } catch (e) {
                        reject(e);
                    }
                },0)
            });
        }
    });
    return promise2
}
// 为什么加setTimeout (规范要求的)

Promise.defer = Promise.deferred = function(){
    let dfd = {};
    dfd.promise = new Promise((resolve,reject)=>{
        dfd.resolve = resolve;
        dfd.reject = reject;
    })
    return dfd;
}
module.exports = Promise;
````

### 最终版本
````javascript  
function Promise(executor) {
    let self = this;
    self.value = undefined; 
    self.reason = undefined; 
    self.status = 'pending';
    self.onResolvedCallbacks = [];
    self.onRejectedCallbacks = [];
    function resolve(value) { 
        if (self.status === 'pending') {
            self.value = value;
            self.status = 'resolved';
            self.onResolvedCallbacks.forEach(fn => fn());
        }
    }
    function reject(reason) { 
        if (self.status === 'pending') {
            self.reason = reason;
            self.status = 'rejected';
            self.onRejectedCallbacks.forEach(fn => fn());
        }
    }
    try {
        executor(resolve, reject);
    } catch (e) { 
        reject(e);
    }
}
function resolvePromise(promise2,x,resolve,reject){
    if(promise2 === x){
        return reject(new TypeError('Chaining cycle'));
    }
    let called;
    if(x!==null && (typeof x=== 'object' || typeof x === 'function')){
        try{
            let then = x.then; 
            if(typeof then === 'function'){
                then.call(x,y=>{ 
                    if(called) return; 
                    called = true;
                    resolvePromise(promise2,y,resolve,reject);
                },err=>{ 
                    if(called) return;
                    called = true;
                    reject(err);
                });
            }else{
                resolve(x);
            }
        }catch(e){
            if(called) return;
            called = true;
            reject(e);
        }
    }else{ // 如果x是一个常量
        resolve(x);
    }
}
Promise.prototype.then = function (onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function'?onFulfilled:val=>val;
    onRejected = typeof onRejected === 'function'?onRejected: err=>{throw err}
    let self = this;
    let promise2;
    promise2 = new Promise((resolve, reject) => {
        if (self.status === 'resolved') {
            setTimeout(()=>{
                try {
                    let x = onFulfilled(self.value);
                    resolvePromise(promise2,x,resolve,reject);
                } catch (e) {
                    reject(e);
                }
            },0)
        }
        if (self.status === 'rejected') {
            setTimeout(()=>{
                try {
                    let x = onRejected(self.reason);
                    resolvePromise(promise2,x,resolve,reject);
                } catch (e) {
                    reject(e);
                }
            },0)
        }
        if (self.status === 'pending') {
            self.onResolvedCallbacks.push(() => {
                setTimeout(()=>{
                    try {
                        let x = onFulfilled(self.value);
                        resolvePromise(promise2,x,resolve,reject);
                    } catch (e) {
                        reject(e);
                    }
                },0)
            });
            self.onRejectedCallbacks.push(() => {
                setTimeout(()=>{
                    try {
                        let x = onRejected(self.reason);
                        resolvePromise(promise2,x,resolve,reject);
                    } catch (e) {
                        reject(e);
                    }
                },0)
            });
        }
    });
    return promise2
}
// 语法糖 (甜) 目的是解决promise嵌套问题的 Q.derfer()
Promise.defer = Promise.deferred = function(){
    let dfd = {};
    dfd.promise = new Promise((resolve,reject)=>{
        dfd.resolve = resolve;
        dfd.reject = reject;
    })
    return dfd;
}
// 类上的方法
Promise.reject = function(reason){
    return new Promise((resolve,reject)=>{
        reject(reason);
    })
}
Promise.resolve = function(value){
    return new Promise((resolve,reject)=>{
        resolve(value);
    })
}
Promise.prototype.catch = function(onRejected){
    // 默认不写成功
    return this.then(null,onRejected);
};
// all方法
Promise.all = function(promises){
    return new Promise((resolve,reject)=>{
        let arr = [];
        let i = 0;
        function processData(index,data){
            arr[index] = data;
            if(++i == promises.length){
                resolve(arr);
            }
        }
        for(let i = 0;i<promises.length;i++){
            promises[i].then(data=>{ // data是成功的结果
                processData(i,data);
            },reject);
        }
    })
}
// 以请求最快的为准
Promise.race = function(promises){
    return new Promise((resolve,reject)=>{
        for(let i = 0;i<promises.length;i++){
            promises[i].then(resolve,reject);
        }
    })
}
module.exports = Promise;
````

## 其他思考
- 如何中断一个promise
- 




