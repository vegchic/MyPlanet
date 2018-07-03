<template>
  <div>
    <searchBar></searchBar>
    <itemList :list="satellitelist" :seen="false"></itemList>
  </div>
</template>

<script>
import itemList from '../components/itemList'
import searchBar from '../components/searchBar'
import onfail from '../util/onfail';

export default {
  components: {
    itemList,
    searchBar
  },
  name: 'satelliteTable',
  data () {
    return {
      satellitelist: []
    }
  },
  mounted: function () {
    const self = this;
    this.$axios.get('/api/satellites')
      .then(function (response) {
        if (!response.data.status) {
          onfail(self, response, '获取卫星列表失败');
        } else {
          self.satellitelist = response.data.list;
        }
      })
      .catch(error => console.log(error))
  }
}
</script>
