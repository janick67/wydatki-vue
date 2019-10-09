import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import { db } from '@/main'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    transactions: [],
    loading: false,
    dbcol: {},
    conect: false,
    user: null,
    error: null
  },
  mutations: {
    setLoadedTransactions (state, payload) {
      console.log(payload.length)
      console.log(payload)
      state.transactions = payload
    },
    setUser (state, payload) {
      state.user = payload
      this.dispatch('loadRows')
    },
    setLoading (state, payload) {
      state.loading = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    clearError (state) {
      state.error = null
    }
  },
  actions: {
    loadRows ({ commit, state }) {

      commit('setLoading', true)
      
      fetch('/api/transactions').then(res=>res.json()).then((res)=>{
        // console.log(JSON.stringify(res)) //{"err":null,"res":array}
        commit('setLoadedTransactions', res.res)
        commit('setLoading', false)
      })
    },
    deleteItem ({ state }, { id }) {
      state.dbcol.doc(id).delete()
    },
    addItem ({ state }, payload) {
      state.dbcol.add(payload)
    },
    editItem ({ state }, { item, id }) {
      state.dbcol.doc(id).set(item)
    },
    signUserUp ({ commit }, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            const newUser = {
              id: user.uid,
              email: payload.email
            }
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          }
        )
    },
    signUserIn ({ commit }, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            const newUser = {
              id: user.uid,
              email: payload.email
            }
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          }
        )
    },
    autoSignIn ({ commit }, payload) {
      commit('setUser', { id: payload.uid, email: payload.email })
    },
    logout ({ commit }) {
      firebase.auth().signOut()
      commit('setUser', null)
    },
    clearError ({ commit }) {
      commit('clearError')
    }
  },

  getters: {
    transactions (state) {
      return state.transactions
    },
    user (state) {
      return state.user
    },
    loading (state) {
      return state.loading
    },
    error (state) {
      return state.error
    }
  }
})
