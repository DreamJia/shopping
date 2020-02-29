<template>
	<view class="wrap">
		<uni-goods-nav :fill="true" :options="options" :button-group="buttonGroup" @click="onClick" @buttonClick="buttonClick"></uni-goods-nav>
		<uni-popup ref="popup" type="bottom">
			<view class="good-option">
				<view class="option-top">
					<image class="option-img" :src="detData.commodity_img" mode=""></image>
					<view class="option-top-price">
						<view class="top-price-jg">
							￥ {{detData.price/100}}
						</view>
						<view class="top-price-kc">
							库存：{{detData.repertory}}
						</view>
					</view>
					<view class="option-close">
						<image @click="close" src="../../static/img/close.png" mode=""></image>
					</view>
				</view>
				<view class="option-num">
					<text>数量</text>
					<uni-number-box v-model="car.number"  :min="1"></uni-number-box>
				</view>
				<view class="option-btn">
					<view class="btn-gwc" @click="addShiping">
						加入购物车
					</view>
					<view class="btn-gm" @click="payGood">
						立即购买
					</view>
				</view>
			</view>
		</uni-popup>
		<view class="detail-box">
			<view class="box-img">
				<image :src="detData.commodity_img" mode=""></image>
				<view class="box-name">
					{{detData.commodity_name}}
				</view>
				<view class="box-price">
					<text style="font-size: 24rpx;">￥</text>
					<text style="font-size: 36rpx;">{{detData.price/100}}</text>
				</view>
				<view class="box-xiaol">
					销量：{{detData.sales_volume}}件
				</view>
			</view>
			<view class="imgtext-det">
				<view class="" style="color:#ccc;text-align: center;font-size: 24rpx;line-height: 80rpx;">
					—— 图文详情 ——
				</view>
				<view class="imgtext-image" v-html="detData.commodity_content">

				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniGoodsNav from '@/components/uni-goods-nav/uni-goods-nav.vue'
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	import uniNumberBox from "@/components/uni-number-box/uni-number-box.vue"
	import {
		AddShiping,
		GetGoodDetail,
		GetDefaultAdd
	} from "../../common/api.js"
	export default {
		data() {
			return {
				detData: {},
				car: {
					product_id: "",
					number: 1
				},
				options: [{
					icon: '../../static/img/index.png',
					text: '首页'
				}],
				buttonGroup: [{
						text: '加入购物车',
						backgroundColor: '#ffa200',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: '#ff0000',
						color: '#fff'
					}
				]
			}
		},
		components: {
			uniGoodsNav,
			uniPopup,
			uniNumberBox
		},
		onLoad(option) {
			this.car.product_id = option.gid;
			this.pageInit(option.gid)
		},
		methods: {
			pageInit(pid) {
				console.log("页面初始化请求")
				let d = {
					product_id: pid
				};
				GetGoodDetail(d).then(res => {
					if (res.status) {
						this.detData = res.data;
					}
				})
			},
			// bindChange(val){
			// 	this.car.number = val;
			// },
			onClick(e) {
				uni.switchTab({
					url: '../index/index'
				});
			},
			buttonClick() {
				this.$refs.popup.open();
			},
			close() {
				// console.log("点击了关闭")
				this.$refs.popup.close();
			},
			// tempNag(data){},
			payGood(){
				GetDefaultAdd().then(res=>{
					if(res.status){
						let d = [];
						d[0] = this.detData;
						d[0].number = this.car.number;
						let tp = (((this.detData.price)*(this.car.number)))/100
						this.$store.commit("SET_SETARR", d);
						this.$store.commit("SET_DEFAADD",res.data);
						this.$store.commit("SET_PRICE",tp);
						uni.navigateTo({
						    url: '../settlement/settlement?pay_type=0'
						});
					}else{
						if(res.code == '204'){
							let d = [];
							d[0]= this.detData;
							d[0].number = this.car.number;
							let tp = (((this.detData.price)*(this.car.number)))/100
							this.$store.commit("SET_SETARR", d);
							this.$store.commit("SET_DEFAADD",null);
							this.$store.commit("SET_PRICE",tp);
							uni.navigateTo({
							    url: '../settlement/settlement?pay_type=0'
							});
						}
					}
				}) 
			},
			addShiping() {
				AddShiping(this.car).then(res => {
					if (res.status) {
						uni.switchTab({
							url: '../shopcar/shopcar',
							success: function() {
								let page = getCurrentPages().pop();
								if (page == undefined || page == null) return;
								page.onLoad();
							}
						});
					} else {
						if(res.code=='201'){
							uni.showToast({
								icon: "none",
								title: '添加失败，该商品已在购物车'
							});
						}else{
							uni.showToast({
								icon: "none",
								title: '添加失败，请稍后重试'
							});
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
		background-color: #efefef;
	}

	.detail-box {
		width: 750rpx;
		padding-bottom: 500rpx;
	}

	.box-img {
		width: 750rpx;
		background: #fff;
		margin-bottom: 20rpx;
	}

	.box-img image {
		width: 750rpx;
		height: 750rpx;
	}

	.box-name {
		padding: 15rpx;
		color: #333;
		box-sizing: border-box;
		font-size: 30rpx;
	}

	.box-price {
		padding: 0 15rpx;
		color: #f00;
	}

	.box-xiaol {
		padding: 10rpx 15rpx 15rpx 15rpx;
		color: #ccc;
		box-sizing: border-box;
		font-size: 24rpx;
	}

	.imgtext-det {
		width: 750rpx;
		background-color: #fff;
	}

	.good-option {
		width: 750rpx;
		height: 350rpx;
		background: #fff;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		padding-bottom: constant(safe-area-inset-bottom);
		/* 兼容 iOS < 11.2 */
		padding-bottom: env(safe-area-inset-bottom);
		/* 兼容 iOS >= 11.2 */
	}

	.option-top {
		width: 700rpx;
		height: 100rpx;
		margin: 0 auto;
		border-bottom: 2rpx solid #ccc;
		position: relative;

	}

	.option-img {
		width: 160rpx;
		height: 160rpx;
		border-radius: 20rpx;
		position: absolute;
		top: -70rpx;
		left: 0;
	}
	.imgtext-image{
		max-width: 750rpx;
		overflow-x: hidden;
	}
	.imgtext-image img{
		max-width: 750rpx;
	}

	.option-top-price {
		width: 200rpx;
		height: 100rpx;
		padding-left: 20rpx;
		position: absolute;
		left: 170rpx;
	}

	.top-price-jg {
		font-size: 32rpx;
		line-height: 60rpx;
		color: #d81e06;
	}

	.top-price-kc {
		font-size: 24rpx;
		color: #ccc;
		line-height: 24rpx;
	}

	.option-close {
		width: 40rpx;
		height: 40rpx;
		position: absolute;
		top: 10rpx;
		right: 0;
	}

	.option-close image {
		width: 40rpx;
		height: 40rpx;
	}

	.option-num {
		width: 700rpx;
		margin: 0 auto;
		height: 150rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.option-num text {
		color: #ccc;
		font-size: 24rpx;
	}

	.option-btn {
		width: 750rpx;
		height: 80rpx;
		display: flex;

	}

	.btn-gwc,
	.btn-gm {
		width: 375rpx;
		height: 80rpx;
		color: #fff;
		text-align: center;
		line-height: 80rpx;
		font-size: 28rpx;
	}

	.btn-gwc {
		background-color: #ffa200;
	}

	.btn-gm {
		background-color: #ff0000;
	}
</style>
