<template>
    <div id="searchBox">
      <el-row>
        <el-col :span="3" class="padding">
          <el-select v-model="basename">
            <el-option disabled value="">搜索范围</el-option>
            <el-option v-for="item in type"
              :key="item.id"
              :value="item.text"
              >{{ item.text }}</el-option>
          </el-select>
        </el-col>
        <el-col :span="9" class="padding">
          <el-input  prefix-icon="el-icon-search"
          @keyup.enter="searchInfo" type="text" v-model="searchText"></el-input>
        </el-col>
        <el-col :span="3" class="padding">
          <el-button icon="el-icon-search" @click="searchInfo">搜索</el-button>
        </el-col>
        <el-col :span="3">
          <el-button icon="el-icon-plus" @click="jump">添加</el-button>
        </el-col>
      </el-row>
    </div>
</template>

<script>
const chinese = {
  '所有': 'all',
  '星系': 'galaxy',
  '彗星': 'comet',
  '恒星': 'star',
  '行星': 'planet',
  '卫星': 'satellite',
}

export default {
  name: 'searchBar',
  data () {
    return {
      searchText: '',
      basename: '所有',
      type: [
        {'id': 0, 'text': '所有' },
        {'id': 1, 'text': '星系' },
        {'id': 2, 'text': '彗星' },
        {'id': 3, 'text': '恒星' },
        {'id': 4, 'text': '行星' },
        {'id': 5, 'text': '卫星' }
      ]
    }
  },
  methods: {
    searchInfo: function () {
      if (this.searchText !== '') {
        this.$router.push({ path: '/search', query: { q: this.searchText, type: chinese[this.basename] } });
      }
    },
    jump: function () {
      this.$router.push('/add');
    }
  }
}
</script>

<style>
#searchBox {
  width: 800px;
  justify-content: center;
  align-items: center;
  margin: 10px;
}

.padding {
  margin: 0px 10px;
}
</style>
