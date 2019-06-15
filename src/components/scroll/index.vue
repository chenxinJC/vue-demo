<template>
  <div class="wrapper"
    ref="wrapper">
    <div>
      <div v-if="pullDown"
        class="t">
        <span v-if="!statsT && !statsTT">
          <x-icon type="ios-arrow-thin-down"
            class="t1"
            :size="$fs(18)"></x-icon>下拉刷新
        </span>
        <span v-else-if="statsT && !statsTT">
          <x-icon type="ios-arrow-thin-up"
            class="t1"
            :size="$fs(18)"></x-icon>释放刷新
        </span>
        <span v-if="statsTT">
          <spinner type="crescent"
            class="t2"
            :size="$fs(18) + 'px'"></spinner>正在刷新
        </span>
      </div>
      <slot></slot>
      <div v-if="pullDown && pullupState"
        class="b">
        <spinner type="circles"
          :size="$fs(24) + 'px'"></spinner>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import { Spinner } from 'vux'
export default {
  name: 'c-scroll',
  props: {
    click: {
      type: Boolean,
      default: true
    },
    probeType: {
      type: Number,
      default: 0
    },
    pullDown: {
      type: Boolean,
      default: false
    }
  },
  components: {
    Spinner,
    BScroll
  },
  data () {
    return {
      statsT: false,
      statsTT: false,
      pullupState: true,
      page: 1
    }
  },
  mounted () {
    console.log(this.pullDown)
    this.$nextTick(() => {
      this._initScroll()
    })
  },
  methods: {
    _initScroll () {
      if (!this.$refs.wrapper) {
        return
      }
      let pullDownOptions = {
        threshold: 50,
        stop: 50
      }
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: this.click,
        pullDownRefresh: this.pullDown ? pullDownOptions : false,
        pullUpLoad: {
          threshold: 50
        }
      })
      if (this.probeType) {
        this.scroll.on('scroll', (pos) => {
          this.$emit('scroll', pos)
        })
      }
      // 下拉刷新
      if (this.pullDown) {
        // let count = this.page
        this.scroll.on('scroll', (pos) => {
          if (pos.y >= 50) {
            this.statsT = true
          } else {
            this.statsT = false
            this.statsTT = false
          }
        })
        this.scroll.on('touchEnd', (pos) => {
          if (pos.y >= 50) {
            if (pullDownOptions.stop === 0) {
              pullDownOptions.stop = 50
            }
            if (!this.statsTT) {
              this.statsTT = true
            }
            console.log('下拉刷新')
            setTimeout(() => {
              this.$emit('pulldown')
            }, 500)
          }
        })
      }
      // 上拉加载
      this.scroll.on('scrollEnd', (pos) => {
        if (pos.y < this.scroll.maxScrollY + 48 && this.pullupState) {
          console.log('maxScrollY: ', this.scroll.maxScrollY)
          pullDownOptions.stop = 0
          console.log('上拉加载')
          this.page++
          console.log('count', this.page)
          this.$emit('pulldown', this.page)
        }
      })
    },
    refresh () {
      this.scroll && this.scroll.refresh()
    }
  }
}
</script>

<style lang="scss" scoped>
@import "src/assets/styles/mixins.scss";
/deep/ .vux-spinner {
  stroke: #acacac;
  fill: #acacac;
}
.wrapper {
  width: 100%;
  height: 100%;
  background: #f6f6f6;
}
.t {
  width: 100%;
  height: px2rem(44);
  position: absolute;
  top: -(px2rem(44));
  left: 0;
  @include flex-center;
  span {
    color: #acacac;
    @include flex-center;
    .t1 {
      fill: #acacac;
      width: px2rem(22);
      height: px2rem(22);
    }
    .t2 {
      margin-right: px2rem(6);
    }
  }
}
.b {
  height: px2rem(50);
  @include flex-center;
}
</style>
