<template>
	<nav-bar>
		<template v-slot:default>个人中心</template>
	</nav-bar>
	<div class="user-box">
		<div class="user-info">
			<div class="info">
				<img  :src='info.avatar_url'>
				<div class="user-desc">
					<span>昵称： {{info.name}}</span>
					<span>登录名字： {{info.email}}</span>
					<span class="name">个性签名： 帅就完事了</span>
				</div>
			</div>
		</div>

		<ul class="user-list">
			<li class="van-hairline--bottom" @click='goTo("/collect")'>
				<span>我的收藏</span>
				<van-icon name='arrow' />
			</li>
			<li class="van-hairline--bottom" @click='goTo("/order")'>
				<span>我的订单</span>
				<van-icon name='arrow' />
			</li>
			<li class="van-hairline--bottom" @click='goTo("/setting")'>
				<span>账号管理</span>
				<van-icon name='arrow' />
			</li>
			<li class="van-hairline--bottom" @click='goTo("/address")'>
				<span>地址管理</span>
				<van-icon name='arrow' />
			</li>
			<li class="van-hairline--bottom" @click='goTo("/about")'>
				<span>关于我们</span>
				<van-icon name='arrow' />
			</li>
		</ul>
	</div>
	<div style="margin-top: 45px;">
		<button class="outbtn" @click='logOut'>退出登录</button>
		<br>
	</div>
</template>

<script>
	import { logout , userDetails} from 'network/user'
	import { Toast } from 'vant';	
	import { useRouter } from 'vue-router'
	import { useStore } from 'vuex'
	import { onMounted , reactive , toRefs} from 'vue'
	import NavBar from 'components/common/navbar/NavBar'
	export default{
		setup(){
			const router = useRouter()
			const store = useStore()
			const logOut = () => {
				logout().then( res => {
					if (res.status == 204) {
						Toast.success('退出成功')
						window.localStorage.setItem('token' , '')
						store.commit('setIsLogin' , false)

						setTimeout(()=>{
							router.push({path:'/login'})	
						},500)
					}
				})
			}

			// 用户信息数据详情
			let userInfo = reactive({
				info:{}
			}) 

			const init = () => {
				userDetails().then(res=>{
					userInfo.info = res
				})
			}
			onMounted(()=>{
				init()
			})


			const goTo = ( path , query) => {
				router.push({path , query: query || {}})
			}
			return{
				logOut,
				userInfo,
				...toRefs(userInfo),
				goTo
			}
		},
		components:{
			NavBar
		}
	}
</script>

<style lang='less' scoped>
	.user-box{
		width: 100%;
		height: auto;
		margin-top: 65px;
		.user-info{
			padding: 10px;
			border-radius: 10px;
			margin: 10px;
			background: linear-gradient(45deg, #7135F2, #05DBF2);
			box-shadow: 0 2px 5px #F2B29B;
			.info{
				display: flex;
				width: 100%;
				height: 100%;
				padding: 25px 20px;
				img{
					width: 80px;
					height: 80px;
					border-radius: 50%;
				}
				.user-desc{
					color: #fff;
					font-size: 14px;
					margin-left: 10px;
					line-height: 20px;
					display: flex;
					flex-direction: column;
					justify-content: space-around;
					align-items: flex-start;
					span{
						padding: 2px 0;
					}
				}			
			}

		}
		.user-list{
			padding: 0 8px;
			margin-top: 40px;
			li{
				padding-left:5px;
				padding-right: 5px;
				height: 40px;
				line-height: 40px;
				display: flex;
				justify-content: space-between;
				font-size: 14px;
				.van-icon-arrow{
					margin-top: 13px;
				}
				margin: 20px 0 !important;
				background: #FFFFFF;
				border-radius: 3px;
			}
		}
	}
	.outbtn{
		width: 250px;
		height: 50px;
		border-radius: 20px;
		border:1px solid white;
		background:linear-gradient(to right, #ff6034, #ee0a24);
		color:#FFFFFF
	}	
</style>