<template>
	<div class="address-edit-box">
		<nav-bar>
			<template v-slot:default>{{title}}</template>
		</nav-bar>

		<van-address-edit
			:area-list="areaList"
			:address-info="addressInfo"
			:show-delete="type == 'edit'"
			show-set-default
			show-search-result
			:search-result="searchResult"
			:area-columns-placeholder="['请选择', '请选择', '请选择']"
			@save="onSave"
			@delete="onDelete"
		/>				
	</div>
</template>

<script>
	import NavBar from 'components/common/navbar/NavBar'
	import {  reactive , onMounted , toRefs , computed} from 'vue';
	import { areaList } from '@vant/area-data';
	import { addAddress , getAddressDetail , EditAddress , DeleteAddress } from 'network/address'
	import { Toast } from 'vant';
	import { useRouter , useRoute }  from 'vue-router'
	export default{
		setup() {
			const router = useRouter()
			const route = useRoute()
			const state = reactive({
				searchResult:[],
				addressInfo:{},
				type: 'add',
				addressId: '',
				title: ''
			})

			onMounted( ()=>{
				// 接受到url传过来的参数,来判断目的。是来增加新的地址还是更新地址。
				const {type , addressId} = route.query
				state.type = type
				state.addressId = addressId 

				if (type == 'edit') {
					//  初始化信息
					getAddressDetail(addressId).then( res => {
						const addressDetail = res
						state.addressInfo = {
							name: addressDetail.name, 
							tel: addressDetail.phone,
							province: addressDetail.province,
							city: addressDetail.city,
							county: addressDetail.county,
							areaCode: '110000',
							addressDetail: addressDetail.address,
							isDefault: !!addressDetail.is_default
						}
					})
				}
			})

			const title = computed( () => {
				return state.type == 'add' ? '新增地址' : '编辑地址'
			})

			// 点击保存触发的函数
			const onSave = (content) => {
				const params = {
					name: content.name,
					address: content.addressDetail,
					phone: content.tel,
					province: content.province,
					city: content.city,
					county: content.county,
					is_default: content.isDefault ? 1:0,
				}
				if (state.type == 'edit') {
					EditAddress(state.addressId , params).then( res => {
						if (res.status == 204) {
							Toast.success('更新成功')
							setTimeout( () => {
								router.back()
							} , 500)							
						}						
					})
				}else if(state.type == 'add'){
					addAddress(params).then( res => {
						if (res.status == 201) {
							Toast.success('保存成功')
							setTimeout( () => {
								router.back()
							} , 500)							
						}						
					})
				}


			}

			//  删除按钮
			const onDelete = () => {				
				DeleteAddress(state.addressId).then( res => {
					if (res.status == 204) {
						Toast.success('删除成功')
						setTimeout( () => {
							router.back()
						} , 1000)						
					}
				})
			}


			return {
				...toRefs(state),
				onSave,
				onDelete,
				areaList,
				title
			};
		},
		components:{
			NavBar
		}		
	}
</script>

<style lang="less" scoped>
	.address-edit-box{
		margin-top: 45px;
	}
</style>