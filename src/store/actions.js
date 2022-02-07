export default {
  pushPage ({ commit }, { page }) {
    commit('pushPage', page)
  },
  changeVisibility ({ commit }, { password }) {
    commit('changeVisibility', password)
  },
  setPassword ({ commit }, { password }) {
    commit('setPassword', password)
  },
  goBack ({ commit }) {
    commit('goBack')
  },
  removePassword ({ commit }, { password }) {
    commit('removePassword', password)
  },
  setCurrentPassword ({ commit }, { password }) {
    commit('setCurrentPassword', password)
  },
  updatePassword ({ commit }, { password }) {
    commit('updatePassword', password)
  },
  save ({ commit }) {
    commit('save')
  },
  setAllPasswords ({ commit }) {
    commit('setAllPasswords')
  }
}
