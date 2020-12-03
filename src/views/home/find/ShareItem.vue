<template>
  <van-cell class="share-item" @click="goInfo">
    <div class="title" v-html="info.title"></div>
    <div class="content van-multi-ellipsis--l2">
      {{ info.content }}
    </div>
    <div class="bottom">
      <div class="user">
        <img
          v-if="info.author.avatar"
          class="icon"
          :src="$baseURL + info.author.avatar"
          alt=""
        />
        <img v-else class="icon" src="@/assets/logo.png" alt="" />
        <span class="nickname">{{ info.author.nickname }}</span>
      </div>
      <div class="b1">{{ info.created_at | formatTime }}</div>
      <i class="iconfont b2">&#xe65b;</i>
      <span class="b3">{{ info.read }}</span>
      <i class="iconfont b4">&#xe638;</i>
      <span class="b5">{{ info.star }}</span>
    </div>
  </van-cell>
</template>

<script>
export default {
  props: {
    info: {
      type: Object
    }
  },
  methods: {
    goInfo () {
      this.$router.push(
        '/home/shareInfo/' + this.info.id + '?backPath=' + this.$route.fullPath
      )
    }
  }
}
</script>

<style lang="less" scoped>
.share-item {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  .title {
    margin-top: 10px;
    font-size: 16px;
    font-family: PingFangSC, PingFangSC-Medium;
    font-weight: 500;
    text-align: left;
    color: #181a39;
    line-height: 23px;
    letter-spacing: 0px;
  }
  .content {
    margin: 12px 0px;
    font-size: 13px;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
    text-align: left;
    color: #545671;
    line-height: 19px;
    letter-spacing: 0px;
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
    align-items: center;
    margin-bottom: 10px;
    .user {
      flex: 1;
      .icon {
        width: 22px;
        height: 22px;
        border-radius: 50%;
        object-fit: contain;
        vertical-align: middle;
        margin-right: 10px;
      }
      .nickname {
        color: #545671;
      }
    }
    .b2,
    .b4 {
      margin: 0px 8px 0px 18px;
    }
  }
}
</style>
