<template>
	<div class="address-box">
		<nav-bar>
			<template v-slot:default>地址管理</template>
		</nav-bar>

		<div v-show="list.length == 0 " style="margin-top:100px">
			还没有地址信息，去添加
		</div>

		<div class="address-item">
			<van-address-list
				v-model="chosenAddressId"
				:list="list"
				default-tag-text="默认"
				@add="onAdd"
				@edit="onEdit"
			/>			
		</div>		
	</div>
</template>

<script>
	import NavBar from 'components/common/navbar/NavBar'
	import { getAddressList } from 'network/address'
	import {reactive , toRefs , onMounted} from 'vue'
	import { useRouter} from 'vue-router'
	export default{
		setup(){
			const router = useRouter()
			const state = reactive({
				chosenAddressId: '1',
				list:[]
			})

			onMounted(()=>{
				// 一进入地址管理界面就从后台获取地址列表
				getAddressList().then(res=>{
					if (res.data.length == 0) {
						state.list = []
						return
					}
					state.list = res.data.map(item => {
						return {
							id: item.id ,
							name: item.name ,
							tel: item.phone ,
							address: `${item.province}${item.city}${item.county}${item.address}`,
							isDefault: item.is_default == 1 ? true : false
						}
					})
				})
			})

			//  点击新增地址按钮
			const onAdd = () => {
				router.push({path:'/addressedit' , query:{type:"add"}})
			}

			// 点击编辑地址小图标
			const onEdit = (item) => {
				router.push({path:'/addressedit' , query:{type:"edit" , addressId: item.id}})
			}

	

			return{
				...toRefs(state),
				onAdd,
				onEdit
			}			
		},
		components:{
			NavBar
		}		
	}
</script>

<style lang="less" scoped>
	.address-box{
		margin-top: 50px;
		height: 700px;
		overflow:scroll;
		.address-item{
			.van-radio__icon{
				display: none;
			}
		}
	}


</style>