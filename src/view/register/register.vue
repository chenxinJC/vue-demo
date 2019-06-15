<template>
  <!-- <transition enter-active-class="fadeInUp" -->
  <!-- leave-active-class="fadeOutDown"> -->
  <div>
    <x-header class="header"
      :style="backStyle"
      title="注册">
    </x-header>
    <div class="form">
      <group>
        <x-input class="input"
          ref="username"
          required
          :max=20
          @on-change="keyDown"
          placeholder="请输入用户名..."
          v-model="form.username">
        </x-input>
        <x-input class="input"
          ref="password"
          required
          :min=6
          :max=16
          :type="pwdType"
          @on-change="keyDown"
          placeholder="请输入密码..."
          v-model="form.psd">
        </x-input>
        <x-input class="input"
          ref="captcha"
          required
          :min=4
          :max=4
          @on-change="keyDown"
          placeholder="请输入验证码..."
          v-model="form.captcha">
          <img class="captchaImg"
            slot="right"
            :src="form.captchaImg" />
        </x-input>
        <x-button class="submit"
          :disabled="disabled"
          type="primary"
          @click.native="signIn()">
          <span class="btn-loading"
            v-if="loading">
            <img src="../../assets/tail-spin.svg">加载中
          </span>
          <span v-else>注册</span>
        </x-button>
      </group>
    </div>
  </div>
  <!-- </transition> -->
</template>

<script>
import { XHeader, Group, XInput, XButton, InlineLoading } from 'vux'
import { register } from 'api/user'
import { captcha, captchaVerify } from 'api/captcha'
import { cToast } from 'utils/toast'
export default {
  name: 'register',
  components: {
    XHeader,
    Group,
    XInput,
    XButton,
    InlineLoading
  },
  data () {
    return {
      form: {
        username: '',
        psd: '',
        captcha: '',
        captchaId: '',
        captchaImg: ''
      },
      backStyle: {
        background: '#fff'
      },
      disabled: true,
      loading: false,
      pwdType: 'password'
    }
  },
  mounted () {
    this.getCaptchaImg()
  },
  methods: {
    signIn () {
      this.loading = true
      this.disabled = true
      captchaVerify(this.form.captchaId, this.form.captcha).then(res => {
        console.log(111, res)
        if (res.err_code === 0) {
          return register(this.form.username, this.form.psd)
        } else {
          this.loading = false
          this.disabled = false
          this.getCaptchaImg()
          this.$vux.toast.show({
            type: 'text',
            text: '验证码错误',
            width: '10em',
            position: 'middle'
          })
        }
      }).then(res => {
        let data = res.data.data
        this.loading = false
        this.disabled = false
        cToast(data, '注册成功')
        if (data && data.err_code === 0) {
          setTimeout(() => {
            this.$router.push('/login')
          }, 2000)
        } else {
          this.getCaptchaImg()
        }
      })
    },
    keyDown () {
      if (this.$refs.username.valid === true && this.username !== '' &&
        this.$refs.password.valid === true && this.password !== '' &&
        this.$refs.captcha.valid === true && this.captcha !== '') {
        this.disabled = false
      } else {
        this.disabled = true
      }
    },
    getCaptchaImg () {
      captcha().then(res => {
        this.form.captcha = ''
        this.form.captchaId = res.captcha_id
        this.form.captchaImg = 'data:image/jpg;base64,' + res.captcha_img
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "src/assets/styles/color.scss";
@import "src/assets/styles/mixins.scss";
.animated {
  z-index: 2;
}
/deep/ .vux-header {
  .vux-header-title {
    color: #333;
  }
  .vux-header-left {
    a {
      color: #333;
    }
    .left-arrow:before {
      border-color: #333;
    }
  }
}
.form {
  margin: 0 auto;
  padding: px2rem(46) 0 0;
  width: 80%;
  .input {
    margin-bottom: px2rem(20);
  }
}
.form /deep/ {
  .weui-cells:before,
  .weui-cells:after,
  .weui-cell:before {
    border-width: 0;
  }
  .weui-cell {
    background: #f2f2f2;
  }
  .weui-btn:after {
    border-width: 0;
  }
  .weui-btn_primary {
    background: $default_color;
  }
  .weui-btn_disabled.weui-btn_primary {
    background: $default_light_color;
  }
  .weui-btn_primary:not(.weui-btn_disabled):active {
    background: $default_dark_color;
  }
}
.submit {
  margin-top: px2rem(20);
}
.btn-loading {
  height: px2rem(16);
  line-height: px2rem(16);
  font-size: px2rem(14);
  img {
    height: px2rem(16);
    margin-right: px2rem(8);
    vertical-align: middle;
  }
}
.captchaImg {
  position: relative;
  left: px2rem(15);
  height: px2rem(44);
}
</style>
