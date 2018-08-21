import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    keys: []
  },
  mutations: {
    setKey (state, data) {
      Vue.set(state.keys, state.keys.length, {password: data.key, type: data.type, visibility: false})
    },
    removeKey (state, key) {
      const keys = state.keys.filter((val) => val.password !== key.password && val.type !== key.type)
      state.keys = keys.slice()
    }
  },
  getters: {
    getKeys (state) {
      return state.keys
    }
  }
})
