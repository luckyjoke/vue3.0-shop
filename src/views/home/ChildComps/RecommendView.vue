<template>
	<div class="recommend">
		<div class="recommend-item" v-for='item in recommends.slice(0,4)' :key='item.id'>
			<a href="" @click.prevent = 'goD(item.id)'>
				<img v-lazy="item.cover_url">
				<div>{{item.title}}</div>
			</a>			
		</div>
	</div>
</template>

<script>
	import { useRouter } from 'vue-router'
	export default{
		setup(){
			const router = useRouter()
			const goD = (id) => {
				router.push({path:'/details' , query:{id}})
			}

			return {
				goD
			}
		},
		props:{
			recommends:{
				type: Array,
				default(){
					return [];
				}
			}
		}
	}
</script>

<style lang='less' scoped>
	.recommend{
		width: 100%;
		display: flex;
		text-align: center;
		padding: 15px 0px 30px;
		border-bottom: 8px #EEE solid;
		font-size: 12px;
	}

	.recommend-item{
		flex:1;
		img{
			width: 	80px;
			height: 80px;
			margin-bottom: 10px;
		}
	}
</style>