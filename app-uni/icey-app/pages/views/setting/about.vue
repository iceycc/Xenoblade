<template>
<view class="setting">
	<view>[闪速查]是基于微信云开发的一款信息查询程序,已开放IP地址查询、手机号查询、银行卡查询、身份证查询、生辰查询功能。目前功能还在不断完善,希望大家多提意见,让应用不断强大!	</view>
	<view class="card">
		<view class="title">分享</view>
		<view>如果你喜欢这个小程序。可以分享给你的朋友。您可以在首页及详情页使用转发功能,也可以直接点击下放分享按钮!</view>
	</view>
	<view class="card">
		<view class="title">反馈或建议</view>
		<view>如果您有好的功能建议或者发现程序存在BUG,均可以联系管理员进行代化更正。</view>
		<view>邮箱地址: fexcoin@sina.com</view>
	</view>
	<view class="menu">
		
	</view>
</view>
</template>

<script>
var app = getApp();
import { setConfig, getConfig, removeToken,removeUserInfo } from "../../../utils/auth";
import itemCell from "../../commponent/setting/item-cell";
export default {
  data() {
    return {
      themeColor: {},
      colorModal: false,
      themeList: app.globalData.config
    };
  },

  components: {
    itemCell
  },
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let config = getConfig();
    this.setData({
      themeColor: config
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

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
  onShareAppMessage: function () {},
  methods: {
    
  }
};
</script>
<style scoped lang="scss">
	.setting{
		padding: 20upx 30upx;
		color: #666666;
	}
	.card{
		padding: 40upx 0 0 0;
	}
	.card .title{
		font-size: 32upx;
		font-weight: bold;
		color: #000000;
		padding: 10upx 0;
	}
</style>
<style>
page{
	background-color: #F8F8F8!important;
}
</style>