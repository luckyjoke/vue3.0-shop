<template>
	<nav-bar>
		<template v-slot:left></template>
		<template v-slot:default>首页</template>
		<template v-slot:right></template>
	</nav-bar>
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