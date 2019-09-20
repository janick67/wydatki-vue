import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import firebase from 'firebase'
import config from './config'

Vue.config.productionTip = false

firebase.initializeApp(config.firebaseConfig)

export const db = firebase.firestore()

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  created () {
    this.$store.dispatch('loadRows')
  }
}).$mount('#app')
