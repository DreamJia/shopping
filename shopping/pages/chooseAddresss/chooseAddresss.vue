<template>
	<view class="wrap">
		<view class="address-list">
			<view class="list-item" v-for="(item,index) in list" :key="index">
				<view class="item-top" @click="fhSett(item)">
					<view class="item-phone">
						<text>{{item.real_name}}<text class="default-icon" v-if="item.default" style="">默认</text></text>
					</view>
					<view class="item-phone">
						<text>{{item.phone}}</text>
					</view>
					<view class="item-address">
						{{item.province}}{{item.city}}{{item.area}}{{item.address}}
					</view>
				</view>
				<view class="item-edit">
					<image @click="toEdit(item.id)" src="../../static/img/edit.png" mode=""></image>
				</view>
			</view>
		</view>
		<view class="add-address" @click="addAddress">
			添加新地址
		</view>
	</view>
</template>

<script>
	import EvanCheckbox from '@/components/evan-checkbox/evan-checkbox.vue'
	import EvanCheckboxGroup from '@/components/evan-checkbox/evan-checkbox-group.vue'
	import UniIcons from '@/components/uni-icons/uni-icons.vue'
	import {
		GetAddlist,
		RemoveAdd
	} from "../../common/api.js"
	export default {
		data() {
			return {
				list: [],
				pay_type:0
			}
		},
		components: {
			EvanCheckbox,
			EvanCheckboxGroup,
			UniIcons
		},
		onLoad(option) {
			this.pay_type = option.pay_type;
			this.pageInit();
		},
		methods: {
			addAddress() {
				uni.navigateTo({
					url: '../addAddress/addAddress?type=c'
				});
			},
			setDefault(param) {
				if (param.default) {
					param.default = true;
				}
			},
			pageInit() {
				GetAddlist().then(res => {
					if (res.status) {
						let d = [...res.data]
						for (let i = 0, len = d.length; i < len; i++) {
							if (d[i].default === 1) {
								d[i].default = true;
							} else {
								d[i].default = false;
							}
						}
						this.list = [...d];
					}
				})
			},
			toEdit(id) {
				uni.navigateTo({
					url: '../editAddress/editAddress?aid=' + id+'&type=c'
				});
			},
			fhSett(item){
				this.$store.commit("SET_DEFAADD",item);
				let t = this.pay_type;
				uni.navigateTo({
				    url: '../settlement/settlement?pay_type='+t
				});
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

	.default-icon {
		display: inline-block;
		width: 50rpx;
		height: 40rpx;
		line-height: 40rpx;
		border-radius: 8rpx;
		background-color: #d81e06;
		color: #fff;
		font-size: 20rpx;
		text-align: center;
		margin-left: 20rpx;
	}

	.address-list {
		width: 700rpx;
		margin: 0 auto 100rpx;
	}

	.list-item {
		width: 700rpx;
		padding: 20rpx 0;
		background: #fff;
		border-radius: 20rpx;
		margin-bottom: 20rpx;
		display: flex;
		justify-content: space-between;
	}

	.item-top {
		width: 620rpx;
		box-sizing: border-box;
		padding: 0 20rpx 20rpx 20rpx;
	}
	.item-edit{
		width: 80rpx;
		height: 180rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.item-edit image{
		width: 40rpx;
		height: 40rpx;
	}

	.item-phone {
		height: 50rpx;
		line-height: 50rpx;
		font-size: 26rpx;
		color: #111;
	}

	.item-address {
		color: #111;
		font-size: 26rpx;
		height: 80rpx;
		line-height: 40rpx;
	}

	.item-bottom {
		width: 700rpx;
		box-sizing: border-box;
		padding: 25rpx 20rpx;
		display: flex;
		justify-content: space-between;
	}

	.item-bottom-left {
		width: 300rpx;
		display: flex;
	}

	.item-bottom-right {
		width: 160rpx;
		display: flex;
		justify-content: space-between;
	}

	.item-bottom-left text,
	.item-bottom-right text {
		color: #ccc;
		margin-left: 20rpx;
		font-size: 26rpx;
	}

	.item-bottom-right text {
		text-decoration: underline;
	}

	.add-address {
		width: 300rpx;
		height: 70rpx;
		background: #d81e06;
		color: #fff;
		border-radius: 35rpx;
		line-height: 70rpx;
		text-align: center;
		margin: 0 auto;
		font-size: 28rpx;
	}
</style>
