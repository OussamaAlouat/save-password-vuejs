import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    passwords: [],
    pageStack: [],
    types: ['Facebook', 'Gmail', 'Instagram'],
    currentPassword: {}
  },
  mutations: {
    pushPage (state, page) {
      state.pageStack.push(page)
    },

    setPassword (state, data) {
      Vue.set(state.passwords, state.passwords.length, {
        password: data.password,
        type: data.type,
        visibility: false,
        id: data.id
      })
    },
    removePassword (state, password) {
      const passwords = state.passwords.filter((val) => val.id !== password.id)
      state.passwords = passwords.slice()
    },
    changeVisibility (state, password) {
      state.passwords.forEach((val) => {
        if (val.id === password.id) {
          val.visibility = password.visibility
        }
      })
    },
    goBack (state) {
      state.pageStack.pop()
    },
    setCurrentPassword (state, password) {
      state.password = password
    }
    /*
    updatePassword (statte, password) {

    }
    */
  },
  getters: {
    getPasswords (state) {
      return state.passwords
    },
    getPageStack (state) {
      return state.pageStack
    },
    getTypes (state) {
      return state.types
    },
    getPassword (state) {
      return state.password
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
      commit('setPassword', password)
    },
    goBack ({commit}) {
      commit('goBack')
    },
    removePassword ({commit}, {password}) {
      commit('removePassword', password)
    },
    setCurrentPassword ({commit}, {password}) {
      commit('setCurrentPassword', password)
    },
    updatePassword ({commit}, {password}) {
      commit('updatePassword', password)
    }
  }
})
