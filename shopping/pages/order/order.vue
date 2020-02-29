<template>
	<view class="wrap">
		<view class="tab-list">
			<view class="tab-item" @click="tabChange(item)" v-bind:class="{active:item.isActive}" v-for="(item,index) in tabArr" :key="index">{{item.tab_name}}</view>
		</view>
		<view class="order-list">
			<view class="list-item" v-for="(item,index) in orderList" :key="index">
				<view class="item-orderNumber">
					<text>订单号：{{item.order_number}}</text>
					<text v-if="item.status==0" style="color: #0086B3;">待付款</text>
					<text v-if="item.status==1" style="color: #990055;">待发货</text>
					<text v-if="item.status==2" style="color: #f00;">支付失败</text>
					<text v-if="item.status==3" style="color: #795DA3;">已发货</text>
					<text v-if="item.status==4" style="color: #A71D5D;">已收货</text>
					<text v-if="item.status==5" style="color: #FFA200;">申请退款中</text>
					<text v-if="item.status==6" style="color: #4CD964;">已退款</text>
				</view>
				<view class="item-price">
					订单金额：{{item.price/100}}
				</view>
				<view class="item-time">
					<text class="time-left">
						创建时间：{{item.created_at}}
					</text>
					<text class="time-right" @click="toDetail(item.id)">查看详情</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {MyOrderList} from '../../common/api.js'
	export default {
		data() {
			return {
				tabArr:[
					{
						tid:0,
						tab_name:"全部",
						isActive:false
					},
					{
						tid:1,
						tab_name:"待付款",
						isActive:false
					},
					{
						tid:2,
						tab_name:"待发货",
						isActive:false
					},{
						tid:3,
						tab_name:"待收货",
						isActive:false
					},{
						tid:4,
						tab_name:"退货",
						isActive:false
					}
				],
				pageData:{
					page:1,
					limit:100,
					order_type:0
				},
				orderList:[]
			}
		},
		onLoad(option){
			this.tabArr[option.tid].isActive = true;
			this.pageData.order_type = option.tid;
			this.pageInit();
		},
		methods: {
			pageInit(){
				MyOrderList(this.pageData).then(res=>{
					if(res.status){
						this.orderList = [...res.data.data];
					}
				})
			},
			tabChange(item){
				this.tabArr.forEach((e)=>{
					e.isActive = false;
				})
				item.isActive = true;
				this.pageData.order_type = item.tid;
				this.pageInit();
			},
			toDetail(id){
				uni.navigateTo({
				    url: '../orderDetail/orderDetail?oid='+id
				});
			}
		}
	}
</script>

<style scoped>
.wrap{
	width: 750rpx;
	min-height: 100vh;
	background: #efefef;
}
.tab-list{
	width: 750rpx;
	height: 80rpx;
	background: #fff;
	display: flex;
	justify-content: space-between;
	align-items: center;
	box-sizing: border-box;
	padding: 0 20rpx;
	
}
.tab-item{
	color: #333;
	font-size: 26rpx;
	height: 76rpx;
	line-height: 76rpx;
	box-sizing: border-box;
	border-bottom: 4rpx solid #fff;
}
.active{
	border-bottom: 4rpx solid #f00;
	color: #f00;
}
.order-list{
	width: 720rpx;
	padding: 30rpx 15rpx;
}
.list-item{
	width: 720rpx;
	height: 200rpx;
	background: #fff;
	border-radius: 10rpx;
	margin-bottom: 20rpx;
	box-sizing: border-box;
	padding: 10rpx;
}
.item-orderNumber{
	width: 700rpx;
	height: 60rpx;
	line-height: 60rpx;
	color: #666;
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 28rpx;
	border-bottom: 2rpx solid #ccc;
}
.item-price{
	width: 700rpx;
	height: 60rpx;
	line-height: 60rpx;
	font-size: 36rpx;
	color: #f00;
}
.item-time{
	width: 700rpx;
	height: 60rpx;
	line-height: 60rpx;
	font-size: 24rpx;
	color: #ccc;
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.time-right{
	width: 160rpx;
	height: 44rpx;
	border: 2rpx solid #ccc;
	border-radius: 6rpx;
	text-align: center;
	line-height: 40rpx;
	display: inline-block;
}
</style>

