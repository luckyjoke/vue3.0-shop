<template>
	<div>
		<nav-bar>
			<template v-slot:default>我的订单</template>
		</nav-bar>
		<div class="item-box">
		<van-card
			@click = 'goTo(item.goods.id)'
			v-for= 'item in goods'
			:key='item.id'
			:price="item.goods.price"
			:desc="item.goods.description"
			:title="item.goods.title"
			:thumb="item.goods.cover_url"
		/>				
		</div>
	</div>
</template>

<script>
	import NavBar from 'components/common/navbar/NavBar'	
	import {  onMounted , reactive , toRefs} from 'vue'
	import { myCollection } from 'network/collection'
	import {  useRouter } from 'vue-router'
	export default{
		setup(){
			const router = useRouter()

			const state = reactive({
				goods:[]
			})

			const init = () => {
				myCollection().then(res=>{
					state.goods = res.data
				})				
			}

			onMounted( ()=>{
				init()
			})


			const goTo = (id) => {
				router.push({path:'/details' , query:{id}})
			}			
			return{
				...toRefs(state),
				goTo
			}
		},
		components:{
			NavBar
		}		
	}
</script>

<style lang="less" scoped>
	.item-box{
		margin-top: 50px;
	}
	.van-card {
		font-size: 16px;
	}	
</style>