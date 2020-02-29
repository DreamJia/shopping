<template>
	<view class="wrap">
		<view class="add-list">
			<view class="list-item">
				<view class="item-label">收货人</view>
				<input class="uni-input" v-model="formData.real_name" />
			</view>
			<view class="list-item">
				<view class="item-label">联系电话</view>
				<input class="uni-input" type="number" v-model="formData.phone" />
			</view>
			<view class="list-item">
				<view class="item-label">所在地区</view>
				<picker mode="region" style="width: 500rpx;" @change="bindRegionChange" v-model="region" placeholer="请选择" :custom-item="customItem">
				    <view class="picker" v-if="region.length>0">
				      {{region[0]}} {{region[1]}} {{region[2]}}
				    </view>
					<view class="picker" v-if="region.length==0" style="color: #ccc;">
					  请选择
					</view>
				 </picker>
				 <view class="" style="width:100rpx;text-align: right; color:#ccc;font-size: 40rpx;">
				 	>
				 </view>
			</view>
			<view class="list-item" >
				<view class="item-label">详细地址</view>
				<input class="uni-input" v-model="formData.address" />
			</view>
			<view v-if="type==a" class="list-item" style="border: none;">
				<view class="item-default">
					设置默认地址
				</view>
				<evan-switch v-model="formData.default"  active-color="#d81e06"></evan-switch>
			</view>
		</view>
		<!-- <evan-switch v-model="checked" active-color="#d81e06"></evan-switch> -->
		<view class="save-address" @click="saveAddress">保存地址</view>
	</view>
</template>

<script>
	import EvanSwitch from '@/components/evan-switch/evan-switch.vue'
	import {GetAdddet,UpdataAdd} from '../../common/api.js'
	export default {
		data() {
			return {
				formData:{
				},
				region: [],
				type:'a'
			}
		},
		components:{EvanSwitch},
		onLoad(option){
			let aid = option.aid;
			this.type = option.type;
			this.pageInit(aid);
		},
		methods: {
			pageInit(id){
				let d = {id:id}
				GetAdddet(d).then(res=>{
					if(res.status){
						if(res.data.default===1){
							res.data.default = true;
						}else{
							res.data.default = false;
						}
						this.formData = res.data;
						this.region[0] = res.data.province;
						this.region[1] = res.data.city;
						this.region[2] = res.data.area;
					}
				})
			},
			bindRegionChange(e) {
			    // // console.log('picker发送选择改变，携带值为', e.detail.value)
			      this.region = e.detail.value;
			},
			saveAddress(){
				this.formData.province = this.region[0];
				this.formData.city = this.region[1];
				this.formData.area=this.region[2];
				if(this.formData.real_name == ''){
					uni.showToast({
						icon:"none",
					    title: '收货人未填写'
					});
				}else 
				if(this.formData.phone == ''){
					uni.showToast({
						icon:"none",
					    title: '联系电话未填写'
					});
				}else
				if(this.formData.address == ''){
					uni.showToast({
						icon:"none",
					    title: '详细地址未填写'
					});
				}else if(this.region.length<1){
					uni.showToast({
						icon:"none",
					    title: '所在地区未选择'
					});
				}else{
					let _this = this;
					this.formData.default===true?this.formData.default=1:this.formData.default=0;
					UpdataAdd(this.formData).then(res=>{
						if(res.status){
							uni.showToast({
								icon:"success",
							    title: '修改成功',
								success:function(){
									if(_this.type=='a'){
										uni.navigateTo({
										    url: '../address/address'
										});
									}else{
										uni.navigateTo({
										    url: '../chooseAddresss/chooseAddresss'
										});
									}
									
								}
							});
							
						}else{
							uni.showToast({
								icon:"none",
							    title: '创建失败，请稍后重试'
							});
						}
					})
				}
				
			}
			  
		}
	}
</script>

<style scoped>
.wrap{
	width: 750rpx;
	min-height: 100vh;
	background-color: #efefef;
}
.add-list{
	padding-top: 30rpx;
	margin-bottom: 100rpx;
}
.list-item{
	width: 750rpx;
	height: 100rpx;
	background: #fff;
	border-bottom: 2rpx solid #ccc;
	display: flex;
	box-sizing: border-box;
	align-items: center;
	padding-right: 30rpx;
	justify-content: space-between;
}
.item-label{
	width: 160rpx;
	text-align: center;
	color: #111;
	line-height: 100rpx;
	text-align:center;
	font-size: 30rpx;
	
}
.uni-input{
	width: 550rpx;
}
.item-default{
	width: 550rpx;
	font-size: 30rpx;
	color: #111;
	text-indent: 10rpx;
}
.item-switch{
	width: 150rpx;
	text-align: right;
}
.save-address{
	width: 400rpx;
	height: 70rpx;
	background-color: #d81e06;
	line-height: 70rpx;
	text-align: center;
	border-radius: 35rpx;
	color: #fff;
	font-size: 28rpx;
	margin: 0 auto;
}
</style>

