<template>
	<div>
		<nav-bar>
			<template v-slot:default>商品详情</template>
		</nav-bar>

		<van-image style='margin-top: 45px'
			width="100%"
			lazy-load
			:src="detail.cover_url"
			@click = 'openImage(detail.cover_url)'
		/>
		<van-card
			style='text-align: left;'
			:num="detail.stock"
			:price="detail.price"
			:desc="detail.description"
			:title="detail.title"
		>
			<template #tags>
				<van-tag plain type="danger">畅销</van-tag>
				<van-tag plain type="danger">新书</van-tag>
			</template>
			<template #footer>
				<van-button  type="warning" v-show='showCollect' @click='collectionGoods'>取消收藏</van-button>				
				<van-button  type="warning" v-show='!showCollect' @click='collectionGoods'>收藏</van-button>				
				<van-button  type="warning" @click='handleAddCart'>加入购物车</van-button>
				<van-button type="danger" @click='goToCart'>立即购买</van-button>
			</template>
		</van-card>
		<van-tabs v-model:active="active">
			<van-tab title="概述">
				<div v-html='detail.details'></div>
			</van-tab>
			<van-tab title="热评">
				<div>
					<h3>暂无评论～～</h3>
				</div>
			</van-tab>
			<van-tab title="相关图书">
				<GoodsList :goods='like_goods'></GoodsList>
			</van-tab>
		</van-tabs>
	</div>
</template>

<script>
	import NavBar from 'components/common/navbar/NavBar'
	import GoodsList from 'components/content/goods/GoodsList'	
	import { getDetail } from 'network/detail'
	import { collectionWithCancel , myCollection } from 'network/collection'
	import {  ref , onMounted , reactive , toRefs } from 'vue'
	import { useRoute , useRouter} from 'vue-router'
	import { ImagePreview } from "vant"
	import {  addCart } from 'network/cart'
	import { Toast } from 'vant'
	import { useStore} from 'vuex'
	export default{
		setup(){
			const route = useRoute()
			const router = useRouter()
			const goodId = ref(0)
			const store = useStore()
			let active = ref(0)
			const showCollect = ref(false)
			goodId.value = route.query.id

			// 商品详情数据模型
			const book = reactive({
				detail:{},
				like_goods: [],
			})
			onMounted(()=>{

				getDetail(goodId.value).then(res => {
					book.detail = res.goods
					book.like_goods = res.like_goods
				})

				myCollection().then(res=> {
					res.data.forEach(item => {
						if (item.goods_id == book.detail.id) {
							showCollect.value = !showCollect.value
						}
					})
				})


			})
			const openImage = (images) => {
				ImagePreview({
					images:[images],
					closeable:true
				})
			}

			// 加入购物车 点击事件
			const handleAddCart = () => {
				addCart({
					goods_id: book.detail.id,
					num: 1
				}).then(res => {
					if (res.status == 201 || res.status == 204) {
						Toast.success('添加购物车成功')
						store.dispatch('updateCart')
					}
				})
				// console.log(book.detail)
			}
			// 立即购买 点击事件
			const goToCart = () => {
				addCart({
					goods_id: book.detail.id,
					num: 1
				}).then(res => {
					if (res.status == 201 || res.status == 204) {
						Toast.success('添加购物车成功，前往购物车界面')

						store.dispatch('updateCart')
						setTimeout(()=>{
							router.push({path:'/shopcart'})	
						},500)
					}
				})				
			}

			// 收藏 点击事件
			const collectionGoods = () => {
				collectionWithCancel(book.detail.id).then(res=>{
					if (res.status == 201) {
						Toast('收藏成功')
					}else{
						Toast('取消收藏成功')
					}
					showCollect.value = !showCollect.value
				})
			}
			return{
				goodId,
				...toRefs(book),
				openImage,
				active,
				handleAddCart,
				goToCart,
				collectionGoods,
				showCollect
			}
		},
		components:{
			NavBar,
			GoodsList
		}
	}
</script>

<style lang="less" scoped>
	.test{
		margin-top: 45px;
	}
</style>