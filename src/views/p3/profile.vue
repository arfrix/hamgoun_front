
<template>

    <div class="profile-main-div" :style="{height:height + 'px'}">
        <transition name="fade">
            <div v-if="!witchTab[1]" class="top-section">
                <img src="../../assets/images/backGround/profile4.png" class="top-section-bc-img">
                <div class="col-m-10 two-icon-container">
                    <img src="../../assets/icons/settings.png" alt="" class="two-icon-img1">
                    <img src="../../assets/icons/paper-plane.png" alt="" class="two-icon-img2">
                </div>
                <div class="col-m-10 top-section-text">
                    <div class="profile-img-container" @click="profileImg()">
                        <img :src="getImgUrl(this.profileData.profileImgUrl)"  alt="" class="img">
                    </div>
                    <div class="username-container">
                        <h4 class="username">{{this.profileData.userName}}</h4>
                    </div>
                    <div class="col-m-4 data-container">
                        <div class="follower-section">
                            <h3 class="number">1</h3>
                            <h3 class="follower-section-lable">دنبال کننده</h3>
                        </div>
                        <div class="viewed-section">
                            <h3 class="number">1</h3>
                            <h3 class="viewed-section-lable">بازدید</h3>
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
                        <img  src="../../assets/icons/user.png" alt="" class="tap-icon">
                        <div v-if="this.witchTab[0]" class="colored-line"></div>
                    </div>
                    <div class="tab2-div"  @click="tabNavigate(1)">
                        <img  src="../../assets/icons/posts.png" alt="" class="tap-icon">
                        <div v-if="this.witchTab[1]" class="colored-line"></div>
                    </div>
                </div>

              </div>
            </div>

            <div class="bottom-section">
              <bio v-if="witchTab[0]" :is_other_user_profile="false" :profile="profileData"></bio>
              <myContent v-if="witchTab[1]"></myContent>
            </div>
      </div>
        <navigation></navigation>
    </div>

</template>

<script>

import bio from '../../components/p3/bio'
import myContent from '../../components/p3/myContent'
import Axios from 'axios'

export default {
  name: 'profile',
  components: {
    bio, myContent
  },
  props: [
    'profile', 'is_other_user_profile'
  ],
  data () {
    return {
      witchTab: [true, false],
      show_topSection: true,
      profileData: ''

    }
  },

  beforeMount () {
    this.height = window.innerHeight

    if (this.is_other_user_profile) {
      this.profileData = this.profile
    } else {
      this.$store.dispatch('fetch_user_profile_data', this.$store.state.userId).then(() => {
        this.profileData = this.$store.state.user_profile_data
      })
    }
    this.$store.dispatch('actSetWitch_route_we_are', 12)
  },

  methods: {
    getImgUrl (path) {
      return 'http://45.82.136.106:8080/images/' + path
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
    profileImg () {
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
          response = await Axios.post('http://45.82.136.106:8080/Images/upload', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }

          })
          console.log('img response')
          console.log('http://45.82.136.106:8080/images/' + response.data)
        } catch (error) {

        }

        this.profileData.profileImgUrl = response.data
        this.$store.dispatch('update_user_profile', this.profileData)
      }
    }

  }
}
</script>
<style scoped src='../../assets/styles/p3/profileStyle.css'>
</style>
