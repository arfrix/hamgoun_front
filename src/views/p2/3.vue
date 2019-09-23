<template>
    <div class="post-main-container" ref="text" @scroll="onScroll()">

        <writeComment v-if="this.showPopUp" :v-model="content"></writeComment>

    <div :class="toBlurStyle(this.showPopUp)">

        <div  class="row top-section">

            <div class="col-m-6-7 gap"></div>
            <h4 class="col-m-2 usename">{{postData.publisherUsername}}</h4>

            <div class="col-m-1-5 circle-img-div">
                <img :src="'http://45.82.136.106:8080/images/'+ postData.publisherProfileImg" alt="" class="img profile-img">
            </div>
        </div>
        <div class="col-m-10 title-container">
            <h2 class="title">{{postData.title}}</h2>
        </div>

        <div class="row middel-section">
            <div class="ql-editor">
              <div class="ttt" v-html="postData.body"></div>

            </div>
        </div>

        <div class="row bottom-section">
            <!-- <div infinite-wrapper>
                <div style="overflow: auto;">
                    <infinite-loading force-use-infinite-wrapper="true" @infinite="infiniteHandler"></infinite-loading>
                </div>
            </div>  -->
           <div class="row bottom-section-top-section">
               <div  id="test" class="col-m-8">
                <!-- <div class="custom-gap"></div>  -->
                   <div v-if="this.show" class="col-m-3-5 hoy-bia-benevis" @click="writeComment()">
                       <h4 class="hoy-bia-benevis-text">نظرت چیه ؟</h4>
                   </div>
               </div>

              <!-- //! share icone
               <div class="col-m-0-8 img-div">
                   <img src="./../../assets/icons/share3.png" alt="" class="img img-icon">
               </div>
               -->

           </div>
           <div class="col-m-8-5 devider-line"></div>
            <!--//tip agar bind nakony miad props ro be sorat string mifreste   -->
           <div class="comments-container">
                <coment :isBig="true"  username="hajji" imgUrl="" comment="سلام این ازمایش متنایتی برای کامنت می باشد که فلان است و بیسار که در جریان ان" ></coment>
                <coment :isBig="false" username="sosora" imgUrl="" comment="سلام این ازمایش متنایتی برای کامنت می باشد که فلان است و بیسار که در جریان ان" ></coment>
                <coment :isBig="true"  username="ash_moh" imgUrl="" comment="سلام این ازمایش متنایتی برای کامنت می باشد که فلان است و بیسار که در جریان ان" ></coment>
            </div>

        </div>
    </div>
        <navigation></navigation>
    </div>

</template>

<script>

import coment from './../../components/p2/coment'

//! in chiv bedard bokhorie bara list hamon!!!!!!----------------------------------
// import InfiniteLoading from 'vue-infinite-loading'

import writeComment from '../../components/p2/writeComment'

export default {
  name: '3',
  props: ['postData'],
  mounted () {
    window.addEventListener('scroll', this.onScroll)
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.onScroll)
  },
  data () {
    return {
      show: false,
      showPopUp: false
    }
  },
  components: {
    // InfiniteLoading,
    coment,
    writeComment
  },

  methods: {
    onScroll () {
      const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop

      // tip console.log(currentScrollPosition + window.innerHeight)
      // tip console.log("WINDOW HEIGHT => " + window.innerHeight)
      // tip console.log("body HEIGHT => " + document.body.offsetHeight)
      // tip console.log("test HEIGHT => " + document.getElementById('test').offsetTop)
      console.log(currentScrollPosition)
      console.log(window.innerHeight)
      console.log(document.getElementById('test').offsetTop)
      if (currentScrollPosition + window.innerHeight >= document.getElementById('test').offsetTop) { this.show = true } else { this.show = false }
    },
    writeComment () {
      this.showPopUp = true
    },
    toBlurStyle (is) {
      if (is) {
        return {
          toBlur: true
        }
      } else {
        return {

        }
      }
    }

  }
}
</script>
<style scoped src='../../assets/styles/p2/3style.css'>
</style>
