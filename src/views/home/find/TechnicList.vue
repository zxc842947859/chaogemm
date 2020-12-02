<template>
  <div class="technic-list">
    <CGNavBar path="/home/find" title="面试技巧"></CGNavBar>
    <van-search
      shape="round"
      :show-action="!!searchKeyWord"
      v-model="searchKeyWord"
      clear-trigger="always"
      :input-align="bol || !!searchKeyWord ? 'left' : 'center'"
      :placeholder="bol ? '' : '请输入关键字'"
      @focus="focusEvent"
      @blur="blurEvent"
      @search="searchEvent"
      @cancel="cancelEvent"
      @clear="cancelEvent"
    >
      <template #left-icon>
        <div>
          <i class="iconfont " :class="{ position: !bol && !searchKeyWord }"
            >&#xe647;</i
          >
        </div>
      </template>
    </van-search>
    <div class="list" v-if="showList">
      <van-list
        v-if="reset"
        class="list-content"
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        ><TechnicItem
          v-for="(item, index) in dataList"
          :key="index"
          :info="item"
        ></TechnicItem
      ></van-list>
    </div>
    <div v-else class="search-box">
      <div class="content">
        <van-cell class="cell" center :border="false">
          <template #title>
            <div class="title">
              大家都在搜
            </div>
          </template>
        </van-cell>
        <div class="tag-list">
          <van-tag
            v-for="(item, index) in hotList"
            :key="index"
            size="large"
            class="tag"
            color="#f7f4f5"
            text-color="#65667f"
            @click="hotClick(item)"
            >{{ item }}</van-tag
          >
        </div>
        <van-cell class="cell" center :border="false">
          <template #title>
            <div class="title">
              历史搜索
            </div>
          </template>
          <template #default>
            <div class="value">
              清空
            </div>
          </template>
        </van-cell>
        <div class="tag-list">
          <van-tag size="large" class="tag" color="#f7f4f5" text-color="#65667f"
            >产面面试</van-tag
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TechnicItem from './TechnicItem'
import { articlesTechnic, articlesTechnicTopSearch } from '@/api/find.js'

export default {
  components: { TechnicItem },
  data () {
    return {
      reset: true,
      showList: true,
      bol: false,
      searchKeyWord: '', // 搜索关键字
      inputAlign: 'center',
      loading: false,
      finished: false,
      currentPage: 0,
      pageSize: 2,
      dataList: [],
      hotList: []
    }
  },
  methods: {
    async onLoad () {
      const res = await articlesTechnic({
        start: this.currentPage * this.pageSize,
        limit: this.pageSize,
        q: this.searchKeyWord
      })
      this.dataList.push(...res.data.data.list)
      this.currentPage++
      this.loading = false
      this.finished = this.dataList.length >= res.data.data.total
    },
    hotClick (kw) {
      console.log(kw)
      this.searchKeyWord = kw
      this.resetState()
    },
    focusEvent () {
      this.bol = true
      this.showList = false
    },
    blurEvent () {
      this.bol = false
    },
    searchEvent () {
      this.onLoad()
    },
    cancelEvent () {
      this.resetState()
    },
    resetState () {
      this.showList = true
      this.loading = false
      this.finished = false
      this.dataList = []
      this.currentPage = 0
      this.reset = false
      this.$nextTick(() => {
        this.reset = true
      })
    }
  },
  async created () {
    const res = await articlesTechnicTopSearch()
    this.hotList = res.data.data
  }
}
</script>

<style lang="less" scoped>
.technic-list {
  background-color: #f9f9f9;
  .van-search {
    height: 58px;
    padding: 12px @p15;
    .van-field {
      .iconfont {
        color: #ababb4;
        position: relative;
        left: 0;
      }
      .position {
        position: absolute;
        left: 50%;
        margin-left: -65px;
      }
    }
  }
  .list-content {
  }
  .search-box {
    background-color: #fff;
    height: 100%;
    .content {
      padding: 0px @p15;
      .cell {
        padding: 12px 0px;
        .title {
          font-size: 18px;
          font-family: PingFangSC, PingFangSC-Medium;
          font-weight: 500;
          text-align: left;
          color: #222222;
          line-height: 25px;
          letter-spacing: 0px;
        }
      }
      .tag-list {
        .tag {
          font-size: 12px;
          font-family: PingFangSC, PingFangSC-Regular;
          font-weight: 400;
          text-align: left;
          color: #545671;
          line-height: 17px;
          letter-spacing: 0px;
          height: 32px;
          border-radius: 8px;
          margin: 0px 10px 10px 0px;
        }
      }
    }
  }
}
</style>
