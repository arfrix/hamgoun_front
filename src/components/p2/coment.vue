<template>
<div class="main">
  <div :class="gapSize"></div>
  <div :class="marginTop">
  <div class="col-m-1 profile-img-div">
      <img :src="'http://45.82.136.106:8080/images/'+this.imgUrl" alt="" class="img profile-img">
  </div>
  <div :class="witchSize">
    <h4 class="username">{{this.username}}</h4>
    <h4 class="comment-text">{{this.comment}}</h4>
    <h5 class="reply" @click="reply">پاسخ</h5>
    <div class="mizouniat-container">
        <img :src="mizounImgUrl(isSelectedMizoun)" alt="" class="mizoun-img" @click="mizounOnClick">
        <h3 class="mizount-count">{{mizoun}}</h3>
        <img :src="naMizounImgUrl(isSelectedNamizoun)" alt="" class="namizoun-img" @click="namizounOnClick">
        <h3 class="namizoun-count">{{namizoun}}</h3>
    </div>
  </div>
  </div>
</div>

</template>

<script>

export default {
  name: 'comment',
  props: ['isBig', 'comment', 'username', 'imgUrl', 'id', 'parentCommentId', 'mizoun', 'namizoun'],
  data () {
    return {
      isSelectedMizoun: false,
      isSelectedNamizoun: false
    }
  },

  methods: {
    reply () {
      if (this.isBig) { this.$emit('isReply', this.id) } else { this.$emit('isReply', this.parentCommentId) }
    },
    mizounImgUrl (isClicked) {
      if (isClicked) { return require('../../assets/icons/selectedMizoun.png') } else { return require('../../assets/icons/unSelectedMizoun.png') }
    },
    naMizounImgUrl (isClicked) {
      if (isClicked) { return require('../../assets//icons/selected-naMizoun.png') } else { return require('../../assets/icons/unSelected-namizoun.png') }
    },
    mizounOnClick () {
      this.$store.dispatch('submitMizoun', { commentId: this.id }).then(() => {
        this.isSelectedMizoun = !this.isSelectedMizoun
        if (this.isSelectedNamizoun) { this.isSelectedNamizoun = false }
      })
    },
    namizounOnClick () {
      this.$store.dispatch('submitNamizoun', { commentId: this.id }).then(() => {
        this.isSelectedNamizoun = !this.isSelectedNamizoun
        if (this.isSelectedMizoun) { this.isSelectedMizoun = false }
      })
    }
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
