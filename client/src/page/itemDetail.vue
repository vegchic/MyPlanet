<template>
  <div>
   <img :src="imgurl">
    <div id="info">
      <table>
        <tr>
          <td>名称</td>
          <td>
            <input type="text" v-model="info.name">
          </td>
          <td>
            <input type="text" class="Invalid first" :class="{second: ErrorClassActive.name}" value="不可为空" readonly="readonly"/>
          </td>
        </tr>
        <tr>
          <td>类型</td>
          <td>
            <input type="text" v-model="chtype" disabled="true">
          </td>
        </tr>
        <tr v-if="info.type === 'galaxy'">
          <td>类别</td>
          <td>
            <select id="select" v-model="info.catelog">
            <option disabled value="">请选择</option>
            <option v-for="item in galaxiescatelog"
              :key="item.id"
              :value="item.name"
              >{{ item.text }}</option>
            </select>
          </td>
        </tr>
        <tr v-if="info.type === 'planet' || info.type === 'comet' || info.type === 'satellite'">
          <td>周期(年)</td>
          <td>
            <input type="text"  v-model="info.cycle">
          </td>
          <td>
            <input type="text" class="Invalid first" :class="{second: ErrorClassActive.cycle}" value="请输入正确的正数" readonly="readonly"/>
          </td>
        </tr>
        <tr v-if="info.type != 'galaxy'">
          <td>质量(千吨)</td>
          <td>
            <input type="text"  v-model="info.mass">
          </td>
          <td>
            <input type="text" class="Invalid first" :class="{second: ErrorClassActive.mass}" value="请输入正确的正数" readonly="readonly"/>
          </td>
        </tr>
        <tr v-if="info.type === 'comet' || info.type === 'planet'">
          <td>重力(g)</td>
          <td>
            <input type="text"  v-model="info.gravity">
          </td>
          <td>
            <input type="text" class="Invalid first" :class="{second: ErrorClassActive.gravity}" value="请输入正确的正数" readonly="readonly"/>
          </td>
        </tr>
        <tr v-if="info.type === 'star' || info.type === 'planet'">
          <td>年龄(年)</td>
         <td>
            <input type="text"  v-model="info.age">
          </td>
          <td>
            <input type="text" class="Invalid first" :class="{second: ErrorClassActive.age}" value="请输入正确的正数" readonly="readonly"/>
          </td>
        </tr>
        <tr v-if="info.type != 'comet'">
          <td>直径(千米)</td>
          <td>
            <input type="text" v-model="info.diameter">
          </td>
          <td>
            <input type="text" class="Invalid first" :class="{second: ErrorClassActive.diameter}" value="请输入正确的正数" readonly="readonly"/>
          </td>
        </tr>
        <tr v-if="info.type != 'galaxy'">
          <td>特点</td>
          <td>
            <input type="text" v-model="info.feature">
          </td>
        </tr>
      </table>
    </div>
    <div id="buttonBox">
      <button @click="deleteinfo">删除</button>
      <button @click="updateinfo">更新</button>
    </div>
    <div id="surroundlist" v-if="seen">
      <span>{{ describe }} </span>
      <itemList :list="belonglist" :seen="true"></itemList>
    </div>
  </div>
</template>

<script>
import itemList from '../components/itemList'

export default {
  components: {
    itemList
  },
  name: 'itemDetail',
  data () {
    return {
      info: {'name': '', 'type': 'satellite', 'catelog': '', 'age': '', 'diameter': '', 'image': 'logo.png', 'cycle': '', 'gravity': '', 'mass': '', 'feature': '', 'fname': ''},
      type: [
        {'id': 1, 'text': '星系', 'name': 'galaxy'},
        {'id': 2, 'text': '彗星', 'name': 'comet'},
        {'id': 3, 'text': '恒星', 'name': 'star'},
        {'id': 4, 'text': '行星', 'name': 'planet'},
        {'id': 5, 'text': '卫星', 'name': 'satellite'}
      ],
      belonglist: [{'id': 17, 'name': 'aa', 'type': 'galaxy', 'diameter': 1.2},
        {'id': 18, 'name': 'aa', 'type': 'asa', 'diameter': 1.2},
        {'id': 19, 'name': 'aa', 'type': 'asa', 'diameter': 1.2},
        {'id': 20, 'name': 'aa', 'type': 'asa', 'diameter': 1.2},
        {'id': 21, 'name': 'aa', 'type': 'asa', 'diameter': 1.2}
      ],
      galaxiescatelog: [
        {'id': 1, 'text': '11星系', 'name': 'galaxies'},
        {'id': 2, 'text': '11彗星', 'name': 'comets'},
        {'id': 3, 'text': '11恒星', 'name': 'stars'},
        {'id': 4, 'text': '11行星', 'name': 'planets'},
        {'id': 5, 'text': '11卫星', 'name': 'satellites'}
      ],
      infoError: [0, 0, 0, 0, 0, 0],
      ErrorClassActive: {'name': false, 'cycle': false, 'mass': false, 'gravity': false, 'age': false, 'diameter': false}
    }
  },
  computed: {
    imgurl: function () {
      // '../assets/' + this.info.type + '/' + this.info.img
      console.log('../assets/' + this.info.image)
      console.log(this.$route.path)
      return require('../assets/' + this.info.image)
    },
    chtype: function () {
      for (var i = 0; i < this.type.length; ++i) {
        if (this.info.type === this.type[i].name) {
          return this.type[i].text
        }
      }
    },
    describe: function () {
      if (this.info.type === 'galaxy') {
        return '该星系所包括的恒星如下：'
      } else if (this.info.type === 'star') {
        return '该恒星被以下行星所围绕:'
      } else if (this.info.type === 'planet') {
        return '该行星被以下卫星所围绕'
      }
    },
    seen: function () {
      if (this.info.type === 'galaxy') {
        return true
      } else if (this.info.type === 'star') {
        return true
      } else if (this.info.type === 'planet') {
        return true
      } else {
        return false
      }
    },
    inforoute: function () {
      return this.$route.path
    }
  },
  methods: {
    deleteinfo: function () {
      var returnurl = '/' + this.inforoute.split('/')[1]
      // window.location.href = returnurl
      var deleteroute = '/api' + this.inforoute
      this.$axios.delete(deleteroute)
        .then(function (response) {
          window.location.href = returnurl
        })
        .catch(error => console.log(error))
    },
    allInfosRight: function () {
      this.checkinfo()
      for (var i = 0; i < 6; ++i) {
        if (this.infoError[i] === 1) {
          return false
        }
      }
      return true
    },
    checkinfo: function () {
      if (this.info.name === '') {
        this.infoError[0] = 1
        this.ErrorClassActive.name = true
      } else {
        this.infoError[0] = 0
        this.ErrorClassActive.name = false
      }
      if (this.info.type === 'planet' || this.info.type === 'comet' || this.info.type === 'satellite') {
        if (/^\d+(\.\d+)?$/.test(this.info.cycle)) {
          this.infoError[1] = 0
          this.ErrorClassActive.cycle = false
        } else {
          this.infoError[1] = 1
          this.ErrorClassActive.cycle = true
        }
      }
      if (this.info.type !== 'galaxy') {
        if (/^\d+(\.\d+)?$/.test(this.info.mass)) {
          this.infoError[2] = 0
          this.ErrorClassActive.mass = false
        } else {
          this.infoError[2] = 1
          this.ErrorClassActive.mass = true
        }
      }
      if (this.info.type === 'comet' || this.info.type === 'planet') {
        if (/^\d+(\.\d+)?$/.test(this.info.gravity)) {
          this.infoError[3] = 0
          this.ErrorClassActive.gravity = false
        } else {
          this.infoError[3] = 1
          this.ErrorClassActive.gravity = true
        }
      }
      if (this.info.type === 'star' || this.info.type === 'planet') {
        if (/^\d+(\.\d+)?$/.test(this.info.age)) {
          this.infoError[4] = 0
          this.ErrorClassActive.age = false
        } else {
          this.infoError[4] = 1
          this.ErrorClassActive.age = true
        }
      }
      if (this.info.type !== 'comet') {
        if (/^\d+(\.\d+)?$/.test(this.info.diameter)) {
          this.infoError[5] = 0
          this.ErrorClassActive.diameter = false
        } else {
          this.infoError[5] = 1
          this.ErrorClassActive.diameter = true
        }
      }
    },
    updateinfo: function () {
      if (!this.allInfosRight()) {
        return
      }
      var apdateroute = '/api' + this.inforoute
      this.$axios.put(apdateroute, this.info)
        .then(response => console.log(response))
        .catch(error => console.log(error))
    }
  },
  mounted: function () {
    var getroute = '/api' + this.inforoute
    var listroute = ''
    this.$axios.get(getroute)
      .then(function (response) {
        if (response.status === false) {
          window.location.href = '/login'
        }
        this.info = response.data
        if (this.info.type === 'galaxy') {
          listroute = '/api/stars?galaxy=' + this.info.id
        } else if (this.info.type === 'star') {
          listroute = '/api/planets?star=' + this.info.id
        } else if (this.info.type === 'planets') {
          listroute = '/api/satellites?planet=' + this.info.id
        }
        this.$axios.get(listroute)
          .then(function (response) {
            this.belonglist = response.list
          })
          .catch(error => console.log(error))
      })
      .catch(error => console.log(error))
  }
}
</script>

<style>
.Invalid
{
  color: red;
  width: 150px;
  border: none;
}

.first
{
  opacity: 0;
}
.second
{
  opacity: 1;
}

</style>
