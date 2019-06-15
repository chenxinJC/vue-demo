<template>
  <div class="item">
    <div class="item-img">
      <img :src="data.imgUrl"
        alt="">
    </div>
    <h3 class="item-title">{{data.article_title}}</h3>
    <div class="info">
      <div class="user">
        <img :src="data.userImgUrl"
          alt="">
        <p>{{data.userName}}</p>
      </div>
      <div class="other">
        <slot name="agree"></slot>
        <slot name="collect"></slot>
        <slot name="comment"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  props: {
    data: Object
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
@import "src/assets/styles/mixins.scss";
.item {
  width: 100%;
  margin-bottom: px2rem(10);
  border-radius: 4px;
  background: #fff;
  box-shadow: 0 px2rem(1) px2rem(4) rgba(0, 0, 0, 0.08);
  overflow: hidden;
  .item-img {
    width: 100%;
    height: px2rem(124);
    @include flex-center;
    overflow: hidden;
    img {
      width: 100%;
      min-height: px2rem(124);
    }
  }
  .item-title {
    font-size: px2rem(14);
    font-weight: 700;
    padding: px2rem(10) px2rem(6);
    @include ellipsis;
  }
  .info {
    display: flex;
    justify-content: space-between;
    margin-bottom: px2rem(10);
    padding: 0 px2rem(10);
    color: #8a8a8a;
    .user {
      @include flex-center;
      font-size: px2rem(12);
      img {
        width: px2rem(20);
        height: px2rem(20);
        margin-right: px2rem(4);
        border-radius: 50%;
      }
    }
    .other {
      @include flex-center;
    }
  }
}
</style>
