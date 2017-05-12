import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import food from 'components/food/food'
import home from 'components/home/home'
import list from 'components/list/list'
import detail from 'components/detail/detail'

import vueTap from 'v-tap'
import fastclick from 'fastclick'
import Vuex from 'vuex'

Vue.use(vueTap)
Vue.use(VueRouter)
Vue.use(Vuex)

const router = new VueRouter({
    routes: [{
        path: '/',
        component: list
    },{
        path: '/detail',
        component: detail
    },
    ]
})

new Vue({
  router,
  // store,
  template: '<App/>',
  components: {
    App
  },
  data: {
    eventHub: new Vue()
  }
}).$mount('#app')
