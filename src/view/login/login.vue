<template>
  <transition enter-active-class="fadeIn"
    leave-active-class="fadeOut">
    <div class="login animated">
      <x-icon type="ios-close-empty"
        class="icon-back"
        size="36"
        @click.native="back"></x-icon>
      <div class="logo">
        <img src="../../assets/logo.png"
          alt="">
      </div>
      <div class="form">
        <group class="group">
          <x-input class="input"
            ref="username"
            required
            :max=20
            @on-change="keyDown"
            placeholder="请输入用户名..."
            v-model="userInfo.username">
            <span class="icon"
              slot="label">
              <i class="iconfont icon-user"></i>
            </span>
          </x-input>
          <x-input class="input"
            ref="password"
            title=""
            required
            :min=6
            :max=16
            @on-change="keyDown"
            :type="pwdType"
            placeholder="请输入密码..."
            autocomplete="off"
            v-model="userInfo.password">
            <span class="icon"
              slot="label">
              <i class="iconfont icon-password"></i>
            </span>
            <span class="showpw"
              slot="right"
              @click="changeType">
              <i class="iconfont icon-eye"
                :style="{ color: pwdColor }"></i>
            </span>
          </x-input>
          <x-button class="sign-in"
            :disabled="disabled"
            type="primary"
            @click.native="signIn()">
            <span class="btn-loading"
              v-if="loading">
              <img src="../../assets/tail-spin.svg">加载中
            </span>
            <span v-else>登录</span>
          </x-button>
          <div class="other">
            <router-link to="/forgetPassword">忘记密码</router-link>
            <router-link to="/register">用户注册</router-link>
          </div>
        </group>
      </div>
    </div>
  </transition>
</template>

<script>
import { XHeader, Group, XInput, XButton, InlineLoading } from 'vux'
export default {
  name: 'login',
  components: {
    XHeader,
    Group,
    XInput,
    XButton,
    InlineLoading
  },
  data () {
    return {
      userInfo: {
        username: 'admin',
        password: '123456'
      },
      disabled: true,
      pwdType: 'password',
      pwdColor: '#B2B2B2',
      loading: false
    }
  },
  methods: {
    signIn () {
      if (this.userInfo.namename !== '' && this.userInfo.password !== '') {
        this.loading = true
        this.disabled = true
        this.$store.dispatch('Login', this.userInfo).then(res => {
          console.log(res)
          if (res.data.data.err_code === 0) {
            this.$router.go(-1)
            return this.$store.dispatch('GetUserInfo')
          }
        }).then(res => {
          // console.log(this.$store.state.navigation.routes[this.$store.state.navigation.routes.length - 2])
          // this.$router.replace({path: 'setUp'})
          // this.$router.push({path: '/setUp', query: {VNK: 'bd839595'}})
          this.loading = false
          this.disabled = false
        }).catch(() => {
          setTimeout(() => {
            this.loading = false
            this.disabled = false
          }, 2000)
        })
      }
    },
    keyDown () {
      if (this.$refs.username.valid === true && this.username !== '' && this.$refs.password.valid === true && this.password !== '') {
        this.disabled = false
      } else {
        this.disabled = true
      }
    },
    changeType () {
      if (this.pwdType === 'password') {
        this.pwdType = 'text'
        this.pwdColor = '#41b883'
      } else {
        this.pwdType = 'password'
        this.pwdColor = '#B2B2B2'
      }
    },
    back () {
      this.$router.go(-1)
    },
    clear () {
      console.log(111)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "src/assets/styles/form_01.scss";
@import "src/assets/styles/mixins.scss";
body,
/deep/ html {
  background: #fff !important;
}
.animated {
  z-index: 7;
}
.icon-back {
  padding: px2rem(5);
  position: absolute;
  top: 0;
  left: 0;
}
.logo {
  padding-top: 20%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  img {
    width: px2rem(100);
    height: px2rem(100);
  }
}
.form {
  margin: px2rem(64) auto 0;
  width: 80%;
  .input {
    margin-top: px2rem(20);
  }
  .sign-in {
    margin-top: px2rem(20);
  }
}
.showpw {
  display: inline-flex;
  vertical-align: middle;
  justify-content: center;
  align-items: center;
  width: px2rem(24);
  height: px2rem(24);
  i {
    display: block;
    font-size: px2rem(22);
  }
}
.icon {
  display: inline-flex;
  vertical-align: middle;
  justify-content: center;
  align-items: center;
  width: px2rem(24);
  height: px2rem(24);
  margin-right: px2rem(15);
  i {
    display: block;
    font-size: px2rem(24);
  }
}
.other {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: px2rem(10);
  font-size: px2rem(14);
}
</style>
