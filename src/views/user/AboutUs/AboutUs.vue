<template>
	<nav-bar>
		<template v-slot:default>关于作者</template>
	</nav-bar>	
	<div class="about-box">
		<div class="content">
			<h2 class="animate__animated animate__backInLeft">🌈 关于作者</h2>
			<div class="animate__animated animate__backInUp">
				<h3 style="margin-top: 20px;">大三学生喜欢钻研技术，爱好运动剪辑</h3>
				<h3 style="margin-top: 20px;">梦想是环游世界🌏</h3>
				<h3 style="margin-top: 20px;">🈲项目仅供学习与交流</h3>
			</div>
			<div class="social-info animate__animated animate__backInUp">
				<span><a href="https://github.com/luckyjoke">Github |</a></span>
				<span><a href="https://gitee.com/luckyjoke"> Gitee  |</a></span>
				<span><a href="https://luckyjoke.gitee.io/"> 个人网站  |</a></span>
				<span><a href="https://juejin.cn/user/3966693685604951">  掘金  |</a></span>	
				<span>  📧zhangweiquan7@foxmail.com</span>						
			</div>

		</div>
		
	</div>
</template>

<script>
	import NavBar from 'components/common/navbar/NavBar'	
	export default{
		setup(){

			return{

			}
		},
		components:{
			NavBar
		}
	}
</script>

<style lang="less" scoped>
	.about-box{
		margin-top:45px;
		height: 100vh;
		width: 100%;
		background-color: #fff;
		.content{
			padding-top:30px;
			padding-left: 20px;
			color:#484848;
			text-align: left;
			.social-info{
				margin-top: 20px;
			}
		}

	}
</style>