import Vue from 'vue'

export default {
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
    localStorage.removeItem('passwords')
    localStorage.setItem('passwords', JSON.stringify(state.passwords))
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
    if (password === undefined) {
      state.currentPassword = {}
    } else {
      state.currentPassword = password
    }
  },

  updatePassword (state, password) {
    if (password !== null && password !== undefined) {
      const copy = state.passwords.slice()
      state.passwords = copy.map((val) => {
        if (state.currentPassword.id === val.id) {
          val.password = password.password
          val.type = password.type
        }
    
        return val
      })

      localStorage.removeItem('passwords')
      localStorage.setItem('passwords', JSON.stringify(state.passwords))
    }
  },

  save (state) {
    localStorage.setItem('passwords', JSON.stringify(state.passwords))
  },

  setAllPasswords (state) {
    const data = JSON.parse(localStorage.getItem('passwords'))
    if (data !== null) state.passwords = data
  }
}
