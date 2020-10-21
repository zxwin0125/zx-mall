<template>
	<view>
		<!-- 解决真机中的状态栏问题 -->
		<!-- 什么是状态栏/手机上显示电池的那栏 -->
		<!-- 沉浸式状态栏/背景类透明，与顶部导航栏融合 -->
		<!-- 自定义导航栏 -->
		<view class="header">
			<!-- 定位城市 --> 
			<view class="addr">
				<view class="icon iconfont">&#xe650;</view> {{city}}
			</view>
			<!-- 搜索框 -->
			<view class="input-box">
				<input type="text" placeholder="搜点啥呢..." placeholder-style="color:#c0c0c0" />
				<view class="icon iconfont">&#xe65c;</view>
			</view>
			
			<!-- 提示信息 -->
			<view class="icon-btn">
				<view class="icon iconfont">&#xe70a;</view>
			</view>
		</view>
		<!-- 占位 -->
		<view class="place"></view>
	</view>
	
	
</template>

<script>
	export default {
		data() {
			return {
				city:"苏州"
			}
		}
	}
</script>

<style lang="scss">
	.header {
		width: 92%;
		padding: 0 4%;
		height: 100upx;
		display: flex;
		align-items: center;
		position: fixed;
		z-index: 10;
		background-color: #fff;
		top: 0;
		// 跨端兼容 条件编译 设置离顶部的高度
		// 状态栏高度
		/*  #ifdef  APP-PLUS  */
		top: var(--status-bar-height); // WX固定值25upx  H5+App状态栏为实际状态栏高度
		/*  #endif  */

		.addr {
			width: 120upx;
			height: 60upx;
			flex-shrink: 0;
			display: flex;
			align-items: center;
			font-size: 28upx;

			.icon {
				height: 60upx;
				margin-right: 5upx;
				display: flex;
				align-items: center;
				font-size: 42upx;
				color: #ffc50a;
			}
		}

		.input-box {
			width: 100%;
			height: 60upx;
			background-color: #f5f5f5;
			border-radius: 30upx;
			position: relative;
			display: flex;
			align-items: center;

			.icon {
				display: flex;
				align-items: center;
				position: absolute;
				top: 0;
				right: 0;
				width: 60upx;
				height: 60upx;
				font-size: 34upx;
				color: #c0c0c0;
			}

			input {
				padding-left: 28upx;
				height: 28upx;
				font-size: 28upx;
			}
		}

		.icon-btn {
			width: 60upx;
			height: 60upx;
			flex-shrink: 0;
			display: flex;

			.icon {
				width: 60upx;
				height: 60upx;
				display: flex;
				justify-content: flex-end;
				align-items: center;
				font-size: 42upx;
			}
		}
	}

	.place {
		background-color: #ffffff;
		height: 100upx;
		/*  #ifdef  APP-PLUS  */
		margin-top: var(--status-bar-height);
		/*  #endif  */
	}
</style>
