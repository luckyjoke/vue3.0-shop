<template>
	<div class="tab-control">
		<div class="tab-control-item" :class="{'active': index==clickIndex}" v-for='(item , index) in titles' :key='index' @click='getItemClick(index)'>
			<span>{{item}}</span>
		</div>			
	</div>
</template>

<script>
	import { ref } from 'vue'
	export default{
		setup(props , {emit}){
			let clickIndex = ref(0)

			const getItemClick = (currIndex) => {
				clickIndex.value = currIndex
				emit('tabClick' , currIndex)
			}

			return {
				clickIndex,
				getItemClick
			}
		},
		props:{
			titles:{
				type:Array,
				default(){
					return []
				}
			}
		}
	}
</script>

<style lang='less' scoped>
	.tab-control{
		width: 100%;
		height: 40px;
		background-color: #fff;
		line-height: 40px;
		display: flex;
		text-align: center;
		font-size: var(--font-size);		
		position: sticky;
		top:44px;
		z-index: 9;

	}
	.tab-control-item{
		flex:1
	}
	.active {
		color: var(--color-tint);
		span{
			padding: 4px;
			border-bottom : 3px var(--color-tint) solid
		}
	}

</style>