<template>
<div class="main">

    <div class="row topRow">

      <list :isTopRound=true ></list>

    </div>
    <div id="tt" class="row bottomRow">
      <!-- <div v-for="(card,index) in this.$store.state.cards" :key="index" class="card-container"> -->
      <div  class="card-container">
          <card class="col-m-9"  kind=1 imgUrl="images/cardImage2.jpg" title="فیلم maz runner" category="طراحی" username="mandora" duration="خواندن 3 دقیقه" text="این فیلم رو اولین بار تو دوران منم و در کنکور دیدم یادمه تو اون زمان خیل وقت برا این کارا نبود که بشه اینطوری سر در  " ></card>
          <!-- <card :id="card.id" :num="index" :userName="card.publisherUsername" :title="card.title" :summery="card.postSummary" :seenComplete="cardsSeenSituation[index]"  :kind="1"></card> -->
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
  components: {
    card,
    list
  },
  beforeMount () {

  },

  mounted () {

  },
  beforeDestroy () {

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

    },
    onScroll () {

    },
    getOffSetTop (id) {

    },
    fetchPost () {
      this.$store.dispatch('fetch_home_page_cards')
    }

  }
}
</script>
<style scoped src='../../assets/styles/p1/1style.css'>
</style>
