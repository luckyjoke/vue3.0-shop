<template>
	<div class="backtop" @click='backtop'>
		<van-icon name="upgrade" color='#F25C05' size="35" />
	</div>
</template>

<script>
	export default{
		setup(props , {emit}){
			const backtop = () =>{
				emit('bTop')
			}


			return{
				backtop
			}
		}
	}
</script>

<style lang="less" scoped>
	.backtop{
		width: 35px;
		height: 35px;
		position: fixed;
		bottom: 80px;
		right: 30px;
		background-color: #FFFFFF;
		border-radius: 50%;
		box-shadow: 5px  5px 5px #D0D0D0;
		z-index: 20;
	}
</style>