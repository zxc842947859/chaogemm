<template>
  <div class="technic-item">
    <div class="left">
      <div class="title van-multi-ellipsis--l2">
        {{ info.title }}
      </div>
      <div class="bottom">
        <div class="b1">{{ info.created_at }}</div>
        <i class="iconfont b2">&#xe644;</i>
        <span class="b3">{{ info.read }}</span>
        <i class="iconfont b4">&#xe638;</i>
        <span class="b5">{{ info.star }}</span>
      </div>
    </div>
    <img v-if="info.cover" class="right" :src="$baseURL + info.cover" alt="" />
  </div>
</template>

<script>
export default {
  props: {
    info: {
      type: Object
    }
  }
}
</script>

<style lang="less" scoped>
.technic-item {
  padding: 19px 0px;
  display: flex;
  justify-content: space-between;
  .left {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;
    .title {
      font-size: 16px;
      font-family: PingFangSC, PingFangSC-Medium;
      font-weight: 500;
      text-align: left;
      color: #181a39;
      line-height: 23px;
      letter-spacing: 0px;
      margin-bottom: 7px;
    }
    .bottom {
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: left;
      color: #b4b4bd;
      line-height: 17px;
      letter-spacing: 0px;
      .b1 {
        flex: 1;
      }
      .b3 {
        margin: 0px 25px 0px 8px;
      }
      .b4 {
        margin-right: 8px;
      }
    }
  }
  .right {
    width: 113px;
    height: 75px;
    object-fit: cover;
    border-radius: 4px;
    margin-left: 15px;
  }
}
</style>
