<template>
  <div>
   <img :src="img">
   <button @click="changeImg">换一张</button>
    <div id="info">
      <table>
        <tr>
          <td>名称</td>
          <td>
            <input type="text" @blur="checkInfo(0, iteminfo.name)" v-model="iteminfo.name">
          </td>
          <td>
            <input type="text" class="Invalid first" :class="{second: ErrorClassActive.name}" value="不可为空" readonly="readonly"/>
          </td>
        </tr>
        <tr>
          <td>类型</td>
          <td>
            <select id="select" v-model="type">
            <option disabled value="">请选择</option>
            <option v-for="item in alltype"
              :key="item.id"
              :value="item.name"
              >{{ item.text }}</option>
            </select>
          </td>
        </tr>
        <tr v-if="type === 'galaxies'">
          <td>类别</td>
          <td>
            <select id="select" v-model="iteminfo.catelog">
            <option disabled value="">请选择</option>
            <option v-for="item in galaxiescatelog"
              :key="item.id"
              :value="item.name"
              >{{ item.text }}</option>
            </select>
          </td>
        </tr>
        <tr v-if="type != 'galaxies'">
          <td>所属星系</td>
          <td>
            <select id="select" v-model="galaxybelong">
            <option disabled value="">请选择</option>
            <option v-for="item in galaxylist"
              :key="item.id"
              :value="item.name"
              >{{ item.name }}</option>
            </select>
          </td>
        </tr>
        <tr v-if="type === 'planets' || type === 'satellites'">
          <td>所属恒星</td>
          <td>
            <select id="select" v-model="starbelong">
            <option disabled value="">请选择</option>
            <option v-for="item in planetlist"
              :key="item.id"
              :value="item.name"
              >{{ item.name }}</option>
            </select>
          </td>
        </tr>
        <tr v-if="type === 'satellites'">
          <td>所属行星</td>
          <td>
            <select id="select" v-model="planetbelong">
            <option disabled value="">请选择</option>
            <option v-for="item in galaxylist"
              :key="item.id"
              :value="item.name"
              >{{ item.name }}</option>
            </select>
          </td>
        </tr>
        <tr  v-if="type === 'planets' || type === 'comets' || type === 'satellites'">
          <td>周期(年)</td>
          <td>
            <input type="text" @blur="checkInfo(1, iteminfo.cycle)" v-model="iteminfo.cycle">
          </td>
          <td>
            <input type="text" class="Invalid first" :class="{second: ErrorClassActive.cycle}" value="请输入正确的正数" readonly="readonly"/>
          </td>
        </tr>
        <tr v-if="type != 'galaxies'">
          <td>质量(千吨)</td>
          <td>
            <input type="text" @blur="checkInfo(2, iteminfo.mass)" v-model="iteminfo.mass">
          </td>
          <td>
            <input type="text" class="Invalid first" :class="{second: ErrorClassActive.mass}" value="请输入正确的正数" readonly="readonly"/>
          </td>
        </tr>
        <tr v-if="type === 'comets' || type === 'planets'">
          <td>重力(g)</td>
          <td>
            <input type="text" @blur="checkInfo(3, iteminfo.gravity)" v-model="iteminfo.gravity">
          </td>
          <td>
            <input type="text" class="Invalid first" :class="{second: ErrorClassActive.gravity}" value="请输入正确的正数" readonly="readonly"/>
          </td>
        </tr>
        <tr v-if="type === 'stars' || type === 'planets'">
          <td>年龄(年)</td>
         <td>
            <input type="text" @blur="checkInfo(4, iteminfo.age)" v-model="iteminfo.age">
          </td>
          <td>
            <input type="text" class="Invalid first" :class="{second: ErrorClassActive.age}" value="请输入正确的正数" readonly="readonly"/>
          </td>
        </tr>
        <tr v-if="type != 'comets'">
          <td>直径(千米)</td>
          <td>
            <input type="text" @blur="checkInfo(5, iteminfo.diameter)" v-model="iteminfo.diameter">
          </td>
          <td>
            <input type="text" class="Invalid first" :class="{second: ErrorClassActive.diameter}" value="请输入正确的正数" readonly="readonly"/>
          </td>
        </tr>
        <tr v-if="type != 'galaxies'">
          <td>特点</td>
          <td>
            <input type="text" v-model="iteminfo.feature">
          </td>
        </tr>
      </table>
    </div>
    <div id="buttonBox">
      <button @click="reset">重置</button>
      <button @click="add">添加</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'newItem',
  data () {
    return {
      alltype: [
        {'id': 1, 'text': '星系', 'name': 'galaxies'},
        {'id': 2, 'text': '彗星', 'name': 'comets'},
        {'id': 3, 'text': '恒星', 'name': 'stars'},
        {'id': 4, 'text': '行星', 'name': 'planets'},
        {'id': 5, 'text': '卫星', 'name': 'satellites'}
      ],
      galaxiescatelog: [
        {'id': 1, 'text': '11星系', 'name': 'galaxies'},
        {'id': 2, 'text': '11彗星', 'name': 'comets'},
        {'id': 3, 'text': '11恒星', 'name': 'stars'},
        {'id': 4, 'text': '11行星', 'name': 'planets'},
        {'id': 5, 'text': '11卫星', 'name': 'satellites'}
      ],
      type: 'galaxies',
      galaxybelong: '',
      starbelong: '',
      planetbelong: '',
      iteminfo: {'name': '', 'type': '', 'catelog': '', 'age': '', 'diameter': '', 'image': '', 'cycle': '', 'gravity': '', 'mass': '', 'feature': '', 'fname': ''},
      // 0:name, 1:cycle, 2:mass, 3:gravity, 4:age, 5:diameter
      infoError: [0, 0, 0, 0, 0, 0],
      ErrorClassActive: {'name': false, 'cycle': false, 'mass': false, 'gravity': false, 'age': false, 'diameter': false},
      galaxylist: [],
      starlist: [],
      planetlist: [],
      imglist: ['logo.png', 'nav_gv.png', 'touming.png'],
      imgitem: 0
    }
  },
  computed: {
    img: function () {
      return require('../assets/' + this.imglist[this.imgitem])
    }
  },
  mounted: function () {
    this.$axios.get('/api/galaxies')
      .then(function (response) {
        if (response.status === false) {
          window.location.href = '/login'
        }
        this.galaxylist = response.list
      })
      .catch(error => console.log(error))
  },
  watch: {
    galaxybelong: function (newg, oldg) {
      var addr = '/api/stars?galaxy=' + newg
      this.$axios.get(addr)
        .then(function (response) {
          this.starlist = response.list
        })
        .catch(error => console.log(error))
    },
    starbelong: function (news, olds) {
      var addr = '/api/planets?star=' + news
      this.$axios.get(addr)
        .then(function (response) {
          this.planetlist = response.list
        })
        .catch(error => console.log(error))
    },
    type: function (news, olds) {
      this.reset()
    }
  },
  methods: {
    reset: function () {
      this.iteminfo.name = ''
      this.iteminfo.age = ''
      this.iteminfo.diameter = ''
      this.iteminfo.image = ''
      this.iteminfo.cycle = ''
      this.iteminfo.gravity = ''
      this.iteminfo.mass = ''
      this.iteminfo.feature = ''
      this.iteminfo.fname = ''
      this.infoError = [0, 0, 0, 0, 0, 0]
      this.ErrorClassActive.name = false
      this.ErrorClassActive.age = false
      this.ErrorClassActive.diameter = false
      this.ErrorClassActive.cycle = false
      this.ErrorClassActive.gravity = false
      this.ErrorClassActive.mass = false
    },
    // 0:name, 1:cycle, 2:mass, 3:gravity, 4:age, 5:diameter
    checkInfo: function (index, str) {
      switch (index) {
        case 0:
          if (this.iteminfo.name === '') {
            this.infoError[0] = 1
            this.ErrorClassActive.name = true
          } else {
            this.infoError[0] = 0
            this.ErrorClassActive.name = false
          }
          break
        case 1:
          if (/^\d+(\.\d+)?$/.test(str)) {
            this.infoError[1] = 0
            this.ErrorClassActive.cycle = false
          } else {
            this.infoError[1] = 1
            this.ErrorClassActive.cycle = true
          }
          break
        case 2:
          if (/^\d+(\.\d+)?$/.test(str)) {
            this.infoError[2] = 0
            this.ErrorClassActive.mass = false
          } else {
            this.infoError[2] = 1
            this.ErrorClassActive.mass = true
          }
          break
        case 3:
          if (/^\d+(\.\d+)?$/.test(str)) {
            this.infoError[3] = 0
            this.ErrorClassActive.gravity = false
          } else {
            this.infoError[3] = 1
            this.ErrorClassActive.gravity = true
          }
          break
        case 4:
          if (/^\d+(\.\d+)?$/.test(str)) {
            this.infoError[4] = 0
            this.ErrorClassActive.age = false
          } else {
            this.infoError[4] = 1
            this.ErrorClassActive.age = true
          }
          break
        case 5:
          if (/^\d+(\.\d+)?$/.test(str)) {
            this.infoError[5] = 0
            this.ErrorClassActive.diameter = false
          } else {
            this.infoError[5] = 1
            this.ErrorClassActive.diameter = true
          }
          break
        default: break
      }
    },
    allInfosRight: function () {
      this.checkInfo(0, this.iteminfo.name)
      if (this.type === 'planets' || this.type === 'comets' || this.type === 'satellites') {
        this.checkInfo(1, this.iteminfo.cycle)
      }
      if (this.type !== 'galaxies') {
        this.checkInfo(2, this.iteminfo.mass)
      }
      if (this.type === 'comets' || this.type === 'planets') {
        this.checkInfo(3, this.iteminfo.gravity)
      }
      if (this.type === 'stars' || this.type === 'planets') {
        this.checkInfo(4, this.iteminfo.age)
      }
      if (this.type !== 'comet') {
        this.checkInfo(5, this.iteminfo.diameter)
      }
      for (var i = 0; i < 6; ++i) {
        if (this.infoError[i] === 1) {
          return false
        }
      }
      return true
    },
    add: function () {
      if (!this.allInfosRight()) {
        return
      }
      var addr = '/api/' + this.type
      if (this.type === 'galaxies') {
        this.iteminfo.type = 'galaxy'
      } else if (this.type === 'comets') {
        this.iteminfo.type = 'comet'
        this.iteminfo.fname = this.galaxybelong
      } else if (this.type === 'stars') {
        this.iteminfo.type = 'star'
        this.iteminfo.fname = this.galaxybelong
      } else if (this.type === 'planets') {
        this.iteminfo.type = 'planet'
        this.iteminfo.fname = this.starbelong
      } else {
        this.iteminfo.type = 'satellite'
        this.iteminfo.fname = this.planetbelong
      }
      this.iteminfo.image = this.imglist[this.imgitem]
      this.$axios.post(addr, this.iteminfo)
        .then(function (response) {
          if (response.status === 'false') {
            console.log('this name has esixted')
          } else {
            console.log('add successfully')
            window.location.href = '/' + this.type
          }
        })
        .catch(error => console.log(error))
    },
    changeImg: function () {
      if (this.imgitem < 2) {
        this.imgitem++
      } else {
        this.imgitem = 0
      }
    }
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
