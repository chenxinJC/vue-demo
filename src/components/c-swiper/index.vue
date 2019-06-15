<template>
  <div class="swiper-container c-swiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide"
        v-for="(item, index) in swiperDatas"
        :key="index">
        <img :src="item.imgUrl"
          alt="">
      </div>
    </div>
    <div class="swiper-pagination"></div>
  </div>
</template>

<script>
import Swiper from 'swiper'
export default {
  name: 'c-swiper',
  components: {
    Swiper
  },
  props: {
    options: Object,
    swiperDatas: Array
  },
  data () {
    return {
      // cSwiper: null
    }
  },
  mounted () {
    this.initSwiper()
  },
  activated () {
    if (this.swiperDatas.length > 0) {
      // console.log('11111111111111111111111111')
      this.startSwiper()
    }
  },
  deactivated () {
    if (this.swiperDatas.length > 0) {
      // console.log('222222222222222222222222')
      this.stopSwiper()
    }
  },
  methods: {
    initSwiper () {
      this.$nextTick(() => {
        if (this.swiperDatas.length > 0) {
          this.mySwiper = new Swiper('.c-swiper', this.options)
          // this.cSwiper = mySwiper
        }
      })
    },
    startSwiper () {
      this.mySwiper.autoplay.start()
    },
    stopSwiper () {
      this.mySwiper.autoplay.stop()
    }
  }
}
</script>

<style lang="scss" scoped>
@import "assets/styles/mixins.scss";
.swiper-container {
  @include flex-center;
  width: 100%;
  // perspective: px2rem(800);
  .swiper-slide {
    @include flex-center;
    overflow: hidden;
    // opacity: 0.5;
    width: 90%;
    // transform-style: preserve-3d;
    // top: px2rem(12);
    // transition: all 3s;
    &.swiper-slide-active {
      // opacity: 1;
      // top: 0;
      img {
        // box-shadow: 0 2px 6px rgba(0, 0, 0, 0.36);
      }
    }
    img {
      border-radius: 4px;
      height: 90%;
      // transition: all 0.8s;
    }
  }
  .swiper-pagination {
    bottom: px2rem(2);
  }
}
/deep/ .swiper-pagination-bullet {
  width: px2rem(6);
  height: px2rem(6);
}
</style>
