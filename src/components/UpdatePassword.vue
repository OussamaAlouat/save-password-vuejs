<template>
    <v-ons-page>
        <v-ons-toolbar>
            <div class="center">
                Update Password
            </div>
        </v-ons-toolbar>
        <v-ons-card>
            <div>
                Old password
            </div>
            <v-ons-input :type="getType()" class="textInput" readonly=""
                         v-model="currentPassword.password"></v-ons-input>
            <v-ons-button class="showButton" modifier="quiet"
                          @click="changeVisibilityPassword()">
                <v-ons-icon
                        :icon="getIcon()"
                        size="1.2rem, material:1rem">
                </v-ons-icon>
            </v-ons-button>

            <div>
                New password
            </div>
            <v-ons-input :type="getType()" class="textInput"
                         v-model="password"></v-ons-input>

            <div class="text">
                Old Type of password
            </div>
            <v-ons-input placeholder="Facebook, twitter ..." readonly=""
                         type="text"
                         v-model="currentPassword.type">
            </v-ons-input>

            <div class="text">
                New Type of password
            </div>
            <v-ons-input placeholder="Facebook, twitter ..."
                         type="text"
                         v-model="type">
            </v-ons-input>
        </v-ons-card>

        <v-ons-button @click="update()">
            Update
        </v-ons-button>
        <v-ons-button @click="cancel()" class="cancelButton">
            Cancel
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
    update () {
      if (this.checkUpdate()) {
        this.updatePassword({password: {password: this.password, type: this.type, visibility: false}})
        this.goBack()
      }
    },
    checkUpdate () {
      if (this.password === '' && this.type === '') {
        this.message = 'The new type and the new password are empty'
        this.toastVisibility = true
        return false
      } else {
        if (this.currentPassword.password === this.password && this.currentPassword.type === this.type) {
          this.message = 'The old password and the new password are the same'
          this.toastVisibility = true
          return false
        }
        return true
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
    },
    cancel () {
      this.goBack()
    }
  }
}
</script>
<style>
    .textInput {
        width: 13.5rem;
    }
    .showButton {
        background: white !important;
        background-color: white !important;
    }
    .cancelButton{
        margin-left: 2.5rem !important;
        background: red !important;
    }

</style>
