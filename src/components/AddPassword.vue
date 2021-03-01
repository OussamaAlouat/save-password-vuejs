<template>
  <v-ons-page>
    <v-ons-toolbar>
      <div class="center">Add password</div>
      <v-ons-back-button></v-ons-back-button>
    </v-ons-toolbar>
    <v-ons-card class="svpCard">
      <div>Password</div>
      <v-ons-input
        placeholder="Input your password"
        class="textInput"
        :type="getType()"
        v-model="password">
      </v-ons-input>
      <v-ons-button
        class="showButton"
        modifier="quiet"
        @click="changeVisibilityPassword()">
        <v-ons-icon
          :icon="getIcon()"
          size="1.2rem, material:1rem">
        </v-ons-icon>
      </v-ons-button>
      <div class="text">Type of password</div>
      <v-ons-input
        placeholder="Facebook, twitter ..."
        class="textInput"
        type="text"
        v-model="type">
      </v-ons-input>
    </v-ons-card>
    <v-ons-button class="br" @click="addPassword()">Save</v-ons-button>
    <v-ons-toast :visible.sync="toastVisibility" animation="ascend">{{message}}
      <button @click="toastVisibility = false">OK</button>
    </v-ons-toast>
  </v-ons-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import uuid from 'uuid/v4'
export default {
  name: 'AddPassword',
  data () {
    return {
      password: '',
      type: '',
      toastVisibility: false,
      message: '',
      isVisible: false
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
        const pass = { type: this.type, password: this.password }
        if (!this.isPresent(pass)) {
          this.setPassword({ password: { password: pass.password, type: pass.type, id: uuid() } })
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
    getType () {
      return this.isVisible ? 'text' : 'password'
    },
    getIcon () {
      return this.isVisible ? 'fa-eye-slash' : 'fa-eye'
    },
    changeVisibilityPassword () {
      this.isVisible = !this.isVisible
    }
  }
}
</script>

<style scoped>
  .text {
    margin-bottom: 1rem;
  }
  .textInput {
     width: 90%;
  }
  .showButton {
    background: white !important;
    background-color: white !important;
  }
  .svpCard {
    border-radius: 2rem;
    margin-left: 2rem;
    margin-right: 2rem;
  }
  .br{
    border-radius: 2rem;
  }
</style>
