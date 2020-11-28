<template>
  <van-cell is-link center class="cell">
    <template #icon>
      <i class="iconfont" v-html="icon"></i>
    </template>
    <template #title>
      <div class="cell-title">
        {{ title }}
      </div>
    </template>
    <template #default>
      <div class="right-title">
        {{ value }}
      </div>
    </template>
  </van-cell>
</template>

<script>
export default {
  props: ['icon', 'title', 'value']
}
</script>

<style lang="less" scope>
.cell {
  height: 55px;
  .iconfont {
    font-size: 20px;
    margin-right: 6px;
  }
  .cell-title {
    font-size: 14px;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
    text-align: left;
    color: #181a39;
    line-height: 20px;
    letter-spacing: 0px;
  }
  .right-title {
    font-size: 14px;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
    text-align: right;
    color: #5b5d75;
    line-height: 20px;
    letter-spacing: 0px;
  }
}
</style>
