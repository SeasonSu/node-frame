import Vue from 'Vue'
import VueRouter from 'vue-router'
const index = require('../components/index/index.vue')
const user = require('../components/user/user.vue')

Vue.use(VueRouter)

const routes = [
    {path:'/',name:'index',component:index},
    { path: '/home', component: index
    }
]
const router = new VueRouter({
  routes: routes
}); //这里可以带有路由器的配置参数


export default router; //将路由器导出
