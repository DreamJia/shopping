<template>
	<view class="wrap">
		<!-- <view class="search">
			<uni-search-bar :radius="100" @confirm="search"></uni-search-bar>
		</view> -->
		<view class="tab">
			<wuc-tab :tab-list="tabList" :tabCur.sync="TabCur" @change="tabChange"></wuc-tab>
		</view>
		<!-- 此处为插槽，只能使用template或其他自定义component -->
		<view class="goods-list">
			<navigator :url="'../detail/detail?gid='+item.id" class="goods-list-item" v-for="(item,index) in goodsArr" :key="index">
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
		<view v-if="loaded" class="" style="text-align: center;line-height: 60rpx;font-size: 26rpx;color: #ccc;">
			—— 全部数据加载完成 ——
		</view>
		<view v-if="noHave" class="" style="text-align: center;line-height: 60rpx;font-size: 26rpx;color: #ccc;">
			分类下暂无商品
		</view>
	</view>
</template>

<script>
	import uniSearchBar from '@/components/uni-search-bar/uni-search-bar.vue'
	import WucTab from '@/components/wuc-tab/wuc-tab.vue'
	import wsLoadMore from '@/components/wsure-load-more/load-more.vue'
	import {
		GetClasslist,GetGoods
	} from '../../common/api.js'
	export default {
		data() {
			return {
				TabCur: 0,
				pre: 'item',
				failFlag: false,
				count: 0,
				tabList: [],
				last_page:0,
				loaded:false,
				noHave:false,
				pageData:{
					class_id:"",
					page:1,
					limit:20
				},
				goodsArr:[]
			}
		},
		components: {
			uniSearchBar,
			WucTab,
			wsLoadMore
		},
		methods: {
			search() {
				console.log("123")
			},
			pageInit() {
				GetClasslist().then(res => {
					if (res.status) {
						this.tabList = [...res.data];
						this.pageData.class_id = this.tabList[0].id;
						this.getGoodsList();
					}
				})
			},
			getGoodsList(){
				GetGoods(this.pageData).then(res=>{
					if(res.status){
						// console.log(res.data.data.length)
						if(res.data.data.length==0){
							this.noHave = true;
						}else{
							this.last_page = res.data.last_page;
							if(this.pageData.page==this.last_page){
								this.loaded = true;
							}
							for(let i = 0,len=res.data.data.length;i<len;i++){
								this.goodsArr.push(res.data.data[i]);
							}
						}
					}
				})
			},
			tabChange(index, item) {
				this.TabCur = index;
				this.pageData.class_id = item.id;
				this.pageData.page = 1;
				this.loaded = false;
				this.noHave = false;
				this.goodsArr = [];
				this.getGoodsList();
			},
		},
		onLoad() {
			// this.$refs.loadMore.reLoadData()
			this.pageInit();
		},
		// onPullDownRefresh() {
		// 	console.log("onPullDownRefresh")
		// 	this.$refs.loadMore.pullDownRefresh()
		// },
		onReachBottom() {
			this.pageData.page++;
			if(this.pageData.page<=this.last_page){
				// console.log(this.pageData.page)
				this.getGoodsList();
			}else if(this.pageData.page>=this.last_page){
				this.loaded = true;
			}
			// this.$refs.loadMore.reachBottom()
		}
	};
</script>

<style scoped>
	.wrap {
		width: 750rpx;
		min-height: 100vh;
		background: #efefef;
	}

	.search {
		width: 750rpx;
		height: 100rpx;
		margin-bottom: 30rpx;
	}

	.tab {
		background: #fff;
		height: 100rpx;
		margin-bottom: 30rpx;

	}

	.goods-list {
		width: 700rpx;
		margin: 0 auto;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}

	.goods-list-item {
		width: 330rpx;
		height: 550rpx;
		background: #fff;
		margin-bottom: 30rpx;
		border-radius: 20rpx;
	}

	.item-img image {
		width: 330rpx;
		height: 330rpx;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
	}

	.item-text {
		box-sizing: border-box;
		padding: 0 15rpx;
		font-size: 28rpx;
		line-height: 40rpx;
		height: 80rpx;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
	}

	.item-price {
		line-height: 60rpx;
		color: #d81e06;
		font-size: 36rpx;
		font-weight: 600;
		box-sizing: border-box;
		padding: 0 15rpx;
	}

	.item-price text {
		font-size: 28rpx;
	}

	.item-sailed {
		color: #ccc;
		line-height: 60rpx;
		font-size: 24rpx;
		text-align: right;
		box-sizing: border-box;
		padding: 0 15rpx;
	}
</style>
