<template>
  <div>
    <el-menu mode="horizontal" :router="true">
      <el-menu-item v-for="item in items"
      :key="item.id"
      :id="item.id"
      :index="item.href">{{ item.text }}</el-menu-item>
      <el-menu-item @click="logout" class="right" index="/login">登出</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'menuBar',
  data () {
    return {
      items: [
        {id: 1, text: '星系', href: '/galaxies'},
        {id: 2, text: '彗星', href: '/comets'},
        {id: 3, text: '恒星', href: '/stars'},
        {id: 4, text: '行星', href: '/planets'},
        {id: 5, text: '卫星', href: '/satellites'},
        {id: 6, text: '个人信息', href: '/profile'}
      ]
    }
  },
  methods: {
    logout: function () {
      const self = this;
      this.$axios.get('/api/logout').then(response => {
        self.$router.push('/login');
      });
    }
  }
}
</script>

<style>
.right {
  float: right !important;
}
</style>
