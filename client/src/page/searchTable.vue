<template>
  <div>
    <searchBar v-on:search="search"></searchBar>
    <itemList :list="searchlist" :seen="false"></itemList>
  </div>
</template>

<script>
import searchBar from '../components/searchBar'
import itemList from '../components/itemList'
import onfail from '../util/onfail'

export default {
  components: {
    itemList,
    searchBar
  },
  name: 'searchTable',
  data () {
    return {
      searchlist: []
    }
  },
  mounted: function () {
    this.search();
  },
  methods: {
    search() {
      const self = this;
      var addr = '/api' + this.$route.path + '?type=' + this.$route.query.type + '&q=' + this.$route.query.q
      this.$axios.get(addr)
        .then(function (response) {
          if (!response.data.status) {
            onfail(self, response, '搜索失败');
          } else {
            self.searchlist = response.data.list;
          }
        })
        .catch(error => console.log(error));
    }
  }
}
</script>
