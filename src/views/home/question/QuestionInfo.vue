<template>
  <div class="question-info">
    <van-sticky>
      <CGNavBar title="刷题" right="答题卡" path="/home/question"></CGNavBar>
    </van-sticky>
    <div class="content" v-if="list.length && list[currIndex].detail">
      <p class="question-title">
        【{{ typeObj[list[currIndex].detail.type] }}】{{
          list[currIndex].detail.title
        }}
      </p>
      <div class="tag-list">
        <van-tag
          color="#f7f4f5"
          text-color="#b4b4bd"
          class="tag"
          v-for="(item, index) in list[currIndex].detail.tag"
          :key="index"
          >{{ item }}</van-tag
        >
      </div>
      <ul class="que-options" v-if="list[currIndex].detail.type === 1">
        <li
          class="option iconfont"
          :class="{
            sactive: ans1 === optionStr[index] && !list[currIndex].ans,
            right:
              list[currIndex].ans &&
              list[currIndex].ans.singleAnswer === optionStr[index],
            error:
              list[currIndex].ans &&
              ans1 === optionStr[index] &&
              list[currIndex].ans.singleAnswer !== ans1
          }"
          v-for="(item, index) in list[currIndex].detail.option"
          :key="index"
          @click="ans1Click(index)"
        >
          {{ optionStr[index] }}. {{ item }}
        </li>
      </ul>
      <ul class="que-options" v-else-if="list[currIndex].detail.type === 2">
        <li
          class="option iconfont"
          v-for="(item, index) in list[currIndex].detail.option"
          :key="index"
          @click="ans2Click(optionStr[index])"
          :class="{
            mactive: ans2.includes(optionStr[index]) && !list[currIndex].ans,
            right:
              list[currIndex].ans &&
              list[currIndex].ans.multipleAnswer.includes(optionStr[index]),
            error:
              list[currIndex].ans &&
              !list[currIndex].ans.multipleAnswer.includes(optionStr[index]) &&
              ans2.includes(optionStr[index])
          }"
        >
          {{ optionStr[index] }}. {{ item }}
        </li>
      </ul>
      <div v-else class="record">
        <div class="tip">按住说话</div>
        <div class="record-icon">
          <img class="icon" src="@/assets/btn_shuohua_nor.png" alt="" />
        </div>
      </div>
      <div class="answer" v-if="step > 1">
        <h3 class="answer-title">答案解析</h3>
        <div class="answer-rigth">
          正确答案：
          {{
            list[currIndex].ans.singleAnswer ||
              list[currIndex].ans.multipleAnswer.join(' ')
          }}
        </div>
        <div class="other">
          <div>难度：{{ diffObj[list[currIndex].ans.difficulty] }}</div>
          <div>提交次数：{{ list[currIndex].ans.submitNum }}</div>
          <div>正确次数： {{ list[currIndex].ans.correctNum }}</div>
        </div>
        <div class="answer-content">
          {{ list[currIndex].ans.answerAnalysis }}
        </div>
      </div>
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
      <div class="f3">
        <span class="cur">{{ currIndex + 1 }}</span
        >/{{ list.length }}题
      </div>
      <div class="f4">
        <van-button
          type="danger"
          class="btn"
          @click="submitQuestion"
          v-if="step < 2"
          :disabled="!(ans1 || ans2.length || ans3)"
          >提交</van-button
        >
        <van-button
          type="danger"
          class="btn"
          v-else-if="step === 2"
          @click="nextQuestion"
          >下一题</van-button
        >
        <van-button type="danger" class="btn" v-else>结束</van-button>
      </div>
    </div>
    <van-popup v-model="showCard" position="top">
      <van-sticky>
        <CGNavBar
          title="答题卡"
          :right="
            `<span style='color:red;'>${currIndex + 1}</span>/${list.length}题`
          "
          path=""
          @back="showCard = false"
        ></CGNavBar>
        <div class="card-title">
          选择题
          <span class="question-num">共{{ list.length }}题</span>
        </div>
      </van-sticky>
      <ul class="question-card">
        <li class="cardDef" v-for="(item, index) in list" :key="index">
          {{ index + 1 }}
        </li>
        <div class="nouse"></div>
        <div class="nouse"></div>
        <div class="nouse"></div>
        <div class="nouse"></div>
        <div class="nouse"></div>
        <div class="nouse"></div>
        <div class="nouse"></div>
        <div class="nouse"></div>
      </ul>
    </van-popup>
  </div>
</template>

<script>
import {
  interviewQuestions,
  questionsSubmit,
  questionsId
} from '@/api/question.js'
export default {
  data () {
    return {
      // 接收路由传参
      city: this.$route.query.city,
      type: this.$route.query.type,
      list: [], // 所有题目数组
      currIndex: 1, // 当前第几题
      optionStr: 'ABCDEFG', // 答案选项
      typeObj: {
        1: '单选',
        2: '多选',
        3: '简答'
      },
      ans1: '', // 单选答案
      ans2: [], // 多选条案
      ans3: '', // 简答答案
      step: 0, // 第几步
      diffObj: {
        1: '简单',
        2: '一般',
        3: '困难'
      },
      showCard: true
    }
  },
  async created () {
    const res = await interviewQuestions({ type: this.type, city: this.city })
    console.log('题目', res)
    this.list = res.data.data
    this.nextQuestion()
  },
  methods: {
    // 单选题选择
    ans1Click (index) {
      // 提交后不能再修改选项
      if (this.step < 2) {
        this.ans1 = this.optionStr[index]
        this.step = 1
      }
    },
    // 单选题提交答案
    async submitQuestion () {
      this.$toast.loading({
        duration: 0
      })
      // 提交条案
      const res = await questionsSubmit({
        id: this.list[this.currIndex].id,
        singleAnswer: this.ans1,
        multipleAnswer: this.ans2
      })
      console.log('提交', res)
      this.$toast.clear()
      this.list[this.currIndex].ans = res.data.data
      // 不是最后一题就为2,最后一题为3显示结果
      this.step = this.currIndex === this.list.length - 1 ? 3 : 2
    },
    // 下一题
    async nextQuestion () {
      this.currIndex++
      // 获取当前题目详情
      const res = await questionsId(this.list[this.currIndex].id)
      console.log('下一题', res)
      this.list[this.currIndex].detail = res.data.data
      // 新的一题状态恢复到初始
      this.step = 0
      this.ans1 = ''
      this.ans2 = []
      this.ans3 = ''
    },
    ans2Click (option) {
      // 提交后不能再修改选项
      if (this.step < 2) {
        const index = this.ans2.indexOf(option)
        if (index === -1) {
          this.ans2.push(option)
        } else {
          this.ans2.splice(index, 1)
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.question-info {
  .content {
    padding: 25px @p15 85px;
    .question-title {
      font-size: 16px;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: justify;
      color: #181a39;
      line-height: 22px;
      margin-bottom: 12px;
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
      padding: 0px 10px 16px;
      .option {
        padding: 14px 15px;
        margin-bottom: 16px;
        border: 1px solid #f7f4f5;
        border-radius: 4px;
        font-size: 16px;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        text-align: justify;
        color: #181a39;
        line-height: 22px;
      }
      .sactive {
        border: 1px solid #b4b4bd;
      }
      .mactive {
        background: #f2f2f2;
        border: 1px solid #b4b4bd;
      }
      .right {
        background: #ddfad9;
        position: relative;
        color: #1dc779;
        &::after {
          content: '\e604';
          color: #1dc779;
          font-size: 20px;
          position: absolute;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
        }
      }
      .error {
        background: #ffefea;
        position: relative;
        &::after {
          content: '\e605';
          color: #e40137;
          font-size: 20px;
          position: absolute;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
    .record {
      padding: 32px 0px;
      position: fixed;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      bottom: 85px;
      left: 0px;
      width: 100%;
      height: 234px;
      background-color: #f7f5f4;
      text-align: center;
      .tip {
        font-size: 16px;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        text-align: center;
        color: #545671;
        line-height: 22px;
        margin-bottom: 16px;
      }
      .record-icon {
        width: 130px;
        height: 130px;
        border-radius: 50%;
        background-color: #fff;
        box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.17);
        display: flex;
        justify-content: space-around;
        align-items: center;
        .icon {
          width: 68px;
          height: 68px;
        }
      }
    }
    .answer {
      border-top: 1px solid #eceaea;
      padding-top: 18px;
      .answer-title {
        font-size: 18px;
        font-family: PingFangSC, PingFangSC-Medium;
        font-weight: 500;
        text-align: left;
        color: #222222;
        line-height: 25px;
        letter-spacing: 0px;
        margin-bottom: 18px;
      }
      .answer-rigth {
        font-size: 16px;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        text-align: justify;
        color: #1dc779;
        line-height: 22px;
        margin-bottom: 18px;
      }
      .other {
        padding: 6px 10px;
        height: 32px;
        background: #f7f4f5;
        border-radius: 4px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 12px;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        text-align: left;
        color: #545671;
        line-height: 16px;
        letter-spacing: 0px;
        margin-bottom: 20px;
      }
      .answer-content {
        font-size: 16px;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        text-align: justify;
        color: #181a39;
        line-height: 22px;
        margin-bottom: 20px;
      }
    }
  }
  .bottom-bar {
    background: #fff;
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
    box-shadow: 0px -2px 4px 0px rgba(24, 26, 57, 0.04);
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
  .card-title {
    font-size: 16px;
    font-family: PingFangSC, PingFangSC-Semibold;
    font-weight: 600;
    text-align: left;
    color: #222222;
    line-height: 44px;
    letter-spacing: 0px;
    background: #f6f2f3;
    height: 44px;
    padding-left: 15px;
    .question-num {
      margin-left: 10px;
      font-size: 14px;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: left;
      color: #b4b4bd;
      line-height: 44px;
      letter-spacing: 0px;
    }
  }
  .question-card {
    background: #fff;
    padding: 9px 7px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    .cardDef {
      text-align: center;
      line-height: 33px;
      width: 33px;
      height: 33px;
      border-radius: 50%;
      border: 1px solid #b4b4bd;
      font-size: 14px;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      color: #b4b4bd;
      letter-spacing: 0px;
      margin: 9px 8px 9px 8px;
    }
    .cardRight {
      background: #ddfad9;
      color: #1dc779;
    }
    .cardErr {
      background: #ffefea;
      color: #ff4949;
    }
    .nouse {
      width: 33px;
      margin: 0px 8px;
      height: 0;
    }
  }
}
</style>
