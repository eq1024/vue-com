<template>
  <div id="app">
    <eq-uploader
      action="http://localhost:2714/upload"
      :types="types"
      :size="1024*1024"
      :limit="7"
      multiple
      delay
      @equploaded="uploaded"
      :beforeremove="remove"
      :blob="false"
      eqstyle="width:100px;height:100px"
    ></eq-uploader>
    <eqPlayer :url="url" :controls="controls" :type="type" :height="height" :width="width"/>
  </div>
</template>

<script>
import eqUploader from './components/eq-uploader/eq-uploader.vue'
import eqPlayer from './components/eq-player/eq-player.vue'
export default {
  name: 'App',
  data() {
    return {
      types: ['image/png', 'image/jpeg', 'image/gif'],
      url: '//vjs.zencdn.net/v/oceans.mp4',
      controls: true,
      type: 'video/mp4',
      height: 400,
      width: 600
    }
  },
  components: {
    eqUploader,
    eqPlayer
  },
  methods: {
    uploaded() {},
    remove() {
      // 异步代码
      return new Promise((res) => {
        setTimeout(() => {
          res(1)
        }, 500)
      })
      // 同步代码
      // return false
    }
  }
}
</script>

<style>
</style>
