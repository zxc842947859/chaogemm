<template>
  <div class="technic-info">
    <CGNavBar :path="backPath"></CGNavBar>
    <div class="content">
      <h3 class="title">{{ infoData.title }}</h3>
      <div class="article-info">
        <span class="b1">{{ infoData.updated_at | formatTime }}</span>
        <i class="iconfont b2">&#xe644;</i>
        <span class="b3">{{ infoData.read }}</span>
        <i class="iconfont b4">&#xe638;</i>
        <span class="b5">{{ infoData.star }}</span>
      </div>
      <p class="article-content" v-html="infoData.content"></p>
    </div>
  </div>
</template>

<script>
import { articlesTechnicInfo } from '@/api/find.js'
export default {
  data () {
    return {
      id: this.$route.params.id,
      backPath: this.$route.query.backPath,
      infoData: ''
    }
  },
  methods: {},
  async created () {
    const res = await articlesTechnicInfo(this.id)
    this.infoData = res.data.data
  }
}
</script>

<style lang="less" scoped>
.technic-info {
  .content {
    padding: 0px @p15;
    .title {
      font-size: 18px;
      font-family: PingFangSC, PingFangSC-Medium;
      font-weight: 500;
      text-align: left;
      color: #181a39;
      line-height: 25px;
      margin: 19px 0px;
    }
    .article-info {
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
        margin: 0px 25px 0px 5px;
      }
      .b4 {
        margin-right: 5px;
      }
    }
    .article-content {
      font-size: 16px;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: justify;
      color: #181a39;
      line-height: 27px;
      letter-spacing: 0px;
      padding: 28px 0px;
      ::v-deep img {
        width: 100%;
        padding: 0;
        margin: 0;
      }
    }
  }
}
</style>
