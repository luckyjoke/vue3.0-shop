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
	</div>
</template>

<script>
	import NavBar from 'components/common/navbar/NavBar'
	import { getDetail } from 'network/detail'
	import {  ref , onMounted , reactive , toRefs} from 'vue'
	import { useRoute } from 'vue-router'
	import { ImagePreview } from "vant";
	export default{
		setup(){
			const route = useRoute()
			const goodId = ref(0)
			goodId.value = route.query.id

			// 商品详情数据模型
			const book = reactive({
				detail:{},
				like_goods: []
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
				openImage
			}
		},
		components:{
			NavBar,
		}
	}
</script>

<style lang="less" scoped>
	.test{
		margin-top: 45px;
	}
</style>