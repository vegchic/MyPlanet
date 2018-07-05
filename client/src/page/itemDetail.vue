<template>
  <div class="container">
  <div>
    <el-row type="flex" justify="center">
      <gallery :type="chtype" v-on:imgChange="info.image=`${$event}.png`" :id="imgurl"></gallery>
      <!-- <el-col :span="6" class="col"> -->
        <el-form ref="detail" :model="info" :rules="rules" label-width="150px">
          <el-form-item label="名字" prop="name">
            <el-input v-model="info.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="类型" prop="category">
            <el-input v-model="chtype" auto-complete="off" readonly="true"></el-input>
          </el-form-item>
          <el-form-item label="类别" prop="category" v-if="info.category === 'galaxy'">
            <el-select v-model="info.type">
              <el-option value="" disabled>请选择</el-option>
              <el-option v-for="item in galaxiescatelog"
              :key="item.id"
              :value="item.text"
              >{{ item.text }}</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所属星系" v-if="info.category === 'star' || info.category === 'comet'" prop="fname">
            <el-select id="select" v-model="info.fname">
              <el-option value="（无主）">（无主）</el-option>
              <el-option v-for="item in fatherList"
                :key="item.id"
                :value="item.name"
              >{{ item.name }}</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所属恒星" v-if="info.category === 'planet'" prop="fname">
            <el-select id="select" v-model="info.fname">
              <el-option value="（无主）">（无主）</el-option>
              <el-option v-for="item in fatherList"
                :key="item.id"
                :value="item.name"
              >{{ item.name }}</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所属行星" v-if="info.category === 'satellite'" prop="fname">
            <el-select id="select" v-model="info.fname">
              <el-option value="（无主）">（无主）</el-option>
              <el-option v-for="item in fatherList"
                :key="item.id"
                :value="item.name"
              >{{ item.name }}</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="距离(光年)" prop="distance" v-if="distanceSeen">
            <el-input v-model="info.distance" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="周期(年)"
            prop="cycle" v-if="info.category === 'planet' || info.category === 'comet' || info.category === 'satellite'">
            <el-input v-model="info.cycle" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="质量(千吨)" prop="mass" v-if="info.category !== 'galaxy'">
            <el-input v-model="info.mass" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="重力(g)" prop="gravity" v-if="info.category === 'planet'">
            <el-input v-model="info.gravity" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="年龄（亿年）" prop="age" v-if="info.category === 'star' || info.category === 'planet'">
            <el-input v-model="info.age" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="直径（光年）" prop="diameter">
            <el-input v-model="info.diameter" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="特点" prop="feature">
            <el-input v-model="info.feature" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item>
              <el-button type="primary" @click="updateinfo">更新</el-button>
              <el-button @click="deleteinfo">删除</el-button>
          </el-form-item>
        </el-form>
      <!-- </el-col> -->
    </el-row>
  </div>
    <div id="surroundlist" v-if="seen">
      <h2>{{ describe }} </h2>
      <itemList :list="belonglist" :seen="true"></itemList>
    </div>
  </div>
</template>

<script>
import itemList from '../components/itemList';
import onfail from '../util/onfail';
import { genValidator } from '../util/validator';
import gallery from '../components/gallery';

const chinese = {
  'galaxy': '星系',
  'comet': '彗星',
  'star': '恒星',
  'planet': '行星',
  'satellite': '卫星',
}

export default {
  components: {
    itemList,
    gallery
  },
  name: 'itemDetail',
  data() {
    const checkName = genValidator('name', '名字');
    const checkAge = genValidator('number', '年龄');
    const checkMass = genValidator('number', '质量');
    const checkDiameter = genValidator('number', '直径');
    const checkDistance = genValidator('number', '距离');
    const checkCycle = genValidator('number', '周期');
    const checkGravity = genValidator('number', '重力');
    const checkFeature = genValidator('any', '特点', true);
    return {
      info: {
        name: '',
        type: '',
        category: '',
        distance: '',
        age: '',
        diameter: '',
        image: '0.png',
        cycle: '',
        gravity: '',
        mass: '',
        feature: '',
        fname: ''
      },
      galaxiescatelog: [
        {id: 1, text: '椭圆星系'},
        {id: 2, text: '螺旋星系'},
        {id: 3, text: '不规则星系'},
      ],
      fatherList: [],
      belonglist: [],
      rules: {
        name: [
          { validator: checkName, trigger: 'blur' }
        ],
        age: [
          { validator: checkAge, trigger: 'blur' }
        ],
        mass: [
          { validator: checkMass, trigger: 'blur' }
        ],
        distance: [
          { validator: checkDistance, trigger: 'blur' }
        ],
        diameter: [
          { validator: checkDiameter, trigger: 'blur' }
        ],
        feature: [
          { validator: checkFeature, trigger: 'blur' }
        ],
        cycle: [
          { validator: checkCycle, trigger: 'blur' }
        ],
        gravity: [
          { validator: checkGravity, trigger: 'blur' }
        ],
        fname: [
          {}
        ],
        type: [
          {}
        ],
        category: [
          {}
        ]
      }
    };
  },
  computed: {
    imgurl: function() {
      return parseInt(this.info.image[0]);
    },
    chtype: function() {
      return chinese[this.info.category];
    },
    describe: function() {
      if (this.info.category === 'galaxy') {
        return '该星系包含以下恒星：';
      } else if (this.info.category === 'star') {
        return '该恒星被以下行星所围绕:';
      } else if (this.info.category === 'planet') {
        return '该行星被以下卫星所围绕';
      }
      return '';
    },
    seen: function() {
      if (this.info.category !== 'comet' && this.info.category !== 'satellite') {
        return true;
      }
      return false;
    },
    distanceSeen() {
      return this.info.fname !== '（无主）' &&
            (this.info.category === 'planet' || this.info.category === 'satellite');
    },
    inforoute: function() {
      return this.$route.path;
    }
  },
  methods: {
    getInfo: function(url) {
      const paths =  url.split('/');
      let getroute = '/api' + url;
      let listroute = '';
      const self = this;
      if (paths[1] === 'galaxies') {
        listroute = '/api/stars?galaxy=' + paths[2];
      } else if (paths[1] === 'stars') {
        listroute = '/api/planets?star=' + paths[2];
      } else if (paths[1] === 'planets') {
        listroute = '/api/satellites?planet=' + paths[2];
      }
      const father = {
        galaxies: '',
        comets: 'galaxies',
        planets: 'stars',
        stars: 'galaxies',
        satellites: 'planets'
      }

      // 获取父级天体
      if (father[paths[1]]) {
        const furl = `/api/${father[paths[1]]}`;
        this.$axios.get(furl)
          .then(function (response) {
            if (response.data.status !== true) {
              onfail(self, response, `获取父级天体失败`);
              return;
            }
            self.fatherList = response.data.list;
          })
          .catch(error => console.log(error));
      }

      // 获得该元素
      this.$axios
        .get(getroute)
        .then(function(response) {
          if (!response.data.status) {
            onfail(self, response, '获取信息失败');
            if (response.data.err === '目标天体不存在') {
              self.$router.push(`/${paths[1]}`);
            }
          } else {
            if (!response.data.data.fname) response.data.data.fname = '（无主）';
            self.info = response.data.data;
          }
        })
        .catch(error => console.log(error));

      // 获得子元素
      if (listroute) {
        this.$axios
          .get(listroute)
          .then(function(response) {
            if (response.data.status !== true) {
              onfail(self, response, '获取子元素列表失败');
            } else {
              self.belonglist = response.data.list;
            }
          })
          .catch(error => console.log(error));
      }
    },
    deleteinfo: function() {
      let returnurl = '/' + this.inforoute.split('/')[1];
      let deleteroute = '/api' + this.inforoute;
      const self = this;
      this.$confirm('此操作将永久删除该天体, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).then(() => {
        return self.$axios.delete(deleteroute);
      }).then(function(response) {
        if (!response.data.status) {
          onfail(self, response, '删除失败');
        } else {
          self.$notify.success({
            title: '成功',
            message: '删除成功'
          });
        }
        self.$router.push(returnurl);
      })
      .catch(error => console.log(error));
    },
    updateinfo: async function() {
      let valid = await this.$refs.detail.validate().catch(()=>{});
      if (valid) {
        let apdateroute = '/api' + this.inforoute;
        const self = this;
        let info = { ...this.info };
        if (info.fname === '（无主）') info.fname = '';
        this.$axios
          .put(apdateroute, info)
          .then(response => {
            if (!response.data.status) {
              onfail(self, response, '更新失败');
            } else {
              self.$notify.success({
                title: '成功',
                message: '更新成功'
              });
            }
          })
          .catch(error => console.log(error));
      }
    },
  },
  mounted: function() {
    this.getInfo(this.$route.path);
  }
};
</script>

<style>
.container{
  margin: 20px 0;
}
.col {
  min-width: 300px;
}

.img {
  display: inline-block;
  height: 200px;
  max-width: 100%;
}
</style>
