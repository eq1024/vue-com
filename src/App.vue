<template>
  <div id="app">
    <eq-uploader
      action="baidu.com"
      :types="types"
      :size="1024*1024"
      :limit="7"
      multiple
      delay
      @equploaded="uploaded"
      :beforeremove="remove"
      :blob="false"
      eqstyle="width:200px;height:200px"
    ></eq-uploader>
  </div>
</template>

<script>
import eqUploader from './components/eq-uploader/eq-uploader.vue'
export default {
  name: 'App',
  data() {
    return {
      types: ['image/png', 'image/jpeg', 'image/gif'],
      kk: ''
    }
  },
  components: {
    eqUploader
  },
  methods: {
    uploaded() {},
    remove() {
      return new Promise((res) => {
        setTimeout(() => {
          res(1)
        }, 1000)
      })
    }
  }
}
</script>

<style>
</style>
