
<template>

<div class="col-m-1 card-main-div">
  <div class="card-lable-container">
    <!-- <h5 class="lable">{{this.$store.state.subCategoryList[mainCategory][subCategory].name}}</h5> -->
    <h5 class="lable">{{this.type}}</h5>
  </div>

  <!-- <div class="col-m-5 card-sections-container"> -->
    <div v-if="kind != 1" class="col-m-9 text-section">
      <h1 class="title">{{this.title}}</h1>
      <div class="text-body-container">
        <h4 class="body">{{this.text}}</h4>
      </div>
      <div class="details-container">
        <h3 class="username">{{this.username}}</h3>
        <h3 class="duration">{{this.duration}}</h3>
      </div>
    </div>

    <div v-if="kind == 1" class="col-m-9-8 img-section">
      <h1 class="img-card-title">{{this.title}}</h1>
      <div class="img-container">
        <img :src="getImgUrl(this.imgUrl)" class="card-img">
      </div>
      <div class="img-card-details-container">
        <h3 class="img-card-username">{{this.username}}</h3>
        <h3 class="duration">{{this.duration}}</h3>
      </div>
    </div>

  <!-- </div> -->

</div>

</template>

<script>

export default {
  name: 'miniCard',
  props: [
    'kind', 'text', 'imgUrl', 'iconUrl', 'title', 'username', 'duration', 'mainCategory', 'subCategory', 'type'
  ],
  data () {
    return {

    }
  },

  methods: {
    // tip src binding!!!!
    getImgUrl (path) {
      return 'http://45.82.136.106:8080/images/' + path
    }

  },
  computed: {
    card_text_div () {
      if (this.kind === 1) {
        return {
          'col-m-5': true,
          'card-texts-div-1': true
        }
      } else {
        return {
          'col-m-10': true,
          'card-texts-div-2': true
        }
      }
    },
    img_icon_div () {
      if (this.kind === 1) {
        return {
          'col-m-1': true,
          'icon-div': true
        }
      } else {
        return {
          'col-m-0-6': true,
          'icon-div': true
        }
      }
    },
    title_section_gap () {
      if (this.kind === 1) {
        return {
          'col-m-7': true,
          'gap': true
        }
      } else {
        return {
          'col-m-7-8': true,
          'gap': true
        }
      }
    }
  }
}
</script>
<style scoped src='../../assets/styles/miniCardStyle.css'>
</style>
