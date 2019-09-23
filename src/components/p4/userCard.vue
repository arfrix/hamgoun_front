<template>

<div class="userCard-main-div">
    <div class="profile-img-container">
        <img :src="'http://45.82.136.106:8080/images/' + imgUrl" alt="" class="profile-img">
    </div>
    <div class="userName-container">
        <h3 class="username">{{username}}</h3>
    </div>
</div>

</template>

<script>

export default {
  name: 'userCard',
  props: [
    'imgUrl', 'username'
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
<style scoped src='../../assets/styles/p4/userCardStyle.css'>
</style>
