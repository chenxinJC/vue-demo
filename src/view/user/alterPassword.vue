<template>
  <!-- <transition enter-active-class="slideInRight" -->
  <!-- leave-active-class="slideOutRight"> -->
  <div class="">
    <x-header class="header"
      title="修改密码"></x-header>
    <div class="form">
      <p class="title">请输入原密码，且新密码不能与原密码相同</p>
      <group>
        <x-input class="input"
          ref="password"
          title=""
          required
          :min=6
          :max=16
          type="password"
          placeholder="请输入原密码..."
          autocomplete="off"
          v-model="oldPsd">
        </x-input>
        <x-input class="input"
          ref="password"
          title=""
          required
          :min=6
          :max=16
          type="password"
          placeholder="请输入新密码..."
          autocomplete="off"
          v-model="newPsd">
        </x-input>
        <x-button class="btn-next"
          :disabled="disabled"
          type="primary"
          @click.native="submit()">
          <span class="btn-loading"
            v-if="loading">
            <img src="../../assets/tail-spin.svg">加载中
          </span>
          <span v-else>提交</span>
        </x-button>
      </group>
    </div>
  </div>
  <!-- </transition> -->
</template>

<script>
import { XHeader, Group, XInput, XButton, InlineLoading } from 'vux'
import { alterPassword } from 'api/user'
import { cToast } from 'utils/toast'
export default {
  name: 'changePassward',
  components: {
    XHeader,
    Group,
    XInput,
    XButton,
    InlineLoading
  },
  data () {
    return {
      oldPsd: '',
      newPsd: '',
      disabled: false,
      loading: false
    }
  },
  mounted () {
    console.log(this.$store.getters.password)
  },
  methods: {
    submit () {
      this.disabled = true
      this.loading = true
      let username = this.$store.getters.username
      alterPassword(username, this.oldPsd, this.newPsd).then(res => {
        let data = res.data.data
        this.disabled = false
        this.loading = false
        cToast(data, '修改成功')
        if (data.err_code === 0) {
          setTimeout(() => {
            this.$store.dispatch('Logout')
          }, 2000)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "src/assets/styles/form_01.scss";
.animated {
  z-index: 2;
}
.form {
  padding-top: px2rem(46);
  margin: 0 auto;
  width: 80%;
}
.title {
  font-size: px2rem(14);
  margin-top: px2rem(20);
  text-align: center;
  color: #cacaca;
}
.input {
  margin-bottom: px2rem(20);
}
</style>
