<template>
  <!-- <el-container> -->
  <div>
    <searchBar></searchBar>
    <el-row type="flex" justify="center">
      <h1 class="gray title">Welcome to MyPlanet</h1>
    </el-row>
    <el-row type="flex" justify="center">
      <h2 class="gray sub">Create your planet and enjoy</h2>
    </el-row>
  </div>
  <!-- </el-container> -->
</template>

<script>
import searchBar from '../components/searchBar'

export default {
  components: {
    searchBar
  },
  name: 'home',
  data () {
    return {
    }
  },
  mounted: function () {
  }
}
</script>

<style>
.gray {
  color: #909399;
}

.title {
  font-size: 30pt;
}

.sub {
  font-size: 20pt;
}
</style>
