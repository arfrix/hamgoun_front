<template>

    <div class="col-m-10 categoryList-main-div">
        <div :class="this.mainCategory_container()">
            <div class="mainCategory-horizantal-list list">
                <div class="col-m-2 mainCategory-card card " @click="mainCatOnClick(0)">
                    <img src="../../assets/icons/edu1.png" class="mainCategory-img mc0">
                </div>
                <div class="col-m-2 mainCategory-card card" @click="mainCatOnClick(1)">
                    <img src="../../assets/icons/origami4.png" class="mainCategory-img mc1">
                </div>
                <div class="col-m-2 mainCategory-card card" @click="mainCatOnClick(2)">
                    <img src="../../assets/icons/suitcase2.png" class="mainCategory-img mc2">
                </div>
                <div class="col-m-2 mainCategory-card card" @click="mainCatOnClick(3)">
                    <img src="../../assets/icons/sprout2.png" class="mainCategory-img mc4">
                </div>
                <div class="col-m-2 mainCategory-card card" @click="mainCatOnClick(4)">
                    <img src="../../assets/icons/tech1.png" class="mainCategory-img mc3">
                </div>
                <div class="col-m-2 mainCategory-card card" @click="mainCatOnClick(5)">
                    <img src="../../assets/icons/society1.png" class="mainCategory-img mc5">
                </div>
                <div class="col-m-2 mainCategory-card card mcc6" @click="mainCatOnClick(6)">
                    <img src="../../assets/icons/sience1.png" class="mainCategory-img mc6">
                </div>
            </div>
        </div>
        <div class="subCategory-container">

            <div v-if="this.mainCatDefined" class="subCategory-horizantal-list list">
                <div  v-for="(item, index) in this.catList.sub" :key="item.name" :class="subCatCardStyle(item.isClicked)" @click="subCatOnClick(index)">
                        <h3  class="subCategory-name">{{item.name}}</h3>
                </div>
                <div class="gap">"""</div>
            </div>

            <h3 v-if="!this.mainCatDefined" class="message">هنوز گروهی رو انتخاب نکردی</h3>
        </div>

    </div>

</template>

<script>

export default {
  name: 'categoryList',
  props: { isTopRound: Boolean

  },
  data () {
    return {
      mainCatDefined: false,
      catList: { sub: '' }
    }
  },

  methods: {
    mainCatOnClick (index) {
      this.$emit('mainCatDefine', index)
      this.mainCatDefined = true
      this.$store.dispatch('actChangeMainCategory', index)
      this.$set(this.catList, 'sub', this.$store.state.subCategoryList[index])
    },
    subCatOnClick (index) {
      this.$emit('subCatDefine', index)
      this.$store.dispatch('actChangeSubCategory', index)
      this.catList.sub.forEach(item => {
        item.isClicked = false
      })
      // console.log(this.catList.sub)
      this.$set(this.catList.sub[index], 'isClicked', true)
    },

    // tip src binding!!!!
    getImgUrl (path) {
      return require('../../assets/' + path)
    },

    mainCategory_container () {
      if (this.isTopRound) {
        return {
          'mainCategory-container-bordered': true
        }
      } else {
        return {
          'mainCategory-container': true
        }
      }
    },
    subCatCardStyle (isClicked) {
      if (isClicked) {
        return {
          'subCategory-card-clicked': true,
          card: true
        }
      } else {
        return {
          'subCategory-card': true,
          card: true
        }
      }
    }

  },
  computed: {

  }
}
</script>
<style scoped src='../../assets/styles/categoryListStyle.css'>
</style>
