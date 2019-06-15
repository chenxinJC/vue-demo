<template>
  <div>
    <c-video class="video"
      v-if="videoInfo.imgUrl"
      ref="video"
      :videoUrl="videoInfo.videoUrl"
      :imgUrl="videoInfo.imgUrl"></c-video>
    <div class="swiper-container"
      ref="nav"
      id="nav">
      <div class="swiper-wrapper">
        <div class="swiper-slide"
          @click="clickHandle(0)">
          <span>简介</span>
        </div>
        <div class="swiper-slide"
          @click="clickHandle(1)">
          <span>评论</span>
        </div>
        <div class="bar"
          ref="bar">
          <div class="color"></div>
        </div>
      </div>
    </div>
    <div class="swiper-container"
      ref="page"
      id="page">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <div class="container"
            v-if="videoInfo.userName">
            <div class="userInfo">
              <img :src="videoInfo.userImgUrl"
                alt="">
              <div class="usr">
                <h4>{{videoInfo.userName}}</h4>
                <p>2.3万粉丝</p>
              </div>
              <div class="btn">
                <button>关注</button>
              </div>
            </div>
            <div class="content">
              <h3>{{videoInfo.title}}</h3>
            </div>
          </div>
        </div>
        <div class="swiper-slide">
          2
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swiper from 'swiper'
import CVideo from 'components/c-video'
import { getCourse } from 'api/course'

const WIDTH = document.documentElement.clientWidth

export default {
  name: 'component_name',
  components: {
    Swiper,
    CVideo
  },
  data () {
    return {
      videoInfo: {},
      img: '',
      activeIndex: 0
    }
  },
  mounted () {
    let vm = this
    this.getData()
    let n = vm.$refs.nav.getElementsByClassName('swiper-slide')
    let num = WIDTH / n.length
    let bar = vm.$refs.bar
    bar.style.width = (1 / n.length) * 100 + '%'
    console.log(WIDTH / 16 * 9, this.$refs.nav.clientHeight)
    this.$refs.nav.style.top = WIDTH / 16 * 9 + 'px'
    this.$refs.page.style.top = WIDTH / 16 * 9 + this.$refs.nav.clientHeight + 'px'
    bar.firstChild.style.width = n[vm.activeIndex].firstChild.clientWidth + 'px'
    this.mySwiper = new Swiper('#page', {
      on: {
        touchMove: function () {
          let progress = this.progress * (n.length - 1)
          let barWidthCurrent = n[vm.activeIndex].firstChild.clientWidth
          let barWidthPrev = vm.activeIndex - 1 >= 0 ? n[vm.activeIndex - 1].firstChild.clientWidth : barWidthCurrent
          let barWidthNext = vm.activeIndex + 1 <= n.length - 1 ? n[vm.activeIndex + 1].firstChild.clientWidth : barWidthCurrent
          if (this.progress > 0 && this.progress < 1) {
            bar.style.transform = 'translateX(' + num * progress + 'px)'
          } else {
            bar.style.transfrom = 'translateX(' + num * vm.activeIndex + ')'
          }
          // console.log(this.swipeDirection)
          if (this.swipeDirection === 'next') {
            bar.firstChild.style.width = barWidthCurrent > barWidthNext
              ? (barWidthCurrent - barWidthNext) * (vm.activeIndex - progress) + barWidthCurrent + 'px'
              : -(barWidthCurrent - barWidthNext) * (progress - vm.activeIndex) + barWidthCurrent + 'px'
          } else {
            bar.firstChild.style.width = barWidthCurrent > barWidthPrev
              ? -(barWidthCurrent - barWidthPrev) * (vm.activeIndex - progress) + barWidthCurrent + 'px'
              : (barWidthCurrent - barWidthPrev) * (progress - vm.activeIndex) + barWidthCurrent + 'px'
          }
        },
        transitionStart: function () {
          vm.activeIndex = this.activeIndex
          bar.firstChild.style.width = n[vm.activeIndex].firstChild.clientWidth + 'px'
          bar.style.transitionDuration = '0.3s'
          bar.style.transform = 'translateX(' + vm.activeIndex * num + 'px)'
          setTimeout(() => {
            bar.style.transitionDuration = '0s'
          }, 300)
        }
      }
    })
  },
  methods: {
    clickHandle (index) {
      this.activeIndex = index
      this.mySwiper.slideTo(index, 300, false)
    },
    getData () {
      getCourse(this.$route.params.id).then(res => {
        this.videoInfo = res.data.list[0]
        console.log(this.videoInfo)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "src/assets/styles/mixins.scss";
@import "src/assets/styles/color.scss";
.animated {
  z-index: 1;
}
.video {
  width: 100%;
  height: auto;
}
.swiper-container {
  width: 100%;
}
#nav {
  position: absolute;
  &:after {
    display: block;
    content: "";
    width: 100%;
    height: px2rem(1);
    background: #f2f2f2;
    position: absolute;
    left: 0;
    bottom: 0;
  }
  .swiper-wrapper {
    height: px2rem(36);
    @include flex-center;
  }
  .swiper-slide {
    flex: 1;
    width: 0;
    height: 100%;
    @include flex-center;
    text-align: center;
    position: relative;
  }
  .bar {
    width: 50%;
    height: 3px;
    position: absolute;
    left: 0;
    bottom: 0;
    .color {
      width: 40px;
      height: 100%;
      margin: 0 auto;
      background: $default_color;
    }
  }
}
#page {
  position: absolute;
  width: 100%;
  bottom: 0;
  .swiper-slider {
    width: 100%;
  }
  .container{
    padding: 0 px2rem(10);
  }
  .userInfo {
    padding-top: px2rem(10);
    height: px2rem(36);
    display: flex;
    .usr{
      flex: 1;
      padding: px2rem(2) 0;
    }
    img {
      height: 100%;
      margin-right: px2rem(4)
    }
    h4{
      font-size: px2rem(14);
      margin-bottom: px2rem(6)
    }
    p{
      color: #aeaeae;
    }
    .btn{
      width: px2rem(88);
      @include flex-center;
    }
    button {
      width: 100%;
      height: 80%;
      border-radius: 2px;
      color: #fff;
      background: $default_light_color;
    }
  }
  .content {
    margin-top: px2rem(20);
    h3{
      font-size: px2rem(16);
    }
  }
}
</style>
