<template>
  <div class="share-list">
    <CGNavBar path="/home/find" title="面经分享"></CGNavBar>
    <div class="share-content">
      <van-search
        v-model="searchValue"
        show-action
        @search="searchEvent"
        @cancel="cancelEvent"
      ></van-search>
      <van-list
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
  </div>
</template>

<script>
import ShareItem from './ShareItem'
import { articlesShare } from '@/api/find.js'
export default {
  components: {
    ShareItem
  },
  data () {
    return {
      searchValue: '',
      loading: false,  // 是否在加载中
      finished: false,  // 是否已加载完成
      dataList: [],  // 数据
      currentPage: 0,  // 当前第几页
      pageSize: 2  // 
    }
  },
  methods: {
    searchEvent () {},
    cancelEvent () {},
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
}
</style>
