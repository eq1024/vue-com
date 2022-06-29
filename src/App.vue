<template>
  <div id="app">
    <eq-uploader
      :types="types"
      :size="1024*1024"
      :limit="7"
      multiple
      delay
      @equploaded="uploaded"
    ></eq-uploader>
  </div>
</template>

<script>
import eqUploader from './components/eq-uploader/eq-uploader.vue'
export default {
  name: 'App',
  data() {
    return {
      types: ['image/png', 'image/jpeg', 'image/gif']
    }
  },
  components: {
    eqUploader
  },
  methods:{
    uploaded(data){
      console.log(data);
    }
  }
}
</script>

<style>
</style>
