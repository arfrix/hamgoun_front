<template>
<div class="main">
    <div class="tet">
        <iframe src="http://193.176.241.61/landing/index.html" :style="{height : height + 'px' , width : width + 'px'}"></iframe>
    </div>
</div>
</template>

<script>
export default {
  mounted () {
    console.log('mounted')
    this.height = window.innerHeight + 12

    this.width = window.innerWidth
  },

  data () {
    return {
      height: '',
      width: ''

    }
  }
}
</script>

<style>
.main{
   overflow: hidden;

}

</style>
