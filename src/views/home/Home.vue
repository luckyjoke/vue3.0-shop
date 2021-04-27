<template>
	<div id="home">
		<nav-bar>
			<template v-slot:left></template>
			<template v-slot:default>首页</template>
			<template v-slot:right></template>
		</nav-bar>

		<tab-control v-show='isTabShow' @tabClick='tabClick' :titles="['畅销','精选','新书']	"></tab-control>

		<div class="wrapper">
			<div class="content">
				<div ref='tabRef'>
					<div class="banners">
						<home-swiper :slides='slides'></home-swiper>
					</div>
	
					<recommend-view :recommends='recommends'></recommend-view>
				</div>	
					<tab-control @tabClick='tabClick' :titles="['畅销','精选','新书']	"></tab-control>					

				<GoodsList :goods='showGoods'></GoodsList>
	
			</div>
		</div>
		
		<back-top @bTop='bTop' v-show='isBackTop'></back-top>
	</div>
</template>

<script>
	import NavBar from 'components/common/navbar/NavBar'
	import RecommendView from './ChildComps/RecommendView'
	import TabControl from 'components/content/tabControl/TabControl'
	import GoodsList from 'components/content/goods/GoodsList'
	import HomeSwiper from 'views/home/ChildComps/HomeSwiper'
	import BackTop from 'components/common/backtop/BackTop'
	import BScroll from 'better-scroll' 
	import { onMounted , ref , reactive , computed , nextTick , watchEffect} from 'vue'
	import { getHomeAllDate , getHomeGoods} from 'network/home'	

	export default{
		setup(){
			const slides = ref([])
			const recommends = ref([])

			// 商品列表数据模型
			const goods = reactive({
				'sales': {page: 1, list:[]},
				'recommend': {page: 1, list:[]},
				'new': {page: 1, list:[]},
			})			
			const currentType = ref('sales')


			const tabRef = ref(null)
			// 导航栏是否固定布尔值
			let isTabShow = ref(false)

			let isBackTop = ref(false)

			const showGoods = computed( ()=> {
				return goods[currentType.value]['list']
			}) 



			// better-scroll 滑动对象
			let scroll = reactive({})

			onMounted(()=>{
				//获取首页全部数据
				getHomeAllDate().then(res => {
					recommends.value = res.goods.data
					slides.value = res.slides
				})

				// 获取首页畅销的图书数据
				getHomeGoods('sales').then(res => {
					goods.sales.list = res.goods.data
				})
				// 获取首页推荐的图书数据
				getHomeGoods('recommend').then(res => {
					goods.recommend.list = res.goods.data
				})
				// 获取首页最新的图书数据
				getHomeGoods('new').then(res => {
					goods.new.list = res.goods.data
				})
				scroll = new BScroll(document.querySelector('.wrapper'),{
					probeType: 3,
					click: true,
					pullUpLoad: true //上拉加载更多	
				});

				//导航栏固定
				scroll.on('scroll',(pos)=>{
					isBackTop.value = isTabShow.value = (-pos.y) > tabRef.value.offsetHeight
				})

				// 监听向上滑动事件
				scroll.on('pullingUp' , ()=>{
					// 向上滑动获取商品数据
					const page = goods[currentType.value].page+1
					getHomeGoods(currentType.value , page).then(res => {
						goods[currentType.value].list.push(...res.goods.data)						
						goods[currentType.value].page += 1
					})

					
					scroll.finishPullUp()
					scroll.refresh()
				})


		
			})

			const tabClick = (index) => {
				const types = ['sales','recommend','new']
				currentType.value = types[index]
				nextTick(() => {
						scroll	&& scroll.refresh()
				})
			}

			watchEffect(()=>{
				nextTick(() => {
						scroll	&& scroll.refresh()
				})				
			})

			const bTop = () => {
				scroll.scrollTo(0 , 0 ,500)
			}

			return{
				recommends,
				tabClick,
				showGoods,
				tabRef,
				isTabShow,
				slides,
				bTop,
				isBackTop
			}
		},
		components:{
			NavBar,
			RecommendView,
			TabControl,
			GoodsList,
			HomeSwiper,
			BackTop
		}
	}
</script>

<style lang='less' scoped>
	#home{
		position: relative;
		height: 100vh;
	}
	.banners img{
		height: auto;
		width: 100%;
		margin-top: 45px;
	}
	.wrapper{
		position: absolute;
		width: 100%;
		left: 0;
		right: 0;
		top: 45px;
		bottom: 50px;
		overflow: hidden;
	}
</style>