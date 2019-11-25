<template>
  <div class="col-m-10 categoryList-main-div">
    <div :class="this.mainCategory_container()">
      <div class="mainCategory-horizantal-list list">
        <div class="col-m-2 mainCategory-card card" @click="mainCatOnClick(0)">
          <img
          src="../../assets/icons/edu1.png"
          :class="eduCatStyle(false)"
          />
          <div v-if="witchMainCatSelected[0]" class="selected-line">دانشجویی</div>
        </div>
        <div class="col-m-2 mainCategory-card card" @click="mainCatOnClick(1)">
          <img
            src="../../assets/icons/origami4.png"
            :class="artAndFunCatStyle(false)"
          />
          <div v-if="witchMainCatSelected[1]" class="selected-line">هنر و سرگرمی</div>
        </div>
        <div class="col-m-2 mainCategory-card card" @click="mainCatOnClick(2)">
          <img
            src="../../assets/icons/suitcase2.png"
            :class="bussinesCatStyle(false)"
          />
          <div v-if="witchMainCatSelected[2]" class="selected-line">کار و بار</div>
        </div>
        <div class="col-m-2 mainCategory-card card" @click="mainCatOnClick(3)">
          <img
          src="../../assets/icons/sprout2.png"
          :class="lifeCatStyle(false)"
          />
          <div v-if="witchMainCatSelected[3]" class="selected-line">زندگانی</div>
        </div>
        <div class="col-m-2 mainCategory-card card" @click="mainCatOnClick(4)">
          <img
          src="../../assets/icons/tech1.png"
          :class="techCatStyle(false)"
          />
          <div v-if="witchMainCatSelected[4]" class="selected-line">تکنولوژی</div>
        </div>
        <div class="col-m-2 mainCategory-card card" @click="mainCatOnClick(5)">
          <img
            src="../../assets/icons/society1.png"
            :class="societyCatStyle(false)"
          />
          <div v-if="witchMainCatSelected[5]" class="selected-line">اجتماعی</div>
        </div>
        <div class="col-m-2 mainCategory-card card mcc6" @click="mainCatOnClick(6)">
          <img
            src="../../assets/icons/sience1.png"
            :class="sienceCatStyle(false)"
          />
          <div v-if="witchMainCatSelected[6]" class="selected-line">علم</div>
        </div>
      </div>
    </div>

    <!-- <div class="subCategory-container">
      <div v-if="this.mainCatDefined" class="subCategory-horizantal-list list">
        <div
          v-for="(item, index) in this.catList.sub"
          :key="item.name"
          :class="subCatCardStyle(item.isClicked)"
          @click="subCatOnClick(index)"
        >
          <h3 class="subCategory-name">{{item.name}}</h3>
        </div>
        <div class="gap">"""</div>
      </div>

      <h3 v-if="!this.mainCatDefined" class="message">هنوز گروهی رو انتخاب نکردی</h3>
    </div> -->

  </div>
</template>

<script>
export default {
  name: 'categoryList',
  props: { isTopRound: Boolean },
  data () {
    return {
      mainCatDefined: false,
      catList: { sub: '' },
      witchMainCatSelected: [false, false, false, false, false, false, false]
    }
  },

  methods: {
    mainCatOnClick (index) {
      this.$emit('mainCatDefine', index)
      this.mainCatDefined = true
      this.$store.dispatch('actChangeMainCategory', index).then(() => {
        this.witchMainCatSelected.fill(false)
      })
      this.$set(this.witchMainCatSelected, index, true)
      this.$set(this.catList, 'sub', this.$store.state.subCategoryList[index])
      console.log(this.witchMainCatSelected)
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
    },
    eduCatStyle (isSelected) {
      if (isSelected) {
        return {
          selectedmc0: true
        }
      } else {
        return {
          mc0: true
        }
      }
    },
    artAndFunCatStyle (isSelected) {
      if (isSelected) {
        return {
          selectedmc1: true
        }
      } else {
        return {
          mc1: true
        }
      }
    },
    bussinesCatStyle (isSelected) {
      if (isSelected) {
        return {
          selectedmc2: true
        }
      } else {
        return {
          mc2: true
        }
      }
    },
    lifeCatStyle (isSelected) {
      if (isSelected) {
        return {
          selectedmc3: true
        }
      } else {
        return {
          mc3: true
        }
      }
    },
    techCatStyle (isSelected) {
      if (isSelected) {
        return {
          selectedmc4: true
        }
      } else {
        return {
          mc4: true
        }
      }
    },
    societyCatStyle (isSelected) {
      if (isSelected) {
        return {
          selectedmc5: true
        }
      } else {
        return {
          mc5: true
        }
      }
    },
    sienceCatStyle (isSelected) {
      if (isSelected) {
        return {
          selectedmc6: true
        }
      } else {
        return {
          mc6: true
        }
      }
    }
  },
  computed: {}
}
</script>
<style scoped src='../../assets/styles/categoryListStyle.css'>
</style>
