<template>
  <div class="home">
    <div class="loading" v-show="loading">
      <c-loading></c-loading>
    </div>
    <x-header class="header" title="首页" :style="backStyle" :left-options="{showBack: false}">
      <i class="fa fa-search" slot="right"></i>
    </x-header>
    <scroll class="" :probeType="3" @scroll="scroll">
      <div v-show="!loading">
        <c-swiper class="banner" ref="banner" :options="bannerOption" :swiper-datas="banner"></c-swiper>
        <div class="quick-access">
          <quick-access ref="quickAccess" :datas="quickAccess">
          </quick-access>
        </div>
        <div class="hot-recommend recommend">
          <div class="top">
            <h3>热门推荐</h3>
            <p class="more">查看更多</p>
          </div>
          <c-list-one :list="hotRecommendList"></c-list-one>
        </div>
        <div class="latest-course recommend">
          <div class="top">
            <h3>最新课程</h3>
            <p class="more">查看更多</p>
          </div>
          <c-list-one :list="hotRecommendList"></c-list-one>
        </div>
        <div class="article-recommend recommend">
          <div class="top">
            <h3>推荐文章</h3>
            <p class="more">查看更多</p>
          </div>
          <div class="list">
            <preview-article v-for="item in articleRecommendList" :key="item.id" :data="item" @click.native="goToArticle(item.id)">
              <like slot="agree" type="agree" iconDefault="fa-thumbs-up" iconSelect="fa-thumbs-o-up" color="#2196f3" :state="item.agreeState" :num="item.agreeNum" :pid="item.id" :id="item.agreeID" @like="like"></like>
              <like slot="collect" type="collect" iconDefault="fa-heart" iconSelect="fa-heart-o" color="#fd3737" :state="item.collectState" :num="item.collectNum" :pid="item.id" :id="item.collectID" @like="like"></like>
              <like slot="comment" type="comment" paramsType="article" :num="item.commentNum" :pid="item.id" @like="like"></like>
            </preview-article>
          </div>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
import Scroll from 'components/scroll'
import { XHeader } from 'vux'
import CSwiper from 'components/c-swiper'
import CLoading from 'components/c-loading'
import QuickAccess from './components/quickAccess'
import CListOne from 'components/c-list/c-list_1'
import CTabBar from 'components/c-tabBar'
import PreviewArticle from 'components/preview/preview-article'
import Like from 'components/like/index.vue'
import Comment from 'components/comment'
import { like } from 'components/like/index'
import { getBanner, getQuickAccess } from 'api/home'
import { getCourse } from 'api/course'
import { getArticle } from 'api/article'
import { getLike } from 'api/like'
import { bannerSwiperOptions } from './config'
export default {
  name: 'home',
  components: {
    Scroll,
    CLoading,
    XHeader,
    CSwiper,
    QuickAccess,
    CListOne,
    CTabBar,
    PreviewArticle,
    Like,
    Comment
  },
  data () {
    return {
      loading: false,
      backStyle: {
        color: '#3a3a3a',
        background: 'transparent'
      },
      bannerOption: bannerSwiperOptions,
      banner: [],
      quickAccess: [],
      hotRecommendList: [],
      articleRecommendList: [],
      asd: this.$store.getters.role
    }
  },
  mounted () {
    this.getData()
  },
  activated () {
    if (this.asd !== this.$store.getters.role) {
      this.asd = this.$store.getters.role
      this.GetArticle().then(res => {
        this.articleRecommendList = res.data.list
      })
    }
  },
  computed: {
    role () {
      return this.$store.getters.role
    }
  },
  watch: {
    role (val, oldVal) {
      if (val !== oldVal && this.$route.path === '/home') {
        this.GetArticle().then(res => {
          this.articleRecommendList = res.data.list
        })
      }
    }
  },
  methods: {
    getData () {
      this.loading = true
      Promise.all([getBanner(), getQuickAccess(), getCourse(), this.GetArticle()]).then(res => {
        console.log(res)
        this.loading = false
        this.banner = res[0].data.list
        this.quickAccess = res[1].data.list
        this.hotRecommendList = res[2].data.list
        this.articleRecommendList = res[3].data.list
        this.$refs.banner.initSwiper()
        this.$refs.quickAccess.initSwiper()
      })
    },
    // 获取推荐文章数据
    GetArticle () {
      return new Promise((resolve, reject) => {
        Promise.all([getArticle(), getLike('okayapi_article_agree'), getLike('okayapi_article_collect')]).then(res => {
          console.log(res)
          let a1 = res[0].data.list
          let a2 = res[1].data.list || []
          let a3 = res[2].data.list || []
          let aryAgree = []
          let aryCollect = []
          this.gl(a1, a2, aryAgree, 'agree')
          this.gl(a1, a3, aryCollect, 'collect')
          this.gl2(a1, a2, aryAgree, 'agree')
          this.gl2(a1, a3, aryCollect, 'collect')
          resolve(res[0])
        })
      })
    },
    // 根据id跳转文章详情页面
    goToArticle (id) {
      this.$router.push({ path: '/article/' + id })
    },
    // 头部样式过渡
    scroll (pos) {
      let y = pos.y
      if (y >= -10 && y <= 0) {
        this.backStyle = {
          color: '#333',
          background: 'transparent'
        }
      } else {
        this.backStyle = {
          color: '#fff',
          background: '#41b883'
        }
      }
    },
    // 点赞
    like (type, state, num, pid, id) {
      let data
      for (let i = 0; i < this.articleRecommendList.length; i++) {
        if (this.articleRecommendList[i].id === pid) {
          data = this.articleRecommendList[i]
        }
      }
      let modelName
      if (type === 'agree') {
        modelName = 'okayapi_article_agree'
      } else if (type === 'collect') {
        modelName = 'okayapi_article_collect'
      }
      like(type, state, num, pid, id, data, modelName)
    },
    gl (ary1, ary2, newary, type) {
      if (ary2.length > 0) {
        for (let i = 0; i < ary2.length; i++) {
          newary.push(ary2[i].message_key)
        }
      } else {
        for (let i = 0; i < ary1.length; i++) {
          ary1[i][type + 'State'] = '0'
        }
      }
    },
    gl2 (ary1, ary2, newary, type) {
      for (let i = 0; i < ary1.length; i++) {
        if (newary.indexOf(ary1[i].id) > -1) {
          ary1[i][type + 'ID'] = ary2[newary.indexOf(ary1[i].id)].id
          if (Number(ary2[newary.indexOf(ary1[i].id)].state) === 1) {
            ary1[i][type + 'State'] = '1'
          } else {
            ary1[i][type + 'State'] = '0'
          }
        } else {
          ary1[i][type + 'State'] = '0'
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "src/assets/styles/mixins.scss";
.animated {
  background: #f6f6f6;
}
/deep/ div.wrapper {
  height: auto;
  position: absolute;
  top: px2rem(46);
  bottom: px2rem(56);
}
/deep/ .vux-header {
  transition: all 0.3s;
  .vux-header-title,
  .vux-header-right {
    font-weight: 700;
    color: inherit;
  }
  .fa {
    font-size: px2rem(20);
  }
}
.loading {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  @include flex-center;
}
.banner {
  height: px2rem(150);
  padding-bottom: px2rem(10);
}
.recommend {
  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: px2rem(10) px2rem(15);
    h3 {
      font-size: px2rem(16);
      font-weight: 700;
    }
    .more {
      font-size: px2rem(12);
      color: #8a8a8a;
    }
  }
  .list {
    padding: 0 px2rem(15);
  }
}
</style>
