<template>
	<nav-bar>
		<template v-slot:default>个人中心</template>
	</nav-bar>
	<div>我的</div>
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