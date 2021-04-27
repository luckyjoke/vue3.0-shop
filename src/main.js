import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'vant/lib/index.css';

import { Swipe, SwipeItem , Icon , Lazyload , Badge , Sidebar, SidebarItem ,Collapse, 
		CollapseItem, Tab, Tabs ,Card} from 'vant';
createApp(App)
	.use(Swipe).use(SwipeItem).use(Icon).use(Lazyload , {
		loading: require('assets/images/lazyImg.jpg')
	}).use(Badge).use(Sidebar).use(SidebarItem).use(Collapse).use(CollapseItem)
	.use(Tab).use(Tabs).use(Card)
	.use(store).use(router).mount('#app')
