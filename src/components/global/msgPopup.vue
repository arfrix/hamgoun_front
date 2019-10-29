<template>

        <div class="go-to-container">
            <h3 class="go-to-msg">{{msg}}</h3>
            <div class="go-to-btn" @click="onClick()">باشه</div>
        </div>

</template>

<script>

export default {
  name: 'msgPopup',
  props: ['msg'],
  beforeMount () {

  },

  mounted () {

  },
  beforeDestroy () {

  },
  data () {
    return {

    }
  },
  destroyed () {

  },
  methods: {
    onClick () {
      this.$emit('btn_clicked')
    }

  }
}
</script>
<style scoped src='../../assets/styles/msgPopupStyle.css'>
</style>
