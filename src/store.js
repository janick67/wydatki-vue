import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import { db } from '@/main'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    rows: [],
    loading: false,
    dbcol: {},
    conect: false,
    user: null,
    error: null
  },
  mutations: {
    setLoadedRows (state, payload) {
      console.log(payload.length)
      state.rows = payload
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
      // firebase.database().ref('/data/janick67/rows').once('value').then((data) => {
      //   data.val().forEach(el => {
      //     db.collection('data').doc('cnV2G5NWARSPtQ0OBghdCRua90K3').collection('rows').add(el)
      //   })
      commit('setLoading', true)
      if (!state.conect) this.dispatch('setDbConnect')
      state.dbcol.orderBy('data', 'desc').onSnapshot(snap => {
        let items = []
        snap.forEach((doc) => {
          let obj = doc.data()
          obj.id = doc.id
          items.push(obj)
        })
        commit('setLoadedRows', items)
        commit('setLoading', false)
      })
    },
    setDbConnect ({ state }) {
      state.connect = true
      let user = 'test'
      if (state.user !== null && typeof state.user.id !== 'undefined') user = state.user.id
      state.dbcol = db.collection('data').doc(user).collection('rows')
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
    rows (state) {
      return state.rows.sort((a, b) => new Date(a.data) - new Date(b.data))
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
