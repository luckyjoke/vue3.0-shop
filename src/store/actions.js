import {getCartList} from 'network/cart'
const actions = {
	updateCart({commit} ) {
		getCartList().then(res => {
			commit('addCart' , {count:res.data.length || 0})
		})
	}

}

export default actions