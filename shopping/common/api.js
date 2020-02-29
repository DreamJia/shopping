import Request from "./request.js"
/*
收货地址
*/
export function AddAddress(data){//添加
	return Request("home/shipping/create",data,"POST");
}

export function GetAddlist(){//获取列表
	return Request("home/shipping/info","GET")
}

export function RemoveAdd(data){//删除
	return Request("home/shipping/delete",data,"POST")
}

export function GetAdddet(data){//地址详情
	return Request("home/shipping/show",data,"GET")
}

export function UpdataAdd(data){//修改地址
	return Request("home/shipping/update",data,"POST")
}

export function GetDefaultAdd(){
	return Request("home/shipping/getDefault",{},"GET")
}

/*
分类
*/
export function GetClasslist(){//获取分类
	return Request("home/classify/index",{page:1,limit:100},"GET")
}

export function GetGoods(data){//获取商品
	return Request("home/classify/product",data,"GET")
}

export function AddShiping(data){//添加商品到购物车
	return Request("home/shopCar/create",data,"POST")
}

export function GetGoodDetail(data){//获取商品详情
	return Request("home/product/show",data,"GET")
}


/*
购物车
*/
export function GetShiping(){//购物车列表
	return Request("home/shopCar/index",{page:1,limit:100},"GET")
}

export function RemoveShiping(data){//删除购物车
	return Request("home/shopCar/delete",data,"POST")
}

export function CountTotalPrice(data){//计算总价
	return Request("home/total/prices",data,"POST")
}


/*
首页
*/
export function GetTodayNew(){//今日上新
	return Request("home/product/todayNew",{},"GET")
}

export function CreateOrder(data){//创建订单
	return Request("home/order/create",data,"POST")
}

/*
我的订单
*/
export function MyOrderList(data){//订单列表
	return Request("home/order/index",data,"GET")
}

export function OrderDetail(data){//订单详情
	return Request("home/order/show",data,"GET")
}

export function WaitPaying(data){//待付款订单付款
	return Request("home/order/waiting/payment",data,"POST")
}

export function RefundPay(data){//退款
	return Request("home/order/refund",data,"POST")
}

export function SureGood(data){//确认收货
	return Request("home/order/make/sure/goods",data,"POST")
}




