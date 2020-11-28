<template>
  <van-cell is-link center class="cell">
    <template #icon>
      <i v-if="icon" class="iconfont" v-html="icon"></i>
    </template>
    <template #title>
      <div class="cell-title">
        {{ title }}
      </div>
    </template>
    <template #default>
      <img
        class="img"
        v-if="type === 'img' && value"
        :src="baseURL + value"
        alt=""
      />
      <img
        class="img"
        v-else-if="type === 'img'"
        src="@/assets/logo.png"
        alt=""
      />
      <div v-else class="right-title">
        {{ value }}
      </div>
    </template>
  </van-cell>
</template>

<script>
export default {
  props: ['icon', 'title', 'value', 'type'],
  data () {
    return {
      baseURL: process.env.VUE_APP_URL
    }
  }
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
  .img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    vertical-align: middle;
  }
}
</style>
