<template>
  <div class="c-cropper">
    <x-header class="header"
      title="图片上传"
      :left-options="{preventGoBack: true}"
      @on-click-back="back">
      <span slot="right"
        @click="finish">确定</span>
    </x-header>
    <vueCropper ref="cropper"
      :img="img"
      :outputSize="option.size"
      :outputType="option.outputType"
      :info=option.info
      :autoCrop="option.autoCrop"
      :autoCropWidth="option.autoCropWidth"
      :autoCropHeight="option.autoCropHeight"
      :fixedBox="option.fixedBox"
      :canMoveBox="option.canMoveBox"
      :centerBox="option.centerBox"
      :mode="option.mode"></vueCropper>
  </div>
</template>

<script>
import { XHeader, Group, Cell, XInput, XButton } from 'vux'
import { VueCropper } from 'vue-cropper'
import { upload } from 'api/upload'
const htmlWidth = document.documentElement.clientWidth || document.body.clientWidth
export default {
  name: 'extInfo',
  components: {
    VueCropper,
    XHeader,
    Group,
    Cell,
    XInput,
    XButton
  },
  props: {
    img: String
  },
  data () {
    return {
      previews: {},
      option: {
        size: 1,
        outputType: 'jpeg',
        autoCrop: true,
        autoCropWidth: htmlWidth * 0.8,
        autoCropHeight: htmlWidth * 0.8,
        info: false,
        fixedBox: true,
        canMoveBox: false,
        centerBox: true,
        mode: 'cover'
      }
    }
  },
  mounted () {
    console.log(this.htmlWidth)
  },
  methods: {
    finish () {
      this.back()
      this.$parent.loading = true
      this.$refs.cropper.getCropData((data) => {
        let file = this.dataURLtoFile(data, 'user_img_' + Number(new Date()) + '.jpeg')
        upload(file).then(res => {
          console.log(res)
          this.$emit('result', res, false)
        })
      })
    },
    // base64 转 file
    dataURLtoFile (dataurl, filename) {
      let arr = dataurl.split(',')
      let mime = arr[0].match(/:(.*?);/)[1]
      let bstr = atob(arr[1])
      let n = bstr.length
      let u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      return new File([u8arr], filename, { type: mime })
    },
    back () {
      this.$parent.cropperShow = false
    }
  }
}
</script>

<style lang="scss" scoped>
.c-cropper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
}
.dd {
  width: 40%;
  position: absolute;
  top: 80px;
  left: 50px;
  z-index: 99;
}
</style>
