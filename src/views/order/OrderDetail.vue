<template>
	<div class="order-detail-box">
		<nav-bar>
			<template v-slot:default>订单详情</template>
		</nav-bar>
		<div class="order-status">
			<div class="status-item">
				<label>订单状态:</label>
				<span>{{statusString}}</span>
			</div>
			<div class="status-item">
				<label>订单编号:</label>
				<span>{{detail.order_no}}</span>
			</div>
			<div class="status-item">
				<label>下单时间:</label>
				<span>{{detail.created_at}}</span>
			</div>

			<div class="status-button">
				<van-button @click='showPayFn' v-if='detail.status == 1' style="margin-bottom: 10px" color="#1baeae" block>	去支付</van-button>			
				<van-button @click='handleConfirmOrder' v-if='detail.status == 2' block>确认订单</van-button>					
			</div>
		
		</div>		
		<div class="order-price">
			<div class="price-item">
				<label>商品金额:</label>
				<span>¥ {{detail.amount}}.00</span>
			</div>
			<div class="price-item">
				<label>配送方式:</label>
				<span>普通快递</span>
			</div>
		</div>

		<van-card
			v-for='(item , index) in detail.orderDetails.data'
			:key='index'
			:num="item.num"
			:price="item.price"
			:desc="item.goods.description"
			:title="item.goods.title"
			:thumb='item.goods.cover_url'
		/>			
		<div style="width: 100%; height: 50px;"></div>				


		

		<van-popup   round v-model:show='showPay'  closeable position="bottom" :style="{ height: '20%' }" >
			<div class="order-pay">
				<p>使用沙盒支付宝支付</p>
				<img  v-lazy="aliyun" >					
			</div>
		</van-popup>		
	</div>
</template>

<script>
	import NavBar from 'components/common/navbar/NavBar'
	import { getOrderDetails , getOrderPay , payOrderStatus } from 'network/order'	
	import { onMounted , reactive , toRefs , computed} from 'vue'
	import { Toast } from 'vant';
	import { Dialog } from 'vant';	
	import { useRoute , useRouter} from 'vue-router'

	export default{
		setup(){
			const route = useRoute()
			const router = useRouter()
			const state = reactive({
				orderId:'', // 订单ID
				detail:{
					orderDetails:{
						data:[]
					}
				},
				showPay:false,
				aliyun:''
			})
			const init = () => {
				const {id} = route.query
				state.orderId = id

				getOrderDetails(id).then(res=>{
					state.detail = res
				})
			}

			onMounted( ()=> {
				Toast.loading({message:'加载中' , forbidClick:true})
				init()
				Toast.clear()
			})

			const statusString = computed(()=>{
				let status = ['' , '已下单','已支付', '等待发货', '确认收货','已过期']
				return status[state.detail.status]
			})

			const showPayFn = () => {
				state.showPay = true
				getOrderPay(state.orderId , {type: 'aliyun'}).then(res=>{
					state.aliyun = res.qr_code_url
				})
			}

			// 轮询查看
			const timer = setInterval(() => {
				payOrderStatus(state.orderId).then(res => {
					if (res == 2) {
						clearInterval(timer)
						state.showPay = false
						router.push({path: '/orderdetail' , query:{id: state.orderId}})
					}
				})
			} , 2000)			

			const handleConfirmOrder =  () => {
					Dialog.confirm({
						title: '是否确认订单',
					})
					.then(() => {
						// confirmorder(state.orderId).then(res=>{
						// 	if (res.status_code == 204) {
						// 		Toast.success('确认成功')
						// 		init()
						// 	}
						// 	console.log(res)
						// })
						Toast.success('确认成功')
					})
					.catch(() => {
					// on cancel
					});				
				}
			return{
				...toRefs(state),
				statusString,
				showPayFn,
				handleConfirmOrder
			}
		},
		components:{
			NavBar
		}		

	}
</script>

<style lang="less" scoped>
	.order-status{
		margin-top:55px;
		text-align: left;
		.status-item{
			margin:10px;
			padding: 5px;
			label{
				color:#B2B0AE;
			}
			span{
				margin-left:5px;
			}
		}
		.status-button{
			padding:10px;
		}
	}
	.order-price{
		text-align: left;
		margin-bottom: 30px;
		.price-item{
			margin:10px;
			padding: 5px;
			label{
				color:#B2B0AE;
			}
			span{
				margin-left:5px;
			}			
		}
	}
	.van-card {
		text-align: left
	}
	.order-pay{
		padding: 10px;
		img{
			height:130px;
			width: 130px;
		}
	}	
</style>