<template>
  <div>
    <searchBar></searchBar>
    <itemList :list="searchlist" :seen="false"></itemList>
  </div>
</template>

<script>
import searchBar from '../components/searchBar'
import itemList from '../components/itemList'

export default {
  components: {
    itemList,
    searchBar
  },
  name: 'searchTable',
  data () {
    return {
      searchlist: [
        {'id': 1, 'name': 'aa', 'type': 'galaxy', 'diameter': 1.2, 'img': 'logo.png'},
        {'id': 2, 'name': 'aa', 'type': 'galaxy', 'diameter': 1.2, 'img': 'logo.png'},
        {'id': 3, 'name': 'aa', 'type': 'galaxy', 'diameter': 1.2, 'img': 'logo.png'},
        {'id': 4, 'name': 'aa', 'type': 'galaxy', 'diameter': 1.2, 'img': 'logo.png'},
        {'id': 5, 'name': 'aa', 'type': 'galaxy', 'diameter': 1.2, 'img': 'logo.png'},
        {'id': 6, 'name': 'aa', 'type': 'galaxy', 'diameter': 1.2, 'img': 'logo.png'},
        {'id': 7, 'name': 'aa', 'type': 'galaxy', 'diameter': 1.2, 'img': 'logo.png'},
        {'id': 8, 'name': 'aa', 'type': 'galaxy', 'diameter': 1.2, 'img': 'logo.png'},
        {'id': 9, 'name': 'aa', 'type': 'galaxy', 'diameter': 1.2, 'img': 'logo.png'},
        {'id': 10, 'name': 'aa', 'type': 'galaxy', 'diameter': 1.2, 'img': 'logo.png'},
        {'id': 11, 'name': 'aa', 'type': 'galaxy', 'diameter': 1.2, 'img': 'logo.png'},
        {'id': 12, 'name': 'aa', 'type': 'galaxy', 'diameter': 1.2, 'img': 'logo.png'},
        {'id': 13, 'name': 'aa', 'type': 'galaxy', 'diameter': 1.2, 'img': 'logo.png'},
        {'id': 14, 'name': 'aa', 'type': 'galaxy', 'diameter': 1.2, 'img': 'logo.png'},
        {'id': 15, 'name': 'aa', 'type': 'galaxy', 'diameter': 1.2, 'img': 'logo.png'},
        {'id': 16, 'name': 'aa', 'type': 'galaxy', 'diameter': 1.2, 'img': 'logo.png'},
        {'id': 17, 'name': 'aa', 'type': 'galaxy', 'diameter': 1.2, 'img': 'logo.png'},
        {'id': 18, 'name': 'aa', 'type': 'galaxy', 'diameter': 1.2, 'img': 'logo.png'},
        {'id': 19, 'name': 'aa', 'type': 'galaxy', 'diameter': 1.2, 'img': 'logo.png'},
        {'id': 20, 'name': 'aa', 'type': 'galaxy', 'diameter': 1.2, 'img': 'logo.png'},
        {'id': 21, 'name': 'aa', 'type': 'galaxy', 'diameter': 1.2, 'img': 'logo.png'}
      ]
    }
  },
  mounted: function () {
    var addr = '/api' + this.$route.path + '?type=' + this.$route.query.type + '&q=' + this.$route.query.q
    this.$axios.get(addr)
      .then(function (response) {
        if (response.status === false) {
          window.location.href = '/login'
        }
        this.searchlist = response.list
      })
      .catch(error => console.log(error))
  }
  // methods: {
  //   searchInfo: function (searchText) {
  //     // var addr = '/search?type=galaxy&q=' + searchText
  //     // console.log(addr)
  //     // var addr = '/galaxies?q=' + searchText
  //     // window.location.href = addr
  //     this.galaxieslist = [{'id': 21, 'name': 'aa', 'type': 'asa', 'diameter': 1.2}]
  //   //   this.$axios.get(addr)
  //   // .then(response => galaxieslist = response.data)
  //   // .catch(error => console.log(error))
  //   }
  // }
}
</script>
