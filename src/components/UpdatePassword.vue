<template>
  <v-ons-page>
    <v-ons-toolbar>
      <div class="center">Update Password</div>
    </v-ons-toolbar>
    <v-ons-card class="svpCard svpCardMargins">
      <div>Old password</div>
      <v-ons-input
        :type="getType()"
        class="textInput" readonly=""
        v-model="currentPassword.password">
      </v-ons-input>
      <v-ons-button
        class="btn"
        modifier="quiet"
        @click="changeVisibilityPassword()">
        <v-ons-icon
          :icon="getIcon()"
          size="1.2rem, material:1rem">
        </v-ons-icon>
      </v-ons-button>
      <div>New password</div>
      <v-ons-input
        :type="getType()"
        class="textInput"
        v-model="password">
      </v-ons-input>
      <div class="text">Type of password</div>
      <v-ons-input
        placeholder="Facebook, twitter ..."
        readonly=""
        type="text"
        v-model="currentPassword.type">
      </v-ons-input>
    </v-ons-card>
    <v-ons-button class="br" @click="update()">Update</v-ons-button>
    <v-ons-button @click="cancel()" class="cancelButton br">Cancel</v-ons-button>
    <v-ons-toast
      visible.sync="toastVisibility"
      animation="ascend">
        {{message}}
        <button @click="toastVisibility = false">OK</button>
    </v-ons-toast>
  </v-ons-page>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'UpdatePassword',
  data () {
    return {
      password: '',
      toastVisibility: false,
      message: '',
      isVisible: false
    }
  },
  computed: {
    ...mapGetters({
      'currentPassword': 'getPassword'
    })
  },
  methods: {
    ...mapActions(['updatePassword', 'goBack']),
    update () {
      if (this.checkUpdate()) {
        this.updatePassword({ password: { password: this.password, type: this.currentPassword.type, visibility: false } })
        this.goBack()
      }
    },
    checkUpdate () {
      if (this.password === '') {
        this.message = 'The new password is empty'
        this.toastVisibility = true
        return false
      }

      if (this.currentPassword.password === this.password) {
        this.message = 'The old password and the new password are the same'
        this.toastVisibility = true
        return false
      }

      return true
    },
    getType () {
      return this.isVisible ? 'text' : 'password'
    },
    changeVisibilityPassword () {
      this.isVisible = !this.isVisible
    },
    getIcon () {
      return this.isVisible ? 'fa-eye-slash' : 'fa-eye'
    },
    cancel () {
      this.goBack()
    }
  }
}
</script>
<style scoped>
  .textInput {
      width: 13.5rem;
  }

  .cancelButton{
    margin-left: 2.5rem !important;
    background: red !important;
  }
</style>
