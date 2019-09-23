<template>
 <div class="landing-main-container" :style="{height:height + 'px' , width:width + 'px'}">

        <img class="col-m-10 bc-img" src="./../../assets/images/backGround/bc2.png" alt="">
        <div class="abs-container">
            <div class="col-m-5 logo-container">
                <img src="../../assets/logo.png"  class="logo">
            </div>
            <div class="col-m-8 text-container">
                <h4 class="name">همگون</h4>
                <h4 class="text">جهانی که برای تو ساخته شده تا نمی دونم یه چیزی که مارو برسونه به فلان</h4>
            </div>

                <div class="col-m-4 login-button" @click="gotologin()">
                    <h4 class="login-button-lable">ورود</h4>
                </div>
                <div class="col-m-4 register-button" @click="gotoregister()">
                    <h4 class="register-button-lable">ثبت نام</h4>
                </div>

            <!-- <div class="our-story-button">
                 <h4 class="login-button-lable">داستان ما</h4>
            </div> -->
        </div>
</div>

</template>

<script>

export default {
  name: 'landing',
  data () {
    return {
      height: '',
      width: ''
    }
  },
  beforeMount () {
    this.height = window.innerHeight
    this.width = window.innerWidth
    console.log(window.innerHeight)
  },

  methods: {
    gotologin () {
      this.$router.push('/login')
    },
    gotoregister () {
      this.$router.push('/register')
    }
  }
}
</script>
<style scoped src='../../assets/styles/p0/landingStyle.css'>
</style>
