import { createRouter, createWebHistory } from 'vue-router'
const Home = () => import ("views/home/Home")
const Category = () => import ("views/category/Category")
const ShopCart = () => import ("views/shopcart/ShopCart")
const User = () => import ("views/user/User")
const Details = () => import("views/details/Details")
const Register = () => import("views/user/Register")
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
			title: 'N7wQ-购物车'
		}		
	},
	{
		path: '/user',
		component: User,
		meta:{
			title: 'N7wQ-个人中心'
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

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(( to , from , next)=>{
	next()
	document.title = to.meta.title
})

export default router
