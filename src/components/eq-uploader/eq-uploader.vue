<template>
  <div class="eq-uploader-container">
    <div class="eq-uploader-flex">
      <div
        class="eq-uploader-files"
        v-for="(v,i) in filelist"
        :key="i"
        :style="eqstyle"
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
            @click="isdelete(i)"
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
        :style="eqstyle"
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
    action: {
      type: String,
      required: true,
      default: ''
    },
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
    blob: {
      type: Boolean,
      default: true
    },
    limit: {
      type: Number,
      default: 5
    },
    beforeremove: {
      type: Function
    },
    eqstyle: {
      type: String,
      default: ''
    }
  },
  methods: {
    async uploadfile(files) {
      let srcs
      if (!this.checkfile(files)) return

      const form = new FormData()
      // files.forEach((ele) => {
      //   console.log(ele);
      //   form.append("index",ele)
      // })
      form.append("sz","files[0]")
      console.log(form)

      srcs = await this.getImgSrc(files)
      this.filelist = [...this.filelist, ...srcs]
      this.filelist.splice(this.limit)
      this.$refs.file.value = null
      this.$emit('equploaded', this.filelist)
    },
    choosefile() {
      let files = Array.from(this.$refs.file.files)
      this.uploadfile(files)
    },
    dropfile(e) {
      e.preventDefault()
      this.uploadfile(Array.from(e.dataTransfer.files))
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
    //base64地址
    getImgSrc(files) {
      if (this.blob) {
        return files.map((v) => {
          const aBlob = new Blob([v], { type: v.type })
          let tem = URL.createObjectURL(aBlob)
          return tem
        })
      } else {
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
      }
    },
    async isdelete(index) {
      if (this.beforeremove) {
        try {
          let candelete = await this.beforeremove(
            this.filelist[index],
            index,
            this.filelist
          )
          candelete ? this.deletefile(index) : null
        } catch (error) {
          return
        }
      } else {
        this.deletefile(index)
      }
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