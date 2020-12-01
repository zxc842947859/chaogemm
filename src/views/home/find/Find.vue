<template>
  <div class="find">
    <CGNavBar title="发现" :left="false"></CGNavBar>
    <div class="content">
      <FindCell title="面试技巧"></FindCell>
      <TechnicItem></TechnicItem>
      <FindCell title="市场数据"></FindCell>
      <FindCell title="面经分享"></FindCell>
    </div>
  </div>
</template>

<script>
import FindCell from './FindCell'
import TechnicItem from './TechnicItem'
export default {
  components: {
    FindCell,
    TechnicItem
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
