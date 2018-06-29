<template>
  <div>
    <router-link tag="div"
       v-for="(item, index) in slicelist"
       :key="item.id"
       :id="item.id"
       :to="stardetail(item.type, item.id)">
      <img :src="require('../assets/' + item.image)">
      <h4 id="name">{{ item.name }}</h4>
      <span id="detail">类型：{{ item.type }}，直径：{{ item.diameter }}</span>
      <button v-if="seen" @click.stop="removeTodo(item.type, item.id, index)">X</button>
    </router-link>
    <pageChoose :page="totalpage" @changepage="currentpage = $event"></pageChoose>
  </div>
</template>

<script>
import pageChoose from './pageChoose'

export default {
  components: {
    pageChoose
  },
  name: 'itemList',
  data () {
    return {
      currentpage: 1,
      url: ''
    }
  },
  props: ['list', 'seen'],
  computed: {
    totalpage: function () {
      return Math.floor(this.list.length / 10) + 1
    },
    slicelist: function () {
      if (this.currentpage === this.page) {
        return this.list.slice(10 * (this.currentpage - 1))
      } else {
        return this.list.slice(10 * (this.currentpage - 1), 10 * (this.currentpage - 1) + 10)
      }
    }
  },
  methods: {
    stardetail: function (type, index) {
      var starurl = '/'
      if (type === 'galaxy') {
        starurl += 'galaxies'
      } else {
        starurl += type + 's'
      }
      return starurl + '/' + index
    },
    removeTodo: function (type, id, index) {
      var deleteroute = '/api' + this.stardetail(type, id)
      this.list.splice(index, 1)
      this.$axios.delete(deleteroute)
        .then(function (response) {
        })
        .catch(error => console.log(error))
    }
  }
}
</script>
