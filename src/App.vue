<template>
    <div id="app">
        <v-ons-navigator
                :page-stack="pageStack"
                @push-page="pageStack.push($event)"
        ></v-ons-navigator>
    </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import ListPasswords from './components/ListPasswords.vue'

export default {
  name: 'app',
  computed: {
    ...mapGetters({
      'pageStack': 'getPageStack'
    })

  },
  methods: {
    ...mapActions(['pushPage', 'setAllPasswords'])
  },
  created () {
    this.pushPage({page: ListPasswords})
    this.setAllPasswords()
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
