<template>
	<div class="nav-bar">
		<div class="left" @click='goback'><slot name='left'><i class="iconfont icon-zuojiantou"></i></slot></div>
		<div class="center"><slot></slot></div>
		<div class="right"><slot name='right'></slot></div>
	</div>
</template>

<script>
	import { useRouter } from 'vue-router'
	export default{
		setup(){
			const router = useRouter()
			// const route = useRoute()
			const goback = () => {
				router.go(-1)
			}

			return {
				goback
			}
		}
	}
</script>


<style lang="less" scoped>
	.nav-bar{
		display: flex;
		background-color: var(--color-tint);
		color:#FFFFFF;
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		z-index: 10;
		height: 45px;
		line-height: 45px;
		text-align: center;
		box-shadow: 0 2px 0px rgba(100,100,100,0.1)
	}

	.left, .right{
		width: 60px;
	}

	.center{
		flex:1;
		width: 50px;
	}

	i{
		font-size: 20px;
		font-weight: bold;
	}
</style>