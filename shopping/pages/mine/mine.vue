<template>
	<view class="wrap">
		<uni-popup ref="popup" type="center">
			<view class="popop-box-con">
				<view class="con-title">
					微信授权
				</view>
				<view class="con-first">
					春城配送申请获取以下权限
				</view>
				<view class="con-second">
					· 获取公开的信息（昵称，头像等）
				</view>
				<view class="con-btn">
					<button type="default" @click="cancel" size="mini">取消</button>
					 <button type='primary' size="mini" open-type="getUserInfo" withCredentials="true" lang="zh_CN" @getuserinfo="wxGetUserInfo">允许</button>
				</view>
				
			</view>
		</uni-popup>
		<view class="mine-head">
			<view class="head-left">
				<image v-if="!avatarUrl" src="../../static/img/tx.png" mode=""></image>
				<image v-if="avatarUrl" :src="avatarUrl" mode=""></image>
				<text v-if="!nickName" @click="clickLogin">点击登录</text>
				<text v-if="nickName">{{nickName}}</text>
			</view>
			<view class="head-right" @click="toAddress">
				<image src="../../static/img/gps.png" mode=""></image>
				<text>收货地址</text>
			</view>
		</view>
		<view class="order-list">
			<view class="order-item" v-for="(item,index) in orderList" :key="index" @click="toOrder(item.tid)">
				<view class="item-img">
					<image :src="item.t_img" mode=""></image>
				</view>
				<view class="item-text">
					{{item.t_name}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	export default {
		data() {
			return {
				nickName:"",
				avatarUrl:"",
				orderList:[
					{
						tid:1,
						t_name:"待付款",
						t_img:"../../static/img/dfk.png",
					},{
						tid:2,
						t_name:"待发货",
						t_img:"../../static/img/dfh.png"
					},{
						tid:3,
						t_name:"待收货",
						t_img:"../../static/img/dss.png"
					},{
						tid:4,
						t_name:"退货",
						t_img:"../../static/img/th.png"
					},{
						tid:0,
						t_name:"我的订单",
						t_img:"../../static/img/mydd.png"
					}
				]
			}
		},
		components: {
			uniPopup,
		},
		onLoad(){
			this.pageInit();
		},
		methods: {
			pageInit(){
				this.nickName = uni.getStorageSync("nickName");
				this.avatarUrl = uni.getStorageSync("avatarUrl");
			},
			toOrder(tid){
				uni.navigateTo({
					url: '../order/order?tid='+tid
				});
			},
			toAddress() {
				uni.navigateTo({
					url: '../address/address'
				});
			},
			clickLogin() {
				this.$refs.popup.open();
			},
			cancel(){
				this.$refs.popup.close();
			},
			wxGetUserInfo() {
				let _this = this;
				wx.getSetting({
				  success (res){
					if (res.authSetting['scope.userInfo']) {
					  // 已经授权，可以直接调用 getUserInfo 获取头像昵称
					  wx.getUserInfo({
						success: function(res) {
							let userInfo =  res.userInfo;
							uni.setStorageSync('nickName', userInfo.nickName);
							uni.setStorageSync('avatarUrl', userInfo.avatarUrl);
							_this.$refs.popup.close();
							_this.pageInit();
						}
					  })
					}
				  }
				})
			}
		}
	}
</script>

<style scoped>
	.wrap {
		width: 750rpx;
		min-height: 100vh;
		background: #efefef;
		padding-top: 20rpx;
	}

	.mine-head {
		width: 720rpx;
		height: 200rpx;
		background: #ff7285;
		border-radius: 20rpx;
		margin: 0 auto 30rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;

	}

	.popop-box-con {
		width: 600rpx;
		height: 400rpx;
		background: #fff;
		border-radius: 20rpx;
		padding: 20rpx;

	}
	.con-title{
		height: 120rpx;
		line-height: 120rpx;
		font-size: 40rpx;
	}
	.con-first{
		height: 80rpx;
		line-height: 80rpx;
		border-bottom: 2rpx solid #ccc;
		font-size: 28rpx;
		color: #333;
	}
	.con-second{
		height: 80rpx;
		line-height: 80rpx;
		font-size: 24rpx;
		color: #ccc;
	}
	.con-btn{
		height: 100rpx;
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}
	
	.con-btn button::after{
		border: none;
	}

	.head-left {
		width: 370rpx;
		height: 100rpx;
		padding-left: 30rpx;
		display: flex;
		align-items: center;
	}

	.head-left image {
		width: 100rpx;
		height: 100rpx;
		border-radius: 50rpx;
		margin-right: 20rpx;
	}

	.head-left text {
		color: #333;
		font-size: 28rpx;
	}

	.head-right {
		width: 180rpx;
		height: 70rpx;
		background: #d81e06;
		border-top-left-radius: 35rpx;
		border-bottom-left-radius: 35rpx;
		color: #fff;
		display: flex;
		align-items: center;
		padding-left: 15rpx;
	}

	.head-right image {
		width: 40rpx;
		height: 40rpx;
		margin-right: 15rpx;
	}

	.head-right text {
		font-size: 26rpx;
	}

	.order-list {
		width: 720rpx;
		height: 160rpx;
		box-sizing: border-box;
		padding: 0 10rpx;
		background-color: #fff;
		margin: 0 auto;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-radius: 20rpx;
	}

	.order-item {
		width: 140rpx;
		height: 100rpx;
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
	}

	.item-img {
		width: 140rpx;
		display: flex;
		justify-content: center;
	}

	.item-img image {
		width: 60rpx;
		height: 60rpx;
	}

	.item-text {
		width: 140rpx;
		line-height: 48rpx;
		color: #ccc;
		text-align: center;
		font-size: 28rpx;
	}
</style>
