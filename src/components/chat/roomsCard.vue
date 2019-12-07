<template>
<div class="rooms-card-main-container" @click="setUrl()">
    <div class="avatar-container">
        <img :src="base_url + avatar_img_url" alt="" class="avatar">
    </div>
    <div class="lables-container ">
        <h3 class="room-card-userName">{{userName}}</h3>
        <!-- <h4 class="lastMsg">{{lastMsg}}</h4> -->
    </div>
    <div class="line"></div>
</div>

</template>

<script>

export default {

  props: [
    'avatar_img_url',
    'userName',
    'lastMsg',
    'roomType',
    'roomName'
  ],

  data () {
    return {
      base_url: 'http://193.176.241.61:3000/avatar/'
    }
  },
  methods: {
    setUrl () {
      switch (this.roomType) {
        case 'd':
          console.log('---------------')
          this.$emit('url', 'http://193.176.241.61:3000/direct/' + this.roomName)
          break

        case 'c':
          this.$emit('url', 'http://193.176.241.61:3000/channel/' + this.roomName)
          break

        case 'p':
          this.$emit('url', 'http://193.176.241.61:3000/group/' + this.roomName)
          break
      }
    }
  }
}
</script>

<style scoped src='../../assets/styles/chat/roomsCardStyle.css'>

</style>
