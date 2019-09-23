<template>
<div class="main">
  <div :class="gapSize"></div>
  <div :class="marginTop">
  <div class="col-m-1 profile-img-div">
      <img src="../../assets/images/avatars/5.png" alt="" class="img profile-img">
  </div>
  <div :class="witchSize">
    <h4 class="username">{{this.username}}</h4>
    <h4 class="comment-text">{{this.comment}}</h4>
  <h5 class="reply">پاسخ</h5>
  </div>
  </div>
</div>

</template>

<script>

export default {
  name: 'comment',
  props: ['isBig', 'comment', 'username', 'imgUrl'],
  data () {
    return {

    }
  },

  methods: {

  },
  computed: {
    witchSize () {
      console.log(!this.isBig)
      return {
        'col-m-7-5': this.isBig,
        big: this.isBig,
        'col-m-6-5': !(this.isBig),
        small: !(this.isBig)
      }
    },
    gapSize () {
      return {
        'col-m-0-5': this.isBig,
        'col-m-1-5': !this.isBig,
        gap: true
      }
    },
    marginTop () {
      return {
        'mtb': this.isBig,
        'mts': !this.isBig,
        gap: true
      }
    }
  }
}
</script>
<style scoped src='../../assets/styles/p2/comentStyle.css'>
</style>
