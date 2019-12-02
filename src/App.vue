<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App',

  beforeMount () {

    // this.$store.dispatch('fetch_home_page_cards',{'FollowerId':1,'MainCategory':1,'SubCategory':1})
    // this.$store.dispatch('fetch_user_profile_data',this.$store.state.userId)

  },
  mounted () {

  },

  data () {
    return {

    }
  }

}
</script>

<style>
/* *:not(input.field) {
    -webkit-user-select: none;
    -khtml-user-select: none;

    user-select: none;
} */
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
