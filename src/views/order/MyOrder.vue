<template>
	<div class="my-order-box">
		<nav-bar>
			<template v-slot:default>我的订单</template>
		</nav-bar>
		<van-tabs @click='onChangeTab' >
			<van-tab title="全部"></van-tab>
			<van-tab title="待付款"></van-tab>
			<van-tab title="已支付"></van-tab>
			<van-tab title="发货"></van-tab>
			<van-tab title="交易完成"></van-tab>
			<van-tab title="过期"></van-tab>
		</van-tabs>
		<div>
			<van-pull-refresh v-model="refreshing" @refresh="onRefresh">
				<van-list
					v-model:loading="loading"
					:finished="finished"
					finished-text="没有更多了"
					@load="onLoad"
					@offset="10"
				>
				<div @click='goTo(item.id)' class="order-item-box" v-for='(item , index) in list' :key='index'>
					<div class="order-item-header">
						<span style="line-height: 30px">
							订单号: {{item.order_no}}
							<br>
							创建时间: {{item.created_at}}	
						</span>
					</div>

					<van-card
						v-for='sub in item.orderDetails.data'
						:key='sub.id'
						:num="sub.num"
						:price="sub.price"
						:desc="sub.goods.description"
						:title="sub.goods.title"
						:thumb="sub.goods.cover_url"
					/>					
				</div>					
				</van-list>
			</van-pull-refresh>			
		</div>					
	</div>
</template>

<script>
	import NavBar from 'components/common/navbar/NavBar'
	import { reactive , onMounted , toRefs} from 'vue'
	import { getOrderList } from 'network/order'
	import {  useRouter} from 'vue-router'	
	export default{
		setup(){
			const router = useRouter()
			const state = reactive({
				list: [],
				loading: false,
				finished: false,
				refreshing: false,
				page:1,
				totalPage:0,
				status:0,
			});

			onMounted(()=>{
				onRefresh()
			})

			const loadData = ()=>{

				getOrderList({page:state.page , status:state.status ,include:'user,orderDetails.goods'}).then(res => {
						state.list = state.list.concat(res.data) 

						state.loading = false

						state.totalPage = res.meta.pagination.total_pages
						if (state.page >= state.totalPage) {
							state.finished = true
						}

						console.log(state.page);
						
				})
			}

			const onLoad = () => {
				if (!state.refreshing && state.page < state.totalPage) {
					state.page = state.page + 1
				}
				if (state.refreshing) {
					state.list = []
					state.refreshing = false
				}
				loadData()
			}
	
			const onRefresh = () => {
				// 是否处于加载状态，加载过程中不触发Load事件
				state.refreshing = true
				// 清空列表数据
				state.finished = false;

				// 重新加载数据
				// 将 loading 设置为 true，表示处于加载状态
				state.loading = true;

				state.page = 1
				onLoad();
			};		

			// tab 切换
			const onChangeTab = (name) => {
				state.status = name
				onRefresh()
			}

			const goTo = (id) => {
				router.push({path:'/orderdetail' ,query:{id}})
			}						
			return{
				...toRefs(state),
				onLoad,
				onRefresh,
				onChangeTab,
				goTo				
			}
		},
		components:{
			NavBar
		}			
	}
</script>

<style lang="less" scoped>
	.van-tabs{
		position: fixed;
		z-index: 10;
	}
	.my-order-box{
		margin-top:45px;
	}
	.order-item-box{
		margin-bottom: 20px;
		border-bottom: 1px solid #D0D0D0;
		.order-item-header{
			margin-top:50px;
			text-align: left;
			padding-left: 30px;
		}
	}
	.van-card {
		text-align: left
	}	
</style>