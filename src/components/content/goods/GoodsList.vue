<template>
	<div class="goods">
		<goods-list-item v-for='item in goods' :key='item' :product='item'></goods-list-item>
	</div>
</template>

<script>
	import GoodsListItem from 'components/content/goods/GoodsListItem'
	export default{
		setup(){

		},
		props:{
			goods:{
				type: Array,
				default() {
					return []
				}
			}
		},
		components:{
			GoodsListItem
		}
	}
</script>

<style lang="less" scoped>
	.goods{
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
		padding: 5px;
	}
</style>