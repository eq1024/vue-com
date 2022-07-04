<template>
  <div>
    <div
      class="er-player-container"
      data-vjs-player
    >
      <div
        v-if="loading"
        class="er-player-mask"
      >
        <img
          src="../../assets/cube-loading.gif"
          alt=""
        >
      </div>
      <video
        ref="videoNode"
        class="video-js vjs-default-skin"
      >抱歉，您的浏览器不支持</video>
    </div>
  </div>
</template>

<script>
import videojs from 'video.js'
import videozhCN from 'video.js/dist/lang/zh-CN.json'
import 'video.js/dist/video-js.css'

export default {
  name: 'eqplyaer',
  data() {
    return {
      player: null,
      loading: true
    }
  },
  props: {
    url: {
      type: String
    },
    controls: {
      type: Boolean,
      default: true
    },
    type: {
      type: String
    },
    height: {
      type: Number,
      default: 400
    },
    width: {
      type: Number,
      default: 600
    }
  },
  mounted() {
    let options = {
      autoplay: false, //自动播放
      language: 'zh-CN',
      controls: this.controls, //控制条
      preload: 'auto', //自动加载
      errorDisplay: true, //错误展示
      width: this.width + 'px',
      height: this.height + 'px',
      userActions: {
        hotkeys: true //是否支持热键
      },
      notSupportedMessage: '此视频暂无法播放，请稍后再试',
      sources: [
        {
          src: this.url,
          type: this.type
        }
      ]
    }
    let _this = this
    this.player = videojs(
      this.$refs.videoNode,
      options,
      function onPlayerReady() {
        console.log(_this.loading)
        _this.loading = false
        console.log(_this.loading)
        videojs.log(`Your player is ready!`)
      }
    )
    videojs.addLanguage('zh-CN', videozhCN)
  },
  beforeDestroy() {
    if (this.player) {
      this.player.dispose()
    }
  }
}
</script>

<style scoped>
.er-player-container {
  position: relative;
}
.er-player-mask {
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  background-color: #0d0d0d;
}
.vjs-big-play-button {
  z-index: 99;
}
.er-player-mask img {
  height: 50%;
  z-index: 1;
}
</style>