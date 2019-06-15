<template>
  <div class="d-header">
    <div class="d-header-left">返回</div>
    <h1 class="d-header-title">文章详情</h1>
    <div class="d-header-right"></div>
  </div>
</template>

<script>
export default {
  name: 'd-header',
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~assets/styles/color.scss";
.d-header {
  display: flex;
  height: 44px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  color: #fff;
  background: $default_color;
}
.d-header-left {
  flex: 0 0 20%;
  padding: 10px;
  line-height: 24px;
}
.d-header-right {
  flex: 0 0 20%;
  padding: 10px;
  line-height: 24px;
}
.d-header-title {
  flex: 1;
}
</style>
