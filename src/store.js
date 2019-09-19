import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    rows: [],
    loading: false
  },
  mutations: {
    setLoadedRows (state, payload) {
      state.rows = payload
    },
    setLoading (state, payload) {
      state.loading = payload
    },
    deleteRow (state,payload){
      
      console.log('mutation: ',payload);
      
    }
  },
  actions: {
    loadRows ({ commit }) {
      commit('setLoading', true)
      firebase.database().ref('/data/janick67/rows').once('value')
        .then((data) => {
          commit('setLoadedRows', data.val())
          commit('setLoading', false)
        })
        .catch(
          (error) => {
            commit('setLoading', false)
            console.log(error)
          }
        )
    },
    deleteRow ({commit},payload){
      commit('deleteRow',payload);
    }
  },
  getters: {
    rows (state) {
      return state.rows
    },
    loading (state) {
      return state.loading
    }
  }
})
