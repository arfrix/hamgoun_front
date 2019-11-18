<template>
<div class="main">

    <div v-if="this.$store.state.waitForSearchResult" class="waiting-container">
        <h3>درحال کاوش </h3>
    </div>

    <div class="row topRow">
        <div class="col-m-10 searchBar-container" @click="serachInputonClick()">
            <img v-if="!writting" src="../../assets/icons/magnifying-glass.png" alt="" class="search-icon">
            <h3 v-if="!writting" class="input-placeHolder">کاوش</h3>
            <form v-on:submit="search" class="col-m-7-7">
                <input type="text" v-model="searchKeyword"  id="search" class="col-m-9-5 search-input">
            </form>
            <div v-if="writting" class="search-btn" @click="search">
                کاوش
            </div>
        </div>

        <div class="col-m-10 switch-container">
            <h3 class="switch-lable">کاوش بین</h3>
            <div class="col-m-3 gap"></div>
            <div :class="switchStyle(1)" @click="switchClicked(1)">
                <h5 class="switch-btn-lable">کاربران</h5>
            </div>
            <div :class="switchStyle(2)" @click="switchClicked(2)">
                <h5 class="switch-btn-lable">پست ها</h5>
            </div>
        </div>

      <list :isTopRound=false :bioMode=this.isSwitchClicked[0] @subCatDefine="defineSubCat" @mainCatDefine="defineMainCat" @bioDefine="defineBio"></list>

    </div>
    <div id="tt" class="row bottomRow">

      <div  class="card-container">
          <div v-if="isSwitchClicked[1] && showResult">
                <div v-if="this.$store.state.contentSearch_result.status" class="post-loop-container" >
                    <div v-for="item in this.$store.state.contentSearch_result.data" :key="item.id"  @click="goto_postPage(item)">
                    <postCard  class="col-m-9"  :kind="item.kind" :type="getTypeLable(item.postType , item.mainCategory)" :imgUrl="item.coverImgUrl" :title="item.title" :subCategory="item.subCategory" :mainCategory="item.mainCategory" :username="item.publisherUsername" duration="" :text="item.postSummary" ></postCard>
                   </div>
                </div>
                <div  v-else>
                    <h1>{{this.$store.state.contentSearch_result.massage}}</h1>
                </div>
          </div>
          <div v-if="isSwitchClicked[0] && showResult" >

                <div v-if="this.$store.state.userSearch_result.status" class="col-m-10 user-loop-container" >
                    <div v-for="item in this.$store.state.userSearch_result.data" :key="item.id" class="test" @click="visit_other_user_profile(item)">

                    <userCard   :imgUrl="item.profileImgUrl" :username="item.userName" ></userCard>
                    </div>
                </div>
                <div  v-else>
                    <h1>{{this.$store.state.userSearch_result.massage}}</h1>
                </div>
          </div>
      </div>

    </div>

<navigation></navigation>
</div>

</template>

<script>

import postCard from '../../components/global/card'
import userCard from '../../components/p4/userCard'
import list from '../../components/p4/explorerCategoryList'

export default {
  name: 'explorer',
  components: {
    postCard,
    userCard,
    list
  },
  beforeMount () {
    this.$store.dispatch('actSetWitch_route_we_are', 6)
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
      isSwitchClicked: [false, true],
      writting: false,
      mainCat: -1,
      subCat: -1,
      bio: -1,
      searchKeyword: '',
      showResult: false
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
    defineMainCat (val) {
      this.mainCat = val
    },
    defineSubCat (val) {
      this.subCat = val
    },
    defineBio (val) {
      this.bio = val
    },
    search () {
      // alert("dd")
      this.showResult = true
      console.log(this.searchKeyword)
      // USER
      if (this.isSwitchClicked[0]) {
        this.$store.dispatch('fetch_UserSearch', { keyword: this.searchKeyword, bio: this.bio })
      }
      // POST
      if (this.isSwitchClicked[1]) {
        this.$store.dispatch('fetch_contentSearch', { keyword: this.searchKeyword, mainCat: this.mainCat })
      }
    },
    fetchPost () {
      this.$store.dispatch('fetch_home_page_cards')
    },
    switchClicked (index) {
      if (index === 1) {
        this.$set(this.isSwitchClicked, 0, true)
        this.$set(this.isSwitchClicked, 1, false)
      } else {
        this.$set(this.isSwitchClicked, 1, true)
        this.$set(this.isSwitchClicked, 0, false)
      }
    },
    switchStyle (witchOne) {
      if (witchOne === 1) {
        if (this.isSwitchClicked[0]) {
          return {
            'switch-btn-selected': true
          }
        } else {
          return {
            'switch-btn': true
          }
        }
      } else {
        if (this.isSwitchClicked[1]) {
          return {
            'switch-btn-selected': true
          }
        } else {
          return {
            'switch-btn': true
          }
        }
      }
    },
    serachInputonClick () {
      this.writting = true

      // tip chon ta rendere hazf shodan placeholder o oun chiza kamel anjam nashe focuse neshon dadae nemishe
      // tip ehtamalan focus mishe amma belafasele badesh be chize dige focus mishe
      this.$nextTick(() => {
        document.getElementById('search').focus()
      })
    },
    visit_other_user_profile (profile) {
      console.log('profile')
      this.$router.push({ name: 'myProfile', params: { profile: profile, me: false, id: profile.id } })
    },
    goto_postPage (data) {
      this.$store.dispatch('actSetPostData', data).then(() => {
        this.$router.push({ name: 'postPage', params: { uniqueUrl: data.uniqueUrl, isFetch: false } })
      })
    },
    getTypeLable (type, mainCategory) {
      if (this.mainCat === -1) {
        return this.$store.state.mainCategoryList[mainCategory].name
      } else {
        return type
      }
    }

  }
}
</script>
<style scoped src='../../assets/styles/p4/explorerStyle.css'>
</style>
