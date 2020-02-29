<template>
	<view class="wrap">
		<view class="haibao">
			<image src="../../static/img/haibao.jpg" mode=""></image>
		</view>
		<view class="hot-sail">
			<navigator url="" class="hot-1">
				<image src="../../static/img/fenlei1.jpg" mode=""></image>
			</navigator>
			<navigator url="" class="hot-2">
				<image src="../../static/img/fenlei2.jpg" mode=""></image>
			</navigator>
		</view>
		<view class="hot-title">
			—— 今日上新 ——
		</view>
		<view class="goods-list">
			<navigator v-for="(item,index) in newList" :key="index" :url="'../detail/detail?gid='+item.id" class="goods-list-item">
				<view class="item-img">
					<image :src="item.commodity_img" mode=""></image>
				</view>
				<view class="item-text">
					{{item.commodity_name}}
				</view>
				<view class="item-price">
					<text>￥</text>{{item.price/100}}
				</view>
				<view class="item-sailed">
					<text>已售{{item.sales_volume}}件</text>
				</view>
			</navigator>
		</view>
	</view>
</template>

<script>
	import {GetTodayNew} from "../../common/api.js"
	export default {
		data() {
			return {
				newList:[]
			}
		},
		onLoad() {
			this.pageInit();
		},
		methods: {
			pageInit(){
				GetTodayNew().then(res=>{
					if(res.status){
						this.newList = [...res.data];
					}
				})
			}
		}
	}
</script>

<style>
	.wrap{
		width: 750rpx;
		height: ;
		background: #efefef;
		padding-top: 30rpx;
	}
	.haibao{
		width: 750rpx;
		height: 360rpx;
		margin-bottom: 30rpx;
		display: flex;
		justify-content: center;
	}
	.haibao image{
		width: 700rpx;
		height: 360rpx;
		border-radius: 20rpx;
	}
	.hot-sail{
		width: 700rpx;
		height:360rpx;
		display: flex;
		justify-content: space-between;	
		margin: 0 auto;
	}
	
	.hot-1 image{
		width: 280rpx;
		height: 360rpx;
		border-radius: 20rpx;
	}
	.hot-2 image{
		width: 370rpx;
		height: 360rpx;
		border-radius: 20rpx;
	}
	.hot-title{
		width: 750rpx;
		height: 100rpx;
		line-height: 100rpx;
		text-align: center;
		color: #d81e06;
	}
	.goods-list{
		width:700rpx;
		margin: 0 auto;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}
	.goods-list-item{
		width: 330rpx;
		height: 550rpx;
		background: #fff;
		margin-bottom: 30rpx;
		border-radius: 20rpx;
	}
	.item-img image{
		width: 330rpx;
		height: 330rpx;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
	}
	.item-text{
		box-sizing: border-box;
		padding:0 15rpx;
		font-size: 28rpx;
		line-height: 40rpx;
		height: 80rpx;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
	}
	.item-price{
		line-height: 60rpx;
		color: #d81e06;
		font-size: 36rpx;
		font-weight: 600;
		box-sizing: border-box;
		padding:0 15rpx;
	}
	.item-price text{
		font-size: 28rpx;
	}
	.item-sailed{
		color: #ccc;
		line-height: 60rpx;
		font-size: 24rpx;
		text-align: right;
		box-sizing: border-box;
		padding:0 15rpx;
	}
	
</style>
