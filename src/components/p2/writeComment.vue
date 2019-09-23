<template>
    <div class="col-m-9-5 write-comment-main">
        <div id="editor" class="test"></div>
        <div class="col-m-2 submit">submit</div>
    </div>
</template>

<script>
import Quill from 'quill'

export default {
  props: {
    value: {
      type: String,
      default: ''
    }
  },

  data () {
    return {
      editor: null
    }
  },
  mounted () {
    this.editor = new Quill('#editor', {
      modules: {
        toolbar: {
          container: [ ['bold', 'italic', 'underline', 'strike'], [{ 'color': [] }, { 'background': [] }], // toggled buttons
            ['blockquote', 'code-block', 'link'], [{ 'indent': '-1' }, { 'indent': '+1' }], [{ 'list': 'ordered' }, { 'list': 'bullet' }], ['image'], [{ 'direction': 'rtl' }]],
          handlers: {
            image: imageHandler
          }
        }
      },
      placeholder: 'هان ؟؟؟؟؟؟؟؟',
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

        formData.append('image', file)

        // Save current cursor state

        const range = this.quill.getSelection(true)

        // Insert temporary loading placeholder image
        // this.quill.insertEmbed(range.index, 'image', `${ window.location.origin }/images/loaders/placeholder.gif`);

        // Move cursor to right side of image (easier to continue typing)
        this.quill.setSelection(range.index + 1)

        // const res = 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/480px-JavaScript-logo.png'; // API post, returns image location as string e.g. 'http://www.example.com/images/foo.png'
        const res = 'http://192.168.1.61/fenjooon/huge-size-image.jpg' // API post, returns image location as string e.g. 'http://www.example.com/images/foo.png'

        // Remove placeholder image

        // this.quill.deleteText(range.index, 1);

        // Insert uploaded image
        this.quill.insertEmbed(range.index, 'image', res)
        // this.quill.insertEmbed(range.index + 1, 'code-block','djfhvba');
        this.quill.setSelection(range.index + 5)
      }
    }

    this.editor.root.innerHTML = this.value

    this.editor.on('text-change', () => this.update())
  },

  methods: {
    update () {
      this.$emit('input', this.editor.getText() ? this.editor.root.innerHTML : '')
    }
  }
}
</script>
<style scoped src='../../assets/styles/p2/writeCommentStyle.css'>
</style>
