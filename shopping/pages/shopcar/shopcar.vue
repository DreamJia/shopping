<template>
	<view class="wrap">
		<!-- <view class="car-edit">
			<text>编辑</text>
		</view> -->
		<view class="shopcar-list">
			<view class="list-item"  v-for="(item,index) in carData" v-if="item.commodity" :key="index">
				<view class="car-check">
					<evan-checkbox v-model="item.checked" @change="checkChange(item)" primary-color="#d81e06"></evan-checkbox>
				</view>
				<view class="car-img">
					<image :src="item.commodity.commodity_img" mode=""></image>
				</view>
				<view class="car-msg">
					<view class="car-msg-name">
						{{item.commodity.commodity_name}}
					</view>
					<!-- <view class="car-msg-gg">
						<text>规格：{{item.gg}}</text>
					</view> -->
					<view class="car-msg-price">
						<view class="msg-price-left">
							￥
							<text>{{item.commodity.price/100}}</text>
						</view>
						<view class="msg-price-right">
							<uni-number-box v-model="item.number" :min="1" @change="bindChange(item)"></uni-number-box>
							<image class="delete" @click="remove(item)" src="../../static/img/close.png" mode=""></image>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="car-option">
			<view class="option-left">
				<view class="" style="margin-right:30rpx;">
					<evan-checkbox v-model="allCheck" @change="allChange" primary-color="#d81e06">全选</evan-checkbox>
				</view>
				<view class="all-price">
					总计：
					￥<text>{{totalPrice}}</text>
				</view>
			</view>
			<view class="option-right">
				<view v-if="totalPrice" @click="toSettlement" class="option-btn-on">
					去结算
				</view>
				<view v-if="!totalPrice" class="option-btn-off">
					去结算
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import EvanCheckbox from '@/components/evan-checkbox/evan-checkbox.vue'
	import EvanCheckboxGroup from '@/components/evan-checkbox/evan-checkbox-group.vue'
	import UniIcons from '@/components/uni-icons/uni-icons.vue'
	import uniNumberBox from "@/components/uni-number-box/uni-number-box.vue"
	import {GetShiping,RemoveShiping,CountTotalPrice,GetDefaultAdd} from "../../common/api.js"
	export default {
		components: {
			EvanCheckbox,
			EvanCheckboxGroup,
			UniIcons,
			uniNumberBox,
			
		},
		data() {
			return {
				totalPrice:0,
				allCheck:false,
				carData:[],
				checkList:[],
				settData:[]
			}
		},
		onLoad(){
			this.pageInit();
		},
		methods: {
			pageInit(){
				GetShiping().then(res=>{
					if(res.status){
						let d = [...res.data.data];
						for(let i = 0,len = d.length;i<len;i++){
							d[i].checked = false;
						}
						this.carData = d;
					}
				})
			},
			allChange(){
				let a = this.carData.every((e)=>{
					return e.checked==true;
				});
				if(a){
					this.carData.forEach((e)=>{
						e.checked = false;
					});
					this.tempConduct();
				}else{
					this.carData.forEach((e)=>{
						e.checked = true;
					});
					this.tempConduct();
				}
			},
			remove(item){
				let _this = this;
				uni.showModal({
				    title: '提示',
				    content: '确定要删除吗？',
				    success: function (res) {
				        if (res.confirm) {
							let d = {id:item.id}
				            RemoveShiping(d).then(res=>{
								if(res.status){
									_this.pageInit();
								}
							})
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
			},
			tempConduct(){
				const _this = this;
				let arr = _this.carData.filter((e,i) => {
					return e.checked===true;
				});
				let t = [];
				
				arr.forEach((e,i)=>{
					let j = {
						id:e.commodity.id,
						number:e.number
					}
					t.push(j);
					t.length===_this.carData.length?(_this.allCheck = true):(_this.allCheck = false);
				});
				_this.settData = arr;
				
				let d = {productData:t}
				CountTotalPrice(d).then(res=>{
					if(res.status){
						_this.totalPrice = res.totalPrices/100;
					}
				})
			},
			//选中
			checkChange(item){
				this.tempConduct();
			},
			bindChange(item){
				if(item.checked){
					this.tempConduct();
				}
			},
			//去结算
			toSettlement(){
				GetDefaultAdd().then(res=>{
					if(res.status){
						let d = this.settData;
						this.$store.commit("SET_SETARR", d);
						this.$store.commit("SET_DEFAADD",res.data);
						this.$store.commit("SET_PRICE",this.totalPrice)
						uni.navigateTo({
						    url: '../settlement/settlement?pay_type=1'
						});
					}else{
						if(res.code == '204'){
							let d = this.settData;
							this.$store.commit("SET_SETARR", d);
							this.$store.commit("SET_DEFAADD",null);
							this.$store.commit("SET_PRICE",this.totalPrice)
							uni.navigateTo({
							    url: '../settlement/settlement?pay_type=1'
							});
						}
					}
				})
				
			}	
		}
	}
</script>

<style>
.wrap{
	width: 750rpx;
	min-height: 100vh;
	background: #efefef;
}
.car-edit{
	box-sizing: border-box;
	padding: 10rpx 25rpx;
	text-align: right;
	background: #fff;
	font-size: 28rpx;
	color: #aaa;
	margin-bottom: 50rpx;
}
.list-item{
	width: 750rpx;
	height: 200rpx;
	margin-bottom: 10rpx;
	padding: 20rpx 0;
	/* border-top: 2rpx solid #ccc;
	border-bottom: 2rpx solid #ccc; */
	background: #fff;
	display: flex;
	border-radius: 10rpx;
}
.shopcar-list{
	padding:20rpx 0  200rpx 0;
	background: #efefef;
}
.car-check{
	width: 100rpx;
	height: 200rpx;
	display: flex;
	justify-content: center;
	align-items: center;
}
.car-img{
	width: 150rpx;
	height: 200rpx;
	display: flex;
	align-items: center;
	margin-right: 20rpx;
	
}
.car-img image{
	width: 150rpx;
	height: 150rpx;
	border-radius: 10rpx;
}
.car-msg{
	width: 450rpx;
	height: 200rpx;
}
.car-msg-name{
	min-height: 80rpx;
	box-sizing: border-box;
	padding-top: 10rpx;
	font-size: 26rpx;
	color: #333;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
	overflow: hidden;
}
.car-msg-gg{
	line-height: 40rpx;
	font-size: 22rpx;
	color: #ccc;
}
.car-msg-price{
	width: 450rpx;
	height: 100rpx;
	/* display: flex;
	justify-content: space-between;
	align-items: center; */
}
.msg-price-left{
	color: #d81e06;
	font-size: 24rpx;
	font-weight: 600;
	height: 60rpx;
}
.msg-price-right{
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.msg-price-right image{
	width: 40rpx;
	height: 40rpx;
}
.msg-price-left text{
	font-size: 30rpx;
}
.car-option{
	width: 750rpx;
	height: 100rpx;
	background: #fff;
	position: fixed;
	bottom: 0;
	box-sizing: border-box;
	padding-left: 20rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
	border-top: 2rpx solid #ccc;
	z-index: 99;
}
.all-price{
	color: #d81e06;
	font-size: 24rpx;
	font-weight: 600;
}
.all-price text{
	font-size: 30rpx;
}
.option-left{
	display: flex;
}

.option-btn-on{
	width: 180rpx;
	height: 100rpx;
	background-color: #d81e06;
	color: #fff;
	text-align: center;
	line-height: 100rpx;
}
.option-btn-off{
	width: 180rpx;
	height: 100rpx;
	background-color: #aaa;
	color: #fff;
	text-align: center;
	line-height: 100rpx;
}
.option-btn-del-off{
	width: 80rpx;
	height: 40rpx;
	color: #ccc;
	border: 2rpx solid #ccc;
	border-radius: 20rpx;
	text-align: center;
	line-height: 40rpx;
}
.option-btn-del-on{
	width: 80rpx;
	height: 40rpx;
	color: #d81e06;
	border: 2rpx solid #d81e06;
	border-radius: 20rpx;
	text-align: center;
	line-height: 40rpx;
}
.option-right{
	display: flex;
	align-items: center;
}

</style>
