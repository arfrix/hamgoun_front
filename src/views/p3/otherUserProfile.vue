
<template>
  <div class="profile-main-div" :style="{height:height + 'px'}">
    <popup v-if="isShowLoginPopup" @btn_clicked="goToLogin_onClicked()" msg="نیازه یبار وارد حسابت بشی ، چون الان نمیدونیم پروفایل کی رو باید نشون بدیم " class="popup"></popup>
    <transition name="notif-transition">
      <div v-if="isShowNotifSidebar" class="notif-side-bar">
        <div class="notif-lable-container">
          <h3 class="notif-lable">رخداد ها</h3>
        </div>
        <div class="close-btn" @click="isShowNotifSidebar = false">
            <img src="../../assets/icons/delete-button.png" alt class="close-btn-img" />
        </div>

        <div class="notif-list-looper">
          <div v-for="item in this.$store.state.notifications" :key="item.id" class="notif-card">
            <div class="notif-profile-img-container">
              <img :src="getImgUrl(item.actorImgUrl)" alt class="img" />
            </div>
            <div class="notif-card-text">
              <h3 class="notif-card-title">{{(item.actorUsername)}}</h3>
              <h3 v-if="item.isComment" class="notif-action">برا پستت کامنت گذاشت</h3>
              <h3 v-if="item.isCommentReply" class="notif-action">به کامنتت جواب داد</h3>
              <h3 v-if="item.isMizoun" class="notif-action">به کامنتت میزون داد</h3>
              <h3 v-if="item.isNamizoun" class="notif-action">به کامنتت نامیزون داد</h3>
              <h3 v-if="item.isPostRating" class="notif-action">به پستت امتیاز داد</h3>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <transition name="fade">
      <div v-if="!witchTab[1]" class="top-section">
        <img src="../../assets/images/backGround/profile4.png" class="top-section-bc-img" />
        <div class="col-m-10 two-icon-container">

        </div>
        <div class="col-m-10 top-section-text">
          <div class="profile-img-container">
            <img :src="getImgUrl(this.profileData.profileImgUrl)" alt class="profile-img" />
            <img
              v-if="false"
              src="../../assets/icons/plus.png"
              alt
              class="profile-img-add-btn"
              @click="profileImg()"
            />
          </div>
          <div class="username-container">
            <h4 class="username">{{this.profileData.userName}}</h4>
          </div>
          <div class="col-m-4 data-container">
            <div class="follower-section">
              <h3 class="number">{{hamegyry(this.profileData.hamegyry)}}</h3>
              <h3 class="follower-section-lable">همه گیری</h3>
            </div>
            <div class="viewed-section">
              <h3 class="number">00:00</h3>
              <h3 class="viewed-section-lable">همراهی</h3>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <div :class="animateContainer()">
      <div class="middle-section">
        <div class="row tab-section">
          <div class="col-m-9 devider-line"></div>
          <div class="tabs-div">
            <div class="tab1-div" @click="tabNavigate(0)">
              <img src="../../assets/icons/user.png" alt class="tap-icon" />
              <div v-if="this.witchTab[0]" class="colored-line"></div>
            </div>
            <div class="tab2-div" @click="tabNavigate(1)">
              <img src="../../assets/icons/posts.png" alt class="tap-icon" />
              <div v-if="this.witchTab[1]" class="colored-line"></div>
            </div>
          </div>
        </div>
    </div>

    <div class="bottom-section">
        <bio v-if="witchTab[0]" :is_other_user_bio="true" :profile="profileData"></bio>
        <myContent v-if="witchTab[1]" :is_other_user_content="isOtherUser()" :Id="id"></myContent>
    </div>

    </div>
    <navigation></navigation>
  </div>
</template>

<script>
import bio from '../../components/p3/bio'
import myContent from '../../components/p3/myContent'
import Axios from 'axios'
import popup from '../../components/global/msgPopup'

export default {
  name: 'otherUserProfile',
  components: {
    bio,
    myContent,
    popup
  },
  props: {
    profile: {
      default: undefined
    },
    me: {
      default: false
    },
    id: {
      type: Number,
      default: -1
    },
    isFetchNeed: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      witchTab: [true, false],
      show_topSection: true,
      profileData: '',
      isShowNotifSidebar: false,
      isShowLoginPopup: false
    }
  },

  beforeMount () {
    console.log('on beforeMount')
    this.height = window.innerHeight

    if (this.isFetchNeed) {
      this.$store.dispatch('fetch_other_user_profile_data', this.id).then(() => {
        this.profileData = this.$store.state.other_user_profile_data
      })
    } else {
      this.profileData = this.profile
    }
  },
  mounted () {
    console.log('on Mounted')
  },

  methods: {
    isOtherUser () {
      if (!this.me) {
        if (this.id === parseInt(localStorage.userId)) {
          console.log('11')
          return false
        } else {
          console.log('22')
          return true
        }
      } else {
        console.log('33')
        return false
      }
    },
    getImgUrl (path) {
      return 'http://45.82.136.106:8080/images/' + path
    },
    hamegyry (num) {
      if (num === undefined) {
        return 0
      } else {
        return num
      }
    },

    tabNavigate (tabNum) {
      this.show_topSection = false

      // tip bara ye meghdar yeky dadan be ye array
      this.witchTab.fill(false)
      // tip baraye array ham bayad mese obj ha az $set estefade kony
      this.$set(this.witchTab, tabNum, true)
      // this.witchTab[tabNum]=true
    },
    animateContainer () {
      if (this.witchTab[1]) {
        return {
          'animat-container-to-up': true
        }
      } else {
        return {
          'animat-container-to-down': true
        }
      }
    },
    showNotif () {
      if (!this.isShowLoginPopup) {
        this.isShowNotifSidebar = true
        this.$store.dispatch('fetchNotif')
      }
    },
    goToLogin_onClicked () {
      this.$router.push('/landing')
    },
    profileImg () {
      if (!this.is_other_user_profile) {
        const input = document.createElement('input')

        input.setAttribute('type', 'file')
        input.setAttribute('accept', 'image/*')
        input.click()

        input.onchange = async () => {
          const file = input.files[0]
          const formData = new FormData()
          formData.append('file', file)

          let response = ''
          try {
            console.log('55555')
            response = await Axios.post(
              'http://45.82.136.106:8080/Images/upload',
              formData,
              {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
              }
            )
            console.log('img response')
            console.log('http://45.82.136.106:8080/images/' + response.data)
          } catch (error) {}

          this.profileData.profileImgUrl = response.data
          this.$store.dispatch('update_user_profile', this.profileData)
        }
      }
    }
  }
}
</script>
<style scoped src='../../assets/styles/p3/otherUserProfileStyle.css'>
</style>
