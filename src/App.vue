<template>
  <div id="app">
    <v-ons-navigator
    :page-stack="pageStack"
    @push-page="pageStack.push($event)"
    ></v-ons-navigator>
  </div>
</template>

<script>
import {mapGetters, mapActions } from 'vuex'
import Home from './components/Home.vue'
export default {
  name: 'app',
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters({
      'pageStack': 'getPageStack'
    })

  },
  methods: {
    ...mapActions(['pushPage'])

  },
  created () {
    this.pushPage({page: Home})
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
