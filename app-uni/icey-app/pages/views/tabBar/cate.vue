<template>
	<view class="u-wrap">
		<view v-for="(item, index) in list" @click="search(item)">
			<view class="item">
				<view class="left">
					<image class="img" :src="item.tag.icon"></image>
					<view class="info">
						<view class="name">{{item.tag.tag_name}}</view>
						<view class="count">{{item.tag.post_article_count}}篇文章</view>
					</view>
				</view>
				<view class="right">
					<view class="search">查看</view>
				</view>
			</view>
			<u-line color="#f3f3f3"></u-line>
		</view>
	</view>
</template>

<script>
	import {
		getCates
	} from "@/api/cates.js";
	export default {
		data() {
			return {
				list: [],
				loadStatus: 'loadmore',
				cursor: '0'
			}
		},
		onLoad() {
			this.getCate()
		},
		onReachBottom() {
			this.getCate()
		},
		computed: {},
		methods: {
			search(item) {
				uni.navigateTo({
					url: '/pages/views/home/tags?tagId=' + item.tag_id + '&tagName=' + item.tag.tag_name
				})
			},
			getCate() {
				if (this.loadStatus == 'nomore') {
					return
				}
				let _this = this
				_this.loadStatus = 'loading'
				getCates().then(cates => {
					_this.loadStatus = cates.has_more ? 'loadmore' : 'nomore'
					_this.cursor = cates.cursor
					_this.list = _this.list.concat(cates.data)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.u-wrap {
		.item {
			display: flex;
			align-items: center;
			padding: 20upx 20upx;
		}

		.item .left {
			display: flex;
			flex: 3;
			height: 100upx;
			align-items: center;
		}

		.item .left .info {
			padding-left: 30upx;
		}

		.item .left .info .name {
			font-size: 32upx;
		}

		.item .left .info .count {
			font-size: 22upx;
			color: #999999;
		}

		.item .left .img {
			width: 100upx;
			height: 100upx;
		}

		.item .right {
			display: flex;
			flex: 1;
			height: 100upx;
			align-items: center;
		}

		.item .right .search {
			width: 140upx;
			padding: 10upx 0;
			text-align: center;
			background-color: #f3f3f3;
			border-radius: 50upx;
			color: #0081ff;
			font-size: 26upx;
		}
	}
</style>
