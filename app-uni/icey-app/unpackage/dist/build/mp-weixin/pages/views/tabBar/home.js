(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/views/tabBar/home"],{"0308":function(t,e,r){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=r("d612"),i=a(r("38fd"));function a(t){return t&&t.__esModule?t:{default:t}}function s(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function o(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?s(Object(r),!0).forEach((function(e){u(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):s(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function u(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}var c={data:function(){return{marked:i.default,list:[],current:0,swiperCurrent:0,tabsHeight:0,dx:0,labelsStatus:[],articlesForm:[{page:1,per_page:20,labels:""}]}},onLoad:function(){this.initParams(),this.getCategory()},onShareAppMessage:function(){return{title:"程序员升职记",path:"/pages/views/tabBar/home"}},methods:{getCategory:function(){var t=this;(0,n.getCategory)().then((function(e){t.list=t.list.concat(e.data),t.getCate(0),t.getList()}))},goSearch:function(e){t.navigateTo({url:"/pages/views/home/search?keyword="+e})},detail:function(e){t.navigateTo({url:"/pages/views/tabBar/detail?number="+e+"&path="+this.list[this.current].path})},getCate:function(t){var e=this,r=[{tag_name:"全部"}];console.log(t);var i={path:e.list[t].path};(0,n.getTags)(i).then((function(n){e.list[t].tags=r.concat(n.data),e.list[t].isInitTag=!0}))},reachBottom:function(){this.getList()},getList:function(){this.current,this.getCateList()},initParams:function(){this.articlesForm[this.current]||(this.articlesForm[this.current]={page:1,per_page:20,labels:""})},getCateList:function(){var t=this;this.initParams();var e=this;if("nomore"!=e.list[this.current].loadStatus){e.list[e.current].current;var r=o({path:e.list[e.current].path||"blog"},this.articlesForm[e.current]);e.list[e.current].loadStatus="loading",(0,n.getArticles)(r).then((function(r){r.data.length>=e.articlesForm.per_page?(e.list[e.current].loadStatus="loadmore",t.articlesForm[e.current].page++):e.list[e.current].loadStatus="nomore",e.list[e.current].cursor=r.cursor;for(var n=[],i=0;i<r.data.length;i++)n.push({item_type:2,item_info:r.data[i]});e.list[e.current].list=e.list[e.current].list.concat(n)}))}},getAllFeed:function(){var t=this;"nomore"!=t.list[0].loadStatus&&(t.list[0].loadStatus="loading",(0,n.getRecomments)().then((function(e){console.log(e),t.list[0].loadStatus=e.has_more?"loadmore":"nomore",t.list[0].cursor=e.cursor,t.list[0].list=t.list[0].list.concat(e.data)})))},change:function(t){this.initParams(),this.swiperCurrent=t,this.$refs.tabs.setFinishCurrent(t),this.current=t,this.getCate(t),console.log(this.list[t]),this.list[t].list.length<=0&&this.getList()},changeTag:function(t){this.initParams(),this.list[this.current].current=t,this.list[this.current].list=[],this.list[this.current].loadStatus="loadmore";var e=this.list[this.current].tags[t].tag_name;this.articlesForm[this.current].labels="全部"!=e?e:"",this.getList()},transition:function(t){var e=t.detail.dx;this.$refs.tabs.setDx(e)},animationfinish:function(t){t.detail.current}}};e.default=c}).call(this,r("543d")["default"])},2564:function(t,e,r){"use strict";r.r(e);var n=r("7350"),i=r("9da3");for(var a in i)"default"!==a&&function(t){r.d(e,t,(function(){return i[t]}))}(a);r("7551");var s,o=r("f0c5"),u=Object(o["a"])(i["default"],n["b"],n["c"],!1,null,"37463d82",null,!1,n["a"],s);e["default"]=u.exports},"3f6e":function(t,e,r){"use strict";(function(t){r("20a1");n(r("66fd"));var e=n(r("2564"));function n(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,r("543d")["createPage"])},7350:function(t,e,r){"use strict";r.d(e,"b",(function(){return i})),r.d(e,"c",(function(){return a})),r.d(e,"a",(function(){return n}));var n={uTabsSwiper:function(){return Promise.all([r.e("common/vendor"),r.e("uview-ui/components/u-tabs-swiper/u-tabs-swiper")]).then(r.bind(null,"0bc7"))},uLoadmore:function(){return r.e("uview-ui/components/u-loadmore/u-loadmore").then(r.bind(null,"6a58"))}},i=function(){var t=this,e=t.$createElement,r=(t._self._c,t.__map(t.list,(function(e,r){var n=t.__get_orig(e),i=t.__map(t.list[t.current].list,(function(e,r){var n=t.__get_orig(e),i=e.item_info.body.replace(/\#/g," ");return{$orig:n,g0:i}}));return{$orig:n,l0:i}})));t.$mp.data=Object.assign({},{$root:{l1:r}})},a=[]},7551:function(t,e,r){"use strict";var n=r("a1c4"),i=r.n(n);i.a},"9da3":function(t,e,r){"use strict";r.r(e);var n=r("0308"),i=r.n(n);for(var a in n)"default"!==a&&function(t){r.d(e,t,(function(){return n[t]}))}(a);e["default"]=i.a},a1c4:function(t,e,r){}},[["3f6e","common/runtime","common/vendor"]]]);