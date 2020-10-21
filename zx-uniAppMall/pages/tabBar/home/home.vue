<template>
	<!-- 自定义顶部导航栏 -->
	<pageHeader />
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
				currentSwiper: 0
			}
		},
		onLoad() { // 页面加载就会执行的方法
			this.initData();
		},
		methods: {
			initData() {
				// uniapp发送get请求方法
				uni.request({
					url: interfaces.getMallData, // url路径
					success: (res) => {
						// console.log(res) 打印所有数据
						// 将数据分别赋值给数组
						this.swiperList = res.data.swiperList;
						this.categoryList = res.data.categoryList;
						this.promotion = res.data.promotion;
					}
				})
			}
		}
	}
</script>

<style>
</style>
