<template>
	<view class="wrap">
		<uni-popup ref="popup" type="bottom">
			<view class="popup-box">
				<view class="box-top">
					<text>退款备注</text>
					<input class="uni-input" v-model="refundData.remark" placeholder="非必填项" />
				</view>
				<view class="box-btn" @click="refundClick">
					确认退款
				</view>
			</view>
		</uni-popup>
		<view class="order-status">
			<text v-if="detData.status==0" style="color: #0086B3;">待付款</text>
			<text v-if="detData.status==1" style="color: #990055;">待发货</text>
			<text v-if="detData.status==2" style="color: #f00;">支付失败</text>
			<text v-if="detData.status==3" style="color: #795DA3;">已发货</text>
			<text v-if="detData.status==4" style="color: #A71D5D;">已收货</text>
			<text v-if="detData.status==5" style="color: #FFA200;">申请退款中</text>
			<text v-if="detData.status==6" style="color: #4CD964;">已退款</text>
		</view>
		<view class="order-address">
			<view class="add-top">
				<text>联系人：{{detData.shippinginfo.real_name}}</text>
				<text>{{detData.shippinginfo.phone}}</text>
			</view>
			<view class="add-bot">
				收货地址：{{detData.shippinginfo.province}}{{detData.shippinginfo.city}}{{detData.shippinginfo.area}}{{detData.shippinginfo.address}}
			</view>
		</view>
		<view class="order-number">
			<view class="">
				订单编号：{{detData.order_number}}
			</view>
			<view class="">
				下单时间：{{detData.created_at}}
			</view>
		</view>
		<view class="goods-price">
			<text>商品总额</text>
			<text>￥ {{detData.price/100}}</text>
		</view>
		<view class="goods-list">
			<view class="list-item" v-for="(item,index) in goodsList" :key="index">
				<view class="item-left">
					<image :src="item.gg.commodity_img" mode=""></image>
				</view>
				<view class="item-right">
					<view class="item-right-top">
						{{item.gg.commodity_name}}
					</view>
					<view class="item-right-bot">
						<text class="bot-sl">x {{item.number}}</text>
						<text class="bot-jg">￥ {{((item.gg.price)*(item.number))/100}}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="order-opt">
			<view @click="fkClick" v-if="detData.status===0||detData.status===2" class="opt-fk">
				付款
			</view>
			<view @click="tkClick" v-if="detData.status===1" class="opt-tk">
				退款
			</view>
			<view @click="shClick" v-if="detData.status===3" class="opt-sh">
				确认收货
			</view>
		</view>
	</view>
</template>

<script>
	import {
		OrderDetail,
		WaitPaying,
		RefundPay,
		SureGood
	} from '../../common/api.js'
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	export default {
		data() {
			return {
				oid: 0,
				detData: {},
				goodsList: [],
				refundData:{
					order_id:0,
					remark:""
				}
			}
		},
		components: {
			uniPopup,
		},
		onLoad(option) {
			this.oid = option.oid;
			this.pageInit();
		},
		methods: {
			pageInit() {
				let d = {
					order_id: this.oid
				};
				OrderDetail(d).then(res => {
					if (res.status) {
						this.detData = res.data;
						let a = [...this.detData.ordergoods];
						a.forEach((e) => {
							e.gg = JSON.parse(e.goods_snapshot)
						})
						this.goodsList = [...a];
						console.log(this.goodsList)
					}
				})
			},
			fkClick(){
				let d = {order_id:this.detData.id};
				let _this = this;
				WaitPaying(d).then(res=>{
					if(res.status){
						let cog = res.config;
						wx.requestPayment({
						  timeStamp: cog.timeStamp,
						  nonceStr: cog.nonceStr,
						  package: cog.package,
						  signType: cog.signType,
						  paySign: cog.paySign,
						  success (res) { 
							  uni.showToast({
							  	icon: "success",
							  	title: '支付成功'
							  });
							  _this.pageInit();
						  },
						  fail (res) { }
						})
					}
				})
			},
			tkClick(){
				this.$refs.popup.open();
			},
			refundClick(){
				this.refundData.order_id = this.detData.id;
				RefundPay(this.refundData).then(res=>{
					if(res.status){
						this.pageInit();
						this.$refs.popup.close();
					}
				})
			},
			shClick(){
				let d = {order_id:this.detData.id};
				let _this = this;
				SureGood(d).then(res=>{
					if(res.status){
						uni.showToast({
							icon: "success",
							title: '收货成功',
							success:function(){
								_this.pageInit();
							}
						});
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
	}

	.order-status {
		width: 750rpx;
		height: 100rpx;
		background: #ffaa7f;
		line-height: 100rpx;
		color: #fff;
		font-size: 28rpx;
		box-sizing: border-box;
		padding-left: 50rpx;
		margin-bottom: 30rpx;
	}

	.order-address {
		width: 750rpx;
		height: 160rpx;
		box-sizing: border-box;
		padding-top: 20rpx;
		background-color: #fff;
		margin-bottom: 30rpx;
	}

	.add-top {
		width: 750rpx;
		height: 60rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: #666;
		font-size: 24rpx;
		box-sizing: border-box;
		padding: 0 15px;
	}

	.add-bot {
		width: 750rpx;
		height: 60rpx;
		line-height: 60rpx;
		color: #666;
		font-size: 24rpx;
		box-sizing: border-box;
		padding: 0 15px;
	}

	.order-number {
		width: 750rpx;
		height: 160rpx;
		background: #fff;
		margin-bottom: 30rpx;
		color: #666;
		font-size: 24rpx;
		box-sizing: border-box;
		padding: 20rpx;
		line-height: 60rpx;
	}

	.goods-price {
		width: 750rpx;
		height: 80rpx;
		background: #fff;
		border-bottom: 2rpx solid #ccc;
		line-height: 80rpx;
		box-sizing: border-box;
		padding: 0 20rpx;
		color: #666;
		font-size: 28rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.goods-list {
		margin-bottom: 100rpx;
	}

	.list-item {
		width: 750rpx;
		height: 200rpx;
		background: #fff;
		padding: 20rpx 15rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		box-sizing: border-box;
	}

	.item-left {
		width: 160rpx;
		height: 160rpx;
	}

	.item-left image {
		width: 160rpx;
		height: 160rpx;
	}

	.item-right {
		width: 550rpx;
		height: 160rpx;
	}

	.item-right-top {
		width: 550rpx;
		height: 60rpx;
		line-height: 30rpx;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
		font-size: 26rpx;
		color: #333;
		/* box-sizing: border-box; */
		padding-top: 20rpx;
	}

	.item-right-bot {
		width: 550rpx;
		height: 60rpx;
		line-height: 60rpx;
		display: flex;
		justify-content: space-between;
	}

	.bot-sl {
		color: #ccc;
		font-size: 24rpx;
	}

	.bot-jg {
		color: #ccc;
		font-size: 28rpx;
	}
	.order-opt{
		width: 750rpx;
		height: 200rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.opt-fk,.opt-tk,.opt-sh{
		width: 300rpx;
		height: 60rpx;
		background: #f00;
		border-radius: 20rpx;
		text-align: center;
		line-height: 60rpx;
		color: #fff;
		font-size: 28rpx;
	}
	.popup-box{
		width: 750rpx;
		height: 500rpx;
		background: #fff;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		box-sizing: border-box;
		padding-top: 100rpx;
	}
	.box-top{
		width: 750rpx;
		height: 200rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		box-sizing: border-box;
		padding: 0 50rpx;
		
	}
	.box-top .uni-input{
		width: 450rpx;
		height: 60rpx;
		border: 2rpx solid #ccc;
		border-radius: 10rpx;
		
	}
	.box-top text{
		display: inline-block;
		width: 200rpx;
		text-align: center;
		color: #ccc;
		font-size: 28rpx;
	}
	.box-btn{
		width: 200rpx;
		height: 60rpx;
		color: #fff;
		line-height: 60rpx;
		text-align: center;
		font-size: 26rpx;
		border-radius: 30rpx;
		background: #f00;
		margin: 0 auto;
	}
</style>
