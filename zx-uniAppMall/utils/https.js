// 封装uniRequest请求
module.exports = (param) => { // param 请求对象
	// 定义变量
	var url = param.url; 		// 请求对象路径
	var method = param.method	// 请求对象方法
	var header = param.header || {}; // 如果请求对象没有header或data，就为{}空对象
	var data = param.data || {};
	
	// 封装请求方式: GET POST
	if(method){
		method = method.toUpperCase(); // 小写转成大写
		if(method == "POST"){ // 判断如果为 POST 方法，需要加 header
			header = {"content-type":"application/x-www-form-urlencoded"}
		}
	}
	
	// 发起请求 加载动画
	if(!param.hideLoading){ // 系统提供
		uni.showLoading({title:"加载中..."})
	}
	
	// 发起网络请求
	uni.request({
		url: url,
		method:method || "GET",
		header:header,
		data: data,
		success: res => {
			if(res.statusCode && res.statusCode != 200){ // 判断返回结果中statusCode不为200，则api错误
				uni.showModal({
					// 返回错误信息
					content:res.msg
				})
				return;
			}
			
			// 如果成功就传递数据
			typeof param.success == "function" && param.success(res.data);
		},
		// 如果失败，返回error
		fail: (e) => {
			uni.showModal({
				// 展示错误信息
				content: e.meg
			})
			typeof param.fail == "function" && param.fail(e.data);
		},
		// 完成请求
		complete: () => {
			// console.log("网络请求complete");
			uni.hideLoading(); // 去除加载动画
			typeof param.complete == "function" && param.complete(e.data);
			return;
		}
	})
	
}