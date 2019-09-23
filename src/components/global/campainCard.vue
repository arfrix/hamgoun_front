
<template>

<div class="campainCard-main-div">
  <div class="campainName-section">
      <h3 class="campainName">{{name}}</h3>
  </div>
  <div class="col-m-1-5 catName-section">
      <h3 class="catName">{{cat}}</h3>
  </div>
</div>

</template>

<script>

export default {
  name: 'campainCard',
  props: [
    'name', 'cat'
  ],
  data () {
    return {

    }
  },

  methods: {
    // tip src binding!!!!
    getImgUrl (path) {
      console.log('../../assets/' + path)
      return require('../../assets/' + path)
    }

  },
  computed: {

  }
}
</script>
<style scoped src='../../assets/styles/campainCardStyle.css'>
</style>
