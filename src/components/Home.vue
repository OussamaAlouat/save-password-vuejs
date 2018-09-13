<template>
    <v-ons-page>
        <v-ons-card >
            <img src="../assets/sec.jpg" alt="Onsen UI" style="width: 100%">

            <div class="title design">
                <h1>Wellcome to your first secure app</h1>
            </div>

        </v-ons-card>
                <el-button @click="goToSecure()">Enter</el-button>

    </v-ons-page>
</template>
<script>
import ListPasswords from './ListPasswords.vue'
export default {
  name: 'Home',
  methods: {
    goToSecure: function () {
      this.$emit('push-page', ListPasswords)
    }
  }
}

</script>
