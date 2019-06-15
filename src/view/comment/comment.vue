<template>
  <div>
    <x-header class="header"
      title="评论">
    </x-header>
    <scroll ref="scrollRef"
      :probeType="3"
      :pullDown=true
      @pulldown="getData">
      <div class="srcoll-content"
        ref="sc">
        <div class="list">
          <div v-if="list.length === 0 && olist === null"
            class="no-data">暂无评论，赶紧来添加几条吧...</div>
          <div v-else class="item border-bottom"
            v-for="item in list"
            :key="item.id">
            <div class="img">
              <img :src="item.userImg ? item.userImg : defaultUserImg">
            </div>
            <div class="info">
              <h3 class="name">{{ item.userName }}</h3>
              <p class="time">{{formated(item.add_time)}}</p>
              <div class="text">{{ item.content }}</div>
            </div>
          </div>
          <div v-if="olist"
            class="other item border-bottom">
            <div class="img">
              <img :src="olist.userImg ? olist.userImg : defaultUserImg">
            </div>
            <div class="info">
              <h3 class="name">{{ olist.userName }}</h3>
              <p class="time">{{formated(olist.add_time)}}</p>
              <div class="text">{{ olist.content }}</div>
            </div>
          </div>
        </div>
      </div>
    </scroll>
    <div class="bottom border-top"
      @click="show = true">
      <div class="p1">说说你的看法...</div>
    </div>
    <transition enter-active-class="slideInRight"
      leave-active-class="slideOutRight">
      <div class="animated modal"
        v-if="show">
        <x-header class="header"
          title="写评论"
          :left-options="{preventGoBack: true}"
          @on-click-back="hide">
          <span slot="right"
            @click="submit">提交</span>
        </x-header>
        <x-textarea class="content" ref="textarea" v-model="msg" :height=300 placeholder="说说你的看法..." :autosize=true></x-textarea>
      </div>
    </transition>
  </div>
</template>

<script>
import Scroll from 'components/scroll'
import { XHeader, XTextarea } from 'vux'
import { getComment, commentCreate } from 'api/comment'
export default {
  components: {
    Scroll,
    XHeader,
    XTextarea
  },
  data () {
    return {
      show: false,
      msg: '',
      defaultUserImg: require('../../assets/user.jpg'),
      list: [],
      olist: null,
      h: 0
    }
  },
  watch: {
    list () {
      setTimeout(() => {
        this.$refs.scrollRef.refresh()
      }, 40)
    },
    show (val) { // 当为true时，textarea自动获取焦点
      if (val) {
        setTimeout(() => {
          this.$refs.textarea.focus()
        }, 500)
      }
    }
  },
  created () {
    this.$nextTick(() => {
      this.h = document.body.clientHeight - this.$fs(46 + 56 - 1)
      this.$refs.sc.style.minHeight = this.h + 'px'
    })
  },
  mounted () {
    console.log(new Date('2019-02-13 10:42:47').getTime())
    console.log(this.$store.getters.extInfo)
    console.log(this.$route.params)
    this.getData()
  },
  methods: {
    getData (count) {
      console.log('count', count)
      if (this.olist) {
        this.olist = null
      }
      let val = this.$route.params.id
      getComment(val, count).then(res => {
        if (!count) {
          this.list = res.data.list
          // this.$refs.scrollRef.pullupState = true
          this.$refs.scrollRef.scroll.scrollTo(0, 0, 300, 'easing')
          this.$refs.scrollRef.page = 1
        } else {
          console.log(res.data.list)
          this.list = this.list.concat(res.data.list)
        }
        if (res.data.list.length < 10) {
          this.$refs.scrollRef.pullupState = false
        } else {
          this.$refs.scrollRef.pullupState = true
        }
        this.$refs.scrollRef.refresh()
      })
    },
    submit () {
      if (this.msg === '') {
        this.$vux.toast.show({
          type: 'text',
          text: '内容不能为空',
          width: 'auto',
          position: 'middle'
        })
        return false
      }
      let userInfo = this.$store.getters.extInfo
      let data = {
        message_key: this.$route.params.id,
        userID: this.$store.getters.uuid,
        content: this.msg,
        userName: userInfo.name,
        userImg: userInfo.img
      }
      commentCreate(data).then(res => {
        if (res.data.data.err_code === 0) {
          // console.log(res)
          this.olist = {
            userImg: userInfo.img,
            userName: userInfo.name,
            addTime: new Date(),
            content: this.msg
          }
          this.$refs.scrollRef.refresh()
          if (this.$refs.sc.children[0].clientHeight > this.h) {
            setTimeout(() => {
              let y = this.$refs.scrollRef.scroll.maxScrollY + 50
              if (!this.$refs.scrollRef.pullupState) {
                y = this.$refs.scrollRef.scroll.maxScrollY
              }
              // console.log(111111111111, y)
              this.$refs.scrollRef.scroll.scrollTo(0, y, 700, 'easing')
            }, 300)
          }
          this.hide()
          this.msg = ''
        }
      })
    },
    hide () {
      this.show = false
    },
    formated (time) {
      let minute = 1000 * 60
      let hour = minute * 60
      let day = hour * 24
      // let halfamonth = day * 15
      let month = day * 30
      let sTime = new Date(time).getTime()
      let now = new Date().getTime()
      let val = now - sTime
      if (val < 0) {
        console.log('结束日期不能小于开始日期！')
        return false
      }
      let monthC = val / month
      let weekC = val / (7 * day)
      let dayC = val / day
      let hourC = val / hour
      let minC = val / minute
      if (monthC >= 1) {
        return parseInt(monthC) + '个月前'
      } else if (weekC >= 1) {
        return parseInt(weekC) + '周前'
      } else if (dayC >= 1) {
        return parseInt(dayC) + '天前'
      } else if (hourC >= 1) {
        return parseInt(hourC) + '个小时前'
      } else if (minC >= 1) {
        return parseInt(minC) + '分钟前'
      } else {
        return '刚刚'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "src/assets/styles/mixins.scss";
.animated {
  z-index: 4;
  position: fixed;
}
/deep/ div.wrapper {
  height: auto;
  position: absolute;
  top: px2rem(46);
  bottom: px2rem(56);
}
.srcoll-content {
  height: 100%;
}
.no-data {
  text-align: center;
  padding: px2rem(20);
}
.list {
  .item {
    display: flex;
    // margin: 0 px2rem(15);
    padding: px2rem(10) px2rem(15);
    background: #fff;
    &:last-child:before {
      width: 100%;
      left: 0;
      right: 0;
    }
    &:before {
      width: auto;
      left: px2rem(15);
      right: px2rem(15);
    }
    .img {
      flex: 0 0 px2rem(36);
      img {
        width: px2rem(36);
        height: px2rem(36);
        border-radius: 50%;
        border: 1px solid #ccc;
      }
    }
    .info {
      flex: 1;
      width: 0;
      margin: 0 px2rem(10);
      h3 {
        font-size: px2rem(15);
        color: #8a8a8a;
      }
      .time {
        margin: px2rem(6) 0 px2rem(8) 0;
        font-size: px2rem(12);
        color: #acacac;
      }
      .text {
        font-size: px2rem(15);
        word-wrap: break-word;
      }
    }
    .other {
      flex: 0 0 px2rem(44);
      text-align: right;
    }
  }
}
.bottom {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: px2rem(56);
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: px2rem(16);
  color: #acacac;
  .p1 {
    padding: 0 px2rem(15);
    font-size: px2rem(16);
    color: #acacac;
  }
}
.modal {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #fff;
  z-index: 999;
  .content {
    margin-top: px2rem(44);
  }
}
</style>
