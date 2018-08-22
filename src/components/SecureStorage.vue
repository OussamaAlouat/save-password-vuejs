<template>
    <div>
        <div v-if="isEmpty">
            <el-alert
                    title="There are not keys saved yet"
                    type="info"
                    show-icon
                    center="">
            </el-alert>
        </div>
        <div class="dropbox">
            <h1>Your passwords</h1>
            <div v-if="!isEmpty" class="table-box">
                <el-table
                        :data="keys"
                        style="width: 100%; text-align: center;"
                        header-align="center">
                    <el-table-column
                            label="Type"
                            align="center">
                        <template slot-scope="scope">
                            {{scope.row.type}}
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="Password"
                            align="center">
                        <template slot-scope="scope">
                            <template v-if="scope.row.visibility">
                                {{scope.row.password}}
                            </template>
                            <template v-else>
                                {{getAsterisks(scope.row.password)}}
                            </template>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="Logo"
                            align="center">
                        <template slot-scope="scope">
                            <img :src="getImg(scope.row.type)"/>
                        </template>
                    </el-table-column>
                    <el-table-column>
                        <template slot-scope="scope">
                            <el-button icon="el-icon-delete" type="danger" circle
                                       @click="removeKey(scope.row)"></el-button>
                        </template>
                    </el-table-column>
                    <el-table-column
                            width="180">
                        <template slot-scope="scope">
                            <el-button icon="el-icon-view" type="primary" circle
                                       @click="getView(scope.row)"></el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <el-row :glutter="12" justify="center" type="flex" style="margin-top: 1%;">
                <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="10">
                    <el-select v-model="type" size="small" style="width: 75%">
                        <el-option
                                v-for="item in types"
                                :key="item.label"
                                :label="item.label"
                                :value="item.label">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="6">
                    <el-input v-model="key" size="small" type="text" style="width: 75%">Insert your key here</el-input>
                </el-col>
            </el-row>
            <el-button @click="addKey()" style="margin-top: 2%; margin-bottom: 1%;" icon="el-icon-circle-plus">Add key
            </el-button>
        </div>

    </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'SecureStorage',
  computed: {
    ...mapGetters({
      keys: 'getKeys'
    }),
    isEmpty: function () {
      return this.keys.length === 0
    }
  },
  data: function () {
    return {
      visible: false,
      key: '',
      type: '',
      types: [
        {
          label: 'Twitter'
        },
        {
          label: 'Gmail'
        },
        {
          label: 'Facebook'
        },
        {
          label: 'Skype'
        },
        {
          label: 'Hot Mail'
        },
        {
          label: 'Instagram'
        }
      ],
      asterisk: []
    }
  },
  methods: {

    addKey: function () {
      if (this.key !== '') {
        this.$store.commit('setKey', {key: this.key, type: this.type})
        this.key = ''
        this.type = ''
      } else {
        this.$alert('No has introducido ninguna contraseña', 'Error', {
          confirmButtonText: 'OK',
          type: 'error'
        })
      }
    },
    removeKey: function (item) {
      this.$store.commit('removeKey', item)
    },
    getAsterisks: function (item) {
      let asterisk = ''
      for (let i = 0; i < item.length; i++) {
        asterisk += '*'
      }
      return asterisk
    },
    getView: function (item) {
      item.visibility = !item.visibility
    },
    getImg: function (type) {
      switch (type) {
        case 'Facebook':
          return '../assets/face.png'
        case 'Twitter':
          return '../assets/twit.png'
        case 'Gmail':
          return '../assets/gmail.png'
      }
    }
  }
}
</script>

<style scoped>
    .dropbox {
        outline: 2px dashed grey; /* the dash box */
        outline-offset: -10px;
        background: coral;
        color: dimgray;
        padding: 10px 10px;
        min-height: 200px; /* minimum height */
        position: relative;
        margin-left: 10%;
        margin-right: 10%;
    }

    .table-box {
        margin-left: 10% !important;
        margin-right: 10% !important;
    }
</style>
