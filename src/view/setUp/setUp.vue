<template>
  <div>
    <x-header class="header"
      title="设置"></x-header>
    <div class="set-content">
      <group>
        <cell class="userInfo"
          :title="user.name"
          is-link
          :link="user.name === '' ? '/login' : '/extInfo'">
          <span v-if="user.name === ''">点击登录</span>
          <img class="userimg"
            :src="user.img"
            slot="icon">
        </cell>
        <cell title="修改密码"
          is-link
          link="/alterPassword">
        </cell>
      </group>
      <div class="logout"
        v-if="user.name.length > 0">
        <x-button type="warn"
          @click.native="logout">
          退出
        </x-button>
      </div>
    </div>
  </div>
</template>

<script>
import { XHeader, Group, Cell, XButton } from 'vux'
export default {
  name: 'setUp',
  components: {
    XHeader,
    Group,
    Cell,
    XButton
  },
  data () {
    return {
      user: {
        name: this.$store.getters.extInfo.name || '',
        img: this.$store.getters.extInfo.img || require('../../assets/user.jpg')
      }
    }
  },
  mounted () {
    this.user.name = this.$store.getters.extInfo.name || ''
    this.user.img = this.$store.getters.extInfo.img || require('../../assets/user.jpg')
  },
  watch: {
    '$store.getters.extInfo' (val) {
      this.user.name = val.name ? val.name : ''
      this.user.img = val.img ? val.img : require('../../assets/user.jpg')
    }
  },
  methods: {
    logout () {
      let vm = this
      this.$store.state.modal = true
      this.$vux.confirm.show({
        content: '确定要退出吗？',
        onCancel () {
          vm.$store.state.modal = false
        },
        onConfirm () {
          vm.$store.dispatch('Logout')
          vm.$store.state.modal = false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "src/assets/styles/mixins.scss";
.animated {
  background: #f6f6f6;
  z-index: 1;
}
.fadeOut {
  animation-delay: 0.3s;
}
.set-content {
  padding-top: px2rem(46);
  /deep/ .weui-cell {
    height: px2rem(32);
    padding-top: px2rem(8);
    padding-bottom: px2rem(8);
    &:before {
      left: 0;
    }
  }
}
.userimg {
  width: px2rem(32);
  margin-right: px2rem(10);
  border-radius: 50%;
  border: 1px solid #eaeaea;
}
.logout {
  margin: px2rem(20) px2rem(15);
}
</style>
