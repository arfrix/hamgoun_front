<template>
    <div class="login-main-container" :style="{height:height + 'px'}">

      <!-- <img src="../../assets/images/backGround/bc2.png" alt="" class="login-bc"> -->
        <div  class="logo-container">
          <img src="../../assets/logo.png" alt="" class="col-m-5 logo">
        </div>

        <div class="col-m-7 text-wellcoming-container">
          <h3 class="sent1">سلام</h3>
          <h5 class="sent2"> ^__^ چه خوب که باز برگشتی پیشمون</h5>
        </div>
        <div class="col-m-10 inputs-container">
          <div class="col-m-7 input-container userName" @click="inputSelected(1)">
              <h5 :class="placeHolderStyle(input1_isSelected)">نام کاربری</h5>
              <input  type="text" v-model="userNameInput" id="userNameInputId" class="input" autocomplete="off">
              <div :class="line(input1_isSelected)"></div>

          </div>
          <div class="col-m-7 input-container pass" @click="inputSelected(2)">
              <h5 :class="placeHolderStyle(input2_isSelected)">رمز عبور</h5>
              <input  type="text" v-model="passInput" id="passInputId" class="input" autocomplete="off" >
              <div :class="line(input2_isSelected)"></div>
          </div>
        </div>
        <div class="col-m-7 nav-container">
            <div class=" gotoRegister-button" @click="gotoRegister()">
                <h3 class="gotoRegister-button-lable"> ثبت نام نکردی ؟</h3>
            </div>
            <div class=" gotoForgetPass-button" @click="gotoForgetPass()">
                <h3 class="gotoForgetPass-button-lable"> فراموشی رمز عبور ؟</h3>
            </div>
        </div>
        <div v-if="showError" class="col-m-10 errorMessage-contaner">
            <h3 class="error-message">! یکدومشون اشتباه وارد کردی</h3>
        </div>
        <div v-if="!this.$store.state.waitingForLogin" class="col-m-2 button" @click="login()">
            <h3 class="button-lable">ورود</h3>
        </div>
        <div v-if="this.$store.state.waitingForLogin" class="col-m-2 button" >
            <h3 class="button-waiting-lable"><h6>.</h6><h6>.</h6><h6>.</h6></h3>
        </div>
    </div>

</template>

<script>

export default {
  name: 'login',
  data () {
    return {
      height: '',
      userNameInput: '',
      passInput: '',
      input1_isSelected: false,
      input2_isSelected: false,
      showError: false
    }
  },
  beforeMount () {
    this.height = window.innerHeight
    console.log(window.innerHeight)
  },

  methods: {
    login () {
      console.log(this.userNameInput + ' -- ' + this.passInput)

      this.$store.dispatch('login', { userName: this.userNameInput, pass: this.passInput }).then(() => {
        // this.$store.dispatch('fetch_home_page_cards',{'FollowerId':this.$store.state.userId,'MainCategory':1,'SubCategory':1})
        this.$store.dispatch('fetch_user_profile_data', this.$store.state.userId)
      }).then(() => {
        console.log(this.$store.state.userId)
        if (this.$store.state.userPassLogin) { this.$router.push('/home') } else {
          this.showError = true
        }
      })
    },
    line (isSelected) {
      if (isSelected) {
        return {
          'selected-line': true
        }
      } else {
        return {
          'unSelected-line': true
        }
      }
    },
    placeHolderStyle (isSelected) {
      if (isSelected) {
        return {
          'placeHolder': true,
          'selected-placeHolder': true
        }
      } else {
        return {
          'placeHolder': true,
          'unSelected-placeHolder': true
        }
      }
    },
    inputSelected (witchOne) {
      if (witchOne === 1) {
        this.input1_isSelected = true
        this.input2_isSelected = false
        console.log('jj')
        document.getElementById('userNameInputId').focus()
        document.getElementById('passInputId').blur()
      } else {
        this.input2_isSelected = true
        this.input1_isSelected = false
        console.log('bb')
        document.getElementById('passInputId').focus()
        document.getElementById('userNameInputId').blur()
      }
    },
    gotoRegister () {
      this.$router.push('/register')
    }

  },
  computed: {

  }
}
</script>
<style scoped src='../../assets/styles/p0/loginStyle.css'>
</style>
