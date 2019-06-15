<template>
  <div class="container">
    <router-link class="item" tag="div"
      v-for="(item, index) in list"
      :key="index"
      :to="'course/video/' + item.id">
      <img class="item-img"
        :src="item.imgUrl">
      <div class="item-title">{{item.title}}</div>
      <div class="info">
        <div class="follow">
          <img class="follow-item"
            v-for="(fItem, index) in getMaxList(item.follow)"
            :key="index"
            :src="fItem.userImgUrl"
            :style="{left: leftFs(index)}">
          <span class="more"
            v-if="item.follow.length > 3">{{item.follow.length}}+</span>
        </div>
        <div class="user">
          <img :src="item.userImgUrl"
            alt="">
          <p class="name">{{item.userName}}</p>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
import { fs } from 'utils/auto'
export default {
  name: 'c-list',
  props: {
    list: Array
  },
  data () {
    return {
    }
  },
  mounted () {
  },
  methods: {
    getMaxList (array) {
      return array.length > 3 ? array.slice(0, 3) : array
    },
    leftFs (index) {
      return index * fs(12) + 'px'
    }
  }
}
</script>

<style lang="scss" scoped>
@import "src/assets/styles/mixins.scss";
@import "src/assets/styles/color.scss";
.container {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 0 px2rem(15);
  .item {
    flex: 0 0 48%;
    width: 48%;
    margin-bottom: px2rem(10);
    background: #fff;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
    .item-img {
      width: 100%;
    }
    .item-title {
      font-size: px2rem(14);
      padding: px2rem(10) px2rem(12);
      @include ellipsis;
    }
    .info {
      display: flex;
      justify-content: space-between;
      height: px2rem(24);
      padding: 0 px2rem(6) px2rem(10);
      font-size: px2rem(12);
      img {
        width: px2rem(24);
        border-radius: 50%;
        border: 1px solid #fff;
      }
      .follow {
        position: relative;
        height: 100%;
        @include flex-center;
        img {
          position: absolute;
        }
        .more {
          min-width: px2rem(24);
          height: px2rem(24);
          padding: 0 px2rem(4);
          border-radius: px2rem(12);
          border: 1px solid #fff;
          text-align: center;
          color: #fff;
          line-height: px2rem(24);
          background: $default_color;
          position: absolute;
          left: px2rem(36);
        }
      }
      .user {
        display: flex;
        @include flex-center;
        color: #acacac;
        img {
          margin-right: px2rem(6);
        }
      }
    }
  }
}
</style>
