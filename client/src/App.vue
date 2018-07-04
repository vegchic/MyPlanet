<template>
  <div id="app">
    <vue-canvas-nest :config="{color:'0,0,0', count: 200, opacity: 1}"></vue-canvas-nest>
    <router-view name="menubarTop" id="menubarTop"/>
    <router-view name="menubarCenter" id="menubarCenter"/>
    <router-view name="searchBar" id="searchBar"/>
    <router-view name="infoTable" :key="$route.fullPath"/>
  </div>
</template>

<script>
import vueCanvasNest from 'vue-canvas-nest'
export default {
  name: 'App',
  components: {
    vueCanvasNest
  }
}
</script>

<style>
</style>
