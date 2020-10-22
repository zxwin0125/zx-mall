<template>
	<view>
		<!-- 自定义顶部导航栏 -->
		<pageHeader />
		
		
		<!-- 轮播图 -->
		<view class="swiper">
			<view class="swiper-box">
				<!-- uniapp中swiper组件 -->
				<!-- 控制图片变化事件 -->
				<swiper circular="true" autoplay="true" @change="swiperChange">
					<swiper-item v-for="swiper in swiperList" :key="swiper.id">
						<image :src="swiper.img"></image>
					</swiper-item>
				</swiper>
				<!-- 指示符 -->
				<view class="indicator">
					<!-- 动态样式绑定 -->
					<!-- 什么时候实现样式 -->
					<!-- 当前下标等等于遍历的下标 -->
					<view :class="{'on':currentSwiper >= index}" class="dots" v-for="(swiper,index) in swiperList" :key="index"></view>
				</view>
			</view>
		</view>
		
		<!-- 分类列表 -->
		<view class="category-list">
			<!-- 跳转方法,传递遍历出来的每个item -->
			<view @tap="handleCategory(item)" class="category" v-for="(item,index) in categoryList" :key="index">
				<view class="img">
					<image :src="item.img"></image>
				</view>
				<view class="text">{{item.name}}</view>
			</view>
		</view>
		
		<!-- 广告图banner -->
		<!-- 判断如果有广告，就显示图片 -->
		<view v-if="promotion.length > 0" class="banner">
			<image src="/static/img/category/ad.jpg"></image>
		</view>
		
		<!-- 活动区 -->
		<view class="promotion" v-if="promotion.length > 0">
			<view class="text">优惠活动</view>
			<view class="list">
				<!-- 消息提示 -->
				<view @tap="handlePromotion(item)" class="column" v-for="(item,index) in promotion" :key="index">
					<view class="top">
						<view class="title">{{item.title}}</view>
					</view>
					<view class="left">
						<view class="ad">{{item.ad}}</view>
						<view class="into">点击进入</view>
					</view>
					<view class="right">
						<image :src="item.img"></image>
					</view>
				</view>
			</view>
		</view>
		
	</view>
	
	
	
</template>

<script>
	import pageHeader from './pageHeader.vue'
	import interfaces from '../../../utils/interfaces.js'
	export default {
		components: {
			pageHeader
		},
		data() {
			return {
				swiperList: [], // 轮播图片
				categoryList: [], // 分类
				promotion: [], // 活动
				currentSwiper: 0 // 当前下标
			}
		},
		onLoad() { // 页面加载就会执行的方法
			this.initData();
		},
		methods: {
			// 1. 获取数据方法
			initData() {
				// uniapp发送get请求方法
				this.request({
					url: interfaces.getMallData, // url路径
					success: ((res) => {
						// console.log(res) 打印所有数据
						// 将数据分别赋值给数组
						this.swiperList = res.data.swiperList;
						this.categoryList = res.data.categoryList;
						this.promotion = res.data.promotion;
					})
				})
			},
			// 2. 动态改变样式
			swiperChange(event) { // 图片变化事件
				// event 事件对象
				// console.log(event.detail.current);
				this.currentSwiper = event.detail.current; // 当前图片下标
			},
			// 3. 分类跳转方法
			handleCategory(item) {
				// 分类跳转
				// console.log(item.name);
				uni.navigateTo({
					url:"../../goods/goodsList?name="+item.name
				})
			},
			// 4. 消息提示方法
			handlePromotion(item) {
				uni.showToast({
					title: item.title,
					icon: 'none'
				})
			}
			
		}
	}
</script>

<style lang="scss">
	.swiper {
		width: 100%;
		margin-top: 10upx;
		display: flex;
		justify-content: center;

		.swiper-box {
			width: 92%;
			height: 30.7vw;
			overflow: hidden;
			border-radius: 15upx;
			box-shadow: 0upx 8upx 25upx rgba(0, 0, 0, 0.2);
			//兼容ios，微信小程序
			position: relative;
			z-index: 1;

			swiper {
				width: 100%;
				height: 30.7vw;

				swiper-item {
					image {
						width: 100%;
						height: 40vw;
					}
				}
			}

			.indicator {
				position: absolute;
				bottom: 20upx;
				left: 20upx;
				background-color: rgba(255, 255, 255, 0.4);
				width: 150upx;
				height: 5upx;
				border-radius: 3upx;
				overflow: hidden;
				display: flex;

				.dots {
					width: 0upx;
					background-color: rgba(255, 255, 255, 1);
					transition: all 0.3s ease-out;

					&.on {
						width: (100%/3);
					}
				}
			}
		}
	}

	.category-list {
		width: 92%;
		margin: 0 4%;
		padding: 0 0 30upx 0;
		border-bottom: solid 2upx #f6f6f6;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;

		.category {
			width: 25%;
			margin-top: 50upx;
			display: flex;
			flex-wrap: wrap;

			.img {
				width: 100%;
				display: flex;
				justify-content: center;

				image {
					width: 11vw;
					height: 11vw;
				}
			}

			.text {
				margin-top: 16upx;
				width: 100%;
				display: flex;
				justify-content: center;
				font-size: 24upx;
				color: #3c3c3c;
			}
		}
	}

	.banner {
		width: 92%;
		margin: 40upx 4%;

		image {
			width: 100%;
			height: 36vw;
			border-radius: 4upx;
			box-shadow: 0upx 5upx 25upx rgba(0, 0, 0, 0.3);
		}
	}

	.promotion {
		width: 92%;
		margin: 10upx 4% 30upx 4%;

		.text {
			width: 100%;
			height: 60upx;
			font-size: 34upx;
			font-weight: 600;
			margin: 10upx;
		}

		.list {
			width: 100%;
			display: flex;
			justify-content: space-between;

			.column {
				width: 43%;
				padding: 15upx 3%;
				background-color: #ebf9f9;
				border-radius: 10upx;
				overflow: hidden;
				display: flex;
				justify-content: space-between;
				flex-wrap: wrap;

				.top {
					width: 100%;
					height: 40upx;
					display: flex;
					align-items: center;
					margin-bottom: 5upx;

					.title {
						font-size: 30upx;
					}
				}

				.left {
					width: 50%;
					height: 18.86vw;
					display: flex;
					flex-wrap: wrap;
					align-content: space-between;

					.ad {
						margin-top: 5upx;
						width: 100%;
						font-size: 22upx;
						color: #acb0b0;
					}

					.into {
						width: 100%;
						font-size: 24upx;
						color: #aaa;
						margin-bottom: 5upx;
					}
				}

				.right {
					width: 18.86vw;
					height: 18.86vw;

					image {
						width: 18.86vw;
						height: 18.86vw;
					}
				}
			}
		}
	}
</style>
