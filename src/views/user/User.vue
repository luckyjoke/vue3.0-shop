<template>
	<nav-bar>
		<template v-slot:default>个人中心</template>
	</nav-bar>
	<div style="margin-top: 45px;">
		<van-button round block type="primary" @click='logOut'>
			退出			
		</van-button>
	</div>
</template>

<script>
	import { logout } from 'network/user'
	import { Toast } from 'vant';	
	import { useRouter } from 'vue-router'
	import { useStore } from 'vuex'
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

			return{
				logOut
			}
		},
		components:{
			NavBar
		}
	}
</script>