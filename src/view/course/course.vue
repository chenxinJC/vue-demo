<template>
  <transition enter-active-class="fadeIn"
    leave-active-class="fadeOut">
    <div class="animated">
      aaaaaaaaaaaaaaaaaaaaaa
    </div>
  </transition>
</template>

<script>
import Scroll from 'components/scroll'
import CTabBar from 'components/c-tabBar'
export default {
  name: 'course',
  components: {
    CTabBar,
    Scroll
  },
  data () {
    return {
    }
  },
  mounted () {
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.course {
  width: 100%;
  position: absolute;
  top: 46px;
  bottom: 55px;
}
.wrapper {
  width: 100%;
  height: 100%;
}
</style>
