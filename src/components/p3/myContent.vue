<template>
<div class="my-content-main">

    <div class="col-m-10 row topRow">

      <list :isTopRound=true  @mainCatDefine="defineMainCat" ></list>

    </div>
    <div id="tt" class="col-m-10 row bottomRow">

      <div v-if="is_other_user_content && showPostList" class="col-m-4 follow-btn" @click="follow">
          <h3 class="btn-lable">پیگیر شو</h3>
      </div>
      <!-- <div v-for="(card,index) in this.$store.state.cards" :key="index" class="card-container"> -->
      <div  class="col-m-9-5 card-container">
        <div v-if="showPostList && this.$store.state.my_postsList.status && !this.$store.state.waitFor_fetch_my_postList" class="column-direction">
            <div v-for="item in this.$store.state.my_postsList.data" :key="item.id" @click="goto_postPage(item)" class="column-direction">
                <card :key="item.id" class="col-m-9"  :kind="item.kind" :type="item.postType" :imgUrl="item.coverImgUrl" :title="item.title" :mainCategory="item.mainCategory" :username="item.publisherUsername" duration="" :text="item.postSummary" ></card>
            </div>
        </div>
        <div v-else>
            <div v-if="!this.$store.state.my_postsList.status && !this.$store.state.waitFor_fetch_my_postList" class="error-container">
                <h3 v-if="mainCat != -1" class="error-lable">): هنوز چیزی اینجا نذاشته </h3>
                <h3 v-if="mainCat == -1" class="error-lable">هنوز دسته ای رو انتخاب نکردی</h3>
            </div>

        </div>

            <div >
                <h3 class="waiting-lable" v-if="this.$store.state.waitFor_fetch_my_postList"> ... یه لحظه  </h3>
            </div>

      </div>

    </div>

<navigation></navigation>
</div>

</template>

<script>

import card from '../../components/global/card'
import list from '../../components/global/categoryList'

export default {
  name: 'myContent',
  props: [
    'is_other_user_content', 'Id'
  ],
  components: {
    card,
    list
  },
  beforeMount () {

    // this.$store.dispatch('fetch_home_page_cards',{'FollowerId':1,'MainCategory':1,'SubCategory':1})
    // this.$store.dispatch('fetch_post_data',5)

  },

  mounted () {

  },
  beforeDestroy () {

  },
  data () {
    return {
      cardkind: [1, 2],
      currentWindowBottomPosition: '',
      cardsSeenSituation: [],
      showPostList: false,
      mainCat: -1,
      subCat: -1,
      showWaiting: ''
    }
  },
  destroyed () {
    this.$store.dispatch('actChangeMainCategory', -1)
    // this.$store.dispatch('actChangeSubCategory', -1)
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
    defineMainCat (val) {
      this.mainCat = val
      this.$store.dispatch('fetch_my_postList', { publisherId: this.Id, mainCategory: this.mainCat }).then(() => {
        this.showPostList = true
      })
    },
    defineSubCat (val) {
      this.subCat = val
      //! buuuuuug publisherId may be for other users
    },
    goto_postPage (data) {
      this.$store.dispatch('actSetPostData', data).then(() => {
        this.$router.push({ name: 'postPage', params: { uniqueUrl: data.uniqueUrl, isFetch: false } })
      })
    },
    follow () {
      this.$store.dispatch('follow', { followedId: this.Id, mCat: this.mainCat, sCat: this.subCat }).then(() => {
        alert('followed')
      })
    }

  }
}
</script>
<style scoped src='../../assets/styles/p3/myContentstyle.css'>
</style>
