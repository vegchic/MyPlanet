<template>
  <div class="container">
  <div>
    <el-row type="flex" justify="center">
        <img :src="imgurl" class="img"/>
      <!-- <el-col :span="6" class="col"> -->
        <el-form ref="detail" :model="info" :rules="rules" label-width="150px">
          <el-form-item label="名字" prop="name">
            <el-input v-model="info.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="类型" prop="type">
            <el-input v-model="chtype" auto-complete="off" readonly="true"></el-input>
          </el-form-item>
          <el-form-item label="类别" prop="category" v-if="info.type='galaxy'">
            <el-input v-model="info.category" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="周期(年)"
            prop="cycle" v-if="info.type === 'planet' || info.type === 'comet' || info.type === 'satellite'">
            <el-input v-model="info.cycle" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="质量(千吨)" prop="mass" v-if="info.type !== 'galaxy'">
            <el-input v-model="info.mass" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="重力(g)" prop="gravity" v-if="info.type === 'planet'">
            <el-input v-model="info.gravity" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="年龄（亿年）" prop="age" v-if="info.type === 'star' || info.type === 'planet'">
            <el-input v-model="info.age" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="直径（千公里）">
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

const chinese = {
  'galaxies': '星系',
  'comets': '彗星',
  'stars': '恒星',
  'planets': '行星',
  'satellites': '卫星',
}

export default {
  components: {
    itemList
  },
  name: 'itemDetail',
  data() {
    return {
      info: {
        name: '',
        type: '',
        category: '',
        age: '',
        diameter: '',
        image: 'logo.png',
        cycle: '',
        gravity: '',
        mass: '',
        feature: '',
        fname: ''
      },
      belonglist: [
        { id: 17, name: 'aa', type: 'galaxy', diameter: 1.2, image: 'logo.png' },
        { id: 18, name: 'aa', type: 'asa', diameter: 1.2, image:'logo.png' },
        { id: 19, name: 'aa', type: 'asa', diameter: 1.2, image:'logo.png' },
        { id: 20, name: 'aa', type: 'asa', diameter: 1.2, image:'logo.png' },
        { id: 21, name: 'aa', type: 'asa', diameter: 1.2, image:'logo.png' }
      ],
      galaxiescatelog: [
        { id: 1, text: '11星系', name: 'galaxies' },
        { id: 2, text: '11彗星', name: 'comets' },
        { id: 3, text: '11恒星', name: 'stars' },
        { id: 4, text: '11行星', name: 'planets' },
        { id: 5, text: '11卫星', name: 'satellites' }
      ],
      rules: {

      }
    };
  },
  computed: {
    imgurl: function() {
      // '../assets/' + this.info.type + '/' + this.info.img
      console.log('../assets/' + this.info.image);
      console.log(this.$route.path);
      // return `../assets/${this.info.image}`;
      return '../../static/logo.png';
    },
    chtype: function() {
      return chinese[this.info.type];
    },
    describe: function() {
      if (this.info.type === 'galaxy') {
        return '该星系包含以下恒星：';
      } else if (this.info.type === 'star') {
        return '该恒星被以下行星所围绕:';
      } else if (this.info.type === 'planet') {
        return '该行星被以下卫星所围绕';
      }
    },
    seen: function() {
      if (this.info.type !== 'comet' && this.info.type !== 'satellite') {
        return true;
      }
      return false;
    },
    inforoute: function() {
      return this.$route.path;
    }
  },
  methods: {
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
        if (response.data.status !== true) {
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
    updateinfo: function() {
      if (false) {
        return;
      }
      let apdateroute = '/api' + this.inforoute;
      const self = this;
      this.$axios
        .put(apdateroute, this.info)
        .then(response => {
          if (response.data.status !== true) {
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
  mounted: function() {
    this.info.id = this.inforoute.split('/')[2];
    let getroute = '/api' + this.inforoute;
    let listroute = '';
    const self = this;
    if (self.info.type === 'galaxy') {
      listroute = '/api/stars?galaxy=' + self.info.id;
    } else if (self.info.type === 'star') {
      listroute = '/api/planets?star=' + self.info.id;
    } else if (self.info.type === 'planet') {
      listroute = '/api/satellites?planet=' + self.info.id;
    }
    this.$axios
      .get(getroute)
      .then(function(response) {
        if (response.data.status !== true) {
          onfail(self, response, '获取列表失败');
        } else {
          self.info = response.data.data;
        }
      })
      .catch(error => console.log(error));

      if (listroute) {
        this.$axios
          .get(listroute)
          .then(function(response) {
            if (response.data.status !== true) {
              onfail(self, response, '获取子元素列表失败');
            } else {
              self.belonglist = response.data.data;
            }
          })
          .catch(error => console.log(error));
      }
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
  height: 100%;
  max-width: 100%;
}
</style>
