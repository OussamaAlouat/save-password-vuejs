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
                         v-model="password.password"></v-ons-input>
            <div class="text">
                Type of password
            </div>
            <v-ons-input placeholder="Facebook, twitter ..."
                         type="text"
                         v-model="password.type"></v-ons-input>
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
  computed: {
    ...mapGetters({
      'password': 'getPassword'
    })
  },
  methods: {
    updatePassword () {
    }
  }
}
</script>

<style scoped>

</style>
