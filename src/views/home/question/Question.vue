<template>
  <div class="question" v-if="info">
    <van-dropdown-menu>
      <van-dropdown-item ref="dropdown">
        <template #title>
          <div class="title">
            面试宝典<span class="city">{{ city }}</span>
          </div>
        </template>
        <template #default>
          <van-index-bar
            :index-list="Object.keys(info.citys)"
            class="index-bar"
          >
            <div v-for="(val, key, index) in info.citys" :key="index">
              <van-index-anchor :index="key" class="anchor">
                {{ key }}
              </van-index-anchor>
              <van-cell
                class="cell"
                v-for="(item, index) in val"
                :key="index"
                @click="cityClick(item)"
              >
                <template #title>
                  <div class="cell-title">
                    {{ item }}
                  </div>
                </template></van-cell
              >
            </div>
          </van-index-bar>
        </template>
      </van-dropdown-item>
    </van-dropdown-menu>
    <div class="content">
      <div class="tag-list">
        <van-tag
          v-for="(item, index) in info.cityPositions[city]"
          :key="index"
          color="#f7f4f5"
          text-color="#9797a8"
          class="tag"
          :class="{ active: currentIndex === index }"
          @click="currentIndex = index"
          round
          >{{ item.name }}</van-tag
        >
      </div>
    </div>
    <div class="middle">
      <div class="top top1">
        <div class="middle-item">
          <div class="icon">
            <i class="iconfont">&#xe64f;</i>
          </div>
          <div class="txt">常错题库</div>
        </div>
        <div class="middle-item">
          <div class="icon icon2">
            <i class="iconfont">&#xe654;</i>
          </div>
          <div class="txt">收藏题库</div>
        </div>
      </div>
      <div class="top">
        <div class="middle-item">
          <div class="icon icon3">
            <i class="iconfont">&#xe648;</i>
          </div>
          <div class="txt">企业题库</div>
        </div>
        <div class="middle-item">
          <div class="icon icon4">
            <i class="iconfont icon4">&#xe655;</i>
          </div>
          <div class="txt">已答题库</div>
        </div>
      </div>
      <div class="center">
        <van-circle
          class="circle"
          v-model="currentRate"
          :rate="25"
          :speed="10"
          layer-color="none"
          :color="gradientColor"
          :stroke-width="60"
        >
          <div class="circle-num">
            <div class="txt1">顺序刷题</div>
            <div class="txt2">{{ currentRate }}/300</div>
          </div></van-circle
        >
      </div>
    </div>
    <div class="embody">
      <div class="t">累积收录</div>
      <div class="e-num">23,453,245,000</div>
    </div>
    <div class="bottom">
      <van-button type="primary" class="btn" @click="goInfo"
        >模拟面试</van-button
      >
    </div>
  </div>
</template>

<script>
import { interviewFilters } from '@/api/question.js'
export default {
  data () {
    return {
      city: '北京',
      info: '',
      currentIndex: 0,
      gradientColor: {
        '0%': 'rgba(228, 1, 55, 0.7)',
        '100%': 'rgba(228, 1, 55, 0.1)'
      },
      currentRate: 0
    }
  },
  async created () {
    const res = await interviewFilters()
    this.info = res.data.data
  },
  methods: {
    cityClick (item) {
      this.city = item
      // 关闭下拉菜单
      this.$refs.dropdown.toggle(false)
      this.currentIndex = 0
    },
    goInfo () {
      // 跳转至刷题同时传入查询参数
      this.$router.push({
        path: '/home/questionInfo',
        query: {
          type: this.info.cityPositions[this.city][this.currentIndex].id,
          city: this.city
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
&::v-deep .van-dropdown-menu__bar {
  box-shadow: none;
}
&::v-deep .van-index-bar__index {
  line-height: 20px;
  color: #555;
}
.question {
  height: 100%;
  background: #f6f2f3;

  .title {
    font-size: 18px;
    font-family: PingFangSC, PingFangSC-Semibold;
    font-weight: 600;
    text-align: center;
    color: #222222;
    line-height: 25px;
    letter-spacing: 0px;
  }
  .city {
    font-size: 12px;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
    text-align: center;
    color: #545671;
    line-height: 17px;
    margin: 0px 6px;
  }
  &::v-deep .van-dropdown-menu__title::after {
    margin-top: -1px;
  }
  .anchor {
    background: #f6f2f3;
    height: 40px;

    &::v-deep .van-index-anchor {
      font-size: 12px;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: left;
      color: #939393;
      line-height: 40px;
      letter-spacing: 0px;
    }
  }
  .cell {
    .cell-title:hover {
      color: orangered;
    }
  }
  .content {
    background: #fff;
    padding: 25px @p15 10px;
    margin-bottom: 15px;
    .tag-list {
      display: flex;
      overflow: auto;
      .tag {
        flex-shrink: 0; // 不自动缩放
        padding: 6px 15px;
        margin-right: 15px;
      }
      .active {
        background-color: #00b8d4 !important;
        color: #fff !important;
      }
    }
  }
  .middle {
    position: relative;
    // height: 200px;
    margin-bottom: 15px;
    padding: 17px 39px;
    background: #fff;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .middle-item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        .icon {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: linear-gradient(180deg, #ff8080, #ff4949);
          line-height: 44px;
          text-align: center;

          .iconfont {
            font-size: 22px;
            font-weight: normal;
            color: #fff;
          }
          margin-bottom: 7px;
        }
        .icon2 {
          background: linear-gradient(180deg, #ffda05, #ffb302);
        }
        .icon3 {
          background: linear-gradient(180deg, #00ddec, #00b8d4);
        }
        .icon4 {
          background: linear-gradient(180deg, #3ee5b1, #1dc779);
        }
        .txt {
          font-size: 12px;
          font-family: PingFangSC, PingFangSC-Regular;
          font-weight: 400;
          text-align: center;
          color: #545671;
          line-height: 17px;
          letter-spacing: 0px;
        }
      }
    }
    .top1 {
      margin-bottom: 33px;
    }
    .center {
      position: absolute;
      width: 120px;
      height: 120px;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      background-color: orchid;
      background: url(~@/assets/circy@2x.png);
      background-size: 100%;
      .circle {
        width: 100% !important;
        height: 100% !important;
        padding: 10px;
        .circle-num {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          padding: 25px 0px;
          background: linear-gradient(180deg, #ff6f92, #e40137);
          color: #fff;
          font-size: 16px;
          font-family: PingFangSC, PingFangSC-Regular;
          font-weight: 400;
          text-align: center;
          color: #ffffff;
          line-height: 23px;
          letter-spacing: 0px;
          .txt1 {
            margin-bottom: 7px;
          }
        }
      }
    }
  }
  .embody {
    margin-bottom: 15px;
    padding: 21px 0px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .t {
      font-size: 18px;
      font-family: PingFangSC, PingFangSC-Semibold;
      font-weight: 600;
      text-align: center;
      color: #545671;
      line-height: 25px;
      letter-spacing: 0px;
      margin-bottom: 21px;
    }
    .e-num {
      font-size: 30px;
      font-family: PingFangSC, PingFangSC-Semibold;
      font-weight: 600;
      text-align: center;
      color: #545671;
      line-height: 42px;
      letter-spacing: 1px;
    }
  }
  .bottom {
    padding: 0px @p15;
    .btn {
      width: 100%;
      height: 50px;
      font-size: 16px;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: center;
      color: #ffffff;
      line-height: 23px;
      letter-spacing: 0px;
      background: #00b8d4;
      border-radius: 7px;
      border: none;
    }
  }
}
</style>
