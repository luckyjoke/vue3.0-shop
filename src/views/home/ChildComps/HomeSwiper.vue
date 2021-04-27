<template>
	<div>
		<van-swipe v-if="slides.length" class="my-swipe" :height='177' :autoplay="3000" indicator-color="white">
			<van-swipe-item v-for='item in slides' :key='item.id'><img v-lazy="item.img_url" >
			</van-swipe-item>
		</van-swipe>		
	</div>
</template>

<script>
	// import { ref } from 'vue'
	export default{
		setup(){
		},
		props:{
			slides:{
				type:Array,
				default(){
					return []
				}
			}
		}		
	}
</script>

<style lang="less" scoped>
	.my-swipe .van-swipe-item {
		color: #fff;
		font-size: 20px;
		line-height: 150px;
		text-align: center;
		background-color: #39a9ed;
		img{
			width: 100%;
			height: 100%;
		}
	}
</style>