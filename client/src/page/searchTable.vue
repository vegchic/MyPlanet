<template>
  <div>
    <searchBar></searchBar>
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
    let { q, type } = this.$route.query;
    this.search({ q, type });
  },
  methods: {
    search(query) {
      const self = this;
      var addr = '/api/search?type=' + query.type + '&q=' + query.q;
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
