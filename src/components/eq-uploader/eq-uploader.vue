<template>
  <div class="eq-uploader-container">

    <div class="eq-uploader-flex">
      <div
        class="eq-uploader-files"
        v-for="(v,i) in filelist"
        :key="i"
      >
        <img
          :src="v"
          alt="预览图片"
        >
        <div class="eq-uploader-ctl">
          <img
            @click="prwimage(v)"
            src="../../assets/yulan.svg"
            alt="加载失败"
            title="点击预览"
          >
          <img
            @click="deletefile(i)"
            src="../../assets/shanchu.svg"
            alt="加载失败"
            title="点击删除"
          >
        </div>
      </div>
      <div
        class="eq-uploader-upload"
        @click="upload"
        @drop="dropfile"
        @dragenter="prevent"
        @dragover="prevent"
      >
        <input
          @change="choosefile"
          ref="file"
          class="eq-uploader-invisible"
          type="file"
          :multiple="multiple"
        >
        <div><em>Add File</em></div>
      </div>
    </div>
    <div
      v-show="prwshow"
      class="eq-uploader-prw"
    >
      <img
        :src="prwSrc"
        alt="预览图片"
      >
      <div
        @click="prwshow = !prwshow"
        style="cursor: pointer;"
      ><em>退出</em></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'eq-uploader',
  data() {
    return {
      prwshow: false,
      prwSrc: '',
      filelist: [],
      bloblist: []
    }
  },
  props: {
    types: {
      type: Array,
      default: () => ['image/png', 'image/jpeg']
    },
    size: {
      type: Number,
      default: 1024 * 1024 //1M
    },
    delay: {
      type: Boolean,
      default: true
    },
    multiple: {
      type: Boolean,
      default: false
    },
    limit: {
      type: Number,
      default: 5
    }
  },
  methods: {
    async updatefile(files) {
      let base64
      if (!this.checkfile(files)) return
      base64 = await this.imgtobase64(files)
      this.filelist = [...this.filelist, ...base64]
      this.filelist.splice(this.limit)
      this.$refs.file.value = null
      this.$emit('equploaded', this.filelist)
    },
    choosefile() {
      let files = Array.from(this.$refs.file.files)
      this.updatefile(files)
    },
    dropfile(e) {
      e.preventDefault()
      this.updatefile(Array.from(e.dataTransfer.files))
    },
    prevent(e) {
      e.preventDefault()
    },
    upload() {
      this.$refs.file.click()
    },
    checkfile(files) {
      if (files.some((v) => v.size > this.size)) {
        console.log('超出大小限制')
        return false
      }
      if (files.some((v) => this.types.indexOf(v.type) < 0)) {
        console.log('不支持类型')
        return false
      }
      return true
    },
    imgtobase64(files) {
      //获取一个promise队列
      let promises = files.map((v) => {
        return new Promise((res) => {
          let reader = new FileReader()
          reader.readAsDataURL(v)
          reader.onload = function () {
            res(this.result)
          }
        })
      })
      return Promise.all(promises)
    },
    deletefile(index) {
      this.filelist.splice(index, 1)
    },
    prwimage(src) {
      this.prwSrc = src
      this.prwshow = true
    }
  }
}
</script>

<style scoped>
</style>