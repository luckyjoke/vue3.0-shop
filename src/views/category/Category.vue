<template>
<div>
	<nav-bar>
		<template v-slot:default>商品分类</template>
	</nav-bar>

	<div class="minbox">
		<div class="ordertab">
			<van-tabs v-model="active" @click='tabClick'>
				<van-tab title="销量排序"></van-tab>
				<van-tab title="价格排序"></van-tab>
				<van-tab title="评论排序"></van-tab>
			</van-tabs>			
		</div>


		<van-sidebar v-model="activeKey" class="leftmenu">	
			<van-collapse v-model="menuactiveName" accordion>
				<van-collapse-item :title="item.name" :name="item.name" v-for='item in categories' :key='item.id'>
					
						<van-sidebar-item :title="second.name" v-for='second in item.children' :key='second.id' @click='getGoodsByLmenu(second.id)'/>
									
				</van-collapse-item>
			</van-collapse>
		</van-sidebar>		
		<div class="goodslist">
			<div>
				<van-card
					v-for='item in showGoods'
					:key = 'item.name'
					tag='流行'
					:num="item.sales"
					:price="item.price"
					:desc="item.updated_at"
					:title="item.title"
					:thumb="item.cover_url"
					:lazy-load='true'
				/>				
			</div>
		</div>

		<back-top @bTop='bTop' v-show='isBackTop'></back-top>
	</div>
</div>
</template>

<script>
	import NavBar from 'components/common/navbar/NavBar'
	import BackTop from 'components/common/backtop/BackTop'	
	import { getCategoryDate , getCategoryGoods} from 'network/category'
	import { ref , onMounted , reactive , computed , watchEffect , nextTick} from 'vue'
	import BScroll from 'better-scroll' 

	export default{
		setup(){

			const active = ref(2)
			const activeKey = ref(0)
			const menuactiveName = ref('1')

			// 当前选择的排序方式
			const currentOrder = ref('sales')
			// 当前选择的分类类别
			const currentCid = ref(0)

			const categories = ref([])

			const isBackTop = ref(false)

			const goods = reactive({
				sales: { page:1 , list: []},
				price: { page:1 , list: []},
				comments_count: { page:1 , list: []}
			})

			// better-scroll 滑动对象
			let scroll = reactive({})

			const showGoods = computed(() => {
				return goods[currentOrder.value].list
			})

			const init = () => {
				getCategoryGoods('sales' ,currentCid.value).then(res => {
					goods['sales'].list = res.goods.data
				})
				getCategoryGoods('price' ,currentCid.value).then(res => {
					goods['price'].list = res.goods.data
				})
				getCategoryGoods('comments_count' ,currentCid.value).then(res => {
					goods['comments_count'].list = res.goods.data
				})

			}

			onMounted(()=>{
				getCategoryDate().then( res=>{
					categories.value = res.categories
				})

				getCategoryGoods('sales' ,currentCid.value).then(res => {
					goods['sales'].list = res.goods.data
				})

				scroll = new BScroll(document.querySelector('.goodslist'),{
					probeType: 3,
					click: true,
					pullUpLoad: true //上拉加载更多	
				});

				scroll.on('scroll',(pos)=>{
					isBackTop.value = (-pos.y) > 350
				})

				scroll.on('pullingUp' , ()=>{
					// 向上滑动获取商品数据
					const page = goods[currentOrder.value].page+1
					getCategoryGoods(currentOrder.value , currentCid.value , page).then(res => {
						goods[currentOrder.value].list.push(...res.goods.data)						
						goods[currentOrder.value].page += 1
					})

					
					scroll.finishPullUp()
					scroll.refresh()
				})									
			})
			watchEffect(()=>{
				nextTick(() => {
						scroll	&& scroll.refresh()
				})				
			})
			// 排序选项卡
			const tabClick = (index) => {

				let orders = ['sales' , 'price' , 'comments_count']
				currentOrder.value = orders[index]
				getCategoryGoods(currentOrder.value , currentCid.value).then(res => {
					goods[currentOrder.value].list = res.goods.data					
				})
				nextTick(() => {
					scroll	&& scroll.refresh()
				})	
				
			}

			//	通过点击左边分类菜单, 获取到具体的分类类别ID
			const getGoodsByLmenu = (id) => {
				currentCid.value = id
				init()
				console.log(goods)
				console.log(currentOrder.value)
				console.log(currentCid.value)				
			}

			const bTop = () => {
				scroll.scrollTo(0 , 0 ,500)
			}
			return{
				activeKey,
				categories,
				active,
				menuactiveName,
				tabClick,
				getGoodsByLmenu,
				currentOrder,
				currentCid,
				showGoods,
				scroll,
				isBackTop,
				bTop
			}
		},
		components:{
			NavBar,
			BackTop
		}
	}
</script>

<style lang="less" scoped>
	.minbox{
		margin-top: 44px;
		.ordertab{
			width: 70%;
			position: fixed;
			margin-left:30% ;
			z-index: 2;
		}
		.leftmenu{
			margin-top: 50px;
			width: 30%;
			position: fixed;
		}
		.goodslist{
			width: 70%;
			height: 100vh;
			float: right;
			margin-top:45px;
			position: fixed;
			margin-left: 30%;
			text-align: left;
		}
	}
</style>