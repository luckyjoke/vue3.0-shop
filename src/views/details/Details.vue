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
				<van-button  type="warning">加入购物车</van-button>
				<van-button type="danger">立即购买</van-button>
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
	import {  ref , onMounted , reactive , toRefs} from 'vue'
	import { useRoute } from 'vue-router'
	import { ImagePreview } from "vant";
	export default{
		setup(){
			const route = useRoute()
			const goodId = ref(0)
			let active = ref(0)
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


			})
			const openImage = (images) => {
				ImagePreview({
					images:[images],
					closeable:true
				})
			}

			return{
				goodId,
				...toRefs(book),
				openImage,
				active
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