<template>
  <van-cell class="find-cell" center :border="false">
    <template #title>
      <div class="title">
        {{ title }}
      </div>
    </template>
    <template #default>
      <div class="value" @click="loadMore">
        查看更多
      </div>
    </template>
    <template #right-icon>
      <i class="iconfont">&#xe653;</i>
    </template>
  </van-cell>
</template>

<script>
export default {
  props: {
    title: {
      type: String
    }
  },
  methods: {
    loadMore () {
      this.$emit('loadMore')
    }
  }
}
</script>

<style lang="less" scoped>
.find-cell {
  // align-items: center;
  padding: 25px 15px 0;
  display: flex;
  align-items: center;
  background-color: #fff;

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
  .iconfont {
    color: #545671;
    font-size: 14px;
    line-height: 20px;
  }
}
</style>
