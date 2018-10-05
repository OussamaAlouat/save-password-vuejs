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
  name: 'AddPassword',
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
      'types': 'getTypes',
      'passwords': 'getPasswords'
    })
  },
  methods: {
    ...mapActions(['setPassword', 'goBack', 'save', 'setAllPasswords']),
    addPassword () {
      if (this.password === '' || this.type === '') {
        if (this.password === '' && this.type === '') {
          this.message = 'The password and the type are empty!'
        } else {
          this.message = this.password === '' ? 'The password is empty' : 'The type is empty'
        }
        this.toastVisibility = true
      } else {
        const pass = {type: this.type, password: this.password}
        if (!this.isPresent(pass)) {
          this.setPassword({password: {password: pass.password, type: pass.type, id: this.getId()}})
          this.save()
          this.goBack()
        } else {
          this.message = 'This password is already present on your passwords list'
          this.toastVisibility = true
        }
      }
    },
    isPresent (password) {
      return this.passwords.filter((val) =>
        val.password === password.password &&
                val.type === password.type
      ).length > 0
    },
    getId () {
      const id = (Math.ceil(Math.random() * (Math.floor(Math.random() * 99999999999999999999) + 100000 +
          Math.ceil(Math.random() * Math.floor(Math.random() * 10000000000000)))))
      return this.passwords.filter((val) => val.id === id).length > 0 ? this.getId() : id
    }
  }
}
</script>

<style scoped>
    .text{
        margin-bottom: 1rem;;
    }

</style>
