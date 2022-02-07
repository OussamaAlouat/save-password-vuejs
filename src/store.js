import Vue from 'vue'
import Vuex from 'vuex'
import actions from './store/actions'
import getters from './store/getters'
import mutations from './store/mutations'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    passwords: [],
    pageStack: [],
    types: ['Facebook', 'Gmail', 'Instagram'],
    currentPassword: {}
  },
  mutations: {
    ...mutations
  },
  getters: {
    ...getters
  },
  actions: {
    ...actions
  }
})
