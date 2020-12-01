<template>
  <div class="find">
    <CGNavBar title="发现" :left="false"></CGNavBar>
    <div class="content">
      <FindCell title="面试技巧"></FindCell>
      <TechnicItem
        v-for="(item, index) in technicList"
        :key="index"
        :info="item"
      ></TechnicItem>
      <FindCell title="市场数据"></FindCell>
      <FindCell title="面经分享"></FindCell>
    </div>
  </div>
</template>

<script>
import FindCell from './FindCell'
import TechnicItem from './TechnicItem'
import { articlesTechnic } from '@/api/find.js'
export default {
  components: {
    FindCell,
    TechnicItem
  },
  data () {
    return {
      technicList: []
    }
  },
  created () {
    articlesTechnic().then(res => {
      console.log(res)
      this.technicList = res.data.data.list
    })
  }
}
</script>

<style lang="less" scoped>
.find {
  .content {
    padding: 0px @p15;
  }
}
</style>
