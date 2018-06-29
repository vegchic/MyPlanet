<template>
  <div id="menu" class="nav">
    <router-link v-for="item in items"
      :key="item.id"
      :class="item.class"
      :id="item.id"
      :to="item.href">
      {{ item.text }} </router-link>
  </div>
</template>

<script>
export default {
  name: 'menuBar',
  data () {
    return {
      items: [
        {id: 1, class: 'gv', text: '星系', href: '/galaxies'},
        {id: 2, class: 'gv', text: '彗星', href: '/comets'},
        {id: 3, class: 'gv', text: '恒星', href: '/stars'},
        {id: 4, class: 'gv', text: '行星', href: '/planets'},
        {id: 5, class: 'gv', text: '卫星', href: '/satellites'},
        {id: 6, class: 'gv', text: '个人信息', href: '/profile'}
      ]
    }
  }
}
</script>

<style>
.nav {
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  width: 820px;
  margin:0 auto;
}

.gv {
  text-decoration:none;
  background:url(../assets/nav_gv.png) repeat 0px 0px;
  width: 130px;
  height: 43px;
  display: block;
  text-align: center;
  line-height: 43px;
  cursor: pointer;
  float: left;
  border-width: 0px;
  margin: 8px 2px 8px 2px;
  font: 18px/43px 'microsoft yahei';
  color: #066197;
}

.nav .gv span {
   display: none;
}

.nav .gv:hover {
  background: url(../assets/nav_gv.png) repeat 0px -43px;
  color:#1d7eb8;
  -webkit-box-shadow: 0 0 6px #1d7eb8;
  box-shadow: 0 0 6px #1d7eb8;
  transition-duration: 0.5s;
}
</style>
