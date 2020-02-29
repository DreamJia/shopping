<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			wx.login({
				success(res){
					// console.log(res);
					let code = res.code;
					uni.request({
					    url: 'https://ccshop.weixin101.com/home/login', //仅为示例，并非真实接口地址。
					    method:'POST',
						data:{code:code},
					    success: (res) => {
					        uni.setStorageSync('token', res.data.token);
					        
					    }
					});
				}
			})
			
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
