<template>
<div class="main">

    <div class="row topRow">

      <list :isTopRound=false @subCatDefine="defineSubCat" @mainCatDefine="defineMainCat"></list>

    </div>
    <div id="tt" class="row bottomRow">
        <div class="header">
            <div class="round-bc">
                <h3 class="header-lable">قالب</h3>
            </div>
        </div>
        <div  class="card-container">
            <div v-if="mainCat !=null && subCat != null " class="card-container">

                <div v-for="(card,name) in templates[mainCat][subCat]" :key="card" @click="goToEdither(card)" class="col-m-3 template-card">
                    <h3 class="card-lable">{{name}}</h3>
                </div>
            </div>
            <div v-if="mainCat ==null || subCat == null " class="card-container">

                    <h3 class="warning-lable">هنوز دسته بندی ای رو انتخاب نکردی ! </h3>

            </div>
        </div>

    </div>

<navigation></navigation>
</div>

</template>

<script>

import list from '../../components/global/categoryList'

export default {
  name: 'addPost',
  components: {

    list
  },
  beforeMount () {
    this.$store.dispatch('actSetWitch_route_we_are', 10)
  },

  mounted () {
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
            'خالی': '! با خودت باش',
            'چطوری علاقه ام رو پیدا کردم': 'ttt',
            'چطوری کار پیدا کنم': 'ttt',
            'تو رزومم چیا نوشتم': 'ttt',
            'تو مصاحبه ها چی گذشت': 'ttt',
            'سرکار چه خبره': 'ttt'

          },
          {
            empty: ''

          },
          {
            empty: ''

          }

        ],
        // art
        [
          {
            empty: ''

          },
          {
            empty: ''

          },
          {
            empty: ''

          }

        ],
        // bussines
        [
          {
            empty: ''

          },
          {
            empty: ''

          },
          {

            'خالی': 'ttt',
            'چطوری علاقه ام رو پیدا کردم': 'ttt',
            'چطوری کار پیدا کنم': 'ttt',
            'تو رزومم چیا نوشتم': 'ttt',
            'تو مصاحبه ها چی گذشت': 'ttt',
            'سرکار چه خبره': 'ttt'

          },
          {
            empty: ''

          },
          {
            empty: ''

          }
        ],
        // tech
        [
          {
            empty: ''

          },
          {
            empty: ''

          },
          {
            empty: ''

          }

        ],
        // life
        [
          {
            empty: ''

          },
          {
            empty: ''

          },
          {
            empty: ''

          }

        ],
        // society
        [
          {
            empty: ''

          },
          {
            empty: ''

          },
          {
            empty: ''

          }

        ],
        // sience
        [
          {
            empty: ''

          },
          {
            empty: ''

          },
          {
            empty: ''

          }

        ]

      ],
      mainCat: null,
      subCat: null

    }
  },
  destroyed () {
    this.$store.dispatch('actChangeMainCategory', -1)
    this.$store.dispatch('actChangeSubCategory', -1)
  },
  methods: {
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
      this.$store.dispatch('create_post', { MainCategory: this.mainCat, SubCategory: this.subCat }).then(() => {
        this.$router.push({ name: 'edither', params: { template: temp } })
      })
    },
    defineMainCat (val) {
      this.mainCat = val
      console.log(val)
    },
    defineSubCat (val) {
      this.subCat = val
      console.log(val)
      console.log(this.templates[this.mainCat][this.subCat])
    }

  }
}
</script>
<style scoped src='../../assets/styles/p5/addPostStyle.css'>
</style>
