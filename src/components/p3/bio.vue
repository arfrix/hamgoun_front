<template>
<!-- eslint-disable -->
    <div class="bio-main">
        <div class="col-m-10 tab-row-container">
            <div  class="card" @click="tabClicked(0)">
                <img :src="getImgUrl(this.bioCardDetail[0].img)" alt="" class="card-icon c0">
                <h6 class="card-lable">{{this.bioCardDetail[0].name}}</h6>
            </div>
            <div  class="card" @click="tabClicked(1)">
                <img :src="getImgUrl(this.bioCardDetail[1].img)" alt="" class="card-icon c1">
                <h6 class="card-lable">{{this.bioCardDetail[1].name}}</h6>
            </div>
            <div  class="card" @click="tabClicked(2)">
                <img :src="getImgUrl(this.bioCardDetail[2].img)" alt="" class="card-icon c2">
                <h6 class="card-lable">{{this.bioCardDetail[2].name}}</h6>
            </div>
            <div  class="card" @click="tabClicked(3)">
                <img :src="getImgUrl(this.bioCardDetail[3].img)" alt="" class="card-icon c3">
                <h6 class="card-lable">{{this.bioCardDetail[3].name}}</h6>
            </div>
        </div>

        <div class="col-m-10 inputs-container" >
            <div v-for="(item,name,index) in this.bioInputPlaceHolders[this.tab]" @click="inputClicked(index)" :key="item" :class="inputContainerStyle(bioInputSideLight[index])" >
                <h3 v-if="bioPlaceHolderToShow[index]" :class="placeHolder(isFilled[index])">{{item}}</h3>
                <input type="text" v-bind:id="bioInputId[index]"  v-model="bioFieldData[index]" class="col-m-9 input">
            </div>
        </div>

        <div v-if="tab !== '' && !is_other_user_bio" @click="update()" class="col-m-1-7 submit-btn">
            <h4 class="btn-lable">ثبت</h4>
        </div>

    </div>

</template>

<script>

export default {
  name: 'aboutMe',
  components: {
  },
  props: [
    'is_other_user_bio', 'profile'
  ],
  data () {
    return {
      tab: '',
      tt: 'sd',
      bioCardDetail: [
        { img: 'icons/edu1.png', name: 'تحصیلات' },
        { img: 'icons/suitcase2.png', name: 'کار' },
        { img: 'icons/translation2.png', name: 'زبون' },
        { img: 'icons/maps-and-flags2.png', name: 'محل سکونت' }
      ],
      bioInputPlaceHolders: [
        { q1: 'کدوم دبیرستان درس خوندی ؟', q2: 'کدوم دانشگاهی ؟', q3: 'راستی رشتت چیه بود ؟' },
        { q1: 'شغلت چیه ؟', q2: 'کجا کار میکنی ؟' },
        { q1: 'زبان مادریت چیه ؟', q2: 'گویش محلی ای بلدی ؟', q3: 'دومین زبونی که بلدی چیه ؟' },
        { q1: 'بچه کجایی ؟', q2: 'تو کدوم کشور زندگی میکنی ؟', q3: 'کدوم شهری ؟' }
      ],
      bioFieldData: [null, null, null],
      bioInputId: ['in1', 'in2', 'in3'],
      bioPlaceHolderToShow: [true, true, true],
      bioInputSideLight: [false, false, false],
      isFilled: [false, false, false],
      propertiesName: [
        ['edu_highSchool', 'edu_univercity', 'edu_subject'],
        ['work_job', 'work_company'],
        ['languge_motherTongue', 'languge_dialect', 'languge_secondLangName'],
        ['location_motherTown', 'location_livingCountry', 'location_livingTown']

      ]

    }
  },
  mounted () {

  },

  methods: {

    // tip src binding!!!!
    getImgUrl (path) {
      return require('../../assets/' + path)
    },
    tabClicked (index) {
      this.tab = index
      this.isFilled.fill(false)
      this.bioInputSideLight.fill(false)
      this.bioFieldData.fill(null)
      this.bioPlaceHolderToShow.fill(true)
      switch (index) {
        case 0:
          this.bioEduCheck()
          break

        case 1:
          this.bioJobCheck()
          break

        case 2:
          this.bioLanguageCheck()
          break

        case 3:
          this.bioLocationCheck()
          break
      }
    },
    inputClicked (index) {
      if (!this.is_other_user_bio) {
        if (index === 0) {
          this.bioInputSideLight.fill(false)
          this.$set(this.bioInputSideLight, 0, true)
          this.$set(this.bioPlaceHolderToShow, 0, false)
          document.getElementById('in1').focus()
          document.getElementById('in2').blur()
          document.getElementById('in3').blur()
        } else {
          if (index === 1) {
            this.bioInputSideLight.fill(false)
            this.$set(this.bioInputSideLight, 1, true)
            this.$set(this.bioPlaceHolderToShow, 1, false)
            document.getElementById('in2').focus()
            document.getElementById('in1').blur()
            document.getElementById('in3').blur()
          } else {
            this.bioInputSideLight.fill(false)
            this.$set(this.bioInputSideLight, 2, true)
            this.$set(this.bioPlaceHolderToShow, 2, false)
            document.getElementById('in3').focus()
            document.getElementById('in2').blur()
            document.getElementById('in1').blur()
          }
        }
      }
    },
    inputContainerStyle (isSelected) {
      if (isSelected) {
        return {
          'selected-input-card': true,
          'col-m-8': true
        }
      } else {
        return {
          'input-card': true,
          'col-m-8': true

        }
      }
    },
    placeHolder (toShow) {
      if (this.is_other_user_bio || toShow) {
        return {
          'other-user-placeHolder': true
        }
      } else {
        return {
          'placeHolder': true
        }
      }
    },
    bioEduCheck () {
      //! -----------------------------------------------------------------
      /* eslint-disable */
      //!-----------------------------------------------------------------
      console.log('!!!!!!!')
      console.log(this.profile[this.propertiesName[0]])

      if (this.profile.edu_highSchool != undefined) {
        this.bioInputPlaceHolders[0].q1 = this.profile.edu_highSchool
        this.$set(this.isFilled, 0, true)
      }
      if (this.profile.edu_univercity != undefined) {
        this.bioInputPlaceHolders[0].q2 = this.profile.edu_univercity
        this.$set(this.isFilled, 1, true)
      }
      if (this.profile.edu_subject != undefined) {
        this.bioInputPlaceHolders[0].q3 = this.profile.edu_subject
        this.$set(this.isFilled, 2, true)
      }
    },
    bioJobCheck () {
      if (this.profile.work_job != undefined) {
        this.bioInputPlaceHolders[1].q1 = this.profile.work_job
        this.$set(this.isFilled, 0, true)
      }
      if (this.profile.work_company != undefined) {
        this.bioInputPlaceHolders[1].q2 = this.profile.work_company
        this.$set(this.isFilled, 1, true)
      }
    },
    bioLanguageCheck () {
      if (this.profile.languge_motherTongue != undefined) {
        this.bioInputPlaceHolders[2].q1 = this.profile.languge_motherTongue
        this.$set(this.isFilled, 0, true)
      }
      if (this.profile.languge_dialect != undefined) {
        this.bioInputPlaceHolders[2].q2 = this.profile.languge_dialect
        this.$set(this.isFilled, 1, true)
      }
      if (this.profile.languge_secondLangName != undefined) {
        this.bioInputPlaceHolders[2].q3 = this.profile.languge_secondLangName
        this.$set(this.isFilled, 2, true)
      }
    },
    bioLocationCheck () {
      if (this.profile.location_motherTown != undefined) {
        this.bioInputPlaceHolders[3].q1 = this.profile.location_motherTown
        this.$set(this.isFilled, 0, true)
      }
      if (this.profile.location_livingCountry != undefined) {
        this.bioInputPlaceHolders[3].q2 = this.profile.location_livingCountry
        this.$set(this.isFilled, 1, true)
      }
      if (this.profile.location_livingTown != undefined) {
        this.bioInputPlaceHolders[3].q3 = this.profile.location_livingTown
        this.$set(this.isFilled, 2, true)
      }
    },
    update () {
      this.bioFieldData.forEach((element, index) => {
        if (element != null) {
          this.profile[this.propertiesName[this.tab][index]] = this.bioFieldData[index]
        }
      })
      console.log(this.profile)
      console.log(this.profile)
      this.$store.dispatch('update_user_profile', this.profile)
      // this.$store.dispatch('update_user_profile', [{ propName: 'edu_highSchool', value: this.f1Input }, { propName: 'edu_univercity', value: this.f2Input }, { propName: 'edu_subject', value: this.f3Input }])
    }

  },
  computed: {
  }
}
</script>
<style scoped src='../../assets/styles/p3/bioStyle.css'>
</style>
