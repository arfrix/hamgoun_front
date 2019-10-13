<template>
    <div class="login-main-container" :style="{height:height + 'px'}">

      <!-- <img src="../../assets/images/backGround/iPhone 6-7-8 Plus – 84.png" alt="" class="login-bc"> -->
        <div  class="logo-container">
          <img src="../../assets/logo.png" alt="" class="col-m-5 logo">
        </div>

        <div class="col-m-7 text-wellcoming-container">
          <h3 class="sent1">خوش اومدی</h3>
          <h5 class="sent2"> ^__^ تا دنیای همگون فقط چند قدم مونده</h5>
        </div>

        <div class="col-m-10 inputs-container">
            <div class="col-m-7 input-container email" @click="inputSelected(3)">
                <h5 :class="placeHolderStyle(input3_isSelected)">ایمیل</h5>
                <input  type="text" v-model="emailInput" id="emailInputId" class="input" autocomplete="off">
                <div :class="line(input3_isSelected)"></div>

            </div>
            <div class="col-m-7 input-container userName" @click="inputSelected(1)">
                <h5 :class="placeHolderStyle(input1_isSelected)">نام کاربری</h5>
                <input  type="text" v-model="userNameInput" id="userNameInputId" class="input" autocomplete="off">
                <div :class="line(input1_isSelected)"></div>

            </div>
            <div class="col-m-7 input-container pass" @click="inputSelected(2)">
                <h5 :class="placeHolderStyle(input2_isSelected)">رمز عبور</h5>
                <input  type="text" v-model="passInput" id="passInputId" class="input" autocomplete="off">
                <div :class="line(input2_isSelected)"></div>
                <img v-if="input2_isSelected" src="../../assets/icons/view.png" alt="" class="passEye" @click="changePassVisiblity()">
            </div>
        </div>
        <div v-if="showError" class="col-m-10 errorMessage-contaner">
            <h3 class="error-message">{{this.$store.state.userRegisterErrorMsg}}</h3>
        </div>
        <div v-if="!this.$store.state.waitingForRegister" class="col-m-2 button" @click="register()">
            <h3 class="button-lable">ثبت نام</h3>
        </div>
        <div v-if="this.$store.state.waitingForRegister" class="col-m-2 button" >
            <h3 class="button-waiting-lable"><h6>.</h6><h6>.</h6><h6>.</h6></h3>
        </div>

    </div>

</template>

<script>

export default {
  name: 'regster',
  data () {
    return {
      height: '',
      emailInput: '',
      userNameInput: '',
      passInput: '',
      input1_isSelected: false,
      input2_isSelected: false,
      input3_isSelected: false,
      showError: false
    }
  },
  beforeMount () {
    this.height = window.innerHeight
    console.log(window.innerHeight)
  },

  methods: {
    register () {
      this.input2_isSelected = false
      this.$store.dispatch('register', { email: this.emailInput, userName: this.userNameInput, pass: this.passInput }).then(() => {
        // this.$store.dispatch('fetch_home_page_cards',{'FollowerId':this.$store.state.userId,'MainCategory':1,'SubCategory':1})

      }).then(() => {
        if (this.$store.state.userPassRegister) { this.$router.push('/home') } else { this.showError = true }
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
        this.input3_isSelected = false

        document.getElementById('userNameInputId').focus()
        document.getElementById('passInputId').blur()
        document.getElementById('emailInputId').blur()
      } else
      if (witchOne === 2) {
        this.input2_isSelected = true
        this.input3_isSelected = false
        this.input1_isSelected = false

        document.getElementById('passInputId').focus()
        document.getElementById('userNameInputId').blur()
        document.getElementById('emailInputId').blur()
      } else {
        this.input3_isSelected = true
        this.input2_isSelected = false
        this.input1_isSelected = false
        document.getElementById('emailInputId').focus()
        document.getElementById('passInputId').blur()
        document.getElementById('userNameInputId').blur()
      }
    },
    changePassVisiblity () {
      var x = document.getElementById('passInputId')
      if (x.type === 'password') {
        x.type = 'text'
      } else {
        x.type = 'password'
      }
    }

  },
  computed: {

  }
}
</script>
<style scoped src='../../assets/styles/p0/registerStyle.css'>
</style>
