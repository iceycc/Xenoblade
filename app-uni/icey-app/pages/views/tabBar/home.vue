<template>
	<view class="wrap">
		<view class="u-tabs-box" style="padding: 0 20upx;">
			<!-- <u-search @click="goSearch" placeholder="搜干货" :disabled="true" shape="square" :show-action="false"
				:animation="true" :clearabled="true"></u-search> -->
			<u-tabs-swiper activeColor="#0081ff" ref="tabs" :list="list" :current="current" @change="change"
				:is-scroll="true" swiperWidth="750"></u-tabs-swiper>
			<scroll-view scroll-x style="height: 100upx;width: 100%;">
				<view class="tags">
					<view @click="changeTag(index)" class="tag" :class="{'active': list[current].current == index}"
						v-for="(item, index) in list[current].tags" :key="index">{{item.tag_name || ''}}</view>
				</view>
			</scroll-view>
		</view>
		<swiper class="swiper-box" :current="swiperCurrent">
			<swiper-item class="swiper-item" v-for="(item, idx) in list" :key="idx">
				<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
					<view class="page-box">
						<view class="order" @click="detail(res.item_info.number)" v-for="(res, index) in list[current].list"
							:key="index">
							<view class="item">

								<view class="content">
									<view class="title u-line-2" style="font-weight: bold;font-size: 30upx;">
										{{res.item_info.title}}
									</view>
									<view class="title u-line-3">
										<!-- <u-parse :lazy-load="true" :selectable="true" :html="marked(res.item_info.body)"></u-parse> -->
										{{res.item_info.body.replace(/\#/g," ")}}
									</view>
								</view>
								<view class="left">
									<!-- 	<image v-if="res.item_info.article_info.cover_image != ''"
										:src="res.item_info.article_info.cover_image" mode="aspectFill"></image> -->
								</view>
							</view>
							<view class="top">
								<view class="left">
									<view class="store">{{res.item_info.user.name}}</view>
								</view>
								<view class="right">
									{{res.item_info.labels[0].name || ''}}
								</view>
							</view>
						</view>
					</view>
					<u-loadmore style="padding: 15rpx;" :status="list[current].loadStatus" bgColor="#f2f2f2"></u-loadmore>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	// import {tags, recomments, articles} from "@/utils/tags.js";
	import {
		getTags,
		getArticles,
		getRecomments,
		getCategory
	} from "@/api/tags.js"
	import marked from 'marked'
	export default {

		data() {
			return {
				marked,
				list: [
					// {
					// 	name: '推荐',
					// 	cate_id: "1",
					// 	path:'hot',
					// 	tags: [],
					// 	list: [],
					// 	current: 0,
					// 	isInitTag: false,
					// 	loadStatus: 'loadmore',
					// 	"cursor": "0"
					// },
					// { name: '后端', cate_id: "6809637769959178254", list: [], tags:[], current: 0, isInitTag: false, loadStatus: 'loadmore', "cursor":"0" },
					// { name: '前端', cate_id: "6809637767543259144", list: [], tags:[], current: 0, isInitTag: false, loadStatus: 'loadmore', "cursor":"0" },
					// { name: 'Android', cate_id: "6809635626879549454", list: [], tags:[], current: 0, isInitTag: false, loadStatus: 'loadmore', "cursor":"0"},
					// { name: 'IOS', cate_id: "6809635626661445640", tags:[], list: [], current: 0, isInitTag: false, loadStatus: 'loadmore', "cursor":"0" },
					// { name: '人工智能', cate_id: "6809637773935378440", tags:[], list: [], current: 0, isInitTag: false, loadStatus: 'loadmore', "cursor":"0" },
					// { name: '开发工具', cate_id: "6809637771511070734", tags:[], list: [], current: 0, isInitTag: false, loadStatus: 'loadmore', "cursor":"0" },
					// { name: '代码人生', cate_id: "6809637776263217160", tags:[], list: [], current: 0, isInitTag: false, loadStatus: 'loadmore', "cursor":"0" },
					// { name: '阅读', cate_id: "6809637772874219534", tags:[], list: [], current: 0, isInitTag: false, loadStatus: 'loadmore', "cursor":"0" }
				],
				current: 0,
				swiperCurrent: 0,
				tabsHeight: 0,
				dx: 0,
				// loadStatus: ['loadmore', 'loadmore', 'loadmore', 'loadmore'],
				labelsStatus: [],
				// per_page: 20,
				articlesForm: [
					{
						page: 1,
						per_page:20,
						labels: ''
					}
				]
			};
		},
		onLoad() {
		
			this.initParams()
			this.getCategory()
		},
		onShareAppMessage() {
			return {
				title: '程序员升职记',
				path: '/pages/views/tabBar/home'
			}
		},
		methods: {
			getCategory() {
				getCategory().then(list => {
					this.list = this.list.concat(list.data)
					this.getCate(0)
					this.getList();
				})
			},
			goSearch(item) {
				uni.navigateTo({
					url: '/pages/views/home/search?keyword=' + item
				})
			},
			detail(number) {
				uni.navigateTo({
					url: '/pages/views/tabBar/detail?number=' + number + '&path=' + this.list[this.current].path
				})
			},
			getCate(idx) {
				// 获取标签
				let _this = this
				// let cate_id = _this.list[idx].cate_id
				// if (cate_id == 1 || _this.list[idx].isInitTag) {
				// 	return
				// }
				let list = [{
					tag_name: "全部"
				}]
				console.log(idx)
				const params = {
					path: _this.list[idx].path
				}
				getTags(params).then(tags => {
					_this.list[idx].tags = list.concat(tags.data)
					_this.list[idx].isInitTag = true
				})
			},
			reachBottom() {
				this.getList();
			},
			// 页面数据
			getList() {
				if (this.current == 0) {
					this.getCateList()
				} else {
					this.getCateList()
				}
			},
			initParams(){
				if (!this.articlesForm[this.current]) {
					this.articlesForm[this.current] = {
						page: 1,
						per_page: 20,
						labels: ''
					}
				}
			},
			getCateList() {
				this.initParams()
				let _this = this
				if (_this.list[this.current].loadStatus == 'nomore') {
					return;
				}
				let tagIndex = _this.list[_this.current].current;
				let params = {
					path: _this.list[_this.current].path || 'blog',
					...this.articlesForm[_this.current]
				}
				// if (tagIndex != 0) {
				// 	params.tag_id = _this.list[_this.current].tags[tagIndex].tag_id
				// }
				_this.list[_this.current].loadStatus = 'loading'
				getArticles(params).then(articles => {
					if (articles.data.length >= _this.articlesForm.per_page) {
						_this.list[_this.current].loadStatus = 'loadmore'
						this.articlesForm[_this.current].page++
					} else {
						_this.list[_this.current].loadStatus = 'nomore'
					}
					_this.list[_this.current].cursor = articles.cursor
					let list = []
					for (var i = 0; i < articles.data.length; i++) {
						list.push({
							"item_type": 2,
							"item_info": articles.data[i]
						})
					}

					_this.list[_this.current].list = _this.list[_this.current].list.concat(list)

				})
			},
			getAllFeed() {
				let _this = this
				if (_this.list[0].loadStatus == 'nomore') {
					return;
				}
				_this.list[0].loadStatus = 'loading'
				getRecomments().then(recomments => {
					console.log(recomments)
					_this.list[0].loadStatus = recomments.has_more ? 'loadmore' : 'nomore'
					_this.list[0].cursor = recomments.cursor
					_this.list[0].list = _this.list[0].list.concat(recomments.data)
				})
				// setTimeout(() => {
				// 	_this.list[0].loadStatus = recomments.has_more ? 'loadmore' : 'nomore'
				// 	_this.list[0].cursor = recomments.cursor
				// 	_this.list[0].list = _this.list[0].list.concat(recomments.data)
				// }, 1000)

			},
			// tab栏切换
			change(index) {
				this.initParams()
				this.swiperCurrent = index;
				this.$refs.tabs.setFinishCurrent(index);
				this.current = index;
				this.getCate(index)
				console.log(this.list[index])
				if (this.list[index].list.length <= 0) {
					this.getList()
				}
			},
			changeTag(index) {
				this.initParams()
				this.list[this.current].current = index
				this.list[this.current].list = []
				this.list[this.current].loadStatus = 'loadmore'
				let tag_name = this.list[this.current].tags[index].tag_name
				this.articlesForm[this.current].labels =  tag_name != '全部' ? tag_name : ''
				this.getList()
			},
			transition({
				detail: {
					dx
				}
			}) {
				this.$refs.tabs.setDx(dx);
			},
			animationfinish({
				detail: {
					current
				}
			}) {

			}
		}
	};
</script>

<style lang="scss" scoped>
	page {
		width: 100%;
		height: 100%;
	}

	.wrap {
		position: fixed;
		display: flex;
		flex-direction: column;
		height: 100%;
		width: 100%;
	}

	.swiper-box {
		flex: 1;
	}

	.swiper-item {
		height: 100%;
		background: #f3f3f3;
	}

	.tags {
		display: flex;
		align-items: center;
		height: 100upx;
		width: 100%;

		.tag {
			padding: 10upx 20upx;
			margin-right: 20upx;
			background-color: #f3f3f3;
			border-radius: 30upx;
			font-size: 24upx;
			white-space: nowrap;
		}

		.active {
			background-color: #0081ff;
			color: #ffffff;
		}
	}

	.order {
		width: 710rpx;
		background-color: #ffffff;
		margin: 20rpx auto;
		border-radius: 20rpx;
		box-sizing: border-box;
		padding: 20rpx;
		font-size: 28rpx;

		.top {
			display: flex;
			justify-content: space-between;
			margin-top: 15rpx;

			.left {
				display: flex;
				align-items: center;

				.store {
					font-size: 26rpx;
					font-weight: bold;
				}
			}

			.right {
				color: $u-type-warning-dark;
				font-size: 32rpx;
			}
		}

		.item {
			display: flex;
			margin: 20rpx 0 0;

			.left {
				margin-right: 20rpx;

				image {
					width: 200rpx;
					height: 200rpx;
					border-radius: 10rpx;
				}
			}

			.content {
				.title {
					font-size: 28rpx;
					line-height: 50rpx;
				}

				.type {
					margin: 10rpx 0;
					font-size: 24rpx;
					color: $u-tips-color;
				}

				.delivery-time {
					color: #e5d001;
					font-size: 24rpx;
				}
			}

			.right {
				margin-left: 10rpx;
				padding-top: 20rpx;
				text-align: right;

				.decimal {
					font-size: 24rpx;
					margin-top: 4rpx;
				}

				.number {
					color: $u-tips-color;
					font-size: 24rpx;
				}
			}
		}

		.total {
			margin-top: 20rpx;
			text-align: right;
			font-size: 24rpx;

			.total-price {
				font-size: 32rpx;
			}
		}

		.bottom {
			display: flex;
			margin-top: 40rpx;
			padding: 0 10rpx;
			justify-content: space-between;
			align-items: center;

			.btn {
				line-height: 52rpx;
				width: 160rpx;
				border-radius: 26rpx;
				border: 2rpx solid $u-border-color;
				font-size: 26rpx;
				text-align: center;
				color: $u-type-info-dark;
			}

			.evaluate {
				color: $u-type-warning-dark;
				border-color: $u-type-warning-dark;
			}
		}
	}

	.centre {
		text-align: center;
		margin: 200rpx auto;
		font-size: 32rpx;

		image {
			width: 164rpx;
			height: 164rpx;
			border-radius: 50%;
			margin-bottom: 20rpx;
		}

		.tips {
			font-size: 24rpx;
			color: #999999;
			margin-top: 20rpx;
		}

		.btn {
			margin: 80rpx auto;
			width: 200rpx;
			border-radius: 32rpx;
			line-height: 64rpx;
			color: #ffffff;
			font-size: 26rpx;
			background: linear-gradient(270deg, rgba(249, 116, 90, 1) 0%, rgba(255, 158, 1, 1) 100%);
		}
	}
</style>
