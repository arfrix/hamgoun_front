<template>
  <div class="capain-page-main">
    <div class="col-m-9-4 campain-details-container">
      <div class="col-m-10 campain-tile-container">
        <h3 class="campain-title">{{campainTitle}}</h3>
      </div>
      <div class="col-m-10 campain-description-container">
        <h3 class="campain-description">{{campainDescription}}</h3>
      </div>
    </div>
    <div class="card-container">
      <!-- <miniCard class="col-m-3"  kind=0 imgUrl="images/cardImage2.jpg" title="فیلم maz runner" category="طراحی" username="mandora" duration="" text="این فیلم رو اولین بار تو دوران منم و در کنکور دیدم یادمه تو اون زمان خیل وقت برا این کارا نبود که بشه اینطوری سر در  "></miniCard> -->
      <div
        v-if="!this.$store.state.waiteFor_fetch_jilizViliz_cards"
        class="col-m-9-4 card-container"
      >
        <div
          v-for="item in this.$store.state.jilizViliz_cards"
          :key="item.id"
          @click="goto_postPage(item)"
        >
          <card
            :kind="item.kind"
            :imgUrl="item.coverImgUrl"
            :title="item.title"
            :subCategory="item.subCategory"
            :mainCategory="item.mainCategory"
            :username="item.publisherUsername"
            :text="item.postSummary"
          ></card>
        </div>
      </div>
      <div v-else class="col-m-10 waitin-lable-container">
        <h1 class="col-m-10 waiting-lable">... پستا تو راهن</h1>
      </div>
    </div>

    <navigation></navigation>
  </div>
</template>

<script>

import card from '../../components/global/card'
export default {
  name: 'campainPage',
  components: { card },

  data () {
    return {
      campainTitle: 'راه من',
      campainDescription:
        'خب توی ای کمپین میخوای درمورد مسیری که توی طی کردی از پیدا کردن شغل تا مسائل محیط کار رو بهمون بگی'
    }
  },
  beforeMount () {
    // this.$store.dispatch('fetch_home_page_cards',{'FollowerId':1,'MainCategory':1,'SubCategory':1})
    this.$store.dispatch('fetch_jilizViliz_cards')
  },
  methods: {
    goto_postPage (data) {
      this.$store.dispatch('actSetPostData', data).then(() => {
        this.$router.push({ name: 'postPage', params: { uniqueUrl: data.uniqueUrl, isFetch: false } })
      })
    }
  }
}
</script>
<style scoped src='../../assets/styles/p1/campainPageStyle.css'>
</style>
