<template>
	<div>
		<nav-bar>
			<template v-slot:left></template>
			<template v-slot:default>首页</template>
			<template v-slot:right></template>
		</nav-bar>

		<div class="banners">
		</div>

		<recommend-view :recommends='recommends'></recommend-view>

		<tab-control @tabClick='tabClick' :titles="['畅销','精选','新书']"></tab-control>	
		<GoodsList :goods='showGoods'></GoodsList>
		
	</div>
</template>

<script>
	import NavBar from 'components/common/navbar/NavBar'
	import RecommendView from './ChildComps/RecommendView'
	import TabControl from 'components/content/tabControl/TabControl'
	import GoodsList from 'components/content/goods/GoodsList'
	import { onMounted , ref , reactive , computed } from 'vue'
	import { getHomeAllDate , getHomeGoods} from 'network/home'	
	export default{
		setup(){
			const recommends = ref([])

			// 商品列表数据模型
			const goods = reactive({
				'sales': {page:0 , list:[]},
				'recommend': {page:0 , list:[]},
				'new': {page:0 , list:[]},
			})			
			const currentType = ref('sales')

			const tabClick = (index) => {
				const types = ['sales','recommend','new']
				currentType.value = types[index]
			}

			const showGoods = computed( ()=> {
				return goods[currentType.value]['list']
			}) 

			onMounted(()=>{
				//获取首页全部数据
				getHomeAllDate().then(res => {
					recommends.value = res.goods.data
				})

				// 获取首页畅销的图书数据
				getHomeGoods('sales').then(res => {
					goods['sales']['list'] = res.goods.data
				})
				// 获取首页推荐的图书数据
				getHomeGoods('recommend').then(res => {
					goods['recommend']['list'] = res.goods.data
				})
				// 获取首页最新的图书数据
				getHomeGoods('new').then(res => {
					goods['new']['list'] = res.goods.data
				})

			})



			return{
				recommends,
				tabClick,
				showGoods
			}
		},
		components:{
			NavBar,
			RecommendView,
			TabControl,
			GoodsList
		}
	}
</script>

<style lang='less' scoped>
	.banners{
		height: auto;
		width: 100%;
		margin-top: 45px;
		background-color: red;
		img{
			width: 100%;
			height: 250px;
		}
	}
</style>