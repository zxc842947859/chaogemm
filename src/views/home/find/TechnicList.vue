<template>
  <div class="technic-list">
    <CGNavBar path="/home/find" title="面试技巧"></CGNavBar>
    <van-search
      shape="round"
      :show-action="!!searchKeyWord"
      v-model="searchKeyWord"
      :input-align="bol ? 'left' : 'center'"
      :placeholder="bol ? '' : '请输入关键字'"
      @focus="bol = true"
      @blur="bol = false"
    >
      <template #left-icon>
        <div>
          <i class="iconfont " :class="{ position: !bol }">&#xe647;</i>
        </div>
      </template>
    </van-search>
    <van-list
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
</template>

<script>
import TechnicItem from './TechnicItem'
import { articlesTechnic } from '@/api/find.js'
export default {
  components: { TechnicItem },
  data () {
    return {
      bol: false,
      searchKeyWord: '', // 搜索关键字
      inputAlign: 'center',
      loading: false,
      finished: false,
      currentPage: 0,
      pageSize: 2,
      dataList: []
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
    }
  }
}
</script>

<style lang="less" scoped>
.technic-list {
  background-color: #f9f9f9;
  .van-search {
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
}
</style>
