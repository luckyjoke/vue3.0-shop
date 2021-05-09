<template>
	<nav-bar>
		<template v-slot:default>账户管理</template>
	</nav-bar>
	<div class="setting-box">
		<van-form @submit="onSubmit">
			<van-field
			v-model="state.name"
			name="新昵称"
			label="新昵称"
			placeholder="新昵称"
			:rules="[{ required: true, message: '请填写新昵称' }]"
			/>
		<div style="margin: 16px;">
			<van-button round block type="primary" native-type="submit">
				提交
			</van-button>
		</div>
		</van-form>		
	</div>	
</template>

<script>
	import NavBar from 'components/common/navbar/NavBar'
	import {userInfoSetting} from 'network/user'
	import { Notify } from 'vant'
	import { Dialog } from 'vant'
	import { Toast } from 'vant'	
	import {  reactive } from 'vue'
	import { useRouter } from 'vue-router'

	export default{
		setup() {
			const router = useRouter()			
			const state = reactive({
				name: '',
			});
			const onSubmit = () => {
				if (!state.name.trim().length) {
					state.name = ''
					Notify({ type: 'warning', message: '新昵称不能为空🤔' ,
					duration: 1000,});					
				}else{
					Dialog.confirm({
						message: '你确认修改为该昵称吗？',
					})
					.then(() => {
						userInfoSetting(state).then( res => {
							if (res.status == 204) {
								Toast.success('修改成功，返回个人中心');

								setTimeout(()=>{
									router.push({path:'/user'})
								} , 1000)								
							}

							state.name = ''
						})	
					})
					.catch(() => {
						state.name = ''
					});					
				
				}

			};

		return {
			state,
			onSubmit,
		}
		},
		components:{
			NavBar
		}
	}
</script>

<style lang="less" scoped>
	.setting-box{
		margin-top: 50px;
	}
</style>