<template>
  <div class="userCard-main-div">
    <!-- <div class="profile-img-container"> -->
      <picture>
        <!-- <source :srcset="getImgUrl_webp(imgUrl)" type="image/webp" />  -->
        <source :srcset="getImgUrl(imgUrl)" type="image/jpeg" alt=""/>
        <img :src="getImgUrl(imgUrl)" class="profile-img" alt=""/>
      </picture>
    <!-- </div> -->

    <div class="userName-container">
      <h3 class="username">{{username}}</h3>
    </div>

  </div>
</template>

<script>
export default {
  name: 'userCard',
  props: ['imgUrl', 'username'],
  data () {
    return {}
  },

  methods: {
    // tip src binding!!!!
    getImgUrl (path) {
      return 'http://45.82.136.106:8080/images/' + path
    },
    getImgUrl_webp (path) {
      const imgName = path
      if (imgName !== null) {
        return (
          'http://45.82.136.106:8080/images/' + imgName.replace('.jpg', '.webp')
        )
      }
    }
  },
  computed: {}
}
</script>
<style scoped src='../../assets/styles/p4/userCardStyle.css'>
</style>
