<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	/* 引入全局css文件 */
	@import "/static/iconfont/iconfont/iconfont.css";
	page{
		position: relative;
		background-color: #fff;
	}
</style>
