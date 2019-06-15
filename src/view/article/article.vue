<template>
  <!-- <transition enter-active-class="slideInRight" -->
  <!-- leave-active-class="slideOutRight"> -->
  <div>
    <x-header class="header"
      title="文章详情"></x-header>
    <!-- <scroll class="scroll"> -->
      <div class="scroll">
        <h3 class="art-title">{{title}}</h3>
        <div class="art-content"
          v-html="content"></div>
      </div>
    <!-- </scroll> -->
    <bottom>
      <like v-if="agreeState.length > 0"
        class="item"
        slot="agree"
        type="agree"
        iconDefault="fa-thumbs-up"
        iconSelect="fa-thumbs-o-up"
        color="#2196f3"
        :state="data.agreeState"
        :num="data.agreeNum"
        :pid="String(data.id)"
        :id="data.agreeID"
        :iconSize="$fs(20)"
        :textSize="$fs(18)"
        @like="like"></like>
      <like v-if="collectState.length > 0"
        class="item"
        slot="collect"
        type="collect"
        iconDefault="fa-heart"
        iconSelect="fa-heart-o"
        color="#fd3737"
        :state="data.collectState"
        :num="data.collectNum"
        :pid="String(data.id)"
        :id="data.collectID"
        :iconSize="$fs(20)"
        :textSize="$fs(18)"
        @like="like"></like>
      <like slot="comment"
        type="comment"
        paramsType="article"
        :num="data.commentNum"
        :pid="commentPid"
        :id="data.commentID"
        :iconSize="$fs(20)"
        :textSize="$fs(18)"
        @like="like"></like>
    </bottom>
  </div>
  <!-- </transition> -->
</template>

<script>
import { getArticleDetails } from 'api/article'
import { getLike } from 'api/like'
import { XHeader } from 'vux'
import Scroll from 'components/scroll'
import Bottom from './bottom'
import Like from 'components/like/index.vue'
import { like } from 'components/like/index'
export default {
  name: 'echarts',
  components: {
    XHeader,
    Scroll,
    Bottom,
    Like
  },
  data () {
    return {
      data: {},
      title: '',
      content: '',
      agreeState: '',
      collectState: '',
      commentPid: ''
    }
  },
  mounted () {
    this.getData()
  },
  computed: {
    role () {
      return this.$store.getters.role
    }
  },
  watch: {
    role (val, oldVal) {
      if (val !== oldVal) {
        this.getData()
      }
    }
  },
  methods: {
    getData () {
      getArticleDetails(this.$route.params.id).then(res => {
        this.data = res.data.data
        this.title = this.data.article_title
        this.content = this.data.article_content
        return Promise.all([getLike('okayapi_article_agree', 'message_key', String(this.data.id)), getLike('okayapi_article_collect', 'message_key', String(this.data.id))])
      }).then(res => {
        if (res[0].data.err_code === 0 && res[1].data.err_code === 0) {
          let r1 = res[0].data
          let r2 = res[1].data
          if (r1.list.length > 0) {
            this.data.agreeID = r1.list[0].id
            this.data.agreeState = r1.list[0].state
          } else {
            this.data.agreeState = '0'
          }
          if (r2.list.length > 0) {
            this.data.collectID = r2.list[0].id
            this.data.collectState = r2.list[0].state
          } else {
            this.data.collectState = '0'
          }
        } else {
          this.data.agreeState = '0'
          this.data.collectState = '0'
        }
        this.agreeState = this.data.agreeState
        this.collectState = this.data.collectState
        this.commentPid = this.data.id + ''
        console.log(this.commentPid)
        console.log('文章数据', this.data)
      })
    },
    like (type, state, num, pid, id) {
      let modelName
      if (type === 'agree') {
        modelName = 'okayapi_article_agree'
      } else if (type === 'collect') {
        modelName = 'okayapi_article_collect'
      }
      like(type, state, num, pid, id, this.data, modelName)
      this.agreeState = this.data.agreeState
      this.collectState = this.data.collectState
    }
  }
}
</script>

<style lang="scss" scoped>
@import "src/assets/styles/mixins.scss";
.animated {
  z-index: 2;
}
div.bottom {
  position: fixed;
}
div.scroll {
  height: auto;
  margin-top: px2rem(46);
  margin-bottom: px2rem(56);
  // position: absolute;
  // top: px2rem(46);
  // bottom: px2rem(56);
  background: #fff;
  // overflow: hidden;
}
.art-content {
  /deep/ p {
    margin-bottom: px2rem(10) !important;
    font-size: px2rem(16);
    line-height: 1.48em !important;
  }
  /deep/ img {
    display: block;
    width: 100%;
    height: auto;
  }
}
.art-title {
  padding: px2rem(15);
  line-height: 1.4em;
  font-size: px2rem(20);
}
.art-content {
  padding: px2rem(10);
}
</style>
