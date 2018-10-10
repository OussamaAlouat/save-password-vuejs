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
                Old password
            </div>
            <v-ons-input :type="getType()" class="textInput"
                         v-model="password"></v-ons-input>
            <v-ons-button class="showButton" modifier="quiet"
                          @click="changeVisibilityPassword()">
                <v-ons-icon
                        :icon="getIcon()"
                        size="1.2rem, material:1rem">
                </v-ons-icon>
            </v-ons-button>
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
/****
     * Hay que añadir el oldPassword y newPassword, para diferenciar entre la nueva y la vieja
     */
import {mapGetters, mapActions} from 'vuex'
export default {
  name: 'UpdatePassword',
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
    },
    getType () {
      return this.isVisible ? 'text' : 'password'
    },
    changeVisibilityPassword () {
      this.isVisible = !this.isVisible
    },
    getIcon () {
      return this.isVisible ? 'fa-eye-slash' : 'fa-eye'
    }
  },
  mounted () {
    this.start()
  }
}
</script>
<style>
    .textInput {
        width: 13rem;
    }
    .showButton {
        background: white !important;
        background-color: white !important;
    }

</style>
