<template>
<div class="main">

    <popup v-if="isShowLoginPopup" @btn_clicked="goToLogin_onClicked()" msg="نیازه یبار وارد حسابت بشی ، چون الان نمیدونیم تو کی هستی "></popup>
    <div class="row topRow">

      <list :isTopRound=true @subCatDefine="defineSubCat" @mainCatDefine="defineMainCat"></list>

    </div>
    <div id="tt" class="row bottomRow">
        <div class="header">
            <div class="round-bc">
                <h3 class="header-lable">قالب ها</h3>
            </div>
        </div>
        <div  class="card-container">
            <div v-if="mainCat != null && !isShowLoginPopup" class="card-container">

                <div v-for="(card,name) in templates[mainCat][0]" :key="card" @click="goToEdither(card)" class="col-m-3 template-card">
                    <h3 class="card-lable">{{name}}</h3>
                </div>
            </div>
            <div v-if="mainCat ==null" class="card-container">

                    <h3 class="warning-lable">هنوز دسته بندی ای رو انتخاب نکردی ! </h3>

            </div>
        </div>

    </div>
<v-tour name="list" :steps="steps1" :callbacks="callbacks" :options="myOptions"></v-tour>
<v-tour name="template" :steps="steps2" :callbacks="callbacks" :options="myOptions"></v-tour>
<navigation></navigation>
</div>

</template>

<script>

import list from '../../components/global/categoryList'
import popup from '../../components/global/msgPopup'

export default {
  name: 'addPost',
  components: {
    popup,
    list
  },
  beforeMount () {
    this.$store.dispatch('actSetWitch_route_we_are', 10)
  },

  mounted () {
    if (localStorage.getItem('addPostFirstTourFinished') !== 'true') { this.$tours['list'].start() }
    if (localStorage.userId === undefined || localStorage.userName === undefined) {
      this.isShowLoginPopup = true
    }
    // console.log(this.templates[this.mainCat][this.subCat])
  },
  beforeDestroy () {

  },
  data () {
    return {
      cardkind: [1, 2],

      templates: [
        // edu
        [
          {
            'خالی': '! با خودت باش'
            // 'چطوری علاقه ام رو پیدا کردم': 'ttt',
            // 'چطوری کار پیدا کنم': 'ttt',
            // 'تو رزومم چیا نوشتم': 'ttt',
            // 'تو مصاحبه ها چی گذشت': 'ttt',
            // 'سرکار چه خبره': 'ttt'

          }

        ],
        // art
        [
          {
            'خالی': '! با خودت باش'

          }

        ],
        // bussines
        [
          {
            'خالی': '! با خودت باش'

          }

        ],
        // tech
        [
          {
            'خالی': '! با خودت باش'

          }

        ],
        // life
        [
          {
            'خالی': '! با خودت باش'

          }

        ],
        // society
        [
          {
            'خالی': '! با خودت باش'

          }

        ],
        // sience
        [
          {
            'خالی': '! با خودت باش'

          }

        ]

      ],
      mainCat: null,
      subCat: null,
      isShowLoginPopup: false,
      myOptions: {
        useKeyboardNavigation: false,
        labels: {
          buttonSkip: 'بیخیال',
          buttonPrevious: 'قبلی',
          buttonNext: 'اها',
          buttonStop: 'اها'
        }
      },
      steps1: [
        {
          target: '.mainCategory-container-bordered',
          header: {
            title: '! عمیق شو'
          },
          content: `میتونی اسکرول کنی از بین دسته ها اونی که پستت بهش میخوره رو پیدا کنی`
        }
      ],
      steps2: [
        {
          target: '.template-card',
          header: {
            title: 'قالبش چی باشه'
          },
          content: `برای اینکه یه پست رو شروع کنی میتونی یکی از قالب ها رو انتخاب کنی`
        }
      ],
      callbacks: {
        onStop: this.myCustomStopCallback
      }

    }
  },
  destroyed () {
    this.$store.dispatch('actChangeMainCategory', -1)
    this.$store.dispatch('actChangeSubCategory', -1)
  },
  methods: {
    myCustomStopCallback (currentStep) {
      localStorage.setItem('addPostFirstTourFinished', true)
      if (localStorage.getItem('addPostFirstTourFinished') === 'true') { localStorage.setItem('addPostSecondTourFinished', true) }
    },
    // tip src binding!!!!
    getImgUrl (path) {
      return require('../../assets/' + path)
    },
    clicked () {

    },
    onScroll () {

    },
    getOffSetTop (id) {

    },
    fetchPost () {
      this.$store.dispatch('fetch_home_page_cards')
    },
    goToEdither (temp) {
      console.log('temp')
      console.log(temp)
      this.$store.dispatch('create_post', { MainCategory: this.mainCat, SubCategory: this.subCat }).then(() => {
        this.$router.push({ name: 'edither', params: { template: temp, MainCategory: this.mainCat, isDraft: false, skipPostFetch: true } })
      })
    },
    defineMainCat (val) {
      if (localStorage.getItem('addPostSecondTourFinished') !== 'true') { this.$tours['template'].start() }
      this.mainCat = val
      console.log(val)
    },
    defineSubCat (val) {
      this.subCat = val
      console.log(val)
      console.log(this.templates[this.mainCat][this.subCat])
    },
    goToLogin_onClicked () {
      this.$router.push('/landing')
    }

  }
}
</script>
<style scoped src='../../assets/styles/p5/addPostStyle.css'>
</style>
