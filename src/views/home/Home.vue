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
	</div>
</template>

<script>
	import NavBar from 'components/common/navbar/NavBar'
	import RecommendView from './ChildComps/RecommendView'
	import { onMounted , ref} from 'vue'
	import { getHomeAllDate } from 'network/home'	
	export default{
		setup(){
			const recommends = ref([])
			onMounted(()=>{
				getHomeAllDate().then(res => {
					recommends.value = res.goods.data
				})
			})


			return{
				recommends
			}
		},
		components:{
			NavBar,
			RecommendView
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