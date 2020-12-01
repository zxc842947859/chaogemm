<template>
  <div class="find">
    <CGNavBar title="发现" :left="false"></CGNavBar>
    <FindCell title="面试技巧"></FindCell>
    <div class="technic-content">
      <div class="technic">
        <TechnicItem
          v-for="(item, index) in technicList"
          :key="index"
          :info="item"
        ></TechnicItem>
      </div>
    </div>

    <div class="marked-content">
      <FindCell title="市场数据"></FindCell>
      <div class="marked-data">
        <van-tag class="tag1" color="#eceaea" text-color="#5d5f78">{{
          chartDataHotList.city
        }}</van-tag>
        <van-tag class="tag2" color="#eceaea" text-color="#5d5f78">{{
          chartDataHotList.position
        }}</van-tag>
        <ul class="chart" v-if="chartDataHotList.yearSalary">
          <li
            class="chart-item"
            v-for="(item, index) in chartDataHotList.yearSalary.slice(0, total)"
            :key="index"
          >
            <div class="c1">{{ item.year }}</div>
            <div class="c2">
              <div class="line" :style="{ width: item.per }">
                ¥ {{ item.salary }}
              </div>
            </div>
            <div class="c3">
              <div v-if="item.percent !== undefined">
                <i v-if="item.percent < 0" class="iconfont down">&#xe64e;</i>
                <i v-else class="iconfont up">&#xe651;</i>
              </div>
            </div>
            <div class="c4">
              <div v-if="item.percent !== undefined">
                {{ Math.abs(item.percent) }}%
              </div>
            </div>
          </li>
        </ul>
        <div class="look-more">
          <div
            @click="total = chartDataHotList.yearSalary.length"
            v-if="total === 3"
          >
            展开更多<i class="iconfont">&#xe652;</i>
          </div>
          <div @click="total = 3" v-else>
            收起<i class="iconfont r180">&#xe652;</i>
          </div>
        </div>
      </div>
    </div>
    <FindCell title="面经分享"></FindCell>
    <div class="share-content">
      <ShareItem
        v-for="(item, index) in shareList"
        :key="index"
        :info="item"
      ></ShareItem>
    </div>
    <div class="most-bottom">
      <i class="line"></i>
      <span class="tip-txt">到底了</span>
      <i class="line"></i>
    </div>
  </div>
</template>

<script>
import FindCell from './FindCell'
import TechnicItem from './TechnicItem'
import ShareItem from './ShareItem'
import { articlesTechnic, chartDataHot, articlesShare } from '@/api/find.js'
export default {
  components: {
    FindCell,
    TechnicItem,
    ShareItem
  },
  data () {
    return {
      technicList: [],
      chartDataHotList: [],
      total: 3, // 默认展示几条市场数据
      shareList: []
    }
  },
  async created () {
    const res = await articlesTechnic()
    this.technicList = res.data.data.list

    const res2 = await chartDataHot()
    res2.data.data.yearSalary.forEach(item => {
      item.per = (item.salary / res2.data.data.topSalary) * 100 + '%'
      item.year = item.year.substring(0, 5)
    })
    res2.data.data.yearSalary.reverse()
    this.chartDataHotList = res2.data.data

    const res3 = await articlesShare()
    this.shareList = res3.data.data.list
    console.log(res3)
  }
}
</script>

<style lang="less" scoped>
.find {
  background-color: #f6f2f3;
  .technic-content {
    background-color: #fff;
    padding: 10px @p15;
  }
  .marked-content {
    background-color: #fff;
    margin: 10px 0;
    .marked-data {
      padding: 0px @p15;
      .tag2 {
        margin: 20px 10px 10px;
      }
      .chart {
        margin: 9px 0px;
        .chart-item {
          margin-top: 13px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .c1 {
            width: 49px;
            font-size: 14px;
            font-family: PingFangSC, PingFangSC-Regular;
            font-weight: 400;
            text-align: center;
            color: #545671;
            line-height: 20px;
            letter-spacing: 0px;
          }
          .c2 {
            margin: 0px 11px;
            height: 12px;
            background-color: #e9dadb;
            border-radius: 4px;
            flex: 1;
            .line {
              width: 50%;
              text-align: right;
              padding-right: 7px;
              color: #fff;
              background-color: #ff605f;
              border-radius: 4px;
              font-size: 12px;
              font-family: PingFangSC, PingFangSC-Regular;
              font-weight: 200;
              line-height: 12px;
              letter-spacing: 0px;
            }
          }
          .c3,
          .c4 {
            font-size: 14px;
            font-family: PingFangSC, PingFangSC-Regular;
            font-weight: 400;
            text-align: right;
            color: #5b5d75;
            line-height: 20px;
            letter-spacing: 0px;

            .down {
              color: #00ce75;
            }
            .up {
              color: #ff605f;
            }
          }
          .c3 {
            width: 16px;
          }
          .c4 {
            margin-left: 8px;
            width: 30px;
          }
        }
      }
      .look-more {
        margin-top: 20px;
        font-size: 14px;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        text-align: center;
        color: #545671;
        line-height: 20px;
        letter-spacing: 0px;
        padding-bottom: 19px;
        .iconfont {
          color: #ababb4;
          font-size: 12px;
          margin-left: 7px;
        }
        .r180 {
          // 行内元素不适用于 transform
          display: inline-block;
          transform: rotate(180deg);
        }
      }
    }
  }
  .most-bottom {
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
}
</style>
