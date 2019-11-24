<template>
<div class="add-post-main">
      <transition name="sidebar-transition">
        <div v-if="isShowSidebar" class="draft-side-bar">
          <div class="sidebar-lable-container">
            <h3 class="sidebar-lable">پیش نویس ها</h3>
          </div>
          <div class="close-btn" @click="isShowSidebar = false">
            <img src="../../assets/icons/delete-button.png" alt class="close-btn-img" />
          </div>

          <div  class="list-looper">
            <div v-for="(item,index) in this.$store.state.drafted_post_list" :key="item.id" class="deraft-card" @click="draftClicked(index)">
              <h3 class="draft-card-title">{{draftCardTitle(item.title)}}</h3>
              <h5 class="draft-card-summery" v-html="draftCardSummery(item.body)"></h5>
            </div>
          </div>
        </div>
      </transition>

      <popup v-if="isShowErrorMsg" @btn_clicked="isShowErrorMsg = false" :msg="errorMsg"></popup>

      <div v-if="show_publish_detail" class="col-m-10 publish-detail-container">
        <div class="col-m-6-5 upload-img-container center" @click="profileImg()">
            <h3 v-if="!showUploadedCoveImg" class="upload-lable">آپلود عکس کاور</h3>
            <img v-if="showUploadedCoveImg" :src="coverImgUrl(coverImg)" alt="" class="coverImg">
        </div>
        <div class="col-m-10 inputs-container center">
            <div class="col-m-8 summery-container center" @click="upload_detail_input_onClick(1)">
                <h3 v-if="show_ph1" class="placeHolder">توضیحات</h3>
                <input type="text" v-model="post_summery" class="col-m-10 publish-detail-input"  id="pd_input1">
                <div class="bottom-line"></div>
            </div>
            <div class="col-m-8 tags-container">
              <div class="col-m-3 tag-container center" @click="upload_detail_input_onClick(2)">
                  <h3 v-if="show_ph2" class="placeHolder">برچسب اول</h3>
                  <input type="text" v-model="first_tag" class="col-m-10 publish-detail-input"  id="pd_input2">
                  <div class="bottom-line"></div>
                  <h3 class="hint"></h3>
              </div>
              <div class="col-m-3 tag-container center" @click="upload_detail_input_onClick(3)">
                  <h3 v-if="show_ph3" class="placeHolder">برچسب دوم</h3>
                  <input type="text" v-model="second_tag" class="col-m-10 publish-detail-input"  id="pd_input3">
                  <div class="bottom-line"></div>
                  <h3 class="hint"></h3>
              </div>
              <div class="type-container">
                  <div class="type-lable-container" @click="showTypeList()">
                      <h3 class="type-lable">{{typeLable}}</h3>
                  </div>
              </div>
            </div>
          <div v-if="isShowTypeList" class="type-list-container">
              <div v-for="(type,index) in types" :key="type" class="type-card" @click="typeCardOnClick(index)">
                  <h3 class="type-card-lable">{{type}}</h3>
              </div>
              <div class="col-m-6 type-input-tag-container center" @click="type_input_onClick()">
                  <h3 v-if="show_ph4" class="type-input-tag-placeHolder">نوع دلخواهت بنویس </h3>
                  <input type="text" v-model="type_input_value" class="col-m-10 publish-detail-input" maxlength="12" id="pd_input4">
                  <div class="bottom-line"></div>
                  <h3 class="hint"></h3>
                  <div class="type-input-btn" @click="type_input_submit_onClick()">تایید</div>
              </div>
          </div>
        </div>
        <div v-if="IsPubishDetailError" class="error-container">
          <h3 class="error-msg">{{this.publishDetailErrorMsg}}</h3>
        </div>
        <div class="publish-detail-publish-btn" @click.once="publish">
            <h3 class="publish-btn-lable">انتشار</h3>
        </div>

      </div>
     <div class="add-post-top-section">
        <div class="col-m-2-5 main-group-section" >
          <h5  class="main-group-lable">{{this.$store.state.mainCategoryList[this.mainCategory].name}}</h5>
          <img  :src="getImgUrl(this.$store.state.mainCategoryList[mainCategory].img)" alt="" class="main-group-img">
        </div>

        <div class="draft-btn" @click="showDraftList()">
            <h3 class="draft-btn-lable">پیش نویس ها</h3>
        </div>

    </div>

    <div class="col-m-9-5 devider"></div>

    <div class="post-creation-section">
      <div class="title-sectoin" @click="title()">
        <h3 v-if="!this.getTitle && !isDraft" class="title-placeholder">اگه دوست داری یه عنوان بنویس</h3>
        <h3 v-if="!this.getTitle && isDraft" class="title-placeholder">{{this.$store.state.the_post_is_being_written.title}}</h3>
        <input class="title-input" v-model="titleValue" type="text" name="title" id="title_input">
      </div>
      <div class="post-body-section" @click="body()" >
        <!-- <h5 v-if="!this.writingBody" class="body-placeholder" >قلم به فرمان توست</h5> -->
        <editor v-model="post_body" :key="editherKey" :iSshowToolTipProp="iShowToolTip"></editor>

        <div class="publish-btn" @click="gotoPublishDetail()">
            <h3 class="publish-btn-lable">انتشار</h3>
        </div>
      </div>
    </div>
  <!-- </div> -->

  <navigation></navigation>

</div>

</template>

<script>
import Axios from 'axios'
import popup from '../../components/global/msgPopup'
import editor from '../../components/p5/editor'

// import { async } from 'q'
export default {
  name: '10',
  components: {
    editor,
    popup

  },
  props: {
    template: {
      type: String,
      default: ''
    },
    MainCategory: {
      type: Number
    },
    isDraft: {
      type: Boolean,
      default: false
    },
    skipPostFetch: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      getTitle: false,
      writingBody: false,
      titleAvailble: false,
      showPopUp: false,
      post_body: '',
      titleValue: '',
      mainCategory: 0,
      subCategory: 0,
      show_publish_detail: false,
      show_ph1: true,
      show_ph2: true,
      show_ph3: true,
      show_ph4: true,
      coverImg: '',
      showUploadedCoveImg: false,
      post_summery: '',
      tag: '',
      isShowSidebar: false,
      editherKey: 0,
      types: ['اموزشی', 'تجربه', 'خاطره', 'معرفی', 'علاقه'],
      typeLable: 'نوع',
      isShowTypeList: false,
      first_tag: '',
      second_tag: '',
      isShowErrorMsg: false,
      type_input_valueL: '',
      errorMsg: '',
      publishDetailErrorMsg: '',
      IsPubishDetailError: false,
      iShowToolTip: true

    }
  },
  beforeMount () {
    if (!this.skipPostFetch) {
      if (localStorage.the_post_is_being_written_Id !== undefined) {
        this.$store.dispatch('fetch_the_post_is_being_written', localStorage.the_post_is_being_written_Id).then(() => {
        // tip to force update editor.vue
          this.editherKey += 1
        })
      }
    }

    if (this.isDraft) {
      console.log('beforeMount')
      this.post_body = this.$store.state.the_post_is_being_written.body
    } else {
      console.log('!!beforeMount')
      this.post_body = this.template
    }
  },
  mounted () {

  },
  updated () {
    console.log('updated')
    this.post_body = this.$store.state.the_post_is_being_written.body
  },
  watch: {
    post_body: async function (value) {
      this.$store.dispatch('update_post', { propName: 'body', value: value })
      // this.$store.dispatch('update_the_post_is_being_written' , value).then(()=>{
      //   this.$store.dispatch('update_post')
      // })
    },
    titleValue: async function (value) {
      this.$store.dispatch('update_post', { propName: 'title', value: value })
    }
  },

  methods: {

    draftCardTitle (title) {
      if (title === null) { return 'بدون عنوان' } else { return title }
    },
    draftCardSummery (body) {
      if (body === null) { return 'بدون متن' } else {
        return body.substring(
          3,
          30
        )
      }
    },
    showDraftList () {
      console.log('value')
      this.isShowSidebar = !this.isShowSidebar
      this.$store.dispatch('get_drafted_list', { publisherId: localStorage.userId, MainCategory: this.MainCategory })
    },
    draftClicked (index) {
      this.$store.dispatch('act_update_draft', index).then(() => {
        this.$router.push({ name: 'edither', params: { template: 'reddddddddddddddi', MainCategory: this.mainCat, isDraft: true, skipPostFetch: true } })
        this.editherKey += 1
      })

      this.isShowSidebar = false
    },
    title () {
      this.getTitle = true

      document.getElementById('title_input').focus()
    },
    body () {
      this.writingBody = true
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
    },

    onShowSwitch (val) {
      this.showPopUp = val
      this.post_body = this.$store.state.the_post_is_being_written.body
      this.writingBody = true
    },
    // nORd (val) {
    //   if (val === 'n') { this.titleAvailble = false } else
    //   if (val === 'd') { this.titleAvailble = true }

    //   console.log('nOrr' + this.titleAvailble)
    // },
    publish () {
      if (this.typeLable === 'نوع' || this.typeLable === '') {
        this.publishDetailErrorMsg = 'نوع پستت رو مشخص نکردی'
        this.IsPubishDetailError = true
      } else {
        this.IsPubishDetailError = false
        this.$store.dispatch('update_post', { propName: 'postSummary', value: this.post_summery }).then(() => {
          this.$store.dispatch('update_post', { propName: 'publisherUsername', value: localStorage.userName }).then(() => {
            this.$store.dispatch('update_post', { propName: 'publisherProfileImg', value: localStorage.profileImgUrl }).then(() => {
              this.$store.dispatch('update_post', { propName: 'postType', value: this.typeLable }).then(() => {
                this.$store.dispatch('update_post', { propName: 'firstTag', value: this.first_tag }).then(() => {
                  this.$store.dispatch('update_post', { propName: 'secondTag', value: this.second_tag }).then(() => {
                    this.$store.dispatch('publish_post')
                  })
                })
              })
            })
          })
        })
      }
    },
    gotoPublishDetail () {
      if (localStorage.userId === undefined || localStorage.userName === undefined) {
        this.errorMsg = 'نیازه یبار وارد حسابت بشی ، بعد از وارد شدن میتونی پستت تو از قسمت پیش نویس ها پیدا کنی و بعد منتشرش کنی'
        this.isShowErrorMsg = true
      } else {
        if (this.titleValue === '') {
          this.errorMsg = 'عنوانی برای پستت ننوشتی'
          this.isShowErrorMsg = true
        } else {
          this.show_publish_detail = true
          this.iShowToolTip = false
        }
      }
    },
    goToLogin_onClicked () {
      this.$router.push('/landing')
    },
    getImgUrl (path) {
      return require('../../assets/' + path)
    },
    coverImgUrl (path) {
      return 'http://45.82.136.106:8080/images/' + path
    },
    setSubCat (sCat) {
      this.subCategory = sCat
      console.log(this.$store.state.subCategoryList[this.mainCategory][this.subCategory].name)
    },
    setMainCat (mCat) {
      this.mainCategory = mCat
      console.log(this.$store.state.mainCategoryList[this.mainCategory].name)
    },
    upload_detail_input_onClick (index) {
      if (index === 1) {
        this.show_ph1 = false
        document.getElementById('pd_input1').focus()
        document.getElementById('pd_input2').blur()
        document.getElementById('pd_input3').blur()
      } else {
        if (index === 2) {
          this.show_ph2 = false
          document.getElementById('pd_input2').focus()
          document.getElementById('pd_input1').blur()
          document.getElementById('pd_input3').blur()
        } else {
          this.show_ph3 = false
          document.getElementById('pd_input3').focus()
          document.getElementById('pd_input1').blur()
          document.getElementById('pd_input2').blur()
        }
      }
    },
    type_input_onClick () {
      this.show_ph4 = false
      document.getElementById('pd_input4').focus()
      document.getElementById('pd_input1').blur()
      document.getElementById('pd_input2').blur()
      document.getElementById('pd_input3').blur()
    },
    type_input_submit_onClick () {
      this.typeLable = this.type_input_value
      this.isShowTypeList = false
    },
    showTypeList () {
      this.isShowTypeList = !this.isShowTypeList
    },
    typeCardOnClick (index) {
      this.typeLable = this.types[index]
      this.isShowTypeList = false
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
        this.$store.dispatch('update_post', { propName: 'kind', value: 1 }).then(() => {
          this.$store.dispatch('update_post', { propName: 'coverImgUrl', value: response.data }).then(() => {
            this.coverImg = response.data
            this.showUploadedCoveImg = true
          })
        })
      }
    }

  }
}
</script>
<style scoped src='../../assets/styles/p5/10style.css'>
</style>
