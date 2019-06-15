<template>
  <div class="container">
    <ul class="border-top">
      <router-link to="/home" replace
        tag="li">
        <i class="fa fa-home"> </i>
        <span>首页</span>
      </router-link>
      <router-link to="/course" replace
        tag="li">
        <i class="fa fa-book"> </i>
        <span>课程</span>
      </router-link>
      <router-link to="/column" replace
        tag="li">
        <i class="fa fa-bookmark"> </i>
        <span>专栏</span>
      </router-link>
      <router-link to="/my" replace
        tag="li">
        <i class="fa fa-user"> </i>
        <span>我的</span>
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'c-tabbar',
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
@import "src/assets/styles/color.scss";
@import "src/assets/styles/border.scss";
@import "src/assets/styles/mixins.scss";
.container {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: px2rem(56);
  background: #fff;
  ul {
    height: 100%;
    @include flex-center;
    li {
      height: 100%;
      flex: 1;
      @include flex-center;
      flex-direction: column;
      i {
        @include flex-center;
        font-size: px2rem(20);
        margin-bottom: px2rem(6);
        width: px2rem(24);
        height: px2rem(20);
        overflow: hidden;
        &:before {
          font-size: px2rem(20);
        }
        &.fa-home:before {
          font-size: px2rem(23);
        }
        &.fa-user:before {
          font-size: px2rem(21);
        }
      }
      span {
        font-size: px2rem(14);
      }
      &.router-link-active {
        i,
        span {
          color: $default_color;
        }
      }
    }
  }
}
</style>
