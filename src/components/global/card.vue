<template>

<div class="col-m-9-3 card-main-div">
  <div class="card-lable-container">
    <h5 class="lable">lable</h5>
  </div>

  <!-- <div class="col-m-5 card-sections-container"> -->
    <div :class="card_text_div">
      <h1 class="title">{{this.title}}</h1>
      <h4 class="body">{{this.text}}</h4>
      <div class="details-container">
        <h3 class="username">{{this.username}}</h3>
        <h3 class="duration">{{this.duration}}</h3>
      </div>
    </div>

    <div v-if="kind == 1" class="col-m-5 img-section">
      <div class="img-container">
        <img :src="'http://45.82.136.106:8080/images/'+this.imgUrl" class="card-img">
      </div>
    </div>

  <!-- </div> -->

</div>

</template>

<script>

export default {
  name: 'card',
  props: [
    'kind', 'text', 'imgUrl', 'iconUrl', 'title', 'username', 'duration', 'mainCategory', 'subCategory'
  ],
  data () {
    return {

    }
  },

  methods: {
    // tip src binding!!!!
    // getImgUrl (path) {
    //   console.log('../../assets/' + path)
    //   return require('http://45.82.136.106:8080/images/' + path)
    // }

  },
  computed: {
    card_text_div () {
      if (this.kind === 1) {
        return {
          'col-m-4-6': true,
          'text-section': true
        }
      } else {
        return {
          'col-m-9': true,
          'text-section': true
        }
      }
    }

  }
}
</script>
<style scoped src='../../assets/styles/cardStyle.css'>
</style>
