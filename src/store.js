import Vue from 'vue'
import Vuex from 'vuex'
import { db } from '@/main'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    rows: [],
    loading: false,
    dbcol: {},
    conect: false
  },
  mutations: {
    setLoadedRows (state, payload) {
      state.rows = payload
    },
    setDbConnect (state) {
      state.connect = true
      state.dbcol = db.collection('data').doc('test').collection('rows')
    },
    setLoading (state, payload) {
      state.loading = payload
    }
  },
  actions: {
    loadRows ({ commit, state }) {
      commit('setLoading', true)
      if (!state.conect) commit('setDbConnect')
      state.dbcol.onSnapshot(snap => {
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
    deleteItem ({ state }, { id }) {
      state.dbcol.doc(id).delete()
    },
    addItem ({ state }, payload) {
      state.dbcol.add(payload)
    },
    editItem ({ state }, { item, id }) {
      state.dbcol.doc(id).set(item)
    }
  },
  getters: {
    rows (state) {
      return state.rows.sort((a, b) => new Date(a.data) - new Date(b.data))
    },
    loading (state) {
      return state.loading
    }
  }
})
