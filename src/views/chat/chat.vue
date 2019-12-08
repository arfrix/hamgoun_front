<template>
<!-- eslint-disable -->
<!-- use for ling ignore -->

      <div  class="chatContainer">
        <iframe v-if="isShowchatContainer" :src="iframUrl" :style="{height : height + 'px'}"></iframe>
        <!-- <div class="backBtn" @click="back()">بازززگشت</div>   -->

        <!-- <div class="backBtn" @click="subscribe()">سابسیس</div>   -->
        <!-- <div class="header-container">

        </div> -->
        <div v-if="isShowMainBody" class="main-body">
          <div class="direct-chats-container">
            <h3 class="container-lable">چت هات</h3>
            <roomCard v-for="item in direct_chats_rooms_list" :key="item.id" :avatar_img_url='item.name' :userName='item.name' :roomName="item.name" roomType="d" lastMsg='---' @url="chatPage"></roomCard>
          </div>
          <div class="public-channels-container">
            <h3 class="container-lable">کانال های عمومیت</h3>
            <roomCard v-for="item in public_channels_rooms_list" :key="item.id" :avatar_img_url='item.name' :userName='item.name' :roomName="item.name" roomType="c" lastMsg='---' @url="chatPage"></roomCard>
          </div>
          <div class="private-channls-container">
            <h3 class="container-lable">گروه هات</h3>
            <roomCard v-for="item in private_channls_rooms_list" :key="item.id" :avatar_img_url='item.name' :userName='item.fname' :roomName="item.name" roomType="p" lastMsg='---' @url="chatPage"></roomCard>
          </div>

          <!-- not developed yet -->
          <!-- <div class="live-chat-container">
            <h3 class="container-lable">چت های زنده</h3>
          </div> -->

        </div>
      </div>
      <!-- <navigation></navigation> -->

</template>

<script>

import roomCard from '../../components/chat/roomsCard'

export default {
  /* eslint-disable */
  name: 'chat',
  baseUrl: 'http://193.176.241.61:3000',
  components: {
    roomCard
  },
  created () {
    this.connect()
    console.log('created')
  },
  mounted () {
    console.log('mounted')
    this.height = window.innerHeight
  },
  destroyed () {
    console.log('destroyed')
    this.socket.close()
  },
  beforeMount () {
    // this.get()

  },

  data () {
    return {
      height: '',
      direct_chats_rooms_list: [],
      public_channels_rooms_list: [],
      private_channls_rooms_list: [],
      live_chat_rooms_list: [],
      isConnected: false,
      socketMessage: '',
      roomslist: [],
      iframUrl: '',
      isShowchatContainer: false,
      isShowMainBody: true

    }
  },

  methods: {

    connect () {
      let socket = new WebSocket('ws://193.176.241.61:3000/websocket')
      var ctrlContext = this
      var connectRequest = {
        'msg': 'connect',
        'version': '1',
        'support': ['1']
      }
      socket.onopen = function (e) {
        console.log('connectRequest')
        socket.send(JSON.stringify(connectRequest))
      }

      socket.onmessage = function (event) {
      // console.log(event.data)
        console.log(JSON.parse(event.data))

        if (JSON.parse(event.data).msg === 'ping') {
        // console.log('send pong')
          socket.send(JSON.stringify({ 'msg': 'pong' }))
        }
        if (JSON.parse(event.data).msg === 'connected') {
        // console.log('send pong')
          socket.send(JSON.stringify({
            'msg': 'method',
            'method': 'login',
            'id': localStorage.getItem('userId'),
            'params': [
              { 'resume': localStorage.getItem('RocketChat_autToken') }
            ] }))
        }
        if (JSON.parse(event.data).msg === 'result') {
          if ('result' in JSON.parse(event.data)) {
            if (!Array.isArray(JSON.parse(event.data).result)) {
            // login was success
              socket.send(JSON.stringify({
                'msg': 'method',
                'method': 'subscriptions/get',
                'id': localStorage.getItem('userId'),
                'params': [ { } ]
              }))
            } else {
            // if comes here means result was array and that array is roomes data
              JSON.parse(event.data).result.forEach(element => {
                switch (element.t) {
                  case 'd':
                    ctrlContext.direct_chats_rooms_list.push(element)
                    break
                  case 'c':
                    ctrlContext.public_channels_rooms_list.push(element)
                    break
                  case 'p':
                    ctrlContext.private_channls_rooms_list.push(element)
                    break
                  case 'l':
                    thictrlContexts.live_chat_rooms_list.push(element)
                    break

                  default:
                    break
                }
              })
              // ctrlContext.direct_chats_rooms_list.push('element')
            }
          } else {
            if ('error' in JSON.parse(event.data)) {
              console.log('log in failed')
            }
          }
        }
      }
    },

    disconnect () {
      socket.onclose = function (event) {
        console.log(event.data)
      }
    },

    sendMessage () {

    },

    socketError () {
      socket.onerror = function (event) {
        console.log('!!!!!!!!!!!!!!!!! error')
        console.log(event.data)
      }
    },

    back () {
      // console.log('close')
      // socket.close()
    },
    chatPage (val) {
      console.log(val)
      this.iframUrl = val
      this.isShowchatContainer = true
      this.isShowMainBody = false
    },
    // subscribe () {
    //   socket.send(JSON.stringify({
    //     'msg': 'method',
    //     'method': 'rooms/get',
    //     'id': '42',
    //     'params': [ { } ]

    //   }))
    // },

    fillArrays (data) {
      data.forEach(element => {
        switch (element.t) {
          case 'd':
            this.direct_chats_rooms_list.push(element)
            break
          case 'c':
            this.public_channels_rooms_list.push(element)
            break
          case 'p':
            this.private_channls_rooms_list.push(element)
            break
          case 'l':
            this.live_chat_rooms_list.push(element)
            break

          default:
            break
        }
      })
    }

    // async get () {
    //   console.log('response')
    //   let response = ''
    //   try {
    //     console.log('response2')
    //     response = await Axios.get('http://193.176.241.61:3000/api/v1/rooms.get', {
    //       headers: {
    //         'X-Auth-Token': 'Hsy3SMQhGPPuRzuLkxR3dENqAo3Mo4TWrTBVOxivBZN',
    //         'X-User-Id': 'SzfcHsBYWuHPhJSoi'
    //       }
    //     })

    //     response.data.update.forEach(element => {
    //       switch (element.t) {
    //         case 'd':
    //           this.direct_chats_rooms_list.push(element)
    //           break
    //         case 'c':
    //           this.public_channels_rooms_list.push(element)
    //           break
    //         case 'p':
    //           this.private_channls_rooms_list.push(element)
    //           break
    //         case 'l':
    //           this.live_chat_rooms_list.push(element)
    //           break

    //         default:
    //           break
    //       }
    //     })
    //   } catch (error) {

    //   }
    // }
  }
}
</script>

<style scoped src='../../assets/styles/chat/chatStyle.css'>

</style>
