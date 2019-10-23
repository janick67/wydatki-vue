import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    transactions: [],
    loading: false,
    allOptions: null
    // user: null,
    // error: null
  },
  mutations: {
    setLoadedTransactions (state, payload) {
      state.transactions = payload
    },
    setLoadedAllOptions (state, payload) {
      state.allOptions = payload
    },
    // setUser (state, payload) {
    //   state.user = payload
    //   this.dispatch('loadRows')
    // },
    setLoading (state, payload) {
      state.loading = payload
    }
    // setError (state, payload) {
    //   state.error = payload
    // },
    // clearError (state) {
    //   state.error = null
    // }
  },
  actions: {
    loadRows ({ commit }) {
      commit('setLoading', true)
      fetch('/api/transactions').then(res => res.json()).then((res) => {
        commit('setLoadedTransactions', res.res)
        commit('setLoading', false)
      })
    },
    loadAllOptions ({ commit }) {
      commit('setLoading', true)
      fetch('/api/allOptions').then(res => res.json()).then((res) => {
        commit('setLoadedAllOptions', res.res)
        commit('setLoading', false)
        console.log(res.res)
      })
    }
    // signUserUp ({ commit }, payload) {
    //   commit('setLoading', true)
    //   commit('clearError')
    //   firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
    //     .then(
    //       user => {
    //         commit('setLoading', false)
    //         const newUser = {
    //           id: user.uid,
    //           email: payload.email
    //         }
    //         commit('setUser', newUser)
    //       }
    //     )
    //     .catch(
    //       error => {
    //         commit('setLoading', false)
    //         commit('setError', error)
    //         console.log(error)
    //       }
    //     )
    // },
    // signUserIn ({ commit }, payload) {
    //   commit('setLoading', true)
    //   commit('clearError')
    //   firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
    //     .then(
    //       user => {
    //         commit('setLoading', false)
    //         const newUser = {
    //           id: user.uid,
    //           email: payload.email
    //         }
    //         commit('setUser', newUser)
    //       }
    //     )
    //     .catch(
    //       error => {
    //         commit('setLoading', false)
    //         commit('setError', error)
    //         console.log(error)
    //       }
    //     )
    // },
    // autoSignIn ({ commit }, payload) {
    //   commit('setUser', { id: payload.uid, email: payload.email })
    // },
    // logout ({ commit }) {
    //   firebase.auth().signOut()
    //   commit('setUser', null)
    // },
    // clearError ({ commit }) {
    //   commit('clearError')
    // }
  },

  getters: {
    transactions (state) {
      return state.transactions
    },
    // user (state) {
    //   return state.user
    // },
    allOptions (state) {
      return state.allOptions
    },
    loading (state) {
      return state.loading
    },
    error (state) {
      return state.error
    }
  }
})
