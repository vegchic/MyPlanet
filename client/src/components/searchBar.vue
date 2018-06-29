<template>
   <div id="searchBox">
      <select id="select" v-model="basename">
        <option disabled value="">搜索范围</option>
        <option v-for="item in type"
          :key="item.id"
          :value="item.name"
          >{{ item.text }}</option>
      </select>
      <input id="search" placeholder="请输入要搜索的内容" @keyup.enter="searchInfo" type="text" v-model="searchText">
      <button @click="searchInfo">搜索</button>
      <router-link id="addButton" to="/add" tag="button">添加</router-link>
    </div>
</template>

<script>
export default {
  name: 'searchBar',
  data () {
    return {
      searchText: '',
      basename: 'all',
      type: [
        {'id': 0, 'text': '所有', 'name': 'all'},
        {'id': 1, 'text': '星系', 'name': 'galaxy'},
        {'id': 2, 'text': '彗星', 'name': 'comet'},
        {'id': 3, 'text': '恒星', 'name': 'star'},
        {'id': 4, 'text': '行星', 'name': 'planet'},
        {'id': 5, 'text': '卫星', 'name': 'satellite'}
      ]
    }
  },
  methods: {
    searchInfo: function () {
      if (this.searchText !== '') {
        var addr = '/search?type=' + this.basename + '&q=' + this.searchText
        window.location.href = addr
        // this.$emit('search', this.searchText)
      }
    }
  }
}
</script>

<style>
#searchBox {
  width: 800px;
  height: 30px;
  justify-content: center;
  align-items: center;
}
#select {
  height: 28px;
}

#search {
  width: 300px;
  height: 25px;
  z-index: 30;
  font-size: 18px;
  line-height:25px;
  border-width: 2px;
  border-color: #066196;
  font-family: 'microsoft yahei';
  color: #066196;
  background:url(../assets/touming.png) repeat 0px 0px;
}
</style>
