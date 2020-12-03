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
        <div class="coment">
          <h3 class="title">
            评论<span class="comment-num">{{ total }}</span>
          </h3>
          <div
            class="comment-item"
            v-for="(item, index) in commentList"
            :key="index"
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
                <div class="user-info-rt">
                  <span class="star-num">{{ item.star || 0 }}</span>
                  <i class="iconfont">&#xe638;</i>
                </div>
              </div>
              <div class="comment-item-content">
                {{ item.content }}
              </div>
              <div class="comment-item-reply">
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
    </van-skeleton>
  </div>
</template>

<script>
import { articlesShareId, articlesCommentsId } from '@/api/find.js'
export default {
  data () {
    return {
      id: this.$route.params.id,
      backPath: this.$route.query.backPath,
      infoData: '',
      loading: true,
      listLoading: false,
      finished: false,
      currentPage: 0,
      pageSize: 3,
      commentList: [],
      total: 0
    }
  },
  methods: {
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
  async created () {
    const res = await articlesShareId(this.id)
    this.loading = false
    this.infoData = res.data.data
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
}
</style>
