(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/views/tabBar/detail"],{"04d9":function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o=e("14c1"),u=i(e("38fd"));function i(t){return t&&t.__esModule?t:{default:t}}getApp();var a={data:function(){return{info:{},number:"",content:""}},components:{},props:{},onLoad:function(t){console.log(t),this.number=t.number,this.path=t.path,this.getDetail()},onReady:function(){},onShow:function(){},onHide:function(){},onUnload:function(){},onPullDownRefresh:function(){},onReachBottom:function(){},onShareAppMessage:function(){return{title:this.info.title,imageUrl:"",path:"/pages/views/tabBar/detail?number="+this.number+"&path="+this.path}},methods:{getDetail:function(){var n=this;(0,o.getDatails)({number:this.number,path:this.path}).then((function(e){n.info=e.data,n.content=(0,u.default)(n.info.body),t.setNavigationBarTitle({title:n.info.title})}))}}};n.default=a}).call(this,e("543d")["default"])},1572:function(t,n,e){},"1d4f":function(t,n,e){"use strict";var o=e("1572"),u=e.n(o);u.a},"67c0":function(t,n,e){"use strict";e.r(n);var o=e("04d9"),u=e.n(o);for(var i in o)"default"!==i&&function(t){e.d(n,t,(function(){return o[t]}))}(i);n["default"]=u.a},bbbd:function(t,n,e){"use strict";e.d(n,"b",(function(){return u})),e.d(n,"c",(function(){return i})),e.d(n,"a",(function(){return o}));var o={uParse:function(){return Promise.all([e.e("common/vendor"),e.e("uview-ui/components/u-parse/u-parse")]).then(e.bind(null,"c497"))}},u=function(){var t=this,n=t.$createElement;t._self._c},i=[]},d17b:function(t,n,e){"use strict";e.r(n);var o=e("bbbd"),u=e("67c0");for(var i in u)"default"!==i&&function(t){e.d(n,t,(function(){return u[t]}))}(i);e("1d4f");var a,r=e("f0c5"),c=Object(r["a"])(u["default"],o["b"],o["c"],!1,null,"c76f5e08",null,!1,o["a"],a);n["default"]=c.exports},f6bd:function(t,n,e){"use strict";(function(t){e("20a1");o(e("66fd"));var n=o(e("d17b"));function o(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("543d")["createPage"])}},[["f6bd","common/runtime","common/vendor"]]]);