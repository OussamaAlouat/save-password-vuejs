import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    keys: [{
      password: '123456',
      type: 'Facebook',
      visibility: true,
      img: ''
    },
    {
      password: '12999',
      type: 'Gmail',
      visibility: true
    },
    {
      password: '12999',
      type: 'Gmail2',
      visibility: false
    }
    ],
    pageStack: [],
    types: ['Facebook', 'Gmail', 'Instagram']
  },
  mutations: {
    pushPage (state, page) {
      state.pageStack.push(page)
    },

    setKey (state, data) {
      Vue.set(state.keys, state.keys.length, {password: data.password, type: data.type, visibility: false})
    },
    removeKey (state, key) {
      const keys = state.keys.filter((val) => val.password !== key.password || val.type !== key.type)
      state.keys = keys.slice()
    },
    changeVisibility (state, password) {
      state.keys.forEach((val) => {
        if (val.type === password.type && val.password === password.password) {
          val.visibility = password.visibility
        }
      })
    },
    goBack (state) {
      state.pageStack.pop();
    }
  },
  getters: {
    getKeys (state) {
      return state.keys
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
    }
  }
})
