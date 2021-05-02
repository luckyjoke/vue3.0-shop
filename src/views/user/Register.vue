<template>
	<div>
		<nav-bar>
			<template v-slot:left></template>
			<template v-slot:default>用户注册</template>
			<template v-slot:right></template>
		</nav-bar>

		<div class="maxbox">
			<div class="centerbox">
				<h1>Sign up</h1>
				<van-form @submit="onSubmit">
					<van-field
						v-model="state.name"
						name="用户名"
						label="用户名"
						placeholder="用户名"
						:rules="[{ required: true, message: '请填写用户名' }]"
						/>
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
					<van-field
						v-model="state.password_confirmation"
						type="password"
						name="确认密码"
						label="确认密码"
						placeholder="确认密码"
						:rules="[{ required: true, message: '请确认密码' }]"
						/>
					<div style="margin: 16px;">
					<van-button round block type="primary" native-type="submit">
						提交
					</van-button>
					</div>
				</van-form>				
			</div>
		</div>	
	</div>
</template>

<script>
	import NavBar from 'components/common/navbar/NavBar'
	import { Notify } from 'vant'
	import { Toast } from 'vant';	
	import { register } from 'network/user'
	import { reactive } from 'vue'
	import { useRouter } from 'vue-router'
	export default{
		setup(){
			const router = useRouter()
			const state = reactive({
				name: '',
				email: '',
				password: '',
				password_confirmation: '',
			});
			const onSubmit = (values) => {
				console.log('submit', values);
				// 先验证 
				if (state.password != state.password_confirmation) {
					Notify({ type: 'warning', message: '两次密码不一致🤔' ,
					duration: 1000,});
				}else{
					// kkk111 , 321456 , 2314135@qq.com
					register(state).then(res=>{
						if (res.status == 201) {
							Toast.success('注册成功');

							setTimeout(()=>{
								router.push({path:'/login'})
							} , 1000)
						}

						state.password = ''
						state.password_confirmation = ''
					})
				}
			};
			return {
				state,
				onSubmit,
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
</style>