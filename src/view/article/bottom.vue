<template>
  <div class="bottom border-top">
    <div class="item_b">
      <slot name="agree"></slot>
    </div>
    <div class="item_b">
      <slot name="collect"></slot>
    </div>
    <div class="item_b">
      <slot name="comment"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
@import "src/assets/styles/mixins.scss";
@import "src/assets/styles/border.scss";
.bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: px2rem(56);
  background: #f6f6f6;
  @include flex-center;
}
.item_b {
  flex: 1;
}
</style>
