<template>
  <div class="question">
    <van-dropdown-menu>
      <van-dropdown-item>
        <template #title>
          <div class="title">
            面试宝典<span class="city">{{ city }}</span>
          </div>
        </template>
        <template #default>
          <van-index-bar :index-list="Object.keys(info.citys || [])">
            <div v-for="(val, key, index) in info.citys" :key="index">
              <van-index-anchor :index="key" class="anchor">
                {{ key }}
              </van-index-anchor>
              <van-cell
                :title="item"
                v-for="(item, index) in val"
                :key="index"
              ></van-cell>
            </div>
          </van-index-bar>
        </template>
      </van-dropdown-item>
    </van-dropdown-menu>
  </div>
</template>

<script>
import { interviewFilters } from '@/api/question.js'
export default {
  data () {
    return {
      city: '北京',
      info: {}
    }
  },
  async created () {
    const res = await interviewFilters()
    console.log(res)
    this.info = res.data.data
  }
}
</script>

<style lang="less" scoped>
.question {
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
}
</style>
