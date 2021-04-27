<template>
	<nav-bar>
		<template v-slot:default>商品分类</template>
	</nav-bar>

	<div class="minbox">
		<div class="ordertab">
			<van-tabs v-model="active">
				<van-tab title="销量排序"></van-tab>
				<van-tab title="价格排序"></van-tab>
				<van-tab title="评论排序"></van-tab>
			</van-tabs>			
		</div>


		<div class="leftmenu">
			<van-collapse v-model="menuactiveName" accordion>
				<van-collapse-item :title="item.name" :name="item.name" v-for='item in categories' :key='item.id'>
					<van-sidebar v-model="activeKey">
						<van-sidebar-item :title="second.name" v-for='second in item.children' :key='second.id' />
					</van-sidebar>					
				</van-collapse-item>
			</van-collapse>			
			
		</div>
		<div class="goodslist">
			<van-card
				num="2"
				price="2.00"
				desc="描述信息"
				title="商品标题"
				thumb="https://img01.yzcdn.cn/vant/ipad.jpeg"
			/>
		</div>
	</div>
</template>

<script>
	import NavBar from 'components/common/navbar/NavBar'
	import { getCategoryDate } from 'network/category'
	import { ref , onMounted} from 'vue'
	export default{
		setup(){
			const active = ref(2)
			const activeKey = ref(0)
			const menuactiveName = ref('1')


			const categories = ref([])
			onMounted(()=>{
				getCategoryDate().then( res=>{
					categories.value = res.categories
					console.log(res.categories)
				})
			})
			return{
				activeKey,
				categories,
				active,
				menuactiveName
			}
		},
		components:{
			NavBar
		}
	}
</script>

<style lang="less" scoped>
	.minbox{
		margin-top: 45px;
		.ordertab{
			width: 70%;
			height: 60px;
			position: fixed;
			margin-left:30% ;
		}
		.leftmenu{
			margin-top: 50px;
			width: 30%;
			height: 300px;
			position: fixed;
		}
		.goodslist{
			width: 70%;
			height: 100vh;
			float: right;
			margin-top:45px;
			position: fixed;
			margin-left:30% ;
		}
	}
</style>