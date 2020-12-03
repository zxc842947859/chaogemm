<template>
  <div class="technic-info">
    <CGNavBar :path="backPath"></CGNavBar>
    <van-skeleton title :row="30" :loading="loading" title-width="80%">
      <div class="content">
        <h3 class="title">{{ infoData.title }}</h3>
        <div class="article-info">
          <span class="b1">{{ infoData.updated_at | formatTime }}</span>
          <i class="iconfont b2">&#xe644;</i>
          <span class="b3">{{ infoData.read }}</span>
          <i class="iconfont b4">&#xe638;</i>
          <span class="b5">{{ infoData.star }}</span>
        </div>
        <p class="article-content" v-html="infoData.content"></p>
      </div>
      <div class="space"></div>
      <div class="coment">
        <h3 class="title">评论<span class="comment-num">87</span></h3>
        <div class="comment-item">
          <div class="comment-lt">
            <img class="icon" src="@/assets/avantar.png" alt="" />
          </div>
          <div class="comment-rt">
            <div class="comment-user-info">
              <div class="user-info-lt">
                <div class="nick-name">浩子</div>
                <div class="time">2小时前</div>
              </div>
              <div class="user-info-rt">
                <span class="star-num">98</span>
                <i class="iconfont">&#xe638;</i>
              </div>
            </div>
            <div class="comment-item-content">
              校友啊，加微信可以吗，嘿嘿
            </div>
            <div class="comment-item-reply">
              <div class="comment-item-reply-item">
                <span class="reply-nick-name">浩子:</span>
                <span class="reply-con">好的，加了，同意一下。</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </van-skeleton>
  </div>
</template>

<script>
import { articlesTechnicInfo } from '@/api/find.js'
export default {
  data () {
    return {
      id: this.$route.params.id,
      backPath: this.$route.query.backPath,
      infoData: '',
      loading: true
    }
  },
  methods: {},
  async created () {
    const res = await articlesTechnicInfo(this.id)
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
    .article-info {
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: left;
      color: #b4b4bd;
      line-height: 17px;
      letter-spacing: 0px;
      .b1 {
        flex: 1;
      }
      .b3 {
        margin: 0px 25px 0px 5px;
      }
      .b4 {
        margin-right: 5px;
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
      padding: 28px 0px 15px;
      ::v-deep img {
        width: 100%;
      }
    }
  }
  .space {
    height: 10px;
    background: #f6f2f3;
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
      padding-bottom: 15px;

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
      padding: 15px 0px;
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
</style>
