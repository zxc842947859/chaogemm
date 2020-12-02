<template>
  <div class="share-list">
    <CGNavBar path="/home/find" title="面经分享"></CGNavBar>
    <div class="share-content">
      <van-search
        shape="round"
        placeholder="请输入关键字"
        v-model="searchValue"
        :show-action="!showList || !!searchValue"
        @search="searchEvent"
        @cancel="cancelEvent"
        :input-align="searchLeft"
        @focus="searchLeft = 'left'"
        @blur="searchLeft = 'center'"
      ></van-search>
      <div v-if="showList" class="content">
        <van-list
          v-if="reset"
          v-model="loading"
          :finished="finished"
          @load="onLoad"
          finished-text="到底了"
        >
          <div class="list">
            <ShareItem
              v-for="(item, index) in dataList"
              :key="index"
              :info="item"
            ></ShareItem>
          </div>
        </van-list>
      </div>
      <div v-else class="hot-search">
        <h3 class="title">大家都在搜</h3>
        <div class="tag-list">
          <van-tag
            @click="hotClick(item)"
            class="tag"
            v-for="(item, index) in hotList"
            :key="index"
            color="#f7f4f5"
            text-color="#65667f"
            >{{ item }}</van-tag
          >
        </div>
        <van-cell class="history" :border="false" center>
          <template #title>
            <div class="title">
              历史搜索
            </div>
          </template>
          <template #default>
            <div class="clear" @click="clearHostiry">
              清空
            </div>
          </template>
        </van-cell>
        <div class="tag-list">
          <van-tag
            @click="hotClick(item)"
            class="tag"
            v-for="(item, index) in historyList"
            :key="index"
            color="#f7f4f5"
            text-color="#65667f"
            >{{ item }}</van-tag
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ShareItem from './ShareItem'
import { articlesShare, articlesShareTopSearch } from '@/api/find.js'
import { setLocal, getLocal, removeLocal } from '@/utils/local.js'
export default {
  components: {
    ShareItem
  },
  data () {
    return {
      showList: true,
      searchLeft: 'center',
      searchValue: '',
      loading: false, // 是否在加载中
      finished: false, // 是否已加载完成
      dataList: [], // 数据
      currentPage: 0, // 当前第几页
      pageSize: 2, //
      reset: true, // 是否重置
      hotList: [], // 热搜数据
      historyList: JSON.parse(getLocal('history')) || []
    }
  },
  methods: {
    hotClick (hotStr) {
      this.searchValue = hotStr
      this.searchEvent()
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
    },
    searchEvent () {
      this.resetState()
      const searchStr = this.searchValue.trim()
      if (searchStr) {
        this.historyList.unshift(searchStr)
        this.historyList = [...new Set(this.historyList)].slice(0, 5)
        setLocal('history', JSON.stringify(this.historyList))
      }
    },
    async cancelEvent () {
      //   this.resetState()
      this.showList = !this.showList
      if (this.showList) {
        this.resetState()
      } else {
        let host = this.$store.state.hotList
        if (host.length === 0) {
          host = await articlesShareTopSearch()
          host = host.data.data
          this.$store.commit('setHotList', host)
        }
        this.hotList = host
      }
    },
    async onLoad () {
      const res = await articlesShare({
        start: this.currentPage * this.pageSize,
        limit: this.pageSize,
        q: this.searchValue
      })
      this.loading = false
      this.currentPage++
      this.dataList.push(...res.data.data.list)
      this.finished = this.dataList.length >= res.data.data.total
    },
    clearHostiry () {
      removeLocal('history')
      this.historyList = []
    }
  }
}
</script>

<style lang="less" scoped>
.share-list {
  .share-content {
    padding: 0px @p15;
    .van-search {
      padding-left: 0px;
      padding-right: 0px;
    }
  }
  .hot-search {
    .title {
      font-size: 18px;
      font-family: PingFangSC, PingFangSC-Medium;
      font-weight: 500;
      text-align: left;
      color: #222222;
      line-height: 25px;
      letter-spacing: 0px;
      margin: 3px 0px;
    }
    .van-cell {
      padding: 0px;
    }
    .tag-list {
      margin: 10px 0px 20px;
      .tag {
        margin-right: 10px;
        height: 32px;
        padding: 0px 11px;
        font-size: 12px;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        color: #545671;
        line-height: 30px;
        letter-spacing: 0px;
        border-radius: 8px;
      }
    }
  }
}
</style>
