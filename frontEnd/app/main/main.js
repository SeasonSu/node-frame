import Vue from 'Vue'
import VueRouter from 'vue-router'
Vue.config.debug = true;//开启错误提示
import App from '../components/app.vue'
import router from '../router/index'

// new Vue({
//   router,
//  // render: (h) => h(app)
// }).$mount('#app');
// new Vue({
//       el: '#app',
//     //  render: h => h(App),
//     router:router
// });

// router.start(App,'#app');
// new Vue({
//   router,
//  // render: (h) => h(app)
// }).$mount('#app');
//

new Vue({
  router,
  // store,
  template: '<App/>',
  components: {
    App
  }
}).$mount('#app')
