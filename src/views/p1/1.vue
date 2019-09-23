<template>
<div class="main">

    <div class="row topRow">

      <list :isTopRound=true ></list>

    </div>
    <div id="tt" class="row bottomRow">

      <!-- <div class="private-mode">
          <div  class="card-container">

          </div>
      </div> -->

      <div class="public-mode">
          <div class="campain-section">
            <div class="section-lable-container">
                <h3 class="section-lable">کمپین ها</h3>
            </div>
              <div class="list">
                  <campainCard name="راه من" cat="کار و بار"></campainCard>
              </div>
              <div class="col-m-9 devider-line"></div>
          </div>
          <div class="hotTopic-section">
            <div class="section-lable-container">
                <h3 class="section-lable">جیلیز ویلیز</h3>
            </div>
              <div class="card-container">
                  <!-- <miniCard class="col-m-3"  kind=0 imgUrl="images/cardImage2.jpg" title="فیلم maz runner" category="طراحی" username="mandora" duration="" text="این فیلم رو اولین بار تو دوران منم و در کنکور دیدم یادمه تو اون زمان خیل وقت برا این کارا نبود که بشه اینطوری سر در  "></miniCard> -->
                  <div v-if="!this.$store.state.waiteFor_fetch_jilizViliz_cards" class="col-m-10 card-container list" >
                    <div v-for="item in this.$store.state.jilizViliz_cards" :key="item.id"  @click="goto_postPage(item)">
                        <miniCard   :kind="item.kind" :imgUrl="item.coverImgUrl" :title="item.title" :subCategory="item.subCategory" :mainCategory="item.mainCategory" :username="item.publisherUsername" duration="" :text="item.postSummary" ></miniCard>
                    </div>
                </div>
                <div  v-else class="col-m-6 waitin-lable-container">
                    <h1 class="col-m-10 waiting-lable"> ... پستا تو راهن  </h1>
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
                  <div v-if="!this.$store.state.waiteFor_fetch_jilizViliz_cards" class="col-m-10 card-container list" >
                    <div v-for="item in this.$store.state.jilizViliz_cards" :key="item.id"  @click="goto_postPage(item)">
                        <miniCard   :kind="item.kind" :imgUrl="item.coverImgUrl" :title="item.title" :subCategory="item.subCategory" :mainCategory="item.mainCategory" :username="item.publisherUsername" duration="" :text="item.postSummary" ></miniCard>
                    </div>
                </div>
                <div  v-else class="col-m-6 waitin-lable-container">
                    <h1 class="col-m-10 waiting-lable"> ... پستا تو راهن  </h1>
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

export default {
  name: '1',
  components: {

    list,
    miniCard,
    campainCard
  },
  beforeMount () {
    // this.$store.dispatch('fetch_home_page_cards',{'FollowerId':1,'MainCategory':1,'SubCategory':1})
    this.$store.dispatch('fetch_jilizViliz_cards')
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
      cardsSeenSituation: []
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
      this.$store.dispatch('actChangeMainCategory', -1)
      this.$store.dispatch('actSetTheListToShow', { level: 1, index: '' })
    },
    onScroll () {
      this.currentWindowBottomPosition = window.pageYOffset + window.innerHeight
      this.cardsSeenSituation.forEach((element, index) => {
        if (!element) {
          if (this.currentWindowBottomPosition > document.getElementById(`${index + 1}`).offsetTop + document.getElementById(`${index + 1}`).offsetHeight) {
            console.log(index)
            this.$set(this.cardsSeenSituation, index, true)
          }
        }
      })
    },
    getOffSetTop (id) {

    },
    fetchPost () {
      console.log('ppp')
      this.$store.dispatch('fetch_home_page_cards')
    },
    goto_postPage (data) {
      this.$router.push({ name: 'postPage', params: { postData: data } })
    }

  }
}
</script>
<style scoped src='../../assets/styles/p1/1style.css'>
</style>
