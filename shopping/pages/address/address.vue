<template>
	<view class="wrap">
		<view class="address-list">
			<view class="list-item" v-for="(item,index) in list" :key="index">
				<view class="item-top">
					<view class="item-phone">
						<text>收货人：{{item.real_name}}</text>
						<text>{{item.phone}}</text>
					</view>
					<view class="item-address">
						收货地址：{{item.province}}{{item.city}}{{item.area}}{{item.address}}
					</view>
				</view>
				<view class="item-bottom">
					<view class="item-bottom-left">
						<view v-if="item.default" style="padding:5rpx 10rpx;border-radius: 5rpx; background-color:#d81e06;color: #fff;font-size: 24rpx;">默认</view>
					</view>
					<view class="item-bottom-right">
						<text @click="toEdit(item.id)">编辑</text>
						<text @click="remove(item.id)">删除</text>
					</view>
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
	import {GetAddlist,RemoveAdd} from "../../common/api.js"
	export default {
		data() {
			return {
				list:[]
			}
		},
		components: {
			EvanCheckbox,
			EvanCheckboxGroup,
			UniIcons
		},
		onLoad(option){
			
			this.pageInit();
		},
		methods: {
			addAddress(){
				uni.navigateTo({
				    url: '../addAddress/addAddress?type=a'
				});
			},
			setDefault(param){
				if(param.default){
					param.default = true;
				}
			},
			pageInit(){
				GetAddlist().then(res=>{
					if(res.status){
						let d = [...res.data]
						for(let i = 0,len=d.length;i<len;i++){
							if(d[i].default===1){
								d[i].default = true;
							}else{
								d[i].default = false;
							}
						}
						this.list = [...d];
					}
				})
			},
			toEdit(id){
				uni.navigateTo({
				    url: '../editAddress/editAddress?aid='+id+'&type=a'
				});
			},
			remove(id){
				let _this = this;
				uni.showModal({
				    title: '提示',
				    content: '确定要删除吗？',
				    success: function (res) {
				        if (res.confirm) {
							let d = {id:id}
				            RemoveAdd(d).then(res=>{
								if(res.status){
									_this.pageInit();
								}
							})
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
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

	.address-list {
		width: 700rpx;
		margin: 0 auto 100rpx;
	}

	.list-item {
		width: 700rpx;
		background: #fff;
		border-radius: 20rpx;
		margin-bottom: 20rpx;
	}
	.item-top{
		width: 700rpx;
		border-bottom: 2rpx solid #ccc;
		box-sizing: border-box;
		padding: 0 20rpx 20rpx 20rpx;
	}
	.item-phone{
		height: 80rpx;
		line-height: 100rpx;
		display: flex;
		justify-content: space-between;
		font-size: 26rpx;
		color: #111;
	}
	.item-address{
		color: #111;
		font-size: 26rpx;
	}
	.item-bottom{
		width: 700rpx;
		box-sizing: border-box;
		padding: 25rpx 20rpx;
		display: flex;
		justify-content: space-between;
	}
	.item-bottom-left{
		width: 300rpx;
		display: flex;
	}
	.item-bottom-right{
		width: 160rpx;
		display: flex;
		justify-content: space-between;
	}
	.item-bottom-left text,.item-bottom-right text{
		color: #ccc;
		margin-left: 20rpx;
		font-size: 26rpx;
	}
	.item-bottom-right text{
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
