<template>
    <div>
        <div class="dropbox">

            <h1>Wellcome to your first secure app</h1>
            <el-button @click="goToSecure()">Enter</el-button>
        </div>
    </div>
</template>
<script>
export default {
  name: 'Home',
  methods: {
    goToSecure: function () {
      this.$router.push('/secure-storage')
    }
  }
}

</script>
<style>
    .dropbox {
        outline: 2px dashed grey; /* the dash box */
        outline-offset: -10px;
        background: coral;
        color: dimgray;
        padding: 10px 10px;
        min-height: 200px; /* minimum height */
        position: relative;
    }
</style>
