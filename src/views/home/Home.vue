<template>
  <div class="home">
    <van-tabbar
      inactive-color="#b4b4bd"
      active-color="#e40137"
      route
      placeholder
    >
      <van-tabbar-item to="/home/company">
        <template #default>
          <span class="title">
            公司
          </span>
        </template>
        <template #icon>
          <i class="iconfont">&#xe63d;</i>
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/home/question">
        <template #default>
          <div class="title">
            刷题
          </div>
        </template>
        <template #icon>
          <i class="iconfont">&#xe63f;</i>
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/home/find">
        <template #default>
          <div class="title">
            发现
          </div>
        </template>
        <template #icon>
          <i class="iconfont">&#xe646;</i>
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/home/mine">
        <template #default>
          <div class="title">
            我的
          </div>
        </template>
        <template #icon>
          <i class="iconfont">&#xe645;</i>
        </template>
      </van-tabbar-item>
    </van-tabbar>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data () {
    return {
      active: 0
    }
  }
}
</script>

<style lang="less" scope>
.home {
  height: 100%;
  .iconfont {
    font-size: 29px;
  }
  .title {
    font-size: 10px;
    font-family: PingFangSC, PingFangSC-Regular;
    line-height: 14px;
    letter-spacing: 0px;
  }
  .van-tabbar-item__icon {
    margin: 0;
  }
}
</style>
