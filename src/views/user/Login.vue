<template>
	<div>
		<nav-bar>
			<template v-slot:left></template>
			<template v-slot:default>用户登录</template>
			<template v-slot:right></template>
		</nav-bar>

		<div class="maxbox">
			<div class="centerbox">
				<h1>Login In</h1>
				<van-form @submit="onSubmit">
					<van-field
						v-model="state.email"
						name="邮箱"
						label="邮箱"
						placeholder="邮箱"
						:rules="[{ required: true, message: '请填写邮箱' }]"
						/>
					<van-field
						v-model="state.password"
						type="password"
						name="密码"
						label="密码"
						placeholder="密码"
						:rules="[{ required: true, message: '请填写密码' }]"
						/>
					<div style="margin: 16px;">
						<div class="link-login" @click='router.push({path:"/register"})'>
							没有账号，立即注册
						</div>
						<van-button round block type="primary" native-type="submit">
							登录
						</van-button>
					</div>
				</van-form>				
			</div>
		</div>	
	</div>
</template>

<script>
	import NavBar from 'components/common/navbar/NavBar'
	// import { Notify } from 'vant'
	import { Toast } from 'vant';	
	import { login } from 'network/user'
	import { reactive } from 'vue'
	import { useRouter } from 'vue-router'
	export default{
		setup(){
			const router = useRouter()
			const state = reactive({
				email: '',
				password: '',
			});
			const onSubmit = () => {
				login(state).then(res => {
					window.localStorage.setItem('token' , res.access_token)
					Toast.success('登录成功')


					state.email = ''
					state.password = ''

					setTimeout(()=>{
						router.go(-1)	
					},500)
				})
			};

			return {
				state,
				onSubmit,
				router
			};
		},
		components:{
			NavBar
		}
	}
</script>

<style lang="less" scoped>
	.maxbox{
		margin-top:45px;
		.centerbox{
			padding-top:50px;
			text-align: center;
		}
	}
	.link-login{
		margin-bottom: 10px;
		color: var(--color-tint);
		font-size: var(--font-size);
	}
</style>