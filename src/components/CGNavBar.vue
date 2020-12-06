<template>
  <van-nav-bar
    placeholder
    @click-left="$router.push(path)"
    @click-right="rightEvent"
    class="CGNavBar"
  >
    <template #left v-if="left">
      <i class="iconfont f44">&#xe637;</i>
    </template>
    <template #title v-if="title">
      <div class="nav-title">
        {{ title }}
      </div>
    </template>
    <template #right v-if="right">
      <div class="right-txt" v-html="right"></div>
    </template>
  </van-nav-bar>
</template>
<script>
export default {
  name: 'CGNavBar',

  // props: ['title', 'right', 'path'],
  props: {
    /* 属性名:
    type: 类型(String, Number, Boolean, undefined, null, Object, Array, Map, Set)  不指定默认支持任意类型, [多个类型用数组包装]
    default: 默认值,不指定 默认是undefined
    */
    title: {
      type: String
    },
    right: {
      type: String
    },
    path: {
      type: String
    },
    left: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    rightEvent () {
      this.$emit('navRightSave')
    }
  }
}
</script>

<style lang="less" scoped>
.CGNavBar {
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
