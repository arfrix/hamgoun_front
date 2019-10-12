import Vue from 'vue'
import Router from 'vue-router'
import P1_1 from './views/p1/1.vue'
import P2_3 from './views/p2/3.vue'
import P5_10 from './views/p5/10.vue'
import Login from './views/p0/login.vue'
import Register from './views/p0/register.vue'
import Landing from './views/p0/landing.vue'
import Profile from './views/p3/profile.vue'
import Explorer from './views/p4/explorer.vue'
import AddPost from './views/p5/addPost.vue'
import CampainPage from './views/p1/campainPage.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing',
      component: Landing
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/home',
      name: 'P1_1',
      component: P1_1
    },
    {
      path: '/campainPage',
      name: 'campainPage',
      component: CampainPage
    },

    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      props: true
    },
    {
      path: '/explorer',
      name: 'explorer',
      component: Explorer
    },
    {
      path: '/addPost',
      name: 'addPost',
      component: AddPost
    },
    {
      path: '/post/:uniqueUrl',
      name: 'postPage',
      component: P2_3,
      props: true
    },

    {
      path: '/edither',
      name: 'edither',
      component: P5_10,
      props: true
    }

  ]
})
