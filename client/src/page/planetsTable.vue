<template>
  <div>
    <searchBar></searchBar>
    <itemList :list="planetslist" :seen="false"></itemList>
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
  name: 'planetsTable',
  data () {
    return {
      planetslist: []
    }
  },
  mounted: function () {
    const self = this;
    this.$axios.get('/api/planets')
      .then(function (response) {
        if (!response.data.status) {
          onfail(self, response, '获取行星列表失败');
        } else {
          self.planetslist = response.data.list
        }
      })
      .catch(error => console.log(error))
  }
}
</script>
