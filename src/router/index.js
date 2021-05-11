import { createRouter, createWebHistory } from 'vue-router'
const Home = () => import ("views/home/Home")
const Category = () => import ("views/category/Category")
const ShopCart = () => import ("views/shopcart/ShopCart")
const User = () => import ("views/user/User")
const Details = () => import("views/details/Details")
const Register = () => import("views/user/Register")
const Login = () => import("views/user/Login")
const AccountSetting = () => import("views/user/UserSetting/AccountSetting")
const Address = () => import("views/user/Address/Address")
const AddressEdit = () => import("views/user/Address/AddressEdit")
import store from '../store'
import { Notify } from 'vant'

const routes = [
	{
		path: '',
		component: Home,
		meta:{
			title: 'N7wQ-首页'
		}
	},
	{
		path: '/',
		component: Home,
		meta:{
			title: 'N7wQ-首页'
		}		
	},
	{
		path: '/home',
		component: Home,
		meta:{
			title: 'N7wQ-首页'
		}		
	},	
	{
		path: '/category',
		component: Category,
		meta:{
			title: 'N7wQ-商品分类'
		}		
	},
	{
		path: '/shopcart',
		component: ShopCart,
		meta:{
			title: 'N7wQ-购物车',
			isAuthRequired: true,
		}		
	},
	{
		path: '/user',
		component: User,
		meta:{
			title: 'N7wQ-个人中心',
			isAuthRequired: true,			
		}		
	},
	{
		path: '/details',
		component: Details,
		meta:{
			title: 'N7wQ-商品详情'
		}		
	},
	{
		path: '/register',
		component: Register,
		meta:{
			title: 'N7wQ-用户注册'
		}		
	},
	{
		path: '/login',
		component: Login,
		meta:{
			title: 'N7wQ-用户登录'
		}		
	},
	{
		path: '/setting',
		component: AccountSetting,
		meta:{
			title: 'N7wQ-账户管理',
			isAuthRequired: true,
		}		
	},
	{
		path: '/address',
		component: Address,
		meta:{
			title: 'N7wQ-地址管理',
			isAuthRequired: true,
		}		
	},
	{
		path: '/addressedit',
		component: AddressEdit,
		meta:{
			title: 'N7wQ-编辑地址',
			isAuthRequired: true,
		}		
	},					

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(( to , from , next)=>{
	if (to.meta.isAuthRequired && store.state.user.isLogin == false) {
		Notify({ type: 'warning', message: '请先登录🤔' ,
		duration: 1000,});
		return next('/login')
	}
	else{
		next()		
	}
	document.title = to.meta.title
})

export default router
