<template>
  <div>
    <searchBar></searchBar>
    <itemList :list="galaxieslist" :seen="false"></itemList>
  </div>
</template>

<script>
import itemList from '../components/itemList'
import searchBar from '../components/searchBar'

export default {
  components: {
    itemList,
    searchBar
  },
  name: 'galaxiesTable',
  data () {
    return {
      galaxieslist: [ {'id': 1, 'name': 'aa', 'type': 'galaxy', 'diameter': 1.2, 'image': 'logo.png'},
        {'id': 2, 'name': 'aa', 'type': 'galaxy', 'diameter': 1.2, 'image': 'logo.png'},
        {'id': 3, 'name': 'aa', 'type': 'galaxy', 'diameter': 1.2, 'image': 'logo.png'},
        {'id': 4, 'name': 'aa', 'type': 'galaxy', 'diameter': 1.2, 'image': 'logo.png'},
        {'id': 5, 'name': 'aa', 'type': 'galaxy', 'diameter': 1.2, 'image': 'logo.png'},
        {'id': 6, 'name': 'aa', 'type': 'galaxy', 'diameter': 1.2, 'image': 'logo.png'},
        {'id': 7, 'name': 'aa', 'type': 'galaxy', 'diameter': 1.2, 'image': 'logo.png'},
        {'id': 8, 'name': 'aa', 'type': 'galaxy', 'diameter': 1.2, 'image': 'logo.png'},
        {'id': 9, 'name': 'aa', 'type': 'galaxy', 'diameter': 1.2, 'image': 'logo.png'},
        {'id': 10, 'name': 'aa', 'type': 'galaxy', 'diameter': 1.2, 'image': 'logo.png'},
        {'id': 11, 'name': 'aa', 'type': 'galaxy', 'diameter': 1.2, 'image': 'logo.png'},
        {'id': 12, 'name': 'aa', 'type': 'galaxy', 'diameter': 1.2, 'image': 'logo.png'},
        {'id': 13, 'name': 'aa', 'type': 'galaxy', 'diameter': 1.2, 'image': 'logo.png'},
        {'id': 14, 'name': 'aa', 'type': 'galaxy', 'diameter': 1.2, 'image': 'logo.png'},
        {'id': 15, 'name': 'aa', 'type': 'galaxy', 'diameter': 1.2, 'image': 'logo.png'},
        {'id': 16, 'name': 'aa', 'type': 'galaxy', 'diameter': 1.2, 'image': 'logo.png'},
        {'id': 17, 'name': 'aa', 'type': 'galaxy', 'diameter': 1.2, 'image': 'logo.png'},
        {'id': 18, 'name': 'aa', 'type': 'galaxy', 'diameter': 1.2, 'image': 'logo.png'},
        {'id': 19, 'name': 'aa', 'type': 'galaxy', 'diameter': 1.2, 'image': 'logo.png'},
        {'id': 20, 'name': 'aa', 'type': 'galaxy', 'diameter': 1.2, 'image': 'logo.png'},
        {'id': 21, 'name': 'aa', 'type': 'galaxy', 'diameter': 1.2, 'image': 'logo.png'}
      ]
    }
  },
  mounted: function () {
    this.$axios.get('/api/galaxies')
      .then(function (response) {
        if (response.status === false) {
          window.location.href = '/login'
        }
        this.galaxieslist = response.list
      })
      .catch(error => console.log(error))
  }
}
</script>
