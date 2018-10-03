<template>
    <v-ons-page>
        <v-ons-toolbar>
            <div class="center">
                Update Password
            </div>
            <v-ons-back-button></v-ons-back-button>
        </v-ons-toolbar>
        <v-ons-card>
            <div>
                Password
            </div>
            <v-ons-input type="password"
                         v-model="password"></v-ons-input>
            <div class="text">
                Type of password
            </div>
            <v-ons-input placeholder="Facebook, twitter ..."
                         type="text"
                         v-model="type"></v-ons-input>
        </v-ons-card>
        <v-ons-button @click="updatePassword()">
            Update
        </v-ons-button>
    </v-ons-page>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: 'UpdatePassword',
  data () {
    return {
      password: '',
      type: ''
    }
  },
  computed: {
    ...mapGetters({
      'currentPassword': 'getPassword'
    })
  },
  methods: {
    start () {
      this.password = this.currentPassword.password
      this.type = this.currentPassword.type
    },
    updatePassword () {
      if (this.currentPassword.password === this.password && this.currentPassword.type === this.type) {
        console.log('errpr')
      }
    }
  },
  mounted () {
    this.start()
    console.log('called')
  }
}
</script>

<style scoped>

</style>
