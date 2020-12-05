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
          <van-index-bar :index-list="Object.keys(info.citys)">
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
  </div>
</template>

<script>
import { interviewFilters } from '@/api/question.js'
export default {
  data () {
    return {
      city: '北京',
      info: '',
      currentIndex: 0
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
    }
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
  .cell {
    .cell-title:hover {
      color: orangered;
    }
  }
  .content {
    padding: 25px @p15 10px;
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
}
</style>
