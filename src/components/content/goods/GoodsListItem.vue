<template>
	<div class="goods-item" @click='itemClick(product.id)'>
			<img v-lazy="product.cover_url" alt="" >
			<div class="goods-info">
				<p>{{product.title}}</p>
				<span class="price"><small>¥</small>{{product.price}}</span>
				<span class="collect"><i class="iconfont icon-shoucang"></i>{{product.collects_count}}</span>		
			</div>
	</div>	
</template>

<script>
	import { useRouter } from 'vue-router'
	export default{
		props:{
			product:{
				type: Object,
				default(){
					return {}
				}
			}
		},
		setup(){
			const router = useRouter()
			const itemClick = (id) => {
				router.push({path:`/details`, query:{id}})
			}


			return{
				itemClick
			}
		}
	}
</script>

<style lang="less" scoped>
		.goods-item{
			width: 46%;
			padding-bottom: 30px;
			position: relative;
			img{
				width: 100%;
			}
			.goods-info{
				position: absolute;
				left: 0;
				right: 0;
				bottom: 5px;
				text-align: center;
				overflow: hidden;
				font-size: var(--font-size);
				p{
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
				.price{
					color: red;
					margin-right: 10px;
				}
				.collect{
					i{
						color: #F2A71B;
					}
				}
			}

		}
</style>