<template>
  <div class="login">
    <van-nav-bar>
      <template #left>
        <i class="iconfont f44">&#xe637;</i>
      </template>
    </van-nav-bar>
    <div class="content">
      <h3 class="title">您好,请登录</h3>
      <van-form class="form">
        <van-field placeholder="请输入手机号">
          <template #left-icon>
            <i class="iconfont">&#xe60b;</i>
          </template>
        </van-field>
        <van-field placeholder="请输入验证码">
          <template #left-icon>
            <i class="iconfont">&#xe60c;</i>
          </template>
          <template #button>
            <span class="code">获取验证码</span>
          </template>
        </van-field>
        <div class="tip">
          登录即同意<span class="pro-link">《用户使用协议》</span>和<span
            class="pro-link"
            >《隐私协议》</span
          >
        </div>
      </van-form>
      <van-button block round color="#e40137">确定</van-button>
    </div>
  </div>
</template>

<script>
export default {}
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
        position: relative;
        font-size: 16px;
        font-family: PingFangSC, PingFangSC-Regular;
        color: #00b8d4;
        line-height: 22.5px;
        letter-spacing: 0px;
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
