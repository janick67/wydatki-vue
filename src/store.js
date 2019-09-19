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
    deleteItem (state, { item, index }) {
      let same = true
      for (const el in state.rows[index]) {
        if (state.rows[index][el] != item[el]) same = false
      }
      if (same && index < state.rows.length && index >= 0) {
        state.rows.splice(index, 1)
      } else {
        console.warn('Nie udało się usunąć pozycji pierwszym sposobem')
        // state.rows = state.rows.filter(row => {
        // for(const el in row){
        //   if (row[el] != item[el]) return true
        // }
        // return false
        // })
      }
    },
    editItem (state, { item, index }) {
      console.log('mutation:', index, item, state.rows[index])
      state.rows[index] = item
    },
    addItem (state, payload) {
      state.rows.push(payload)
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
    deleteItem ({ commit }, payload) {
      commit('deleteItem', payload)
    },
    addItem ({ commit }, payload) {
      commit('addItem', payload)
    },
    editItem ({ commit }, payload) {
      console.log('action: ', payload)
      commit('editItem', payload)
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
