<template>
  <div class="login">
    <van-nav-bar>
      <template #left>
        <i class="iconfont f44">&#xe637;</i>
      </template>
    </van-nav-bar>
    <div class="content">
      <h3 class="title">您好,请登录</h3>
      <van-form class="form" ref="form">
        <van-field
          type="digit"
          v-model="form.mobile"
          name="mobile"
          :rules="rules.mobile"
          placeholder="请输入手机号"
        >
          <template #left-icon>
            <i class="iconfont">&#xe60b;</i>
          </template>
        </van-field>
        <van-field
          type="digit"
          v-model="form.code"
          name="code"
          :rules="rules.code"
          placeholder="请输入验证码"
        >
          <template #left-icon>
            <i class="iconfont">&#xe60c;</i>
          </template>
          <template #button>
            <span
              class="code"
              :class="{ red: send_flag }"
              @click="getSMSCode"
              >{{ tip }}</span
            >
          </template>
        </van-field>
        <div class="tip">
          登录即同意<span class="pro-link">《用户使用协议》</span>和<span
            class="pro-link"
            >《隐私协议》</span
          >
        </div>
      </van-form>
      <van-button block round color="#e40137" @click="submit">确定</van-button>
    </div>
  </div>
</template>

<script>
import { getAuCode, getAuLogin } from '@/api/login.js'
import { setLocal } from '@/utils/local.js'
export default {
  data () {
    const validatorMobile = value => {
      return /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/.test(
        value
      )
    }
    return {
      rules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'onBlur' },
          {
            validator: validatorMobile,
            message: '请输入正确的手机号',
            trigger: 'onBlur'
          }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'onBlur' },
          {
            validator: value => {
              return /^\d{4}$/.test(value)
            },
            message: '请输入正确的验证码',
            trigger: 'onBlur'
          }
        ]
      },
      form: {
        mobile: '',
        code: ''
      },
      tip: '获取验证码',
      send_flag: false
    }
  },
  methods: {
    getSMSCode () {
      this.$refs.form
        .validate('mobile')
        .then(() => {
          if (this.send_flag === false) {
            this.send_flag = true
            let time = 59
            this.tip = `${time} 秒`
            getAuCode({ mobile: this.form.mobile })
              .then(res => {
                this.$toast.success(res.data.data)
                const timerId = setInterval(() => {
                  if (time > 1) {
                    time--
                    this.tip = `${time} 秒`
                  } else {
                    clearInterval(timerId)
                    this.tip = '获取验证码'
                    this.send_flag = false
                  }
                }, 1000)
              })
              .catch(error => {
                console.log(error)
                this.send_flag = false
                this.tip = '获取验证码'
              })
          }
        })
        .catch(() => {
          this.$toast.fail('验证失败')
        })
    },
    submit () {
      this.$refs.form
        .validate()
        .then(() => {
          this.$toast.success('验证成功')
          getAuLogin(this.form)
            .then(res => {
              setLocal('token', res.data.data.jwt)
            })
            .catch(error => {
              console.log(error)
            })
        })
        .catch(() => {
          this.$toast.success('验证失败')
        })
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  height: 100%;

  .f44 {
    font-size: 44px;
  }
  .content {
    margin-top: 50px;
    padding: 0 15px;
    .title {
      font-size: 18px;
      font-family: PingFangSC, PingFangSC-Semibold;
      font-weight: 600;
      text-align: left;
      color: #222222;
      line-height: 25px;
      letter-spacing: 0px;
    }
    .form {
      margin-top: 65px;
      margin-bottom: 44px;

      .code {
        display: inline-block;
        width: 80px;
        position: relative;
        font-size: 16px;
        font-family: PingFangSC, PingFangSC-Regular;
        color: #00b8d4;
        line-height: 22.5px;
        letter-spacing: 0px;
        text-align: center;
      }
      .red {
        color: red;
      }
      .code::before {
        position: absolute;
        content: '';
        border-left: 1px solid #ebedf0;
        left: -15px;
        top: 0px;
        bottom: 0px;
        transform: scaleX(0.5);
      }
    }
    .tip {
      margin-top: 2px;
      font-size: 12px;
      font-family: PingFangSC, PingFangSC-Regular;
      color: #181a39;
      line-height: 33px;
      letter-spacing: 0px;
      .pro-link {
        color: #00b8d4;
      }
    }
  }
}
</style>

<style lang="less">
.login {
  .van-field__control {
    padding-left: 10px;
  }
}
</style>
