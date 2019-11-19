<template>
  <div class="main">
    <popup v-if="isShowLoginPopup" @btn_clicked="goToLogin_onClicked()" msg="نیازه یبار وارد حسابت بشی ، چون الان نمیدونیم کیا رو پیگیری میکنی "></popup>
    <div class="row topRow">
      <list :isTopRound="true" @mainCatDefine="defineMainCat"></list>
    </div>
    <div id="tt" class="row bottomRow">
      <div class="private-or-public-btn-container" @click="changeMode(1)">
        <img :src="getImgUrl(witchModeImg)" alt class="mode-Img" />

        <h3 class="mode-lable">{{modeLable}}</h3>
      </div>

      <div v-if="isPrivate" class="private-mode">
        <div v-if="!isCatSelected" class="not-selected-cat-warn">
            <h3 class="warn-lable"> ): هیچ دسته بندی ای رو انتخاب نکردی </h3>
        </div>
        <div v-if="!this.$store.state.wait_for_fetch_home_page_private_mode_cards && isCatSelected" class="bigCard-container">
          <div
            v-for="item in this.$store.state.cards.data"
            :key="item.id"
            @click="goto_postPage(item)"
          >
            <bigCard
              class="col-m-9"
              :kind="item.kind"
              :type="item.postType"
              :imgUrl="item.coverImgUrl"
              :title="item.title"
              :subCategory="item.subCategory"
              :mainCategory="item.mainCategory"
              :username="item.publisherUsername"
              duration
              :text="item.postSummary"
            ></bigCard>
          </div>
          <div v-if="!this.$store.state.cards.status" class="show-server-msg-container">
              <h3 class="server-msg">{{this.$store.state.cards.massage}}</h3>
          </div>
        </div>
        <div v-if="this.$store.state.wait_for_fetch_home_page_private_mode_cards && isCatSelected" class="waiting-lable-container">
            <h3 class="waiting-lable">... پستا تو راهن</h3>
        </div>
      </div>

      <div v-if="!isPrivate" class="public-mode">
        <div class="campain-section">
          <div class="section-lable-container">
            <h3 class="section-lable">کمپین ها</h3>
          </div>
          <div class="list">
            <div @click="gotoCampainPage()">
              <campainCard name="راه من" cat="کار و بار"></campainCard>
            </div>
          </div>
          <div class="col-m-9 devider-line"></div>
        </div>
        <div class="hotTopic-section">
          <div class="section-lable-container">
            <h3 class="section-lable">جیلیز ویلیز</h3>
          </div>
          <div class="card-container">
            <!-- <miniCard class="col-m-3"  kind=0 imgUrl="images/cardImage2.jpg" title="فیلم maz runner" category="طراحی" username="mandora" duration="" text="این فیلم رو اولین بار تو دوران منم و در کنکور دیدم یادمه تو اون زمان خیل وقت برا این کارا نبود که بشه اینطوری سر در  "></miniCard> -->
            <div
              v-if="!this.$store.state.waiteFor_fetch_jilizViliz_cards"
              class="col-m-10 card-container list"
            >
              <div
                v-for="item in this.$store.state.jilizViliz_cards"
                :key="item.id"
                @click="goto_postPage(item)"
              >
                <miniCard
                  :kind="item.kind"
                  :type="getTypeLable(item.postType , item.mainCategory)"
                  :imgUrl="item.coverImgUrl"
                  :title="item.title"
                  :subCategory="item.subCategory"
                  :mainCategory="item.mainCategory"
                  :username="item.publisherUsername"
                  duration
                  :text="item.postSummary"
                ></miniCard>
              </div>
            </div>
            <div v-else class="col-m-6 waitin-lable-container">
              <h1 class="col-m-10 waiting-lable">... پستا تو راهن</h1>
            </div>
          </div>
          <div class="col-m-9 devider-line"></div>
        </div>
        <div class="fullDiscusion-section">
          <div class="section-lable-container">
            <h3 class="section-lable">پچ پچ</h3>
          </div>
          <div class="card-container">
            <!-- //! bayad jilizviliz o hamrahash ba  fullDiscusion jabeja beshan-->
            <div
              v-if="!this.$store.state.waitFor_fullDiscusion_cards"
              class="col-m-10 card-container list"
            >
              <div
                v-for="item in this.$store.state.fullDiscusion_cards"
                :key="item.id"
                @click="goto_postPage(item)"
              >
                <miniCard
                  :kind="item.kind"
                  :type="getTypeLable(item.postType , item.mainCategory)"
                  :imgUrl="item.coverImgUrl"
                  :title="item.title"
                  :subCategory="item.subCategory"
                  :mainCategory="item.mainCategory"
                  :username="item.publisherUsername"
                  duration
                  :text="item.postSummary"
                ></miniCard>
              </div>
            </div>
            <div v-else class="col-m-6 waitin-lable-container">
              <h1 class="col-m-10 waiting-lable">... پستا تو راهن</h1>
            </div>
          </div>
          <!-- <div class="col-m-9 devider-line"></div> -->
        </div>
      </div>
    </div>

    <navigation></navigation>
  </div>
</template>

<script>
import campainCard from '../../components/global/campainCard'
import miniCard from '../../components/global/miniCard'
import list from '../../components/global/categoryList'
import bigCard from '../../components/global/card'
import popup from '../../components/global/msgPopup'

export default {
  name: '1',
  components: {
    list,
    miniCard,
    campainCard,
    bigCard,
    popup
  },
  beforeMount () {
    // this.$store.dispatch('fetch_home_page_cards',{'FollowerId':1,'MainCategory':1,'SubCategory':1})
    this.$store.dispatch('fetch_jilizViliz_cards', this.mainCat)
    this.$store.dispatch('fetch_fullDiscusion_cards', this.mainCat)
  },

  mounted () {
    this.$store.dispatch('actSetTheListToShow', { level: 1, index: '' })
    window.addEventListener('scroll', this.onScroll)
    this.$store.state.cards.forEach(element => {
      this.cardsSeenSituation.push(false)
    })
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.onScroll)
  },
  data () {
    return {
      cardkind: [1, 2],
      currentWindowBottomPosition: '',
      cardsSeenSituation: [],
      isPrivate: false,
      modeLable: 'نمایش پست های پیگیری شده ',
      witchModeLable: 0,
      witchModeImg: 'icons/chain.png',
      isCatSelected: false,
      mainCat: -1,
      isShowLoginPopup: false
    }
  },
  destroyed () {
    this.$store.dispatch('actChangeMainCategory', -1)
    this.$store.dispatch('actChangeSubCategory', -1)
  },
  computed: {

  },
  methods: {
    // tip src binding!!!!
    getImgUrl (path) {
      return require('../../assets/' + path)
    },
    defineMainCat (val) {
      this.mainCat = val
      this.isCatSelected = true
      if (this.isPrivate) {
        this.$store.dispatch('fetch_home_page_private_mode_cards', { layer: 125, mainCategory: this.mainCat })
      } else {
        this.$store.dispatch('fetch_jilizViliz_cards', this.mainCat)
        this.$store.dispatch('fetch_fullDiscusion_cards', this.mainCat)
      }
    },
    clicked () {
      this.$store.dispatch('actChangeMainCategory', -1)
      this.$store.dispatch('actSetTheListToShow', { level: 1, index: '' })
    },
    onScroll () {
      this.currentWindowBottomPosition =
        window.pageYOffset + window.innerHeight
      this.cardsSeenSituation.forEach((element, index) => {
        if (!element) {
          if (
            this.currentWindowBottomPosition >
            document.getElementById(`${index + 1}`).offsetTop +
              document.getElementById(`${index + 1}`).offsetHeight
          ) {
            console.log(index)
            this.$set(this.cardsSeenSituation, index, true)
          }
        }
      })
    },
    getOffSetTop (id) {},
    fetchPost () {
      console.log('ppp')
      this.$store.dispatch('fetch_home_page_cards')
    },
    goto_postPage (data) {
      this.$store.dispatch('actSetPostData', data).then(() => {
        this.$router.push({
          name: 'postPage',
          params: { uniqueUrl: data.uniqueUrl, isFetch: false }
        })
      })
    },
    gotoCampainPage () {
      console.log('****')
      this.$router.push('/campainPage')
    },
    changeMode (depth) {
      if (localStorage.userId === undefined || localStorage.userName === undefined) {
        this.isShowLoginPopup = true
      } else {
        if (this.isPrivate) {
          this.isPrivate = false

          this.witchModeImg = 'icons/chain.png'
        } else {
          this.isPrivate = true
          this.witchModeImg = 'icons/yellowChain.png'
          //! begin value of depth is one !
          this.$store.dispatch('fetch_home_page_private_mode_cards', { layer: depth, mainCategory: this.mainCat })
        }
      }
    },
    getTypeLable (type, mainCategory) {
      if (this.mainCat === -1) {
        return this.$store.state.mainCategoryList[mainCategory].name
      } else {
        return type
      }
    },
    goToLogin_onClicked () {
      this.$router.push('/landing')
    }

  }
}
</script>
<style scoped src='../../assets/styles/p1/1style.css'>
</style>
