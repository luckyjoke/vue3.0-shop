const state = {
	user: {
		isLogin: window.localStorage.getItem('token') ? true : false,
	}
}

export default state