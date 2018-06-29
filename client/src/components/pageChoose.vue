<template>
  <div>
  <button @click="subpage">上一页</button>
  <select v-model="currentpage">
    <option disabled value="">请选择</option>
    <option v-for="n in page"
            :key="n">{{ n }}</option>
  </select>
  <button @click="addpage">下一页</button>
  </div>
</template>

<script>
export default {
  name: 'pageChoose',
  data () {
    return {
      currentpage: 1
    }
  },
  props: ['page'],
  methods: {
    addpage: function () {
      if (this.currentpage < this.page) {
        ++this.currentpage
      }
    },
    subpage: function () {
      if (this.currentpage > 1) {
        --this.currentpage
      }
    }
  },
  watch: {
    currentpage: function (newValue, oldValue) {
      this.$emit('changepage', this.currentpage)
    }
  }
}
</script>
