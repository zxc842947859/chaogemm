<template>
  <div class="question-info">
    <CGNavBar title="刷题" right="答题卡" path="/home/question"></CGNavBar>
    <div class="content">
      <p class="question-title">
        【单选】在某个时期内，个体对某种刺激特别敏感，过了这个时期，同样的刺激则影响很小或没有影响，这个时期成为（
        ）。
      </p>
      <div class="tag-list">
        <van-tag color="#f7f4f5" text-color="#b4b4bd" class="tag"
          >教育培训</van-tag
        >
      </div>
      <ul class="que-options">
        <li class="option">A. 关键期</li>
        <li class="option">A. 关键期</li>
        <li class="option">A. 关键期</li>
        <li class="option">A. 关键期</li>
      </ul>
    </div>
    <div class="bottom-bar">
      <div class="f1">
        <i class="iconfont">&#xe649;</i>
        <div class="txt">收藏</div>
      </div>
      <div class="f2">
        <i class="iconfont">&#xe606;</i>
        <div class="txt">反馈</div>
      </div>
      <div class="f3"><span class="cur">2</span>/233题</div>
      <div class="f4">
        <van-button type="danger" class="btn">提交</van-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.question-info {
  .content {
    padding: 25px @p15 0px;
    .question-title {
      font-size: 16px;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: justify;
      color: #181a39;
      line-height: 22px;
      margin-bottom: 5px;
    }
    .tag-list {
      margin-bottom: 28px;
      .tag {
        padding: 4px 6px;
        border-radius: 3px;
        font-size: 12px;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        text-align: center;
        color: #b4b4bd;
        line-height: 16px;
        letter-spacing: 0px;
      }
    }
    .que-options {
      padding: 0px 10px;
      .option {
        padding-left: 15px;
        margin-bottom: 16px;
        border: 1px solid #f7f4f5;
        border-radius: 4px;
        font-size: 16px;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        text-align: justify;
        color: #181a39;
        line-height: 48px;
        height: 50px;
      }
    }
  }
  .bottom-bar {
    position: fixed;
    left: 0;
    bottom: 0;
    right: 0;
    height: 85px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px @p15 30px;
    text-align: center;
    /* x偏移量 | y偏移量 | 阴影模糊半径 | 阴影颜色 */
    box-shadow: 0px -1px 2px rgba(197, 197, 197, 0.205);
    .f1,
    .f2 {
      font-size: 12px;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: center;
      color: #b4b4bd;
      line-height: 16px;
      letter-spacing: 0px;
      .iconfont {
        font-size: 28px;
      }
    }
    .f1 {
      margin-right: 20px;
    }
    .f3 {
      flex: 1;
      font-family: PingFangSC, PingFangSC-Regular;
      font-size: 16px;
      color: #4a4c64;
      .cur {
        font-size: 22px;
        font-weight: 400;
        text-align: center;
        color: #e40137;
        line-height: 30px;
        letter-spacing: 1px;
      }
    }
    .f4 {
      .btn {
        height: 40px;
        width: 98px;
      }
    }
  }
}
</style>
