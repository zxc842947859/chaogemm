<template>
  <div class="technic-info">
    <CGNavBar :path="backPath"></CGNavBar>
    <van-skeleton title :row="30" :loading="loading" title-width="80%">
      <div class="content" v-if="infoData">
        <h3 class="title">{{ infoData.title }}</h3>
        <div class="share-info">
          <img
            v-if="infoData.author.avatar"
            class="icon"
            :src="$baseURL + infoData.author.avatar"
            alt=""
          />
          <img v-else class="icon" src="@/assets/avatar.png" alt="" />
          <div class="info-rt">
            <div class="nickname">{{ infoData.author.nickname }}</div>
            <div class="time">{{ infoData.updated_at | formatTime }}</div>
          </div>
        </div>
        <p class="article-content" v-html="infoData.content"></p>
      </div>
      <div class="space"></div>
      <van-list
        class="van-list"
        v-model="listLoading"
        :finished="finished"
        @load="onLoadComment"
      >
        <template #finished>
          <div class="most-bottom">
            <i class="line"></i>
            <span class="tip-txt">到底了</span>
            <i class="line"></i>
          </div>
        </template>
        <div class="coment" ref="coment">
          <h3 class="title">
            评论<span class="comment-num">{{ total }}</span>
          </h3>
          <div
            class="comment-item"
            v-for="(item, index) in commentList"
            :key="index"
            :id="'com' + index"
          >
            <div class="comment-lt">
              <img
                v-if="item.author.avatar"
                class="icon"
                :src="$baseURL + item.author.avatar"
                alt=""
              />
              <img v-else class="icon" src="@/assets/avatar.png" alt="" />
            </div>
            <div class="comment-rt">
              <div class="comment-user-info">
                <div class="user-info-lt">
                  <div class="nick-name">{{ item.author.nickname }}</div>
                  <div class="time">{{ item.created_at | formatTime }}</div>
                </div>
                <div
                  class="user-info-rt"
                  @click="commentStar(item)"
                  :class="{
                    red: isRed('starComments', item.id)
                  }"
                >
                  <span class="star-num">{{ item.star || 0 }}</span>
                  <i class="iconfont">&#xe638;</i>
                </div>
              </div>
              <div
                class="comment-item-content"
                @click="replayComment(item, index)"
              >
                {{ item.content }}
              </div>
              <div
                class="comment-item-reply"
                v-if="item.children_comments.length"
              >
                <div
                  class="comment-item-reply-item"
                  v-for="(item2, index2) in item.children_comments"
                  :key="index2"
                >
                  <span class="reply-nick-name">{{ item2.author }}:</span>
                  <span class="reply-con">{{ item2.content }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </van-list>
      <div style="height:65px">
        <div class="send-coment-bar">
          <div class="sendbox" @click="sendComment">我来补充两句</div>
          <div
            class="b1 icon-box"
            @click="collectOrcancel"
            :class="{
              red: isRed('collectArticles', id)
            }"
          >
            <i class="iconfont">&#xe63c;</i>
            <span class="num">{{ infoData.collect }}</span>
          </div>
          <div
            class="b2 icon-box"
            @click="starOrCancel"
            :class="{
              red: star
            }"
          >
            <i class="iconfont">&#xe638;</i>
            <span class="num">{{ infoData.star }}</span>
          </div>
          <div class="b3 icon-box">
            <i class="iconfont">&#xe63e;</i>
            <span class="num">{{ infoData.share }}</span>
          </div>
        </div>
      </div>
      <van-popup
        v-model="show"
        position="bottom"
        @open="showPopover"
        @close="closePopup"
      >
        <van-field
          v-model.trim="commentStr"
          ref="send"
          autofocus
          class="send-content"
          type="textarea"
          row="5"
          :placeholder="sendCommentPlaceStr"
        ></van-field>
        <div class="send-box">
          <div class="pl"></div>
          <div
            @click="sendEvent"
            class="send-btn"
            :style="{ color: commentStr ? 'red' : '#b4b4bd' }"
          >
            发送
          </div>
        </div>
      </van-popup>
    </van-skeleton>
  </div>
</template>

<script>
import {
  articlesShareId,
  articlesCommentsId,
  articlesComments,
  articlesCollect,
  articlesStar,
  articleCommentsStar
} from '@/api/find.js'
import { mapState, mapGetters } from 'vuex'
export default {
  data () {
    return {
      id: this.$route.params.id, // 文章id
      backPath: this.$route.query.backPath, // 返回url
      infoData: '', // 文章详情
      loading: true, // 是否显示骨架
      listLoading: false, // 是否正在上拉加载中
      finished: false, // 是否上拉加载完成
      currentPage: 0,
      pageSize: 3,
      commentList: [], // 评论数据
      total: 0, // 评论条数
      show: false,
      commentStr: '', // 评论内容
      parent: '', // 为空时发送评论,否则回复评论
      parentObj: '',
      sendCommentPlaceStr: '我来补充两句',
      scrollTo: '',
      star: '',
      collect: ''
    }
  },
  computed: {
    ...mapState(['userInfo', 'isLogin']),
    ...mapGetters(['isRed'])
    // isRed () {
    //   return (str, id) => {
    //     return this.userInfo[str] && this.userInfo[str].includes(+id)
    //   }
    // }
  },

  mounted () {},

  methods: {
    async commentStar (item) {
      const res = await articleCommentsStar({ id: item.id })
      // 更新文章收藏数
      item.star = res.data.data.num
      // 判断当前文章是收藏还是取消
      if (res.data.data.list.includes(item.id)) {
        this.$toast.success('收藏成功')
      } else {
        this.$toast.fail('取消收藏')
      }
      this.$store.dispatch('refreshUserInfo')
    },
    async starOrCancel () {
      this.$toast.loading()
      this.star = !this.star
      this.star ? this.infoData.star++ : this.infoData.star--
      if (this.star) {
        // this.star = true
        this.$toast.success({
          duration: 1000,
          message: '点赞成功'
        })
      } else {
        this.$toast.success({
          duration: 1000,
          message: '取消点赞'
        })
        // this.star = false
      }
      await articlesStar({ article: this.id })
      // this.infoData.star = res.data.data.num

      this.$store.dispatch('refreshUserInfo')
    },
    async collectOrcancel () {
      const res = await articlesCollect({ id: this.id })
      // 更新文章收藏数
      this.infoData.collect = res.data.data.num
      // 判断当前文章是收藏还是取消
      if (res.data.data.list.includes(+this.id)) {
        this.$toast.success('收藏成功')
      } else {
        this.$toast.fail('取消收藏')
      }
      this.$store.dispatch('refreshUserInfo')
    },
    // 获取元素的绝对位置坐标（像对于页面左上角）
    getElementPagePosition (element) {
      // 计算y坐标
      let actualTop = element.offsetTop
      let currenty = element.offsetParent
      while (currenty !== null) {
        actualTop += currenty.offsetTop + currenty.clientTop
        currenty = currenty.offsetParent
      }
      // 返回结果
      return actualTop
    },
    getElementViewPosition (element) {
      // 计算y坐标
      let actualTop = element.offsetTop
      let current = element.offsetParent
      while (current !== null) {
        actualTop += current.offsetTop + current.clientTop
        current = current.offsetParent
      }
      let elementScrollTop
      if (document.compatMode === 'BackCompat') {
        elementScrollTop = document.body.scrollTop
      } else {
        elementScrollTop = document.documentElement.scrollTop
      }
      const right = actualTop - elementScrollTop
      // 返回结果
      return right
    },
    // 关闭弹层时清空评论输入框中内容
    closePopup () {
      console.log(
        this.getElementPagePosition(
          document.getElementById('com0') || this.$refs.coment
        ),
        document.documentElement.scrollTop + window.outerHeight / 2
      )
      this.$nextTick(() => {
        // console.log(document.getElementById('com0'))
        // console.log(this.$refs.coment)
        // console.log(
        //   this.getElementPagePosition(
        //     document.getElementById('com0') || this.$refs.coment
        //   )
        // )
      })
      // 清空评论框中的内容
      this.commentStr = ''
    },
    // 点击发布评论输入框
    sendComment () {
      this.show = true
      // 发表评论时让它为空表示发表评论
      this.parent = ''
      this.sendCommentPlaceStr = '我来补充两句'
    },
    // 回复评论
    replayComment (item, index) {
      this.show = true
      this.parent = item.id
      this.parentObj = item
      this.sendCommentPlaceStr = `回复: ${this.parentObj.author.nickname}`
    },
    // 发送评论
    async sendEvent () {
      const h = document.documentElement.scrollTop + window.outerHeight / 2
      const h1 = this.getElementPagePosition(
        document.getElementById('com0') || this.$refs.coment
      )
      if (!this.scrollTo && h < h1) {
        console.log('dfsdfdssd')
        document.documentElement.scrollTop = h1 + 100
      }
      if (this.commentStr) {
        try {
          const res = await articlesComments(
            {
              content: this.commentStr,
              article: this.id,
              parent: this.parent
            },
            this.$route.fullPath
          )
          // 如果是回复
          if (this.parent) {
            // 把回复的内容添加到当前回复列表中
            this.parentObj.children_comments.push(res.data.data)
            this.$toast.success('回复成功')
          } else {
            this.$nextTick(() => {
              // const bb = this.getElementPagePosition(
              //   document.getElementById('com0')
              // )
              const aa =
                this.getElementViewPosition(document.getElementById('com0')) +
                window.outerHeight / 2
              const bb = document.documentElement.scrollTop + aa
              console.log(this.scrollTo)
              if (this.scrollTo !== bb) {
                this.scrollTo = bb
                document.documentElement.scrollTop =
                  document.documentElement.scrollTop + aa
              }
            })
            // 发送的新评论插入到最前面
            this.commentList.unshift(res.data.data)
            // this.total += 1
            this.$toast.success('评论成功')
          }
          // 关闭评论框
          this.show = false
        } catch (error) {
          this.$toast.fail('评论失败,请登录!')
        }
      }
    },
    // 评论框默认聚焦
    showPopover () {
      this.$nextTick(() => {
        this.$refs.send.focus()
      })
    },
    // 加载评论数据
    async onLoadComment () {
      const res = await articlesCommentsId(this.id, {
        start: this.currentPage * this.pageSize,
        limit: this.pageSize
      })
      this.commentList.push(...res.data.data.list)
      this.currentPage++
      this.listLoading = false
      this.total = res.data.data.total
      this.finished = this.commentList.length >= this.total
    }
  },
  // 加载文章详情
  async created () {
    const res = await articlesShareId(this.id)
    this.loading = false
    this.infoData = res.data.data

    this.star =
      this.$store.state.isLogin &&
      this.$store.state.userInfo.starArticles.includes(+this.id)
  }
}
</script>

<style lang="less" scoped>
.technic-info {
  .content {
    padding: 0px @p15;
    .title {
      font-size: 18px;
      font-family: PingFangSC, PingFangSC-Medium;
      font-weight: 500;
      text-align: left;
      color: #181a39;
      line-height: 25px;
      margin: 19px 0px;
    }
    .share-info {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .icon {
        width: 35px;
        height: 35px;
        border-radius: 50%;
        margin-right: 10px;
      }
      .info-rt {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .nickname {
          font-size: 12px;
          font-family: PingFangSC, PingFangSC-Semibold;
          font-weight: 600;
          text-align: left;
          color: #545671;
          line-height: 17px;
          letter-spacing: 0px;
        }
        .time {
          font-size: 12px;
          font-family: PingFangSC, PingFangSC-Regular;
          font-weight: 400;
          text-align: left;
          color: #b4b4bd;
          line-height: 17px;
          letter-spacing: 0px;
        }
      }
    }
    .article-content {
      font-size: 16px;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: justify;
      color: #181a39;
      line-height: 27px;
      letter-spacing: 0px;
      padding: 20px 0px 15px;
      ::v-deep img {
        width: 100%;
      }
    }
  }
  .space {
    height: 10px;
    background: #f6f2f3;
  }
  .van-list {
    .most-bottom {
      background-color: #f6f2f3;
      height: 65px;
      padding: 0px 68px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .line {
        border-bottom: 1px solid #eceaea;
        flex: 1;
      }
      .tip-txt {
        font-size: 14px;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        text-align: left;
        color: #b4b4bd;
        line-height: 20px;
        letter-spacing: 0px;
        margin: 0px 19px;
      }
    }
    .coment {
      padding: 25px @p15 0px;

      .title {
        position: relative;
        font-size: 18px;
        font-family: PingFangSC, PingFangSC-Medium;
        font-weight: 500;
        text-align: left;
        color: #222222;
        line-height: 25px;
        letter-spacing: 0px;
        padding-bottom: 25px;

        .comment-num {
          position: absolute;
          top: -2px;
          margin-left: 8px;
          font-size: 12px;
          font-family: PingFangSC, PingFangSC-Medium;
          font-weight: 500;
          text-align: left;
          color: #b4b4bd;
          line-height: 17px;
          letter-spacing: 0px;
        }
      }
      .comment-item {
        padding-bottom: 30px;
        display: flex;
        justify-content: space-between;
        .comment-lt {
          margin-right: 9px;
          .icon {
            width: 35px;
            height: 35px;
            border-radius: 50%;
          }
        }
        .comment-rt {
          flex: 1;
          .comment-user-info {
            display: flex;
            align-items: center;
            justify-content: space-between;
            .user-info-lt {
              flex: 1;
              .nick-name {
                font-size: 12px;
                font-family: PingFangSC, PingFangSC-Semibold;
                font-weight: 600;
                text-align: left;
                color: #545671;
                line-height: 17px;
                letter-spacing: 0px;
                margin-bottom: 3px;
              }
              .time {
                font-size: 12px;
                font-family: PingFangSC, PingFangSC-Regular;
                font-weight: 400;
                text-align: left;
                color: #b4b4bd;
                line-height: 17px;
                letter-spacing: 0px;
              }
            }
            .user-info-rt {
              font-size: 12px;
              font-family: PingFangSC, PingFangSC-Regular;
              font-weight: 400;
              text-align: left;
              color: #b4b4bd;
              line-height: 17px;
              letter-spacing: 0px;
              .star-num {
                margin-right: 5px;
              }
            }
          }
          .comment-item-content {
            font-size: 16px;
            font-family: PingFangSC, PingFangSC-Regular;
            font-weight: 400;
            text-align: justify;
            color: #181a39;
            line-height: 27px;
            letter-spacing: 0px;
            padding: 11px 0px;
          }
          .comment-item-reply {
            border-radius: 8px;
            background-color: #f6f2f3;
            padding: 13px 15px;
            .comment-item-reply-item {
              .reply-nick-name {
                font-size: 14px;
                font-family: PingFangSC, PingFangSC-Semibold;
                text-align: left;
                font-weight: 600;
                color: #545671;
                line-height: 20px;
                letter-spacing: 0px;
                margin-right: 5px;
              }
              .reply-con {
                font-size: 14px;
                text-align: left;
                font-family: PingFangSC;
                font-weight: 400;
                color: #545671;
                line-height: 20px;
                letter-spacing: 0px;
              }
            }
          }
        }
      }
    }
  }
  .send-coment-bar {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: 65px;
    padding: 8px @p15 14px;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* x偏移量 | y偏移量 | 阴影模糊半径 | 阴影扩散半径 | 阴影颜色 */
    box-shadow: 0px -1px 2px 1px #f6f2f377;

    .sendbox {
      width: 189px;
      height: 34px;
      background: #f6f2f3;
      padding: 7px 10px;
      font-size: 14px;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: left;
      color: #b4b4bd;
      line-height: 20px;
      letter-spacing: 0px;
      border-radius: 4px;
    }
    .icon-box {
      font-size: 12px;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: left;
      color: #b4b4bd;
      line-height: 17px;
      letter-spacing: 0px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      .iconfont {
        font-size: 25px;
        margin-bottom: 4px;
      }
    }
  }
  .van-popup {
    padding: 25px 16px 0px;
    .send-content {
      background-color: #f6f2f3;
      height: 100px;
      font-size: 14px;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: left;
      color: #00b8d4;
      line-height: 20px;
      letter-spacing: 0px;
      border-radius: 4px;
    }
    .send-box {
      padding: 11px 0px 15px;
      display: flex;
      justify-content: space-between;
      .pl {
        flex: 1;
      }
      .send-btn {
        font-size: 16px;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        text-align: left;
        color: #b4b4bd;
        line-height: 23px;
        letter-spacing: 0px;
      }
    }
  }
  .red {
    color: red !important;
  }
}
</style>
