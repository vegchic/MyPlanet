<template>
  <!-- <el-container> -->
  <div>
    <searchBar></searchBar>
    <itemList :list="galaxieslist" :seen="false"></itemList>
  </div>
  <!-- </el-container> -->
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
  name: 'galaxiesTable',
  data () {
    return {
      galaxieslist: []
    }
  },
  mounted: function () {
    const self = this;
    this.$axios.get('/api/galaxies')
      .then(function (response) {
        if (!response.data.status) {
          onfail(self, response, '获取星系列表失败');
        } else {
          self.galaxieslist = response.data.list
        }
      })
      .catch(error => console.log(error))
  }
}
</script>
