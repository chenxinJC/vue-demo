<template>
  <div class="container">
    <div class="item"
      v-for="item in list"
      :key="item.id"
      @click="toLink(item.id)">
      <div class="item-img">
        <img :src="item.imgUrl"
          alt="">
      </div>
      <h3 class="item-title">{{item.article_title}}</h3>
      <div class="info">
        <div class="user">
          <img :src="item.userImgUrl"
            alt="">
          <p>{{item.userName}}</p>
        </div>
        <div class="other">
          <!-- <div class="icon-wrapper"
            @click.stop="agree(item)">
            <span class="fa"
              :class="[item.agreeState ? 'fa-thumbs-up' : 'fa-thumbs-o-up']"
              :style="{color: item.agreeState ? '#2196f3' : ''}"></span>
            <span class="num">{{item.agreeNum}}</span>
          </div> -->
          <agree class="icon-wrapper"
            :agreeState="item.agreeState"
            :agreeNum="item.agreeNum"
            @agree="agree"></agree>
          <div class="icon-wrapper">
            <span class="fa"
              :class="[item.collectState ? 'fa-heart' : 'fa-heart-o']"></span>
            <span class="num">{{item.collectNum}}</span>
          </div>
          <div class="icon-wrapper">
            <span class="fa fa-commenting"></span>
            <span class="num">{{item.commentNum}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Agree from 'components/agree'
export default {
  name: 'c-list_2',
  props: {
    list: Array
  },
  components: {
    Agree
  },
  data () {
    return {
    }
  },
  methods: {
    toLink (id) {
      console.log(id)
      this.$emit('toLink', id)
    }
    // agree (state, num) {
    //   console.log(state, num)
    //   this.$emit('agree', item)
    // }
  }
}
</script>

<style lang="scss" scoped>
@import "src/assets/styles/mixins.scss";
.container {
  padding: 0 px2rem(15);
  // .item {
  //   width: 100%;
  //   margin-bottom: px2rem(10);
  //   border-radius: 4px;
  //   background: #fff;
  //   box-shadow: 0 px2rem(1) px2rem(4) rgba(0, 0, 0, 0.08);
  //   overflow: hidden;
  //   .item-img {
  //     width: 100%;
  //     height: px2rem(124);
  //     @include flex-center;
  //     overflow: hidden;
  //     img {
  //       width: 100%;
  //       min-height: px2rem(124);
  //     }
  //   }
  //   .item-title {
  //     font-size: px2rem(14);
  //     font-weight: 700;
  //     padding: px2rem(10) px2rem(6);
  //     @include ellipsis;
  //   }
  //   .info {
  //     display: flex;
  //     justify-content: space-between;
  //     margin-bottom: px2rem(10);
  //     padding: 0 px2rem(10);
  //     color: #8a8a8a;
  //     .user {
  //       @include flex-center;
  //       font-size: px2rem(12);
  //       img {
  //         width: px2rem(20);
  //         height: px2rem(20);
  //         margin-right: px2rem(4);
  //         border-radius: 50%;
  //       }
  //     }
  //     .other {
  //       @include flex-center;
  //       .icon-wrapper {
  //         margin-left: px2rem(12);
  //         @include flex-center;
  //         .fa {
  //           margin-right: px2rem(2);
  //           font-size: px2rem(14);
  //         }
  //         .num {
  //           font-size: px2rem(12);
  //         }
  //       }
  //     }
  //   }
  // }
}
</style>
