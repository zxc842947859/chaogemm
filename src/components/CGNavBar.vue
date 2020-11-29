<template>
  <van-nav-bar
    placeholder
    @click-left="$router.push(path)"
    @click-right="rightEvent"
    class="nav-bar"
  >
    <template #left>
      <i class="iconfont f44">&#xe637;</i>
    </template>
    <template #title>
      <div class="nav-title" v-if="title">
        {{ title }}
      </div>
    </template>
    <template #right>
      <div v-if="right" class="right-txt">
        {{ right }}
      </div>
    </template>
  </van-nav-bar></template
>

<script>
export default {
  props: ['title', 'right', 'path', 'rightEvent'],
  methods: {}
}
</script>

<style lang="less" scoped>
.nav-bar {
  &::v-deep .van-nav-bar__left {
    padding-left: 0px;
  }
  .iconfont {
    font-size: 44px;
  }
  .nav-title {
    font-size: 18px;
    font-family: PingFangSC, PingFangSC-Semibold;
    font-weight: 600;
    text-align: left;
    color: #222222;
    line-height: 25px;
    letter-spacing: 0px;
  }
  .right-txt {
    font-size: 14px;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
    text-align: left;
    color: #181a39;
    line-height: 20px;
    letter-spacing: 0px;
  }
}
</style>
