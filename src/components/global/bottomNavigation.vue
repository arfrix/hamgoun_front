<template>
<div class="main-navigation">
    <div :class="tab1Style(this.$store.state.witch_route_we_are)" @click="gotoHome()">خانه</div>
    <div :class="tab2Style(this.$store.state.witch_route_we_are)" @click="gotoExplore()">کاوش</div>
    <div :class="tab3Style(this.$store.state.witch_route_we_are)" @click="gotoAddPost()">پست</div>
    <!-- <div :class="tab5Style(this.$store.state.witch_route_we_are)" @click="gotoChat()">چت</div> -->

    <div :class="tab4Style(this.$store.state.witch_route_we_are)" @click="gotoProfile()">
      <div v-if="!this.$store.state.isNotifSeen && this.$store.state.newNotifCount > 0 && this.$store.state.newNotifCount != NaN" class="notifNumberContainer">
        <p>{{this.$store.state.newNotifCount}}</p>
      </div>
      <p>پروفایل</p>
    </div>
</div>

</template>

<script>

export default {
  name: 'bottomNavigation',
  data () {
    return {

    }
  },

  methods: {

    gotoHome () {
      this.$store.dispatch('actSetWitch_route_we_are', 1)
      this.$router.push('/home')
      this.$store.dispatch('actChangeSubCategoryList', false)
      this.$store.dispatch('actChangeMainCategory', -1)
      this.$store.dispatch('actChangeSubCategory', -1)
    },
    gotoExplore () {
      this.$router.push('/explorer')
      this.$store.dispatch('actSetWitch_route_we_are', 6)
    },
    gotoAddPost () {
      this.$router.push('/addPost')
      this.$store.dispatch('actSetWitch_route_we_are', 10)
    },
    gotoProfile () {
      if (localStorage.getItem('userId') === undefined) {
        //! super shity and kesafat
        this.$router.push({ name: 'myProfile', params: { me: true, id: -1 } })
      } else {
        this.$store.dispatch('actSetWitch_route_we_are', 12)
        this.$router.push({ name: 'myProfile', params: { me: true, id: localStorage.getItem('userId'), isFetchNeed: true } })
        // this.$router.push({ name: 'profile', params: { profile: undefined, is_other_user_profile: false } })
        // this.$store.dispatch('actChangeSubCategoryList', false)
      }
    },
    gotoChat () {
      this.$router.push('/chat')
      this.$store.dispatch('actSetWitch_route_we_are', 5)
    },

    tab1Style (route) {
      if (route === 1) {
        return {
          tab: true,
          'one': true
        }
      } else {
        return {
          tab: true
        }
      }
    },
    tab2Style (route) {
      if (route === 6) {
        return {
          tab: true,
          'two': true
        }
      } else {
        return {
          tab: true
        }
      }
    },
    tab3Style (route) {
      if (route === 10) {
        return {
          tab: true,
          'three': true
        }
      } else {
        return {
          tab: true
        }
      }
    },
    tab4Style (route) {
      if (route === 12) {
        return {
          tab: true,
          'four': true
        }
      } else {
        return {
          tab: true
        }
      }
    },
    tab5Style (route) {
      if (route === 5) {
        return {
          tab: true,
          'five': true
        }
      } else {
        return {
          tab: true
        }
      }
    }

  }
}
</script>
<style scoped src='../../assets/styles/bottomNavigationStyle.css'>
</style>
