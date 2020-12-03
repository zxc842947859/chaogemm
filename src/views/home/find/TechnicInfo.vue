<template>
  <div class="technic-info">
    <CGNavBar :path="backPath"></CGNavBar>
    <div class="content">
      <h3 class="title">从面试者到面试官，我总结了提升成功率的5大关键要素</h3>
      <div class="article-info">
        <span class="b1">2019.08.21</span>
        <i class="iconfont b2">&#xe644;</i>
        <span class="b3">1287</span>
        <i class="iconfont b4">&#xe638;</i>
        <span class="b5">879</span>
      </div>
      <p class="article-content">
        考虑到金三银四，很多小伙伴都在忙着找工作，恰好，这段时间，我自己参与了近20场面试，也在近几天面试了近10位产品经理。
        为了切实帮助大家提升求职成功率，我们团队做了很多辛苦但有意义的事情，希望这些用心整理的内容能切实的帮助到大家。
        先说下我自己的面试经历：
        总体我面试了3家医疗互联网公司，1家拍卖独角兽公司，1家大厂的健康公司。确定拿到2家offer，大厂的因为组织架构调整暂时冻结了子公司的全部HC，不过已经到最后一轮
        CEO
        面了。除了其中1家没有什么诚意之外，平均每家公司面5轮左右，基本每轮面试都顺利通过了。
        进入新公司后，为了组建我的产品团队，短短3，4天我又密集面试了8位产品经理。
        短时间内，我从面试者、面试官两个角色经历了大量的实践，这篇文章就是把一些自己从中总结的提升面试成功率的经验分享给大家。
        这篇文章没有水份，坐稳了。
        私下里，有不少读者问我：“二哥，如何才能写出一份专业的技术简历呢？我总感觉自己写的简历太烂了，所以投了无数份，都石沉大海了。”说实话，我自己好多年没有写过简历了，但我认识的一个同行，他在阿里，给我说了一些他当年写简历的方法论，我感觉太牛逼了，实在是忍不住，就分享了出来，希望能够帮助到你。
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      id: this.$route.params.id,
      backPath: this.$route.query.backPath
    }
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
    }
  }
}
</style>
