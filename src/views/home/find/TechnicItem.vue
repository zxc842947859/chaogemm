<template>
  <div class="technic-item">
    <div class="left">
      <div class="title van-multi-ellipsis--l2">
        盘点面试中最为难的五大棘手问题，你是否遇到过？教你如何应对。
      </div>
      <div class="bottom">
        <div class="b1">1小时前</div>
        <i class="iconfont b2">&#xe644;</i>
        <span class="b3">1287</span>
        <i class="iconfont b4">&#xe638;</i>
        <span class="b5">1287</span>
      </div>
    </div>
    <img class="right" src="@/assets/logo.png" alt="" />
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.technic-item {
  padding: 25px 0px;
  display: flex;
  justify-content: space-between;
  .left {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
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
  }
}
</style>
