<template>
    <v-ons-page>
        <v-ons-toolbar>
            <div class="center">
                Your passwords
            </div>
            <v-ons-back-button></v-ons-back-button>
        </v-ons-toolbar>
        <div v-if="isEmpty">
            <span class="button tag">
                There are not passwords
            </span>
        </div>
        <div v-else>
            <v-ons-list>
                <v-ons-list-item v-for="(password, index) in passwords" :key="index">
                    <div class="left" style="width: 10rem">
                        <span class="list-item__subtitle" style="line-height: 1.9rem !important;">
                            {{password.type}}
                        </span>
                        <span class="list-item__subtitle">
                        <v-ons-input :type="getType(password)" :value="password.password" readonly></v-ons-input>
                    </span>
                    </div>
                    <div class="center">
                        <v-ons-row>
                            <v-ons-col width="4rem">
                                <v-ons-button class="showButton" modifier="quiet"
                                              @click="changeVisibilityPassword(password)">
                                    <v-ons-icon
                                            :icon="getIcon(password)"
                                            size="1.2rem, material:1rem">
                                    </v-ons-icon>
                                </v-ons-button>
                            </v-ons-col>
                            <v-ons-col width="2rem">
                             <v-ons-button modifier="quiet" class="editButton"  @click="updatePassword(password)">
                                    <v-ons-icon
                                            icon="fa-pencil"
                                            size="1.1rem, material:1rem">
                                    </v-ons-icon>
                                </v-ons-button>
                            </v-ons-col>
                        </v-ons-row>
                    </div>
                    <div class="right">
                        <v-ons-button class="removeButton" modifier="quiet" @click="remove(password)">
                            <v-ons-icon
                                    icon="fa-trash"
                                    size="1.2rem, material:1.6rem">
                            </v-ons-icon>
                        </v-ons-button>
                    </div>
                </v-ons-list-item>
            </v-ons-list>
        </div>
        <v-ons-alert-dialog modifier="rowfooter"
                            :visible.sync="toastVisibility">
            {{message}}
            <template slot="footer">
                <v-ons-alert-dialog-button @click="toastVisibility = false">Cancel</v-ons-alert-dialog-button>
                <v-ons-alert-dialog-button @click="confirm()" >Ok</v-ons-alert-dialog-button>
            </template>
        </v-ons-alert-dialog>

        <v-ons-fab position='bottom right' @click="goToAddPassword()">
            <v-ons-icon icon="fa-plus"></v-ons-icon>
        </v-ons-fab>
    </v-ons-page>

</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import AddPassword from './AddPassword.vue'
import UpdatePassword from './UpdatePassword.vue'

export default {
  name: 'ListPasswords',
  data () {
    return {
      toastVisibility: false,
      message: 'The password will be delete, do you want continue?',
      passwordToRemove: {}
    }
  },
  computed: {
    ...mapGetters({
      'passwords': 'getPasswords'
    }),
    isEmpty () {
      return this.passwords.length === 0
    }
  },
  methods: {
    ...mapActions(['changeVisibility', 'removePassword', 'setCurrentPassword', 'pushPage']),
    getIcon (item) {
      if (item.visibility === true) {
        return 'fa-eye-slash'
      }
      return 'fa-eye'
    },
    changeVisibilityPassword (item) {
      this.changeVisibility({
        password: {
          type: item.type,
          password: item.password,
          visibility: !item.visibility,
          id: item.id
        }
      })
    },
    getType (item) {
      if (item.visibility === true) {
        return 'text'
      }
      return 'password'
    },
    goToAddPassword () {
      this.$emit('push-page', AddPassword)
    },
    remove (password) {
      this.passwordToRemove = Object.assign({}, password)
      this.showRemoveConfirmation()
    },
    updatePassword (password) {
      this.setCurrentPassword({password: password})
      this.pushPage({page: UpdatePassword})
    },
    showRemoveConfirmation () {
      this.toastVisibility = true
    },
    confirm () {
      this.removePassword({password: this.passwordToRemove})
      this.toastVisibility = false
    }

  }
}
</script>

<style scoped>
    .tag:active {
        background: darkgray;
        opacity: 1;
    }

    .tag {
        margin-top: 2rem;
        background: darkgray;
        width: 14rem;
        height: 6rem;
        line-height: 5rem;
    }

    .removeButton {
        color: red;
        background: white !important;
        background-color: white !important;
    }

    .showButton {
        background: white !important;
        background-color: white !important;
    }

    .editButton {
        background: white !important;
        background-color: white !important;
    }
    .toastButtons{
        margin-left: 0.5rem;
        margin-right: 0.5rem;
        color: black;
        background: darkgray;
        margin-top: 0.5rem;
        text-align: center;
    }
</style>
