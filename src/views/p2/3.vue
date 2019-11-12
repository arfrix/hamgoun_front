<template>
  <div class="post-main-container" ref="text" @scroll="onScroll()">
    <!-- <writeComment v-if="this.showPopUp" :v-model="content"></writeComment> -->
    <transition name="fade">
      <div v-if="showCommentInput" class="col-m-10 input-comment-container">
        <h3 class="col-m-1-5 submit" @click="submitComment">ثبت</h3>
        <form v-on:submit="submitComment" class="col-m-8-3">
          <textarea
            v-model="commentText"
            type="text"
            rows="5"
            placeholder="اممم ..."
            ref="commentInputRef"
            id="commentInput"
            class="col-m-10 input-comment"
          ></textarea>
        </form>
      </div>
    </transition>
    <!-- //! let screen blur -->
    <!-- <div :class="toBlurStyle(this.showPopUp)"> -->

    <div class="row top-section">
      <div class="col-m-6-7 gap"></div>
      <h4
        class="col-m-2 usename"
        @click="gotoProfile"
      >{{this.$store.state.postData.publisherUsername}}</h4>

      <div id="top_section" class="col-m-1-5 circle-img-div" @click="gotoProfile">
        <img
          :src="'http://45.82.136.106:8080/images/'+ this.$store.state.postData.publisherProfileImg"
          alt
          class="img profile-img"
        />
      </div>
    </div>
    <div class="col-m-10 title-container">
      <h2 class="title">{{this.$store.state.postData.title}}</h2>
    </div>

    <div id="middel_section" class="row middel-section">
      <div class="ql-editor">
        <div class="ttt" v-html="this.$store.state.postData.body"></div>
      </div>
    </div>

    <div class="row bottom-section">
      <!-- <div infinite-wrapper>
                <div style="overflow: auto;">
                    <infinite-loading force-use-infinite-wrapper="true" @infinite="infiniteHandler"></infinite-loading>
                </div>
      </div>-->
      <div id="topOfBottomSection" class="row bottom-section-top-section">
        <div  class="col-m-4-5">
          <!-- <div class="custom-gap"></div>  -->
          <div v-if="this.show" class="col-m-3-5 hoy-bia-benevis" @click="writeComment()">
            <h4 class="hoy-bia-benevis-text">نظرت چیه ؟</h4>
          </div>
        </div>

        <div class="col-m-4-5 rate-number-container" @click="showRatingPopUp">
          <h3 class="rateNumber">{{this.fillterRateNumber(this.$store.state.postData.postRate)}}</h3>
          <img :src="mizounImgUrl(submitRate)" class="rateImg" />
        </div>

        <!-- //! share icone
               <div class="col-m-0-8 img-div">
                   <img src="./../../assets/icons/share3.png" alt="" class="img img-icon">
               </div>
        -->
      </div>
      <transition name="ratingPopUp">
        <div v-if="isShowRatingPopUp" class="rating-container">
          <img :src="mizounImgUrl(isRating[4])" @click="rating(5)" class="miz1" />
          <img :src="mizounImgUrl(isRating[3])" @click="rating(4)" class="miz2" />
          <img :src="mizounImgUrl(isRating[2])" @click="rating(3)" class="miz3" />
          <img :src="mizounImgUrl(isRating[1])" @click="rating(2)" class="miz4" />
          <img :src="mizounImgUrl(isRating[0])" @click="rating(1)" class="miz5" />

          <h2 class="votesCount">{{this.$store.state.postData.judgesCount}}</h2>
          <h2 class="voteLable">رای</h2>
          <div class="close-btn" @click="closeRatingPopUp()">
            <img src="../../assets/icons/delete-button.png" alt class="close-btn-img" />
          </div>
        </div>
      </transition>
      <div id="bottom_section_devider" class="col-m-8-5 devider-line"></div>
      <!--//tip agar bind nakony miad props ro be sorat string mifreste   -->
      <div class="col-m-10 comments-container">
        <div v-if="this.$store.state.waitingForComments" class="col-m-10 waiting-msg-container">
          <h3 class="waiting-msg"> ... کامنتا دارن میان</h3>
        </div>
        <div v-if="!this.$store.state.waitingForComments">
          <div
            v-for="comment in this.$store.state.commentsList"
            :key="comment.id"
            class="col-m-10 looper"
          >
            <coment
              v-bind:id="comment.id"
              :publisherId="comment.publisherId"
              :parentCommentId="comment.parentCommentId"
              :isBig="!comment.isReply"
              :username="comment.publisherUsername"
              :imgUrl="comment.publisherImg"
              :comment="comment.commentText"
              @isReply="toReply"
              :namizoun="comment.namizoun"
              :mizoun="comment.mizoun"
            ></coment>
          </div>
        </div>
        <!-- <coment :isBig="true"  username="hajji" imgUrl="" comment="سلام این ازمایش متنایتی برای کامنت می باشد که فلان است و بیسار که در جریان ان" ></coment>
                <coment :isBig="false" username="sosora" imgUrl="" comment="سلام این ازمایش متنایتی برای کامنت می باشد که فلان است و بیسار که در جریان ان" ></coment>
        <coment :isBig="true"  username="ash_moh" imgUrl="" comment="سلام این ازمایش متنایتی برای کامنت می باشد که فلان است و بیسار که در جریان ان" ></coment>-->
      </div>
    </div>

    <navigation id="navigation_bar"></navigation>
  </div>
  <!-- </div> -->
</template>

<script>
import coment from './../../components/p2/coment'

//! in chiv bedard bokhorie bara list hamon!!!!!!----------------------------------
// import InfiniteLoading from 'vue-infinite-loading'

// import writeComment from '../../components/p2/writeComment'

export default {
  name: '3',
  props: {
    isFetch: {
      type: Boolean,
      default: true
    },

    uniqueUrl: {
      type: String
    }
  },

  beforeMount () {
    if (this.isFetch) {
      this.$store.dispatch('fetchPostData', this.uniqueUrl).then(() => {
        if (document.getElementById('bottom_section_devider').offsetTop < (window.innerHeight - document.getElementById('navigation_bar').scrollHeight)) { this.show = true }

        this.$store.dispatch('fetchComments', this.$store.state.postData.id)
      })
    } else {
      this.$store.dispatch('fetchComments', this.$store.state.postData.id)
    }
  },
  mounted () {
    this.$store.dispatch('addHamegyry', { postId: this.$store.state.postData.id })
    console.log('enter mounted')
    window.addEventListener('scroll', this.onScroll)
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.onScroll)
  },
  data () {
    return {
      show: false,
      showPopUp: false,
      showCommentInput: false,
      commentText: '',
      isReply: false,
      isComment: false,
      parentCommentId: '',
      isRating: [false, false, false, false, false],
      submitRate: false,
      isShowRatingPopUp: false,
      isFetchComment: false,
      ParentCommentPublisherId: '',
      postRate: this.$store.state.postData.postRate
    }
  },
  components: {
    // InfiniteLoading,
    coment
    // writeComment
  },

  methods: {
    onScroll () {
      const currentScrollPosition =
        window.pageYOffset || document.documentElement.scrollTop

      // tip console.log(currentScrollPosition + window.innerHeight)
      // tip console.log("WINDOW HEIGHT => " + window.innerHeight)
      // tip console.log("body HEIGHT => " + document.body.offsetHeight)
      // tip console.log("test HEIGHT => " + document.getElementById('test').offsetTop)

      if (
        currentScrollPosition + window.innerHeight >=
        document.getElementById('topOfBottomSection').offsetTop
      ) {
        this.show = true
      } else {
        this.show = false
      }
    },
    writeComment () {
      this.showCommentInput = true
      this.isComment = true
      // tip in $nextTick chize khafanie va migeke chizi ke to mane zamany ejra mishe ke DOM update shode bashe va man goftam ke agha vaghty input ghashang render shod bia focus kon roush
      // tip khorak karayy hast ke mikhay bad za show ya fade ye lement anjam bedy
      this.$nextTick(() => {
        document.getElementById('commentInput').focus()
      })
    },
    toBlurStyle (is) {
      if (is) {
        return {
          toBlur: true
        }
      } else {
        return {}
      }
    },
    submitComment () {
      console.log(this.$store.state.postData)
      console.log(this.commentText)
      if (this.isComment) {
        this.$store.dispatch('submitComment', {
          PostId: this.$store.state.postData.id,
          CommentText: this.commentText,
          postPublisherId: this.$store.state.postData.publisherId
        })
      }
      if (this.isReply) {
        this.$store.dispatch('submitCommentReply', {
          PostId: this.$store.state.postData.id,
          CommentText: this.commentText,
          parentCommentId: this.parentCommentId,
          postPublisherId: this.$store.state.postData.publisherId,
          ParentCommentPublisherId: this.ParentCommentPublisherId
        })
      }
    },
    toReply (val) {
      console.log('555555555555555555')
      console.log(val)
      this.showCommentInput = true
      this.isReply = true
      this.parentCommentId = val.parentCommentId
      this.ParentCommentPublisherId = val.ParentCommentPublisherId
    },
    mizounImgUrl (isClicked) {
      if (isClicked) {
        return require('../../assets/icons/selectedMizoun.png')
      } else {
        return require('../../assets/icons/unSelectedMizoun.png')
      }
    },
    rating (index) {
      this.$store.dispatch('updatePostRateOffline', { submitedRate: index, url: this.uniqueUrl })
      this.$store
        .dispatch('submitRating', {
          PostId: this.$store.state.postData.id,
          rate: index,
          publisherId: this.$store.state.postData.publisherId
        })
        .then(() => {
          this.submitRate = true
          setTimeout(() => {
            this.isShowRatingPopUp = false
          }, 200)
        })
      for (let i = 0; i < index; i++) {
        console.log(index)
        this.$set(this.isRating, i, true)
      }
      for (let i = 4; i >= index; i--) {
        console.log('--')
        this.$set(this.isRating, i, false)
      }
    },
    fillterRateNumber (num) {
      return num.toFixed(2)
    },
    showRatingPopUp () {
      this.isShowRatingPopUp = true
    },
    closeRatingPopUp () {
      this.isShowRatingPopUp = false
    },
    gotoProfile () {
      this.$router.push({
        name: 'myProfile',
        params: {
          me: false,
          id: this.$store.state.postData.publisherId
        }
      })
    }
  }
}
</script>
<style scoped src='../../assets/styles/p2/3style.css'>
</style>
