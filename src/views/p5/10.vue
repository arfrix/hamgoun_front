<template>
<div class="add-post-main">
      <transition name="sidebar-transition">
        <div v-if="isShowSidebar" class="draft-side-bar">
          <div class="sidebar-lable-container">
            <h3 class="sidebar-lable">پیش نویس ها</h3>
          </div>

          <div  class="list-looper">
            <div v-for="(item,index) in this.$store.state.drafted_post_list" :key="item.id" class="deraft-card" @click="draftClicked(index)">
              <h3 class="draft-card-title">{{draftCardTitle(item.title)}}</h3>
              <h5 class="draft-card-summery" v-html="draftCardSummery(item.body)"></h5>
            </div>
          </div>
        </div>
      </transition>

      <div v-if="show_publish_detail" class="col-m-10 publish-detail-container">
        <div class="col-m-6-5 upload-img-container center" @click="profileImg()">
            <h3 v-if="!showUploadedCoveImg" class="upload-lable">آپلود عکس کاور</h3>
            <img v-if="showUploadedCoveImg" :src="coverImgUrl(coverImg)" alt="" class="coverImg">
        </div>
        <div class="col-m-10 inputs-container center">
            <div class="col-m-8 summery-container center" @click="upload_detail_input_onClick(1)">
                <h3 v-if="show_ph1" class="placeHolder">توضیحات</h3>
                <input type="text" v-model="post_summery" class="col-m-10 publish-detail-input" id="pd_input1">
                <div class="bottom-line"></div>
            </div>
            <div class="col-m-8 tag-container center" @click="upload_detail_input_onClick(2)">
                <h3 v-if="show_ph2" class="placeHolder">برچسب ها</h3>
                <input type="text" v-model="tag" class="col-m-10 publish-detail-input" id="pd_input2">
                <div class="bottom-line"></div>
                <h3 class="hint"></h3>
            </div>
        </div>

      </div>
     <div class="add-post-top-section">
        <div class="col-m-2-5 main-group-section" >
          <h5  class="main-group-lable">{{this.$store.state.mainCategoryList[this.mainCategory].name}}</h5>
          <img  :src="getImgUrl(this.$store.state.mainCategoryList[mainCategory].img)" alt="" class="main-group-img">
        </div>

        -->

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
        <editor v-model="post_body" :key="editherKey"></editor>
        <div class="publish-btn" @click="publish">
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
import editor from '../../components/p5/editor'

// import { async } from 'q'
export default {
  name: '10',
  components: {
    editor

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
      coverImg: '',
      showUploadedCoveImg: false,
      post_summery: '',
      tag: '',
      isShowSidebar: false,
      editherKey: 0

    }
  },
  beforeMount () {
    if (!this.skipPostFetch) {
      this.$store.dispatch('fetch_the_post_is_being_written', localStorage.the_post_is_being_written_Id).then(() => {
        // tip to force update editor.vue
        this.editherKey += 1
      })
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
      this.$store.dispatch('update_post', { propName: 'PostSummary', value: this.post_summery }).then(() => {
        this.$store.dispatch('update_post', { propName: 'publisherUsername', value: this.$store.state.user_profile_data.userName }).then(() => {
          this.$store.dispatch('update_post', { propName: 'publisherProfileImg', value: this.$store.state.user_profile_data.profileImgUrl }).then(() => {
            this.$store.dispatch('update_post', { propName: 'FirstTag', value: this.tag }).then(() => {
              this.$store.dispatch('publish_post')
            })
          })
        })
      })
    },
    gotoPublishDetail () {
      this.show_publish_detail = true
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
      } else {
        this.show_ph2 = false
        document.getElementById('pd_input2').focus()
        document.getElementById('pd_input1').blur()
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
