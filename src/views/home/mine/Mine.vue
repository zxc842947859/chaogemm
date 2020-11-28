<template>
  <div class="mine">
    <div class="top">
      <div class="top-info">
        <div class="left-title">
          <h3>{{ userInfo.nickname }}</h3>
          <p>{{ userInfo.intro }}</p>
        </div>
        <div class="mine-icon">
          <img v-if="userInfo.avatar" :src="baseUrl + userInfo.avatar" alt="" />
          <img v-else src="@/assets/logo.png" alt="" />
        </div>
      </div>
      <ul class="top-num">
        <li>
          <div class="num">298</div>
          <div class="txt">累计答题</div>
        </li>
        <li>
          <div class="num">98</div>
          <div class="txt">收藏题目</div>
        </li>
        <li>
          <div class="num">198</div>
          <div class="txt">我的错题</div>
        </li>
        <li>
          <div class="num">76<span class="percent">%</span></div>
          <div class="txt">正确率</div>
        </li>
      </ul>
      <div class="i-post">
        <MineCell icon="&#xe64d;" title="我的岗位" value="产品经理"></MineCell>
      </div>
    </div>
    <div class="content">
      <div class="middle">
        <h3 class="middle-title">面经数据</h3>
        <ul class="middle-num">
          <li class="middle-num-item">
            <div class="item-1">昨日阅读<span class="color">+300</span></div>
            <div class="item-2">17</div>
            <div class="item-3">阅读总数</div>
          </li>
          <li class="middle-num-item">
            <div class="item-1">昨日获赞<span class="color">+300</span></div>
            <div class="item-2">17</div>
            <div class="item-3">获赞总数</div>
          </li>
          <li class="middle-num-item">
            <div class="item-1">昨日新增<span class="color">+12</span></div>
            <div class="item-2">17</div>
            <div class="item-3">评论总数</div>
          </li>
        </ul>
      </div>
      <div class="bottom">
        <MineCell icon="&#xe64d;" title="我的面经分享" value="21"></MineCell>
        <MineCell icon="&#xe64d;" title="我的消息" value="98"></MineCell>
        <MineCell icon="&#xe64d;" title="收藏题库" value="32"></MineCell>
        <MineCell icon="&#xe64d;" title="收藏企业" value="32"></MineCell>
        <MineCell icon="&#xe64d;" title="我的错题" value="123"></MineCell>
        <MineCell icon="&#xe64d;" title="收藏的面试经验" value="166"></MineCell>
      </div>
    </div>
  </div>
</template>

<script>
import MineCell from './MineCell'
import { mapState } from 'vuex'
export default {
  components: {
    MineCell
  },
  computed: {
    ...mapState(['userInfo', 'isLogin'])
  },
  data () {
    return {
      baseUrl: process.env.VUE_APP_URL
    }
  }
}
</script>

<style lang="less" scope>
.van-tabbar__placeholder {
  background: #ce0031;
}
.mine {
  background: #f6f4f5;
  .top {
    position: relative;
    // height: 259px;
    padding: 31px @p15 0 @p15;
    background: #ce0031;
    .top-info {
      margin-bottom: 28px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left-title {
        h3 {
          font-size: 21px;
          font-family: PingFangSC, PingFangSC-Semibold;
          font-weight: 600;
          text-align: left;
          color: #ffffff;
          line-height: 30px;
          letter-spacing: 0px;
        }
        p {
          opacity: 0.7;
          font-size: 12px;
          font-family: PingFangSC, PingFangSC-Regular;
          text-align: left;
          color: #ffffff;
          line-height: 17px;
          letter-spacing: 0px;
        }
      }
      .mine-icon img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: 3px solid rgba(255, 255, 255, 0.38);
      }
    }
    .top-num {
      display: flex;
      justify-content: space-between;
      align-items: center;
      text-align: center;

      .num {
        font-size: 21px;
        font-family: DINAlternate, DINAlternate-Bold;
        font-weight: 400;
        text-align: center;
        color: #ffffff;
        line-height: 24px;
        letter-spacing: 0px;
        margin-bottom: 6px;
        .percent {
          font-size: 12px;
          transform: scale(0.5);
        }
      }
      .txt {
        opacity: 0.7;
        font-size: 12px;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        text-align: center;
        color: #ffffff;
        line-height: 17px;
        letter-spacing: 0px;
        margin-bottom: 55px;
      }
    }
    .i-post {
      position: absolute;
      bottom: -16px;
      left: @p15;
      right: @p15;
      border-radius: 8px;
      overflow: hidden;
    }
  }
  .content {
    padding: 27px @p15;

    .middle {
      background-color: #fff;
      padding: 19px 15px;
      border-radius: 8px;

      .middle-title {
        font-size: 14px;
        font-family: PingFangSC, PingFangSC-Semibold;
        font-weight: 600;
        color: #181a39;
        line-height: 20px;
        letter-spacing: 0px;
      }
      .middle-num {
        display: flex;
        justify-content: space-around;
        align-items: center;
        margin-top: 17px;

        .middle-num-item {
          text-align: center;
          .item-1 {
            font-size: 10px;
            font-family: PingFangSC, PingFangSC-Regular;
            font-weight: 400;
            color: #b4b4bd;
            line-height: 19px;
            letter-spacing: 0px;
            .color {
              color: #51b6d1;
            }
          }
          .item-2 {
            font-size: 21px;
            font-family: DINAlternate, DINAlternate-Bold;
            font-weight: 700;
            color: #181a39;
            line-height: 24px;
            letter-spacing: 0px;
            margin: 10px 0;
          }
          .item-3 {
            font-size: 12px;
            font-family: PingFangSC, PingFangSC-Regular;
            font-weight: 400;

            color: #545671;
            line-height: 17px;
            letter-spacing: 0px;
          }
        }
      }
    }
    .bottom {
      margin-top: 10px;
      border-radius: 8px;
      overflow: hidden;
      margin-bottom: 30px;
    }
  }
}
</style>
