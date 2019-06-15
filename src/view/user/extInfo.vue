<template>
  <div>
    <input type="file"
      class="inputer"
      ref="inputer"
      accept='image/*'
      value=""
      @change="selectImg"
      style="display: none">
    <div v-if="loading"
      class="loading">
      <spinner type="lines"></spinner>
    </div>
    <x-header class="header"
      title="个人信息">
      <span slot="right"
        @click="submit">保存</span>
    </x-header>
    <div class="form">
      <group>
        <cell title="头像"
          is-link
          @click.native="fileClick">
          <img class="userImg"
            :src="extInfo.img"
            alt="">
        </cell>
        <x-input title="昵称"
          text-align="right"
          v-model="extInfo.name"></x-input>
        <x-input title="个性签名"
          text-align="right"
          v-model="extInfo.msg"></x-input>
      </group>
    </div>
    <transition enter-active-class="slideInRight"
      leave-active-class="slideOutRight">
      <c-cropper class="animated"
        v-show="cropperShow"
        :img="file"
        @result="getImg"></c-cropper>
    </transition>
  </div>
</template>

<script>
import { XHeader, Group, Cell, XInput, XButton, Spinner } from 'vux'
import CCropper from './c-cropper.vue'
import { updateExtInfo } from 'api/user'
import { setExtInfo } from 'utils/auto'
import { cToast } from 'utils/toast'
export default {
  name: 'extInfo',
  components: {
    CCropper,
    XHeader,
    Group,
    Cell,
    XInput,
    XButton,
    Spinner
  },
  data () {
    return {
      loading: false,
      file: '',
      cropperShow: false,
      extInfo: {
        name: this.$store.getters.extInfo.name,
        age: this.$store.getters.extInfo.age,
        msg: this.$store.getters.extInfo.msg,
        img: this.$store.getters.extInfo.img || require('@/assets/user.jpg')
      }
    }
  },
  mounted () {
  },
  methods: {
    fileClick () {
      this.$refs.inputer.click()
    },
    selectImg () {
      this.cropperShow = true
      var URL = window.URL || window.webkitURL
      var files = this.$refs.inputer.files[0]
      var blobURL = URL.createObjectURL(files)
      this.file = blobURL
      this.$refs.inputer.value = ''
    },
    getImg (res, b) {
      console.log(res)
      this.extInfo.img = res.url
      this.loading = b
    },
    submit () {
      console.log(222, this.extInfo.msg)
      this.loading = true
      let uuid = this.$store.getters.uuid
      let token = this.$store.getters.token
      updateExtInfo(uuid, token, this.extInfo).then(res => {
        console.log(res)
        this.$store.state.user.ext_info = res.ext_info
        setExtInfo(res.ext_info)
        this.loading = false
        cToast(res, '保存成功')
        setTimeout(() => {
          this.$router.go(-1)
        }, 2000)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "src/assets/styles/mixins.scss";
@import "src/assets/styles/color.scss";
.animated {
  z-index: 2;
}
.form {
  margin-top: px2rem(46);
}
.fadeInRight {
  transform: translateX(-350px);
}
.userImg {
  width: px2rem(32);
  height: px2rem(32);
  border-radius: 50%;
  border: px2rem(1) solid #ccc;
}
.loading {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  @include flex-center;
  /deep/ .vux-spinner {
    stroke: $default_color;
  }
}
</style>
