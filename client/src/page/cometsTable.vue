<template>
  <div>
    <searchBar></searchBar>
    <itemList :list="cometslist" :seen="false"></itemList>
  </div>
</template>

<script>
import itemList from '../components/itemList';
import searchBar from '../components/searchBar';
import onfail from '../util/onfail';

export default {
  components: {
    itemList,
    searchBar
  },
  name: 'cometsTable',
  data () {
    return {
      cometslist: []
    }
  },
  mounted: function () {
    const self = this;
    this.$axios.get('/api/comets')
      .then(function (response) {
        if (response.data.status === false) {
          onfail(self, response, '获取彗星列表失败');
        } else {
          self.cometslist = response.data.list;
        }
      })
      .catch(error => console.log(error));
  }
}
</script>
