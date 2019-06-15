<template>
  <div id="app">
    <transition :enter-active-class="enterAnimate"
      :leave-active-class="leaveAnimate">
      <navigation>
        <router-view class="animated" />
      </navigation>
    </transition>
    <transition enter-active-class="ainmated fadeIn"
      leave-active-class="ainmated fadeOut">
      <c-tab-bar v-if="$route.meta.cTabBar"></c-tab-bar>
    </transition>
  </div>
</template>

<script>
import CTabBar from 'components/c-tabBar'
const fadeIn = ['/home', '/course', '/column', '/my']
const fadeInUp = ['/login', '/register', '/forgetPassword']
export default {
  name: 'App',
  components: {
    CTabBar
  },
  data () {
    return {
      enterAnimate: '',
      leaveAnimate: ''
    }
  },
  created () {
    this.$navigation.on('forward', (to, from) => {
      // console.log(this.$navigation.getRoutes())
      this.leaveAnimate = 'fadeOut'
      if (fadeIn.indexOf(to.route.path) > -1) {
        this.enterAnimate = 'fadeIn'
      } else if (fadeInUp.indexOf(to.route.path) > -1) {
        this.enterAnimate = 'slideInUp'
      } else {
        this.enterAnimate = 'slideInRight'
      }
      // console.log('forward to', to.route, 'from ', from.route)
    })
    this.$navigation.on('back', (to, from) => {
      // console.log(this.$navigation.getRoutes())
      this.enterAnimate = 'fadeIn'
      if (fadeIn.indexOf(from.route.path) > -1) {
        this.leaveAnimate = 'fadeOut'
      } else if (fadeInUp.indexOf(from.route.path) > -1) {
        this.leaveAnimate = 'slideOutDown'
      } else {
        this.leaveAnimate = 'slideOutRight'
      }
      // console.log('back to', to.route, 'from ', from.route)
    })
    this.$navigation.on('replace', (to, from) => {
      // console.log(this.$navigation.getRoutes())
      if (fadeIn.indexOf(to.route.path) > -1) {
        this.enterAnimate = 'fadeIn'
        this.leaveAnimate = 'fadeOut'
      }
      if (from.route.path === '/login') {
        this.enterAnimate = 'fadeIn'
        this.leaveAnimate = 'slideOutDown'
      }
      // console.log('replace to', to, 'from ', from)
    })
  }
}

document.addEventListener('DOMContentLoaded', () => {
  let htmlWidth = document.documentElement.clientWidth || document.body.clientWidth
  let htmlDom = document.getElementsByTagName('html')[0]
  let fontSize = htmlWidth / 10
  fontSize = fontSize > 60 ? 60 : fontSize
  htmlDom.style.fontSize = fontSize + 'px'
})
</script>

<style lang="scss" scoped>
</style>
