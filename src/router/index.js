import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import SecureStorage from '@/components/SecureStorage'

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/secure-storage',
      name: 'SecureStorage',
      component: SecureStorage
    }
  ]
})
