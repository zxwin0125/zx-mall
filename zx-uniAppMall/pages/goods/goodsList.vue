<template>
	<view>
		<!-- 遍历tab选项卡 -->
		<view class="header">
			<!-- 选中切换事件，选中样式 -->
			<view @tap="handleSelect(index)" class="target" v-for="(target,index) in filterByList" :key="index" :class="{'on':target.selected}">
				{{target.text}}
			</view>
		</view>
		<!-- 占位 tabbar 有定位 -->
		<view class="place"></view>
		<!-- 商品列表 -->
		<view class="goods-list">
			<view class="product-list">
				<!-- 遍历商品列表数据 -->
				<view class="product" @tap="handleGoods(goods)" v-for="goods in goodsList" :key="goods.goods_id">
					<image mode="widthFix" :src="goods.img"></image>
					<view class="name">{{goods.name}}}</view>
					<view class="info">
						<view class="price">
							<text>￥</text>
							{{goods.price}}
						</view>
						<view class="slogan">{{goods.slogan}} <text>人付款</text></view>
					</view>
				</view>
			</view>
			<view class="loading-text">{{loadingText}}</view>
		</view>
	</view>
</template>

<script>
	import interfaces from '../../utils/interfaces.js'
	export default {
		data() {
			return {
				goodsList: [], // 商品列表大数组
				filterby: "all", // 默认选择的tab
				page: 1,
				size: 6,
				loadingText: "正在加载....",
				// tab选项卡列表信息
				filterByList: [{
						text: "全部",
						selected: true,
						filterby: "all"
					},
					{
						text: "口碑",
						selected: false,
						filterby: "public"
					},
					{
						text: "热门",
						selected: false,
						filterby: "hot"
					}
				]
			}
		},
		
		methods: {
			// 商品跳转方法
			handleGoods(goods){
				// 页面跳转 商品详情
				uni.navigateTo({
					url:'./goods?goodsInfo='+JSON.stringify(goods)
				})
			},
			
			// 选中切换事件
			handleSelect(index) {
				this.filterByList[index].selected = true;

				// 其他的selected false
				for (let i = 0; i < this.filterByList.length; i++) {
					if (i != index) {
						this.filterByList[i].selected = false;
					}
				}
				
				// 数据请求
				this.filterby = this.filterByList[index].filterby;
				this.page = 1;
				this.loadingText = "加载中...";
				this.goodsList = [];
				this.loadData();
			},
			
			// 加载数据方法
			loadData() {
				this.request({
					// 拼接请求路径
					url: `${interfaces.getGoodsList}/${this.filterby}/${this.page}/${this.size}`,
					success: ((res) => {
						if(res.data.length > 0){ // 判断商品数据长度
							res.data.forEach(item => {
								this.goodsList.push(item);
							})
						}else{
							this.loadingText = "到底了";
						}
					})
				})
			}
		},
		
		// onload: 只加载一次，监听页面加载，其参数为上个页面传递的数据，参数类型为Object（用于页面传参）
		onLoad(option) {
			// 获取商品列表页传过来的数据
			// console.log(option);
			// 动态修改nav title
			uni.setNavigationBarTitle({
				title: option.name
			})

			// 加载数据
			this.loadData();
		},
		
		// 下拉加载更多
		onPullDownRefresh(){
			// 定时器
			setTimeout(() => {
				this.page = 1;
				this.loadingText = "加载中...";
				this.goodsList = [];
				this.loadData(); // 加载数据
				uni.stopPullDownRefresh(); // 清除下拉加载
			},1000)
		},
		
		// 上拉加载更多
		onReachBottom(){
			this.page++; // 更改page值
			this.loadData(); // 加载数据
		}
	}
</script>

<style lang="scss">
	.header {
		width: 92%;
		padding: 0 4%;
		height: 79upx;
		display: flex;
		justify-content: space-around;
		align-items: flex-end;
		position: fixed;
		z-index: 10;
		background-color: #fff;
		border-bottom: solid 1upx #eee;

		.target {
			width: 20%;
			height: 60upx;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 28upx;
			margin-bottom: -2upx;
			color: #aaa;

			&.on {
				color: #555;
				border-bottom: 4upx solid #f06c7a;
				font-weight: 600;
				font-size: 30upx;
			}

			.icon {
				font-size: 26upx;
			}
		}
	}

	.place {
		background-color: #ffffff;
		height: 100upx;
	}

	.goods-list {
		.loading-text {
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 60upx;
			color: #979797;
			font-size: 24upx;
		}

		.product-list {
			width: 92%;
			padding: 0 4% 3vw 4%;
			column-count: 2;
			column-gap: 1em;

			.product {
				break-inside: avoid;
				border-radius: 20upx;
				background-color: #fff;
				margin: 0 0 15upx 0;
				box-shadow: 0upx 5upx 25upx rgba(0, 0, 0, 0.1);

				image {
					width: 100%;
					border-radius: 20upx 20upx 0 0;
				}

				.name {
					width: 92%;
					padding: 6upx 4%;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					text-align: justify;
					overflow: hidden;
					font-size: 30upx;
				}

				.info {
					display: flex;
					justify-content: space-between;
					align-items: flex-end;
					width: 92%;
					padding: 10upx 4% 10upx 4%;

					.price {
						color: #e65339;
						font-size: 30upx;
						font-weight: 600;
					}

					.slogan {
						color: #807c87;
						font-size: 24upx;
					}
				}
			}

		}
	}
</style>
