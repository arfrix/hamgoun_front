import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import navigation from './components/global/bottomNavigation.vue'
import './registerServiceWorker'
import axios from 'axios'
// import socketio from 'socket.io'
// import VueSocketIO from 'vue-socket.io'

import './assets/styles/globalStyles.css'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

// Vue.use(new VueSocketIO({
//   debug: true,
//   connection: 'ws://193.176.241.61:3000/websocket',
//   vuex: {
//     store,
//     actionPrefix: 'SOCKET_',
//     mutationPrefix: 'SOCKET_'
//   }
// }))

Vue.component('navigation', navigation)

Vue.config.productionTip = false
Vue.prototype.$http = axios

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
