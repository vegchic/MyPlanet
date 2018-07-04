<template>
  <div id="app">
    <router-view name="menubarTop" id="menubarTop"/>
    <router-view name="menubarCenter" id="menubarCenter"/>
    <router-view name="searchBar" id="searchBar"/>
    <router-view name="infoTable" :key="$route.fullPath"/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
</style>
