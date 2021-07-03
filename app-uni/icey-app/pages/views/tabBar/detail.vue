<template>
	<view class="detail">
		<web-view v-if="info.article_info.mark_content == ''" :src="info.article_info.link_url" bindload="bindload" binderror="binderror"></web-view>
		<view v-if="info.article_info.mark_content != ''" class="title">{{info.article_info.title}}</view>
		<view v-if="info.article_info.mark_content != ''" class="u-content">
			<u-parse :lazy-load="true" :selectable="true" :html="content"></u-parse>
		</view>
	</view>
</template>

<script>
import {getDatails} from "@/api/details.js"
let app = getApp();
import marked from 'marked'
export default {
  data() {
    return {
		info: {},
		number: '',
		content: ''
    };
  },

  components: {
  },
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	  console.log(options)
	  this.number = options.number
	  this.path = options.path
	  this.getDetail()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage(){
  	return {
  	  title: this.info.title,
	  imageUrl:  '', 
  	  path: '/pages/views/tabBar/detail?number='+this.number + '&path=' + this.path
  	}
  },
  methods: {
	  getDetail() {
	  	let _this = this
		getDatails({
			number:this.number,
			path:this.path
		}).then(details=>{
			_this.info = details.data
			_this.content = marked(_this.info.body);
			uni.setNavigationBarTitle({
			    title: _this.info.title
			});
		})
	  }
  }
};
</script>
<style scoped lang="scss">
	.detail{
		padding: 10upx 20upx;
		.title{
			font-size: 32upx;
			font-weight: bold;
		}
	}
	.u-content{
		margin-top: 50rpx;
		color: $u-content-color;
		font-size: 32rpx;
		line-height: 1.8;
		// 标签形式无效
		p {
			color: $u-tips-color;
		}
	}
</style>