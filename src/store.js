const store = {
    state: {
        url: 'https://camt-shopapi.pair-co.com',
        accessToken: null,
    },
    setUser(token) {
        this.state.accessToken = token
        localStorage.setItem('shopeeState', JSON.stringify(this.state))
    },
    logout() {
        this.state.accessToken = null
        localStorage.setItem('shopeeState', JSON.stringify(this.state))
    },
    initial() {
        const localStorageState = localStorage.getItem('shopeeState')
        if (localStorageState) {
            this.state = JSON.parse(localStorageState)
        }
    }
}

store.initial()

export default store