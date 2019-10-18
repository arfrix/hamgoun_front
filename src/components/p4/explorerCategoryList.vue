<template>

    <div class="col-m-10 categoryList-main-div">
        <div :class="this.mainCategory_container()">

            <div v-if="!bioMode" class="mainCategory-horizantal-list list">
                <div class="col-m-2 mainCategory-card card mcc0" @click="mainCatOnClick(0)">
                    <img src="../../assets/icons/edu2.png" :class="eduCatStyle(false)">
                    <div v-if="witchMainCatSelected[0]" class="selected-line"></div>
                </div>
                <div class="col-m-2 mainCategory-card card" @click="mainCatOnClick(1)">
                    <img src="../../assets/icons/origami3.png" :class="artAndFunCatStyle(false)">
                    <div v-if="witchMainCatSelected[1]" class="selected-line"></div>
                </div>
                <div class="col-m-2 mainCategory-card card" @click="mainCatOnClick(2)">
                    <img src="../../assets/icons/suitcase1.png" :class="bussinesCatStyle(false)">
                    <div v-if="witchMainCatSelected[2]" class="selected-line"></div>
                </div>
                <div class="col-m-2 mainCategory-card card" @click="mainCatOnClick(3)">
                    <img src="../../assets/icons/sprout3.png" :class="lifeCatStyle(false)">
                    <div v-if="witchMainCatSelected[3]" class="selected-line"></div>
                </div>
                <div class="col-m-2 mainCategory-card card" @click="mainCatOnClick(4)">
                    <img src="../../assets/icons/tech2.png" :class="techCatStyle(false)">
                    <div v-if="witchMainCatSelected[4]" class="selected-line"></div>
                </div>
                <div class="col-m-2 mainCategory-card card" @click="mainCatOnClick(5)">
                    <img src="../../assets/icons/society2.png" :class="societyCatStyle(false)">
                    <div v-if="witchMainCatSelected[5]" class="selected-line"></div>
                </div>
                <div class="col-m-2 mainCategory-card card mcc6" @click="mainCatOnClick(6)">
                    <img src="../../assets/icons/sience2.png" :class="sienceCatStyle(false)">
                    <div v-if="witchMainCatSelected[6]" class="selected-line"></div>
                </div>
            </div>
            <div v-if="bioMode" class="mainCategory-horizantal-list list">
                <div class="col-m-2 mainCategory-card card" @click="bioOnClick(0)">
                    <img src="../../assets/icons/edu2.png" :class="bioEduCatStyle(false)">
                    <div v-if="witchBioCatSelected[0]" class="selected-line"></div>
                </div>
                <div class="col-m-2 mainCategory-card card" @click="bioOnClick(1)">
                    <img src="../../assets/icons/suitcase1.png" :class="bioWorkCatStyle(false)">
                    <div v-if="witchBioCatSelected[1]" class="selected-line"></div>
                </div>
                <div class="col-m-2 mainCategory-card card" @click="bioOnClick(2)">
                    <img src="../../assets/icons/translation1.png" :class="bioLanguageCatStyle(false)">
                    <div v-if="witchBioCatSelected[2]" class="selected-line mr"></div>
                </div>
                <div class="col-m-2 mainCategory-card card" @click="bioOnClick(3)">
                    <img src="../../assets/icons/maps-and-flags.png" :class="bioLocationCatStyle(false)">
                    <div v-if="witchBioCatSelected[3]" class="selected-line ml"></div>
                </div>

            </div>
        </div>

        <!-- <div v-if="!bioMode" class="subCategory-container">

            <div v-if="this.mainCatDefined" class="subCategory-horizantal-list list">
                <div  v-for="(item, index) in this.catList.sub" :key="item.name" :class="subCatCardStyle(item.isClicked)" @click="subCatOnClick(index)">
                        <h3  class="subCategory-name">{{item.name}}</h3>
                </div>
                <div class="gap">"""</div>
            </div>

            <h3 v-if="!this.mainCatDefined" class="message">هنوز گروهی رو انتخاب نکردی</h3>
        </div> -->

    </div>

</template>

<script>

export default {
  name: 'explorerCategoryList',
  props: { isTopRound: Boolean, bioMode: Boolean

  },
  data () {
    return {
      mainCatDefined: false,
      catList: { sub: '' },
      witchMainCatSelected: [false, false, false, false, false, false, false],
      witchBioCatSelected: [false, false, false, false]
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
    },
    subCatOnClick (index) {
      this.$emit('subCatDefine', index)
      //   this.$store.dispatch('actChangeSubCategory', index)
      this.catList.sub.forEach(item => {
        item.isClicked = false
      })
      console.log(this.catList.sub)
      this.$set(this.catList.sub[index], 'isClicked', true)
    },
    bioOnClick (index) {
      this.$emit('bioDefine', index)
      this.witchBioCatSelected.fill(false)
      this.$set(this.witchBioCatSelected, index, true)
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
    },

    bioEduCatStyle (isSelected) {
      if (isSelected) {
        return {
          selectedbmc0: true
        }
      } else {
        return {
          bmc0: true
        }
      }
    },
    bioWorkCatStyle (isSelected) {
      if (isSelected) {
        return {
          selectedbmc1: true
        }
      } else {
        return {
          bmc1: true
        }
      }
    },
    bioLanguageCatStyle (isSelected) {
      if (isSelected) {
        return {
          selectedbmc2: true
        }
      } else {
        return {
          bmc2: true
        }
      }
    },
    bioLocationCatStyle (isSelected) {
      if (isSelected) {
        return {
          selectedbmc3: true
        }
      } else {
        return {
          bmc3: true
        }
      }
    }

  },
  computed: {

  }
}
</script>
<style scoped src='../../assets/styles/p4/explorerCategoryListStyle.css'>
</style>
