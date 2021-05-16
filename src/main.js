import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'vant/lib/index.css'
import 'animate.css/animate.min.css'
import { Swipe, SwipeItem , Icon , Lazyload , Badge , Sidebar, SidebarItem ,Collapse, 
		CollapseItem, Tab, Tabs , Card , Image as VanImage , Tag , Button , Form , 
		Field , Toast ,  Checkbox, CheckboxGroup , SwipeCell , Stepper , SubmitBar, 
		AddressEdit, AddressList , Popup , Grid ,  GridItem , List , PullRefresh } from 'vant';
createApp(App)
	.use(Swipe).use(SwipeItem).use(Icon).use(Lazyload , {
		loading: require('assets/images/lazyImg.jpg')
	}).use(Badge).use(Sidebar).use(SidebarItem).use(Collapse).use(CollapseItem)
	.use(Tab).use(Tabs).use(Card).use(VanImage).use(Tag).use(Button).use(Form)
	.use(Field).use(Toast).use(Checkbox).use(CheckboxGroup).use(SwipeCell).use(Stepper)
	.use(SubmitBar).use(AddressList).use(AddressEdit).use(Popup).use(Grid).use(GridItem)
	.use(List).use(PullRefresh)
	.use(store).use(router).mount('#app')
