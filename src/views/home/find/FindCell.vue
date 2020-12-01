<template>
  <van-cell class="find-cell" is-link center :border="false">
    <template #title>
      <div class="title">
        {{ title }}
      </div>
    </template>
    <template #default>
      <div class="value">
        查看更多
      </div>
    </template>
  </van-cell>
</template>

<script>
export default {
  props: {
    title: {
      type: String
    }
  }
}
</script>

<style lang="less" scoped>
.find-cell {
  padding: 25px 0 0 0;
  .title {
    font-size: 18px;
    font-family: PingFangSC, PingFangSC-Medium;
    font-weight: 500;
    text-align: left;
    color: #222222;
    line-height: 25px;
    letter-spacing: 0px;
  }
  .value {
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
