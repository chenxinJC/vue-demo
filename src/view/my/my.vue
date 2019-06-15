<template>
  <!-- <transition enter-active-class="fadeIn" -->
  <!-- leave-active-class="fadeOut"> -->
  <div class="">
    <x-header class="header"
      title="个人中心"
      :left-options="{showBack: false}">
    </x-header>
    <div class="user-box">
      <div class="user-info">
        <img :src="user.img">
        <router-link v-if="!$store.getters.extInfo.name"
          class="user-name"
          to="/login">点击登录</router-link>
        <div v-else>
          <h3 class="user-name">{{user.name}}</h3>
          <p class="user-msg">{{user.msg.length > 20 ? user.msg.slice(0, 20) + "..." : user.msg}}</p>
        </div>
      </div>
    </div>
    <div>
      <group>
        <cell title="设置"
          is-link
          link="/setUp">
          <i class="fa fa-cog"
            slot="icon"></i>
        </cell>
      </group>
    </div>
  </div>
  <!-- </transition> -->
</template>

<script>
import { XHeader, Group, Cell } from 'vux'
export default {
  name: 'my',
  components: {
    XHeader,
    Group,
    Cell
  },
  data () {
    return {
      user: {
        name: this.$store.getters.extInfo.name || '',
        msg: this.$store.getters.extInfo.msg || '你想说的话',
        img: this.$store.getters.extInfo.img || require('../../assets/user.jpg')
      }
    }
  },
  mounted () {
    this.user.name = this.$store.getters.extInfo.name || ''
    this.user.img = this.$store.getters.extInfo.img || require('../../assets/user.jpg')
    this.getUserInfo()
  },
  watch: {
    '$store.getters.extInfo' (val) {
      this.user.name = val.name ? val.name : ''
      this.user.img = val.img ? val.img : require('../../assets/user.jpg')
    }
  },
  methods: {
    getUserInfo () {
      if (this.$store.getters.uuid.length > 0) {
        this.$store.dispatch('GetUserInfo').then(res => {
          console.log(res)
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "src/assets/styles/mixins.scss";
@import "src/assets/styles/color.scss";
/deep/ .weui-cell__hd {
  @include flex-center;
  margin-right: px2rem(10);
  .fa {
    font-size: px2rem(20);
    color: #5890eb;
  }
}
.animated {
  bottom: px2rem(46);
  background: #f6f6f6;
}
.user-box {
  @include flex-center;
  // position: fixed;
  // top: px2rem(45);
  margin-top: px2rem(46);
  width: 100%;
  height: px2rem(130);
  padding-bottom: px2rem(10);
  background: $default_color;
  .user-info {
    @include flex-center;
    flex-direction: column;
    color: #fff;
  }
  img {
    width: px2rem(64);
    height: px2rem(64);
    border: px2rem(2) solid #fff;
    border-radius: 50%;
    box-sizing: border-box;
    background: #fff;
  }
  .user-name {
    margin: 10px auto 8px;
    font-size: px2rem(16);
    font-weight: 700;
    text-align: center;
    color: #fff;
  }
  .user-msg {
    font-size: px2rem(12);
    text-align: center;
    opacity: 0.64;
  }
  .fa {
    width: 20px;
  }
}
</style>
