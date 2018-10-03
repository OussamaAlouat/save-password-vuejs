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
        <v-ons-button @click="update()">
            Update
        </v-ons-button>
        <v-ons-toast
                :visible.sync="toastVisibility" animation="ascend">
            {{message}}
            <button @click="toastVisibility = false">OK</button>
        </v-ons-toast>

    </v-ons-page>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
export default {
  name: 'UpdatePassword',
  data () {
    return {
      password: '',
      type: '',
      toastVisibility: false,
      message: ''
    }
  },
  computed: {
    ...mapGetters({
      'currentPassword': 'getPassword'
    })
  },
  methods: {
    ...mapActions(['updatePassword', 'goBack']),
    start () {
      this.password = this.currentPassword.password
      this.type = this.currentPassword.type
    },
    update () {
      if (this.currentPassword.password === this.password && this.currentPassword.type === this.type) {
        this.message = 'The old password and the new password are the same'
        this.toastVisibility = true
      } else {
        this.updatePassword({password: {password: this.password, type: this.type, visibility: false}})
        this.goBack()
      }
    }
  },
  mounted () {
    this.start()
  }
}
</script>

<style scoped>

</style>
