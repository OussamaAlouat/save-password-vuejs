import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    passwords: [],
    pageStack: [],
    types: ['Facebook', 'Gmail', 'Instagram']
  },
  mutations: {
    pushPage (state, page) {
      state.pageStack.push(page)
    },

    setKey (state, data) {
      Vue.set(state.passwords, state.passwords.length, {password: data.password, type: data.type, visibility: false})
    },
    removePassword (state, key) {
      const passwords = state.passwords.filter((val) => val.password !== key.password || val.type !== key.type)
      state.passwords = passwords.slice()
    },
    changeVisibility (state, password) {
      state.passwords.forEach((val) => {
        if (val.type === password.type && val.password === password.password) {
          val.visibility = password.visibility
        }
      })
    },
    goBack (state) {
      state.pageStack.pop()
    }
  },
  getters: {
    getKeys (state) {
      return state.passwords
    },
    getPageStack (state) {
      return state.pageStack
    },
    getTypes (state) {
      return state.types
    }
  },
  actions: {
    pushPage ({commit}, {page}) {
      commit('pushPage', page)
    },
    changeVisibility ({commit}, {password}) {
      commit('changeVisibility', password)
    },
    setPassword ({commit}, {password}) {
      commit('setKey', password)
    },
    goBack ({commit}) {
      commit('goBack')
    },
    removePassword ({commit}, {password}) {
      commit('removePassword', password)
    }
  }
})
