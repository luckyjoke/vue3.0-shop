<template>
	<nav-bar>
		<template v-slot:default>购物车</template>
	</nav-bar>
	<div>购物车</div>
</template>

<script>
	import NavBar from 'components/common/navbar/NavBar'
	export default{
		setup(){

		},
		components:{
			NavBar
		}
	}
</script>