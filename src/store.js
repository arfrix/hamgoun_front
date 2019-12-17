import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex)

const baseUrl = 'http://45.82.136.106:8080'
// const baseUrl = 'https://localhost:5001'
// const baseUrl = 'http://193.176.241.61:80'

Axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('aut_token')
Axios.defaults.headers.common['Content-Type'] = 'application/json'
Axios.defaults.headers.post['Content-Type'] = 'application/json'
Axios.interceptors.response.use(
  response => response,
  errorResponseHandler
)

function errorResponseHandler (error) {
  // if has response show the error
  if (error.response) {
    console.log('api responce error')
    console.log(error.response)
  }
}

export default new Vuex.Store({
  state: {

    mainCategory: -1,
    subCategory: -1,
    theListToShow: [],
    horizontal_list_level: 1,
    mainCategoryList: [
      { img: 'icons/edu1.png', isClicked: false, name: 'دانشجویی' },
      { img: 'icons/origami4.png', isClicked: false, name: 'هنر و سرگرمی' },
      { img: 'icons/suitcase2.png', isClicked: false, name: 'کار و بار' },
      { img: 'icons/sprout2.png', isClicked: false, name: 'زندگانی' },
      { img: 'icons/tech1.png', isClicked: false, name: 'تکنولوژی' },
      { img: 'icons/society1.png', isClicked: false, name: 'اجتماعی' },
      { img: 'icons/sience1.png', isClicked: false, name: 'علم' }

    ],
    subCategoryList: [
      [
        { img: 'icons/headphones.png', isClicked: false, name: 'رشته' },
        { img: 'icons/headphones.png', isClicked: false, name: 'دانشگاه' },
        { img: 'icons/headphones.png', isClicked: false, name: 'خوابگاه' },
        { img: 'icons/headphones.png', isClicked: false, name: 'اپلای' },
        { img: 'icons/headphones.png', isClicked: false, name: 'دوستی' },
        { img: 'icons/headphones.png', isClicked: false, name: 'تفریح' },
        { img: 'icons/headphones.png', isClicked: false, name: 'خاطره' }
      ],
      [
        { img: 'icons/headphones.png', isClicked: false, name: 'هنر' },
        { img: 'icons/headphones.png', isClicked: false, name: 'فیلم' },
        { img: 'icons/headphones.png', isClicked: false, name: 'موسیقی' },
        { img: 'icons/headphones.png', isClicked: false, name: 'عکاسی' },
        { img: 'icons/headphones.png', isClicked: false, name: 'طنز' },
        { img: 'icons/headphones.png', isClicked: false, name: 'داستان' },
        { img: 'icons/headphones.png', isClicked: false, name: 'نقاشی' },
        { img: 'icons/headphones.png', isClicked: false, name: 'ورزش' },
        { img: 'icons/headphones.png', isClicked: false, name: 'غذا' },
        { img: 'icons/headphones.png', isClicked: false, name: 'بازی و سرگرمی' },
        { img: 'icons/headphones.png', isClicked: false, name: 'زیبایی' },
        { img: 'icons/headphones.png', isClicked: false, name: 'ادبیات' },
        { img: 'icons/headphones.png', isClicked: false, name: 'پادکست' },
        { img: 'icons/headphones.png', isClicked: false, name: 'فرهنگ و اداب و رسوم' }
      ],
      [
        { img: 'icons/headphones.png', isClicked: false, name: 'کسب و کار' },
        { img: 'icons/headphones.png', isClicked: false, name: 'راه من' },
        { img: 'icons/headphones.png', isClicked: false, name: 'شغل' },
        { img: 'icons/headphones.png', isClicked: false, name: 'طراحی' },
        { img: 'icons/headphones.png', isClicked: false, name: 'اقتصاد' },
        { img: 'icons/headphones.png', isClicked: false, name: 'فریلنس' },
        { img: 'icons/headphones.png', isClicked: false, name: 'رهبری' },
        { img: 'icons/headphones.png', isClicked: false, name: 'مارکتینگ' },
        { img: 'icons/headphones.png', isClicked: false, name: 'نوآوری' },
        { img: 'icons/headphones.png', isClicked: false, name: 'استارتاپ' },
        { img: 'icons/headphones.png', isClicked: false, name: 'سرمایه‌گذاری' }
      ],
      [
        { img: 'icons/headphones.png', isClicked: false, name: 'هوش مصنوعی' },
        { img: 'icons/headphones.png', isClicked: false, name: 'بلاک چین' },
        { img: 'icons/headphones.png', isClicked: false, name: 'کریپتوگرافی' },
        { img: 'icons/headphones.png', isClicked: false, name: 'امنیت' },
        { img: 'icons/headphones.png', isClicked: false, name: 'علوم داده' },
        { img: 'icons/headphones.png', isClicked: false, name: 'زندگی دیجیتال' },
        { img: 'icons/headphones.png', isClicked: false, name: 'گجت ها' },
        // { img: 'icons/headphones.png', isClicked: false, name: 'android Dev' },
        { img: 'icons/headphones.png', isClicked: false, name: 'ios Dev' },
        // { img: 'icons/headphones.png', isClicked: false, name: 'machine learning' },
        { img: 'icons/headphones.png', isClicked: false, name: 'ریاضیات' },
        // { img: 'icons/headphones.png', isClicked: false, name: 'neuroscience' },
        { img: 'icons/headphones.png', isClicked: false, name: 'برنامه نویسی' },
        { img: 'icons/headphones.png', isClicked: false, name: 'علم' },
        { img: 'icons/headphones.png', isClicked: false, name: 'ماشین های خودران' },
        { img: 'icons/headphones.png', isClicked: false, name: 'مهندسی نرم افزار' },
        { img: 'icons/headphones.png', isClicked: false, name: 'فضا' },
        { img: 'icons/headphones.png', isClicked: false, name: 'تکنولوژی' }
        // { img: 'icons/headphones.png', isClicked: false, name: 'UX' }
      ],
      [
        { img: 'icons/headphones.png', isClicked: false, name: 'اعتیاد' },
        { img: 'icons/headphones.png', isClicked: false, name: 'خلاقیت' },
        { img: 'icons/headphones.png', isClicked: false, name: 'معلولیت' },
        { img: 'icons/headphones.png', isClicked: false, name: 'خانواده' },
        { img: 'icons/headphones.png', isClicked: false, name: 'تناسب اندام' },
        { img: 'icons/headphones.png', isClicked: false, name: 'سلامتی' },
        { img: 'icons/headphones.png', isClicked: false, name: 'سبک زندگی' },
        { img: 'icons/headphones.png', isClicked: false, name: 'سلامت روان' },
        { img: 'icons/headphones.png', isClicked: false, name: 'ذهن اگاهی' },
        { img: 'icons/headphones.png', isClicked: false, name: 'پول' },
        { img: 'icons/headphones.png', isClicked: false, name: 'حوالی' },
        { img: 'icons/headphones.png', isClicked: false, name: 'والدینی' },
        { img: 'icons/headphones.png', isClicked: false, name: 'حیوان خانگی' },
        { img: 'icons/headphones.png', isClicked: false, name: 'روانشناسی' },
        { img: 'icons/headphones.png', isClicked: false, name: 'رابطه' },
        { img: 'icons/headphones.png', isClicked: false, name: 'خود' },
        { img: 'icons/headphones.png', isClicked: false, name: 'جنسی' },
        { img: 'icons/headphones.png', isClicked: false, name: 'معنویت' },
        { img: 'icons/headphones.png', isClicked: false, name: 'سفر' }
      ],
      [
        { img: 'icons/headphones.png', isClicked: false, name: 'درامد پایه' },
        { img: 'icons/headphones.png', isClicked: false, name: 'شهرها' },
        { img: 'icons/headphones.png', isClicked: false, name: 'تحصیلات' },
        { img: 'icons/headphones.png', isClicked: false, name: 'نتخابات' },
        { img: 'icons/headphones.png', isClicked: false, name: 'محیط' },
        { img: 'icons/headphones.png', isClicked: false, name: 'برابری' },
        { img: 'icons/headphones.png', isClicked: false, name: 'اینده' },
        { img: 'icons/headphones.png', isClicked: false, name: 'تاریخ' },
        { img: 'icons/headphones.png', isClicked: false, name: 'مهاجرت' },
        { img: 'icons/headphones.png', isClicked: false, name: 'عدالت' },
        { img: 'icons/headphones.png', isClicked: false, name: 'زبان' },
        { img: 'icons/headphones.png', isClicked: false, name: 'رسانه' },
        { img: 'icons/headphones.png', isClicked: false, name: 'فلسفه' },
        { img: 'icons/headphones.png', isClicked: false, name: 'سیاست' },
        { img: 'icons/headphones.png', isClicked: false, name: 'حریم شخصی' },
        { img: 'icons/headphones.png', isClicked: false, name: 'نژاد' },
        { img: 'icons/headphones.png', isClicked: false, name: 'مذهب' },
        { img: 'icons/headphones.png', isClicked: false, name: 'جامعه' },
        { img: 'icons/headphones.png', isClicked: false, name: 'زنان' },
        { img: 'icons/headphones.png', isClicked: false, name: 'جهان' },
        { img: 'icons/headphones.png', isClicked: false, name: 'حمل و نقل' }

      ]
    ],
    bio_list: [

      { img: 'icons/mortarboard.png', isClicked: true, name: 'تحصیلات' },
      { img: 'icons/briefcase2.png', isClicked: false, name: 'کار و بار' },
      { img: 'icons/earthGlobe.png', isClicked: false, name: 'محل سکونت' },
      { img: 'icons/translation.png', isClicked: false, name: 'زبون' },
      { img: 'icons/friends.png', isClicked: false, name: 'رابطه' },
      { img: 'icons/weightlifter.png', isClicked: false, name: 'ورزش' },
      { img: 'icons/popcorn.png', isClicked: false, name: 'فیلم' },
      { img: 'icons/music.png', isClicked: false, name: 'موسیقی' },
      { img: 'icons/book.png', isClicked: false, name: 'کتاب' },
      { img: 'icons/tools.png', isClicked: false, name: 'مهارت' },
      { img: 'icons/whiteboard.png', isClicked: false, name: 'یاد دادن' }

    ],
    cards: [],

    witch_bio_list_item_selected: 0,
    witch_route_we_are: 1,

    //! relate to api
    userId: parseInt(localStorage.userId),
    user_userName: localStorage.userName,
    user_profileImgUrl: localStorage.profileImgUrl,
    // ! api response container -----------------------
    home_page_cards: '',
    user_profile_data: '',
    other_user_profile_data: '',
    is_other_user_profile: false,
    // otherUser_profile_data: '',
    the_post_is_being_written: '',
    the_post_is_being_written_Id: localStorage.the_post_is_being_written_Id,
    drafted_post_list: '',
    my_postsList: '',
    contentSearch_result: '',
    userSearch_result: '',
    userPassLogin: false,
    userPassRegister: false,
    userRegisterErrorMsg: '',
    otherUserId: '',
    waitForSearchResult: false,
    waitFor_fetch_my_postList: false,
    postTemplate_list: '',
    jilizViliz_cards: '',
    waiteFor_fetch_jilizViliz_cards: false,
    fullDiscusion_cards: '',
    waitFor_fullDiscusion_cards: false,
    waitingForLogin: false,
    waitingForRegister: false,
    waitForSubmitaComment: false,
    commentsList: '',
    postData: '',
    wait_for_fetch_home_page_private_mode_cards: false,
    notifications: '',
    waitingForComments: false,
    // commentToSend: ''
    newNotifCount: 0,
    isNotifSeen: true

  },
  mutations: {
    changeMainCategory (state, cat) {
      state.mainCategory = cat
    },
    changeSubCategory (state, cat) {
      state.subCategory = cat
    },
    setTheListToShow (state, data) {
      if (data.level === 1) {
        // state.theListToShow = state.mainCategoryList.map(el => { return { ...el } })
        Vue.set(state, 'theListToShow', state.mainCategoryList)
        state.horizontal_list_level = 1
      } else {
        // state.theListToShow = state.subCategoryList[data.index].map(el => { return { ...el } })
        Vue.set(state, 'theListToShow', state.subCategoryList[data.index])
        state.horizontal_list_level = 2
      }
    },
    setBio_list (state, data) {
      state.bio_list.forEach((element) => { element.isClicked = false })
      // tip reactivly
      Vue.set(state.bio_list[data], 'isClicked', true)
      // state.bio_list[data] = true
    },
    setWitch_route_we_are (state, data) {
      // tip reactivly
      Vue.set(state, 'witch_route_we_are', data)
      // state.witch_route_we_are = data
    },
    write_SubCategoryList (state, data) {
      console.log(data)
      console.log(state.subCategory)
      console.log(state.mainCategory)

      // state.subCategoryList[state.mainCategory][state.subCategory].isClicked = data
    },

    // ! api section
    writeCardsData (state, data) {
      state.cards = data
      state.wait_for_fetch_home_page_private_mode_cards = false
    },
    writeUser_profile_data (state, data) {
      state.user_profile_data = data
      localStorage.userName = data.userName
      localStorage.profileImgUrl = data.profileImgUrl
    },
    write_otherUser_profile_data (state, data) {
      state.other_user_profile_data = data
    },
    write_on_userProfile (state, data) {
      console.log('from mutation ' + data.propName + ' ' + data.value)
      // if (data.value == '') { data.value = 's' }
      state.user_profile_data[data.propName] = data.value
      console.log(state.user_profile_data)
    },
    write_init_the_post_is_being_written (state, data) {
      Vue.set(state, 'the_post_is_being_written', data)
      // state.the_post_is_being_written = data

      localStorage.the_post_is_being_written_Id = data.id
    },
    write_the_post_is_being_written (state, data) {
      state.the_post_is_being_written[data.propName] = data.value
    },
    write_drafted_post_list (state, data) {
      state.drafted_post_list = data
    },
    write_my_postList (state, data) {
      state.my_postsList = data
      state.waitFor_fetch_my_postList = false
    },
    write_userId (state, data) {
      state.userId = data
    },
    write_contentSearch_result (state, data) {
      state.contentSearch_result = data
      // Vue.set(state, 'waitForSearchResult', false)
      state.waitForSearchResult = false
    },
    write_userSearch_result (state, data) {
      state.userSearch_result = data
      state.waitForSearchResult = false
    },
    write_waitForSearchResult (state, data) {
      state.waitForSearchResult = data
    },
    write_userPassLogin (state, data) {
      state.waitingForLogin = false
      state.userPassLogin = data
    },
    write_userPassRegister (state, data) {
      state.waitingForRegister = false
      state.userPassRegister = data
    },
    write_userRegisterErrorMsg (state, data) {
      state.waitingForRegister = false
      state.userRegisterErrorMsg = data
    },
    write_jilizViliz_cards (state, data) {
      state.jilizViliz_cards = data
      state.waiteFor_fetch_jilizViliz_cards = false
    },
    write_fullDiscusion_cards (state, data) {
      state.fullDiscusion_cards = data
      state.waitFor_fullDiscusion_cards = false
    },
    write_commentsList (state, data) {
      state.waitingForComments = false
      state.commentsList = data
      state.waitingForRegister = false
    },
    writePostData (state, data) {
      state.postData = data
    },
    writeNotif (state, data) {
      state.notifications = data
    },
    writeTotalPostRateAndJudgesCount (state, data) {
      localStorage.setItem(data.url, true)

      state.postData.postRate = data.rate
      state.postData.judgesCount += 1
    },
    writeWaitingForComments (state, data) {
      state.waitingForComments = data
    },
    writeNewNotifCount (state, data) {
      state.newNotifCount = data
    },
    writeIsNotifSeen (state, data) {
      state.isNotifSeen = data
    }

  },
  actions: {
    // ! post
    // tip async fun_name ({ commit, state }, params) {
    // tip   state.inProgress = true

    // tip   let response = ''
    // tip   try {
    // tip     response = await Axios.post(baseUrl + '/Posts/postList', {
    // tip       propertyName: params.p1,

    // tip     })
    // tip     console.log(response)
    // tip     if (true) {
    // tip       commit('')
    // tip     } else {

    // tip     }
    // tip   } catch (error) {

    // tip   }
    // tip }

    // tip response = await Axios.post(baseUrl + 'Appointments/AppoResevation', {
    // tip   appointmentId: params.appoId,
    // tip   paientId: params.patientId
    // tip })

    // ! get
    // tip async fetch_user_profile_data ({ commit, state }, userId) {
    // tip   state.inProgress = true

    // tip   let response = ''
    // tip   try {
    // tip     response = await Axios.get(baseUrl + '/User' + userId)
    // tip     console.log(response)
    // tip     if (true) {
    // tip       commit('')
    // tip     } else {

    // tip     }
    // tip   } catch (error) {

    // tip   }
    // tip }

    actChangeMainCategory ({ commit, state }, cat) {
      commit('changeMainCategory', cat)
    },
    async actChangeSubCategory ({ commit, state }, cat) {
      commit('changeSubCategory', cat)
    },

    actChangeContentSearch_result ({ commit, state }, data) {
      commit('write_contentSearch_result', data)
    },
    actChangeUserSearch_result ({ commit, state }, data) {
      commit('write_userSearch_result', data)
    },
    actChangeSubCategoryList ({ commit, state }, data) {
      console.log('ff--ff')
      commit('write_SubCategoryList', data)
    },
    actSetTheListToShow ({ commit, state }, data) {
      commit('setTheListToShow', data)
    },
    actSetWitch_bio_list_item_selected ({ commit, state }, data) {
      commit('setBio_list', data)
    },
    actSetWitch_route_we_are ({ commit, state }, routeNum) {
      commit('setWitch_route_we_are', routeNum)
    },
    actChange_my_postsList ({ commit, state }, data) {
      commit('write_my_postList', data)
    },
    actSetPostData ({ commit, state }, data) {
      commit('writePostData', data)
    },
    actSetWaitingForComments ({ commit, state }, data) {
      commit('writeWaitingForComments', data)
    },
    actSetNewNotifCount ({ commit, state }, data) {
      commit('writeNewNotifCount', data)
    },
    actSetIsNotifSeen ({ commit, state }, data) {
      commit('writeIsNotifSeen', data)
    },
    // actOtherUser_profile_data ({ commit, state }, data) {
    //   commit('write_otherUser_profile_data', data)
    // },
    async fetch_home_page_private_mode_cards ({ commit, state }, params) {
      state.inProgress = true
      state.wait_for_fetch_home_page_private_mode_cards = true
      let response = ''
      try {
        response = await Axios.post(baseUrl + '/Posts/followedNewPosts', {
          followerId: parseInt(localStorage.userId),
          mainCategory: params.mainCategory
          // Layer: params.layer
        })
        console.log(response.data)

        commit('writeCardsData', response.data)
      } catch (error) {

      }
    },
    async fetch_post_data ({ commit, state }, postId) {
      state.inProgress = true

      let response = ''
      try {
        response = await Axios.get(baseUrl + '/Posts/' + postId)
        console.log(response.data)

        commit('')
      } catch (error) {

      }
    },

    async fetch_user_profile_data ({ commit, state }, userId) {
      state.inProgress = true

      let response = ''
      try {
        response = await Axios.get(baseUrl + '/Users/' + userId)
        console.log('profile')
        console.log(response.data)

        commit('writeUser_profile_data', response.data)
      } catch (error) {

      }
    },
    async fetch_other_user_profile_data ({ commit, state }, userId) {
      state.inProgress = true

      let response = ''
      try {
        response = await Axios.get(baseUrl + '/Users/' + userId)

        console.log(response.data)

        commit('write_otherUser_profile_data', response.data)
      } catch (error) {

      }
    },

    async update_user_profile ({ commit, state }, usesrProfile) {
      state.inProgress = true
      // params.forEach(el => {
      //   console.log('from action ' + el.propName + ' ' + el.value)
      //   commit('write_on_userProfile', el)
      // })

      let response = ''
      try {
        response = await Axios.post(baseUrl + '/Users/Update', usesrProfile
        )
        console.log(response)

        commit('')
      } catch (error) {

      }
    },

    //! add post cycle
    async create_post ({ commit, state }, params) {
      state.inProgress = true
      console.log(params)
      let response = ''
      try {
        response = await Axios.post(baseUrl + '/Posts', {
          publisherId: state.userId,
          mainCategory: params.MainCategory,
          // subCategory: params.SubCategory,
          isDrafted: true
        }
        )
        console.log('create_post')
        console.log(response)

        commit('write_init_the_post_is_being_written', response.data)
      } catch (error) {
        console.log(error)
      }
    },
    async update_the_post_is_being_written ({ commit, state }, data) {
      state.inProgress = true
      commit('write_the_post_is_being_written', data)
    },

    async update_post ({ dispatch, commit, state }, data) {
      await dispatch('update_the_post_is_being_written', data)

      let response = ''

      try {
        response = await Axios.post(baseUrl + '/Posts/Update', state.the_post_is_being_written
        )
        console.log(response)
      } catch (error) {

      }
    },
    async fetch_the_post_is_being_written ({ commit, state }, id) {
      let response = ''
      try {
        response = await Axios.get(baseUrl + '/Posts/' + id)
        console.log('fetch_the_post_is_being_written')
        console.log(response.data)

        commit('write_init_the_post_is_being_written', response.data)
      } catch (error) {

      }
    },
    async get_drafted_list ({ commit, state }, params) {
      console.log('param')
      console.log(params)

      state.inProgress = true

      let response = ''
      try {
        response = await Axios.post(baseUrl + '/Posts/draftList', {
          publisherId: parseInt(localStorage.userId),
          mainCategory: parseInt(params.MainCategory)

        })
        console.log(response)

        commit('write_drafted_post_list', response.data)
      } catch (error) {

      }
    },

    async act_update_draft ({ commit, state }, index) {
      commit('write_init_the_post_is_being_written', state.drafted_post_list[index])
    },

    async fetch_my_postList ({ commit, state }, data) {
      console.log(data)
      state.waitFor_fetch_my_postList = true
      let response = ''
      try {
        response = await Axios.post(baseUrl + '/Posts/myPostsList', {
          publisherId: parseInt(data.publisherId),
          mainCategory: data.mainCategory

        })

        console.log(response.data)

        commit('write_my_postList', response.data)
      } catch (error) {

      }
    },

    async fetch_contentSearch ({ commit, state }, data) {
      state.waitForSearchResult = true
      // console.log(state.waitForSearchResult)
      let response = ''
      try {
        response = await Axios.post(baseUrl + '/Posts/search', {
          keyWord: data.keyword,
          MainCat: data.mainCat
        })
        console.log(response)

        commit('write_contentSearch_result', response.data)
      } catch (error) {

      }
    },
    async fetch_UserSearch ({ commit, state }, data) {
      state.waitForSearchResult = true
      console.log(data)
      let response = ''
      try {
        response = await Axios.post(baseUrl + '/Users/search', {
          keyWord: data.keyword,
          Bio: data.bio
        })
        console.log(response)

        commit('write_userSearch_result', response.data)
      } catch (error) {

      }
    },
    async publish_post ({ commit, state }) {
      let response = ''
      try {
        response = await Axios.get(baseUrl + '/Posts/publish/' + state.the_post_is_being_written.id)
        console.log('published')
        console.log(response.data)
        if (response.data.status) {
          alert('published')
        } else {

        }
      } catch (error) {

      }
    },
    async fetch_folloerList ({ commit, state }) {
      let response = ''
      try {
        response = await Axios.get(baseUrl + '/Relations/whoFollowMe/' + state.userId)
        console.log('followers')
        console.log(response.data)
      } catch (error) {

      }
    },
    // newton version
    // async login ({ commit, state }, params) {
    //   state.waitingForLogin = true
    //   let response = ''
    //   try {
    //     response = await Axios.post(baseUrl + '/login', {
    //       Username: params.userName,
    //       Password: params.pass
    //     }
    //     )
    //     console.log('login')
    //     console.log(response.data)
    //     commit('write_userPassLogin', response.data.status)

    //     if (response.data.status) {
    //       localStorage.setItem('aut_token', response.data.token)
    //       localStorage.setItem('userId', response.data.userId)
    //       commit('write_userId', response.data.userId)
    //     }
    //   } catch (error) {

    //   }
    // },
    async login ({ commit, state }, params) {
      state.waitingForLogin = true
      let response = ''
      try {
        response = await Axios.post(baseUrl + '/Users/login', {
          userName: params.userName,
          pass: params.pass
        })

        console.log('login')
        console.log(response.data)
        commit('write_userPassLogin', response.data.status)

        if (response.data.status) {
          localStorage.setItem('userId', response.data.data)
          commit('write_userId', response.data.data)
        }
      } catch (error) {

      }
    },
    async register ({ commit, state }, params) {
      state.waitingForRegister = true
      console.log(state.waitingForRegister)
      let response = ''
      try {
        response = await Axios.post(baseUrl + '/Users/register', {
          email: params.email,
          userName: params.userName,
          pass: params.pass
        })
        console.log('register')
        console.log(response.data)

        commit('write_userPassRegister', response.data.status)
        if (response.data.status) {
          //! feck konam do khat bady cherte va mishe to writeUser_profile_data gonjondeshon !!!!
          localStorage.userId = response.data.data.value.id
          commit('write_userId', response.data.data.value.id)
          commit('writeUser_profile_data', response.data.data.value)
        } else { commit('write_userRegisterErrorMsg', response.data.massage) }
      } catch (error) {

      }
    },

    // async fetch_postTemplate ({ commit, state }, params) {
    //   let response = ''
    //   try {
    //     response = await Axios.post(baseUrl + '/Posts/template', {
    //       mainCategory: params.mianCat,
    //       subCategory: params.subCat

    //     })
    //   } catch (error) {

    //   }
    // },

    async fetch_jilizViliz_cards ({ commit, state }, mainCat) {
      state.waiteFor_fetch_jilizViliz_cards = true
      let response = ''
      try {
        response = await Axios.get(baseUrl + '/Posts/newestPosts/' + mainCat)
        console.log(response.data)
        commit('write_jilizViliz_cards', response.data)
      } catch (error) {

      }
    },
    async fetch_fullDiscusion_cards ({ commit, state }, mainCat) {
      state.waitFor_fullDiscusion_cards = true
      let response = ''
      try {
        response = await Axios.get(baseUrl + '/Posts/mostCommentedPosts/' + mainCat)
        commit('write_fullDiscusion_cards', response.data)
      } catch (error) {

      }
    },

    async fetchComments ({ commit, state }, postId) {
      state.waitingForComments = true
      let response = ''
      try {
        response = await Axios.get(baseUrl + '/Comments/GetCommentofPosts/' + postId)
        console.log('fetch comments')
        console.log(response.data)
        commit('write_commentsList', response.data)
      } catch (error) {

      }
    },
    async submitComment ({ commit, state }, params) {
      let response = ''
      state.waitForSubmitaComment = true
      try {
        response = await Axios.post(baseUrl + '/Comments', {
          comment: {
            PublisherId: state.userId,
            PostId: params.PostId,
            CommentText: params.CommentText,
            PublisherUsername: localStorage.userName,
            publisherImg: localStorage.profileImgUrl
          },
          PostPublisherId: params.postPublisherId

        })
        console.log('submit comments')
        console.log(response.data)
      } catch (error) {

      }
    },
    async submitCommentReply ({ commit, state }, params) {
      console.log('replay params')
      console.log(params)
      state.waitForSubmitaComment = true
      try {
        await Axios.post(baseUrl + '/Comments', {
          comment: {
            PublisherId: state.userId,
            PostId: params.PostId,
            CommentText: params.CommentText,
            PublisherUsername: localStorage.userName,
            ParentCommentId: params.parentCommentId,
            publisherImg: localStorage.profileImgUrl,
            IsReply: true
          },
          PostPublisherId: params.postPublisherId,
          ParentCommentPublisherId: params.ParentCommentPublisherId
        })
      } catch (error) {

      }
    },

    async submitRating ({ commit, state }, params) {
      console.log('on rating action')
      try {
        await Axios.post(baseUrl + '/Events/PostRating', {
          ActorId: state.userId,
          ActorUsername: localStorage.userName,
          ActorImgUrl: localStorage.profileImgUrl,
          ReactorId: params.publisherId,
          PostId: params.PostId,
          IsPostRating: true,
          PostRate: params.rate
        })
      } catch (error) {

      }
    },
    async submitMizoun ({ commit, state }, params) {
      console.log(params)

      try {
        await Axios.post(baseUrl + '/Events/Mizoun', {
          ActorId: state.userId,
          ActorUsername: localStorage.userName,
          ActorImgUrl: localStorage.profileImgUrl,
          ReactorId: params.publisherId,
          CommentId: params.commentId,
          IsMizoun: true
        })
      } catch (error) {

      }
    },
    async submitNamizoun ({ commit, state }, params) {
      try {
        await Axios.post(baseUrl + '/Events/Namizoun', {
          ActorId: state.userId,
          ActorUsername: localStorage.userName,
          ActorImgUrl: localStorage.profileImgUrl,
          ReactorId: params.publisherId,
          CommentId: params.commentId,
          IsNamizoun: true

        })
      } catch (error) {

      }
    },
    async follow ({ commit, state }, params) {
      try {
        await Axios.post(baseUrl + '/Relations', {
          FollowerId: state.userId,
          FollowedId: params.followedId,
          MainCategory: params.mCat

        })
      } catch (error) {

      }
    },
    async addHamegyry ({ commit, state }, params) {
      try {
        await Axios.post(baseUrl + '/Posts/hamegyry', {
          PostId: params.postId
        })
      } catch (error) {

      }
    },
    async fetchPostData ({ commit, state }, uniqeUrl) {
      let response = ''

      try {
        response = await Axios.get(baseUrl + '/Posts/getPostByUrl/' + uniqeUrl)
        commit('writePostData', response.data)
      } catch (error) {

      }
    },
    async fetchNotif ({ commit, state }) {
      let response = ''

      try {
        response = await Axios.get(baseUrl + '/Events/notif/' + localStorage.userId)
        commit('writeNotif', response.data.data)
        console.log('notif')
        console.log(response.data.data)
      } catch (error) {

      }
    },
    updatePostRateOffline ({ commit, state }, data) {
      if (localStorage.getItem(data.url) === null) {
        var rate = ((state.postData.judgesCount * state.postData.postRate) + data.submitedRate) / (state.postData.judgesCount + 1)
        commit('writeTotalPostRateAndJudgesCount', { rate: rate, url: data.url })
      } else {
        alert('قبلا به این پست امتیاز دادی')
      }
    },
    async getRocketChat_autToken ({ commit, state }, data) {
      let response = '9Mph5jCHUfhaBiK_mhhIaoctywmK0ni2Et_DtseNf9r'
      // get token via api
      localStorage.setItem('RocketChat_autToken', response)
    }

  }
})
