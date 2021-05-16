<template>
	<div>
		<nav-bar>
			<template v-slot:default>购物车(<span style="color:red">{{$store.state.cartCount}}</span>)</template>
		</nav-bar>
		<div class="cart-box">
			<div class="cart-body" v-if='list.length'>
				<van-checkbox-group @change='groupChange' v-model="result" ref="checkboxGroup">					
					<van-swipe-cell :right-width="50"
						v-for='(item , index) in list' :key='index'
					>
						<div class="good-item">
							<van-checkbox :name='item.id'/>
							<div class="good-img">
								<img :src="item.goods.cover_url">
							</div>
							<div class="good-desc">
								<div class="good-title">
									<span>{{item.goods.title}}</span>
									<span>x{{item.goods.stock}}</span>
								</div>
								<div class="good-btn">
									<div class='price'><small>¥</small>{{item.goods.price}}.00</div>
									<van-stepper  integer :min='1' :max='item.goods.stock' :model-value='item.num' :name='item.id' async-change @change='onChange'></van-stepper>
								</div>
							</div>
							
						</div>
						<template #right>
							<van-button 
								square 
								icon='delete' 
								type='danger'
								class='delete-button'
								@click='deleteGood(item.id)'></van-button>
						</template>
					</van-swipe-cell>

				</van-checkbox-group>				
			</div>
			<van-submit-bar @submit='onSummit' class='submit-all' :price='total' button-text='结算'>
				<van-checkbox v-model='checkAll' @click='allCheck'>全选</van-checkbox> 
			</van-submit-bar>
			<div class="empty" v-if='!list.length'>
				<van-icon name="shopping-cart-o" size='100px'/>
				<p>你的购物车是空的</p>
				<van-button style='margin-top: 10px;' color="#1baeae" round size="normal" @click='router.push("/home")'>前去选购</van-button>
			</div> 
		</div>
				
	</div>
</template>

<script>
	import NavBar from 'components/common/navbar/NavBar'
	import { getCartList , changeCartNum , changeCartChecked ,
	delCart} from 'network/cart'
	import { onMounted , toRefs , reactive , computed} from 'vue'
	import { useRouter } from 'vue-router'
	import { useStore } from 'vuex'
	import { Toast } from 'vant'
	export default{
		setup(){
			
			const router = useRouter()
			const store = useStore()

			// 数据模型， 状态
			const state = reactive({
				list:[],
				result:[],
				checkAll: false
			})

			// 初始化购物车数据
			const init = () => {
				Toast.loading('加载中...')

				getCartList('include=goods').then( res => {
					Toast.clear()
					state.list = res.data

					state.result = res.data.filter( n=> n.is_checked == 1).map( item => item.id)
				})
			}
			onMounted(()=>{
				init()
			})
			// 计算属性计算总价
			const total = computed( () => {
				let sum = 0
				let totalArr = state.list.filter(item => state.result.includes(item.id))
				totalArr.forEach(item => {
					sum+= item.num * item.goods.price
				})
				return sum*100
			})

			//  改变购物车数量
			const onChange = (value , detail) => {
				Toast.loading('加载中')
				changeCartNum(detail.name , {num:value}).then(()=>{
					state.list.forEach(item => {
						if ( item.id == detail.name) {
							item.num = value
						}
					})
					Toast.clear()
				})
			}


			// 复选框改变选择处理事件
			const groupChange = (result) => {
				if (result.length == state.list.length) {
					state.checkAll = true
				}else{
					state.checkAll = false
				}
				changeCartChecked({cart_ids : result})
			}

			const allCheck = () => {
				if (state.checkAll == true) {
					state.result = state.list.map(item => item.id)
				}else{
					state.result = []
				}
			}

			const deleteGood = (id) => {
				delCart(id).then( () => {
					init()
					store.dispatch('updateCart')
				})

			}

			// 创建订单
			const onSummit = () => {
				if (state.result.length == 0) {
					Toast.fail('请选择商品进行结算')
					return
				}else{
					router.push('/createorder')
				}
			}
			return{
				router,
				...toRefs(state),
				onChange,
				groupChange,
				allCheck,
				deleteGood,
				total,
				onSummit
			}
		},
		components:{
			NavBar,
		}
	}
</script>

<style lang="less" scoped="">
	.cart-box{
		margin:50px 0 100px 0;
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
	.delete-button{
		height: 100%;
	}
	.empty{
		width: 50%;
		margin: 0 auto;
		text-align: center;
		margin-top: 200px;
		font-size: 16px;
		font-weight: bold;
	}
	.van-checkbox {
		padding-left: 5px;
	}
</style>