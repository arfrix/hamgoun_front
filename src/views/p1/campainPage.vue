<template>
  <div class="main">
    <div class="campain-details-container">
      <div class="campain-tile-container">
        <h3 class="campain-title">{{campainTitle}}</h3>
      </div>
      <div class="campain-description-container">
        <h3 class="campain-description">{{campainDescription}}</h3>
      </div>
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

    <navigation></navigation>
  </div>
</template>

<script>
export default {
  name: 'campainPage',
  components: {},

  data () {
    return {
      campainTitle: 'راه من',
      campainDescription:
        'خب توی ای کمپین میخوای درمورد مسیری که توی طی کردی از پیدا کردن شغل تا مسائل محیط کار رو بهمون بگی'
    }
  }
}
</script>
<style scoped src='../../assets/styles/p1/campainPageStyle.css'>
</style>
