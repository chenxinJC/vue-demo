<template>
  <div class="collect"
    @click.stop="collect">
    <span class="fa"
      :class="[Number(collectState) ? 'fa-heart' : 'fa-heart-o']"
      :style="{color: Number(collectState) ? color : '', fontSize: this.iconSize + 'px'}"></span>
    <span class="num"
      :style="{fontSize: this.textSize + 'px'}">{{collectNum}}</span>
  </div>
</template>

<script>
import { fs } from 'utils/auto'
export default {
  name: 'collect',
  props: {
    id: String,
    collectID: String,
    collectState: {
      type: String,
      default: '0'
    },
    collectNum: {
      type: String,
      default: '0'
    },
    color: {
      type: String,
      default: '#2196f3'
    },
    iconSize: {
      type: Number,
      default: fs(14)
    },
    textSize: {
      type: Number,
      default: fs(12)
    }
  },
  methods: {
    collect () {
      let state = Number(this.collectState) ? '0' : '1'
      let num = Number(this.collectState) ? String(Number(this.collectNum) - 1) : String(Number(this.collectNum) + 1)
      this.$emit('collect', state, num, this.id, this.collectID)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "src/assets/styles/mixins.scss";
.collect {
  height: 100%;
  margin-left: px2rem(12);
  @include flex-center;
  .fa {
    margin-right: px2rem(2);
  }
}
</style>
