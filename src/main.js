import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store'
import vuetify from './plugins/vuetify'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import config from './config'
import DateFilter from './filters/date'
import MoneyFilter from './filters/money'



Vue.filter('date', DateFilter)
Vue.filter('money', MoneyFilter)

firebase.initializeApp(config.firebaseConfig)

export const db = firebase.firestore()

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  created () {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
      }
    })
    this.$store.dispatch('loadRows')
  }
}).$mount('#app')
