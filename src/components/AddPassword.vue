<template>
    <v-ons-page>
        <v-ons-toolbar>
            <div class="center">
                Add password
            </div>
            <v-ons-back-button></v-ons-back-button>
        </v-ons-toolbar>
        <v-ons-card>
            <div>
                Password
            </div>
            <v-ons-input placeholder="Input your password"
                         type="password"
            v-model="password"></v-ons-input>
            <div class="text">
                Type of password
            </div>
            <v-ons-input placeholder="Facebook, twitter ..."
                         type="text"
                         v-model="type"></v-ons-input>
        </v-ons-card>
        <v-ons-button @click="addPassword()">
            Save
        </v-ons-button>

    </v-ons-page>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

export default {
  name: 'AddPassword',
  data () {
    return {
      password: '',
      type: ''
    }
  },
  computed: {
    ...mapGetters({
      'types': 'getTypes'
    })
  },
  methods: {
    ...mapActions(['setPassword', 'goBack']),
    addPassword () {
      const pass = {type: this.type, password: this.password}
      this.setPassword({password: pass})
      this.goBack()
    }
  }
}
</script>

<style scoped>
    .text{
        margin-bottom: 1rem;;
    }

</style>
