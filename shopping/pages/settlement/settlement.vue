<template>
	<view class="wrap">
		<view class="address-box" @click="chooseAdd">
			<view v-if="!defaAdd" class="choose-add">
				选择收货地址
			</view>
			<view class="box-left" v-if="defaAdd">
				<view class="box-left-top">
					<text>收货人：{{defaAdd.real_name}}</text>
					<text>{{defaAdd.phone}}</text>
				</view>
				<view class="box-left-bot">
					收货地址：{{defaAdd.province}}{{defaAdd.city}}{{defaAdd.area}}{{defaAdd.address}}
				</view>
			</view>
			<view class="box-right">
				<image src="../../static/img/right.png" mode=""></image>
			</view>
		</view>
		<view class="tiaowen">

		</view>
		<view class="goods-list">
			<view class="list-item" v-for="(item,index) in settArr" :key="index">
				<view class="item-left">
					<image v-if="item.commodity" :src="item.commodity.commodity_img" mode=""></image>
					<image v-if="!item.commodity" :src="item.commodity_img" mode=""></image>
				</view>
				<view class="item-right">
					<view v-if="item.commodity" class="item-right-top">
						{{item.commodity.commodity_name}}
					</view>
					<view v-if="!item.commodity" class="item-right-top">
						{{item.commodity_name}}
					</view>
					<view class="item-right-bot">
						<text class="bot-sl">x {{item.number}}</text>
						<text class="bot-jg" v-if="item.commodity">￥ {{((item.commodity.price)*item.number)/100}}</text>
						<text class="bot-jg" v-if="!item.commodity">￥ {{((item.price)*item.number)/100}}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="sett-option-box">
			<view class="sett-option">
				<text>合计：￥ {{totalPri}}</text>
				<view @click="pay" class="option-btn">
					提交
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		CreateOrder
	} from '../../common/api.js'
	export default {
		data() {
			return {
				settArr: [],
				defaAdd: null,
				totalPri: 0,
				productData: [],
				pay_type: 0
			}
		},
		computed: {
			count() {
				// console.log(this.$store.state.settArr)
				return this.$store.state.settArr;
			}
		},
		onLoad(option) {
			this.pay_type = option.pay_type;
			this.pageInit();
		},
		methods: {
			pageInit() {
				let _this = this;
				this.settArr = this.$store.state.settArr;
				this.defaAdd = this.$store.state.defaAdd;
				this.totalPri = this.$store.state.totalPri;
				this.settArr.forEach((e) => {
					if (e.commodity) {
						_this.productData.push({
							id: e.commodity.id,
							number: e.number
						})
					} else {
						_this.productData.push({
							id: e.id,
							number: e.number
						})
					}

				})
			},
			chooseAdd() {
				uni.navigateTo({
					url: "../chooseAddresss/chooseAddresss?pay_type=" + this.pay_type
				})
			},
			pay() {
				if (this.defaAdd) {
					let d = {
						price: this.totalPri * 100,
						shipping_info_id: this.defaAdd.id,
						productData: this.productData,
						order_payment_type: this.pay_type
					}
					CreateOrder(d).then(res => {
						if (res.status) {
							let cog = res.config;
							wx.requestPayment({
								timeStamp: cog.timeStamp,
								nonceStr: cog.nonceStr,
								package: cog.package,
								signType: cog.signType,
								paySign: cog.paySign,
								success(res) {
									switch (res.code) {
										case '200':
											uni.showToast({
												icon: "success",
												title: '支付成功'
											});
											break;
										case '201':
											uni.showToast({
												icon: "none",
												title: '订单创建失败'
											});
											break;
										case '202':
											uni.showToast({
												icon: "none",
												title: '创建订单商品失败'
											});
											break;
										case '203':
											uni.showToast({
												icon: "none",
												title: '商户错误'
											});
											break;
										case '204':
											uni.showToast({
												icon: "none",
												title: '网络错误'
											});
											break;
											case '205':
												uni.showToast({
													icon: "none",
													title: '库存数量不足'
												});
												break;

									}

								},
								fail(res) {}
							})
						}
					})
				}
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

	.address-box {
		width: 750rpx;
		height: 160rpx;
		background: #fff;
		border-top: 2rpx solid #ccc;
		box-sizing: border-box;
		padding: 15rpx;
		display: flex;
		justify-content: space-between;
	}

	.choose-add {
		width: 660rpx;
		height: 130rpx;
		font-size: 28rpx;
		color: #333;
		line-height: 130rpx;
	}

	.goods-list {
		width: 750rpx;
		border-top: 2rpx solid #ccc;
		border-bottom: 2rpx solid #ccc;
		margin-bottom: 300rpx;

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
		color: #f00;
		font-size: 36rpx;
	}

	.box-left {
		width: 660rpx;
		height: 130rpx;
	}

	.box-left-top {
		width: 660rpx;
		height: 80rpx;
		line-height: 80rpx;
		font-size: 24rpx;
		display: flex;
		justify-content: space-between;
	}

	.box-left-bot {
		width: 660rpx;
		height: 40rpx;
		line-height: 40rpx;
		font-size: 24rpx;
	}

	.box-right {
		width: 60rpx;
		height: 130rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.box-right image {
		width: 40rpx;
		height: 40rpx;
	}

	.tiaowen {
		width: 750rpx;
		height: 8rpx;
		background: #ff838f;
		background-image: repeating-linear-gradient(120deg, hsla(0, 0%, 100%, 0.5), hsla(0, 0%, 100%, 0.5) 15px, transparent 0, transparent 30px);
		margin-bottom: 30rpx;
	}

	.sett-option-box {
		width: 750rpx;
		height: 100rpx;
		position: fixed;
		bottom: 0;
		left: 0;
	}

	.sett-option {
		width: 750rpx;
		height: 100rpx;
		background: #fff;
		bottom: 0;
		left: 0;
		display: flex;
		justify-content: space-between;
		line-height: 100rpx;
	}

	.sett-option text {
		color: #f00;
		font-size: 28rpx;
		text-indent: 20rpx;
	}

	.option-btn {
		width: 150rpx;
		height: 100rpx;
		background: #f00;
		color: #fff;
		line-height: 100rpx;
		text-align: center;
		font-size: 28rpx;
	}
</style>
