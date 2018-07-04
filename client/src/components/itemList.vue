<template>
  <div class="container">
    <el-row>
      <router-link tag="span"
        v-for="(item, index) in slicelist"
        :key="item.id"
        :id="item.id"
        :to="getURL(item.category, item.id)">
          <el-card class="card">
            <img :src="imgUrl(item)" class="image">
            <div style="padding: 14px;">
              <span>{{ item.name }}</span>
              <div class="bottom clearfix">
                <div id="detail">类型：{{ toChinese(item.category) }}</div>
                <div>直径：{{ item.diameter }}</div>
                <el-button v-if="seen"  @click.stop="removeChild(item.category, item.id, index)"
                  type="info" icon="el-icon-delete" circle size="mini"></el-button>
              </div>
            </div>
          </el-card>
      </router-link>
    </el-row>
    <el-pagination class="center"
        layout="prev, pager, next"
        v-if="list.length"
        :total="list.length"
        :current-page.sync="currentpage">
    </el-pagination>
  </div>
</template>

<script>
import onfail from '../util/onfail';

const chinese = {
  'galaxy': '星系',
  'comet': '彗星',
  'star': '恒星',
  'planet': '行星',
  'satellite': '卫星',
}

export default {
  name: 'itemList',
  data () {
    return {
      currentpage: 1,
      url: ''
    }
  },
  props: ['list', 'seen'],
  computed: {
    slicelist: function () {
      if (this.currentpage === this.page) {
        return this.list.slice(10 * (this.currentpage - 1));
      } else {
        return this.list.slice(10 * (this.currentpage - 1), 10 * (this.currentpage - 1) + 10);
      }
    }
  },
  methods: {
    imgUrl(item) {
      return `../../static/${item.category}/${item.image}`;
    },
    toChinese(category) {
      return chinese[category];
    },
    getURL: function (type, index) {
      var url = '/'
      if (type === 'galaxy') {
        url += 'galaxies'
      } else {
        url += type + 's'
      }
      return `${url}/${index}`
    },
    removeChild: function (type, id, index) {
      const self = this;
      let deleteroute = '/api' + this.getURL(type, id);
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
          self.list.splice(index, 1);
          self.$notify.success({
            title: '成功',
            message: '删除成功'
          });
        }
        self.$router.push(returnurl);
      })
      .catch(error => console.log(error));
    }
  }
}
</script>

<style>

.card {
  width: 200px;
  height: 300px;
  margin: 10px;
  float: left;
}

.bottom {
  margin-top: 13px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  display: inline-block;
  width: 100%;
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}

.clearfix:after {
    clear: both
}

.center {
  text-align: center;
}
</style>
