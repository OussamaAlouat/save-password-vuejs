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
                    <div class="left">
                        <span class="list-item__title">{{password.type}}</span>
                        <span class="list-item__subtitle">
                        <v-ons-input :type="getType(password)" :value="password.password" readonly></v-ons-input>
                    </span></div>
                    <div class="center">

                        <v-ons-button modifier="quiet" @click="changeVisibilityPassword(password)">
                            <v-ons-icon
                                    :icon="getIcon(password)"
                                    size="32px, material:24px">
                            </v-ons-icon>
                        </v-ons-button>
                    </div>
                    <div class="right">

                        <v-ons-button modifier="quiet" @click="remove(password)" style="color: red;">
                            <v-ons-icon
                                    icon="fa-trash"
                                    size="32px, material:24px">
                            </v-ons-icon>
                        </v-ons-button>
                    </div>
                </v-ons-list-item>
            </v-ons-list>
        </div>
        <v-ons-fab position='bottom right' @click="goToAddPassword()">
            <v-ons-icon icon="fa-plus"></v-ons-icon>
        </v-ons-fab>
    </v-ons-page>

</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import AddPassword from './AddPassword.vue'

export default {
  name: 'ListPasswords',
  computed: {
    ...mapGetters({
      'passwords': 'getKeys'
    }),
    isEmpty () {
      return this.passwords.length === 0
    }
  },
  methods: {
    ...mapActions(['changeVisibility', 'removePassword']),
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
          visibility: !item.visibility
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
      this.removePassword({password: password})
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
</style>
