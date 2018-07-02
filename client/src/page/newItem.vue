<template>
  <div class="container">
    <el-row type="flex" justify="center">
      <el-carousel arrow="always" :autoplay="false" class="carousel">
        <el-carousel-item v-for="item in imglist" :key="item" class="center" @change="changeImg">
          <img :src="img">
        </el-carousel-item>
      </el-carousel>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :span="4">
        <el-form :model="iteminfo" ref="item" :rules="rules">
          <el-form-item label="名称" prop="name">
            <el-tooltip class="item" effect="dark" content="长度1~17" placement="right">
              <el-input v-model="iteminfo.name" auto-complete="off"></el-input>
            </el-tooltip>
          </el-form-item>
          <el-form-item label="类型" prop="category">
            <el-select v-model="iteminfo.category" placeholder="请选择">
              <el-option disabled value="">请选择</el-option>
              <el-option v-for="item in alltype"
              :key="item.id"
              :value="item.text"
              >{{ item.text }}</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="类别" v-if="iteminfo.category === '星系'" prop="type">
            <el-select v-model="iteminfo.type" placeholder="请选择">
              <el-option value="" disabled>请选择</el-option>
              <el-option v-for="item in galaxiescatelog"
              :key="item.id"
              :value="item.text"
              >{{ item.text }}</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所属星系" v-if="iteminfo.category === '恒星' || iteminfo.category === '彗星'" prop="fname">
            <el-select id="select" v-model="galaxybelong">
              <el-option value="（无主）">（无主）</el-option>
              <el-option v-for="item in galaxylist"
                :key="item.id"
                :value="item.name"
              >{{ item.name }}</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所属恒星" v-if="iteminfo.category === '行星'" prop="fname">
            <el-select id="select" v-model="galaxybelong">
              <el-option value="（无主）">（无主）</el-option>
              <el-option v-for="item in starlist"
                :key="item.id"
                :value="item.name"
              >{{ item.name }}</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所属行星" v-if="iteminfo.category === '卫星'" prop="fname">
            <el-select id="select" v-model="galaxybelong">
              <el-option value="（无主）">（无主）</el-option>
              <el-option v-for="item in planetlist"
                :key="item.id"
                :value="item.name"
              >{{ item.name }}</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="周期（年）" v-if="iteminfo.category === '行星' || iteminfo.category === '彗星' || iteminfo.type === '卫星'" prop="cycle">
            <el-tooltip class="item" effect="dark" content="最大为5位数字" placement="right">
              <el-input v-model.number="iteminfo.cycle" auto-complete="off"></el-input>
            </el-tooltip>
          </el-form-item>
          <el-form-item label="质量（千吨）" v-if="iteminfo.category !== '星系'" prop="mass">
            <el-tooltip class="item" effect="dark" content="最大为5位数字" placement="right">
              <el-input v-model.number="iteminfo.mass" auto-complete="off"></el-input>
            </el-tooltip>
          </el-form-item>
          <el-form-item label="重力（g）" v-if="iteminfo.category === '行星'" prop="gravity">
            <el-tooltip class="item" effect="dark" content="最大为5位数字" placement="right">
              <el-input v-model.number="iteminfo.gravity" auto-complete="off"></el-input>
            </el-tooltip>
          </el-form-item>
          <el-form-item label="年龄（亿年）" v-if="iteminfo.category === '恒星' || iteminfo.category === '行星'" prop="age">
            <el-tooltip class="item" effect="dark" content="最大为5位数字" placement="right">
              <el-input v-model.number="iteminfo.age" auto-complete="off"></el-input>
            </el-tooltip>
          </el-form-item>
          <el-form-item label="直径（千公里）" prop="diameter">
            <el-tooltip class="item" effect="dark" content="最大为5位数字" placement="right">
              <el-input v-model.number="iteminfo.diameter" auto-complete="off"></el-input>
            </el-tooltip>
          </el-form-item>
          <el-form-item label="特点" v-if="iteminfo.category !== '星系'" prop="feature">
            <el-tooltip class="item" effect="dark" content="可选，长度1~17" placement="right">
              <el-input v-model="iteminfo.feature" auto-complete="off"></el-input>
            </el-tooltip>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="add">添加</el-button>
            <el-button @click="reset">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { genValidator } from '../util/validator'
import onfail from '../util/onfail'

const chinese = {
  '星系': 'galaxies',
  '彗星': 'comets',
  '恒星': 'stars',
  '行星': 'planets',
  '卫星': 'satellites',
}
export default {
  name: 'newItem',
  data () {
    const checkName = genValidator('name', '名字');
    const checkAge = genValidator('number', '年龄');
    const checkMass = genValidator('number', '质量');
    const checkDiameter = genValidator('number', '直径');
    const checkCycle = genValidator('number', '周期');
    const checkGravity = genValidator('number', '重力');
    const checkFeature = genValidator('name', '年龄', true);

    return {
      alltype: [
        {id: 1, text: '星系'},
        {id: 2, text: '彗星'},
        {id: 3, text: '恒星'},
        {id: 4, text: '行星'},
        {id: 5, text: '卫星'}
      ],
      galaxiescatelog: [
        {id: 1, text: '椭圆星系'},
        {id: 2, text: '螺旋星系'},
        {id: 3, text: '不规则星系'},
      ],
      galaxybelong: '',
      starbelong: '',
      planetbelong: '',
      iteminfo: {
        name: '',
        category: '',
        type: '',
        age: '',
        diameter: '',
        image: '',
        cycle: '',
        gravity: '',
        mass: '',
        feature: '',
        fname: ''
      },
      galaxylist: [],
      starlist: [],
      planetlist: [],
      imglist: ['logo.png'],
      imgitem: 0,
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
    }
  },
  computed: {
    img: function () {
      return '../assets/' + this.imglist[this.imgitem];
    }
  },
  mounted: function () {
    const self = this;
    function getlist(url, list, type) {
      self.$axios.get(url)
        .then(function (response) {
          if (response.data.status !== true) {
            onfail(self, response, `获取${type}列表失败`);
            return;
          }
          self[list] = response.data.list;
        })
        .catch(error => console.log(error));
    }
    getlist('/api/galaxies', 'galaxylist', '星系');
    getlist('/api/stars', 'starlist', '恒星');
    getlist('/api/planets', 'planetlist', '行星');
  },
  watch: {
    type: function (news, olds) {
      this.reset();
    }
  },
  methods: {
    reset: function () {
      this.$refs['item'].resetFields();
    },
    add: async function () {
      let valid = await this.$refs['item'].validate().catch(() => {});
      if (valid) {
        const url = `/api/${chinese[this.iteminfo.category]}`;
        let response = await this.$axios.post(url, this.iteminfo);
        if (response.data.status !== true) {
          onfail(self, response, '添加失败');
        } else {
          this.$notify.success({
            title: '成功',
            message: '添加成功'
          })
          this.$router.push(`/${chinese[this.iteminfo.category]}`);
        }
      }
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
.center {
  text-align: center;
}

.carousel {
  width: 400px;
}

.container {
  min-width: 800px;
}

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
