<template>
  <div>
    <el-row type="flex" justify="center">
        <img :src="img" class="gallery">
    </el-row>
    <el-row type="flex" justify="center" class="arrow">
      <el-button type="info" icon="el-icon-arrow-left" circle @click="changeImg(-1)" class="arrow"></el-button>
      <el-button type="info" icon="el-icon-arrow-right" circle @click="changeImg(1)" class="arrow"></el-button>
    </el-row>
  </div>
</template>

<script>
const chinese = {
  '星系': 'galaxy',
  '彗星': 'comet',
  '恒星': 'star',
  '行星': 'planet',
  '卫星': 'satellite',
}
export default {
  name: 'gallery',
  data() {
    return {  }
  },
  props: [ 'type', 'id' ],
  computed: {
    img() {
      return `../../static/${chinese[this.type]}/${this.id}.png`;
    },
  },
  methods: {
    changeImg(dx) {
      if (dx > 0 && this.id === 9) this.id = 0;
      else if (dx < 0 && this.id === 0) this.id = 9;
      else this.id += dx;
      this.$emit('imgChange', this.id);
    }
  }

}
</script>

<style>
.gallery {
  height: 200px !important;
}
.arrow {
  margin: 10px 20px;
}
</style>
