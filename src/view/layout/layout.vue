<template>
  <transition enter-active-class="fadeIn"
    leave-active-class="fadeOut">
    <div class="animated">
      <keep-alive>
        <router-view />
      </keep-alive>
      <c-tab-bar></c-tab-bar>
    </div>
  </transition>
</template>

<script>
import CTabBar from 'components/c-tabBar'
export default {
  name: 'layout',
  components: {
    CTabBar
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
.fadeOut {
  animation-delay: 0.3s;
}
</style>
