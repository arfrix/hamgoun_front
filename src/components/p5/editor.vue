<template>
  <div class="col-m-10 write-body-main">
    <div id="editor" class="test" v-on:keydown.enter="enterKeyPressed()"></div>

    <transition name="totil">
      <div v-show="iSshowToolTip" id="toolbar" class="custom-toobar-style" >
          <select class="ql-size">
            <option value="small"></option>
            <!-- Note a missing, thus falsy value, is used to reset to default -->
            <option selected></option>
            <option value="large"></option>
            <option value="huge"></option>
          </select>
          <!-- Add a bold button -->
          <button class="ql-bold"></button>
          <button class="ql-italic"></button>
          <button class="ql-image"></button>
          <!-- But you can also add your own -->
          <button id="custom-button"></button>
      </div>
    </transition>

    <div id="bottom" class="col-m-10 bottom-space">
      <div class="tooltip-button" @click="showToolTip">
        <img src="../../assets/icons/pencil-case.png" alt class="showTotilimg" />
      </div>
    </div>

  </div>
</template>

<script>
import Quill from 'quill'
import Axios from 'axios'

export default {
  props: {
    value: {
      type: String,
      default: ''
    }
  },

  data () {
    return {
      editor: null,
      iSshowToolTip: false
    }
  },
  beforeMount () {
    console.log('val5555555555555555555')
    console.log(this.value)
  },
  updated () {
    console.log('val5555555555555555555')
    console.log(this.value)
  },
  mounted () {
    var Image = Quill.import('formats/image')
    Image.className = 'img-body'
    Quill.register(Image, true)

    this.editor = new Quill('#editor', {
      modules: {
        toolbar: {

          container: '#toolbar',
          handlers: {
            image: imageHandler
          }
        }
      },
      // placeholder: 'هان ؟؟؟؟؟؟؟؟',
      theme: 'snow' // or 'bubble'
    })

    function imageHandler () {
      const input = document.createElement('input')

      input.setAttribute('type', 'file')
      input.setAttribute('accept', 'image/*')
      input.click()

      input.onchange = async () => {
        const file = input.files[0]
        const formData = new FormData()

        formData.append('file', file)

        // Save current cursor state

        const range = this.quill.getSelection(true)

        // Insert temporary loading placeholder image
        this.quill.insertEmbed(
          range.index,
          'image',
          'http://45.82.136.106:8080/images/giphy.gif'
        )

        // Move cursor to right side of image (easier to continue typing)
        this.quill.setSelection(range.index + 1)

        // const res = 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/480px-JavaScript-logo.png'; // API post, returns image location as string e.g. 'http://www.example.com/images/foo.png'
        // const res = 'http://192.168.1.61/fenjooon/huge-size-image.jpg'; // API post, returns image location as string e.g. 'http://www.example.com/images/foo.png'

        let response = ''
        try {
          console.log('55555')
          response = await Axios.post(
            'http://45.82.136.106:8080/Images/upload',
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            }
          )
          console.log('img response')
          console.log(response)
        } catch (error) {}

        console.log('await check')
        console.log(response.data)

        // Remove placeholder image

        this.quill.deleteText(range.index, 1)

        // Insert uploaded image
        this.quill.insertEmbed(
          range.index,
          'image',
          'http://45.82.136.106:8080/images/' + response.data
        )
        // this.quill.insertEmbed(range.index + 1, 'code-block','djfhvba');

        this.quill.setSelection(range.index + 1)
      }
    }

    console.log('999999999999999999999999999')
    console.log(this.value)
    this.editor.root.innerHTML = this.value

    this.editor.on('text-change', () => this.update())
  },

  methods: {
    update () {
      this.$emit('input', this.editor.getText() ? this.editor.root.innerHTML : '')
    },
    enterKeyPressed () {
      console.log('***')
      // this.iSshowToolTip = false
      //! to forbis of hiding tooltip comment --- display: none; --- on quill.bubble.css on  ---  .ql-bubble .ql-hidden {} ---
      // this.editor.theme.tooltip.show()

      window.scrollBy(0, window.innerHeight)
    },
    showToolTip () {
      this.iSshowToolTip = !this.iSshowToolTip
      // this.editor.theme.tooltip.show()
      // this.editor.theme.tooltip.edit()
      console.log(this.iSshowToolTip)
    }
  }
}
</script>
<style scoped src='../../assets/styles/p5/editorStyle.css'>
</style>
