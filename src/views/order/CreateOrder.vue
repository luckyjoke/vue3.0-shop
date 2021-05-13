<template>
	<div class="create-order">
		<nav-bar>
			<template v-slot:default>订单预览</template>
		</nav-bar>

		<div class="address-wrap">
			<div class="name" >
				<span>{{address.name}}</span>
				<span>{{address.phone}}</span>
			</div>
			<div class="address">
				{{address.province}}{{address.city}}{{address.county}}{{address.address}}
			</div>
			<div @click="goTo">
				<van-icon class="arrow" name="arrow"></van-icon>
			</div>
			
			
		</div>
		<hr style="height: 3px;background: linear-gradient(45deg, #7135F2, #05DBF2);">
		<div class="good">
			<div class="good-item" v-for='(item , index) in carts' :key='index'>
				<div class="good-img">
					<img v-lazy="item.goods.cover_url">
				</div>
				<div class="good-desc">
					<div class="good-title">
						<span>{{item.goods.title}}</span>
						<span>X{{item.num}}</span>
					</div>
					<div class="good-btn">
						<div class='price'><small>¥</small>{{item.goods.price}}.00</div>
					</div>
				</div>
			</div>						
		</div>
			<van-submit-bar :price="total" button-text="立即购买" @submit="handleCreateOrder" class='submit-all'/>


			<van-popup @close='popClose' round v-model:show='showPay'  closeable position="bottom" :style="{ height: '20%' }" >
<!-- 				<div class="order-pay">
					<van-button type="primary" block @click='payFinish'>支付宝</van-button>
					<br>
					<van-button type="success" block @click='payFinish'>微信</van-button>
				</div> -->
				<div class="order-pay">
					<p>使用沙盒支付宝支付</p>
					<img  v-lazy="aliyun" >					
				</div>
			</van-popup>					
	</div>
</template>

<script >
	import NavBar from 'components/common/navbar/NavBar'
	import { Toast } from 'vant';	
	import { useRouter } from 'vue-router'
	import { useStore } from 'vuex'
	import { onMounted , reactive , toRefs , computed } from 'vue'
	import { getOrderPreview , creatOrder , getOrderPay , payOrderStatus} from 'network/order'

	export default{
		setup(){
			const router =useRouter()
			const store = useStore()
			const state = reactive({
				address: {},
				carts: [],
				showPay: false,
				orderId: '',
				aliyun: ''
			})

			const init = () => {
				getOrderPreview().then(res => {
					Toast.loading({
						message: '加载中...',
						forbidClick: true,
						duration: 500,
					});					
					const  defaultAdress = res.address.filter(item => {return item.is_default == 1})
					console.log(defaultAdress)
					if (defaultAdress.length == 0) {
						state.address.address = '还没有默认地址，去往设置'
					}else{
						state.address = defaultAdress[0]
					}
					state.carts = res.carts
					console.log(state.carts)
				})
			}
			onMounted( ()=> {
				init()
			})

			// 计算价格
			const total = computed( () => {
				let sum = 0
				state.carts.forEach(item => {
					sum+= item.num * item.goods.price
				})
				return sum*100
			})

			// 去地址管理
			const goTo = () => {
				router.push('/address')
			}


			const handleCreateOrder = () => {
				const params = {
					address_id : state.address.id
				}
				creatOrder(params).then(res => {
					Toast.success('创建订单成功')
					state.showPay = true
					store.dispatch('updateCart')

					state.orderId = res.id

					getOrderPay(state.orderId , {type:'aliyun'}).then( res => {
						state.aliyun = res.qr_code_url
					})





					// 轮询查看
					const timer = setInterval(() => {
						payOrderStatus(state.orderId).then(res => {
							if (res == 2) {
								clearInterval(timer)
								router.push({path: '/orderdetail' , query:{id: state.orderId}})
							}
						})
					} , 2000)
				})
			}

			const popClose = () => {
				router.push({path:'/orderdetail' , query:{id:state.orderId}})
			}

			// 选中支付宝或者微信按钮的点击事件
			// const payFinish = () => {
			// 	Toast.success('购买完成 回到购物车')
			// 	store.dispatch('updateCart')

			// 	setTimeout(()=>{
			// 		router.push('/shopcart')
			// 	},2000)
			// }
			return{
				...toRefs(state),
				handleCreateOrder,
				goTo,
				total,
				popClose
			}
		},
		components:{
			NavBar
		}
	}
</script>

<style lang="less" scoped>
	.create-order{
		
		margin-top:55px;
		.address-wrap{
			padding:10px;
			font-weight: bold;
			padding-left: 10px;
			padding-right: 15px;
			margin-bottom: 10px;
			text-align: left;
			display: flex;
			flex-direction: column;
			justify-content: flex-end;
			.name{

				span{
					margin-right: 10px;
				}
				margin-bottom: 10px;
			}
			.address{
				font-size: 15px;
			}
		}
		.arrow{
			position: absolute;
			right: 0px;
			top: 70px;
			font-size: 20px;
		}



		.good{
			margin-top: 5px;
		.good-item{
			display:flex;
			.good-img{
				img{
				height: 80px;
				width: 100px;
				}
			}
			.good-desc {
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				flex:1;
				padding: 5px 5px;
			}
			.good-title{
				display: flex;
				justify-content: space-between;
			}
			.good-btn{
				display: flex;
				justify-content: space-between;
				.price{
					font-size:16px;
					color:red;
					line-height:28px;
				}
			}
		}			
		}
		.submit-all{
			margin-bottom: 53px;
		}
		.order-pay{
			padding: 10px;
			img{
				height:130px;
				width: 130px;
			}
		}	
	}
</style>