import VueRouter from 'vue-router'
import Home from './components/Home'
import Home2 from './components/Home2'
import Login from './components/Login'
import LoginRegister from './components/LoginRegister'
import Myshop from './components/Myshop'
import Product from './components/Product'
import Myproduct from './components/Myproduct'
import Register from './components/Register'
import Shop from './components/Shop'

const routes = [
    { path: '/', component: Home },
    { path: '/shops', component: Home },
    { path: '/products', component: Home2 },
    { path: '/myproduct/:myproductId', component: Myproduct },
    { path: '/member', component: LoginRegister },
    { path: '/login', component: Login },
    { path: '/myshop/:myId', component: Myshop },
    { path: '/product/:productsId', component: Product },
    { path: '/register', component: Register },
    { path: '/shop/:shopsId', component: Shop },
]

export default new VueRouter({
    routes,
    mode: 'history',
})