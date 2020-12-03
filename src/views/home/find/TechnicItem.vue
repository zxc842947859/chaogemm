<template>
  <div class="technic-item" @click="goInfo">
    <div class="left">
      <div class="title van-multi-ellipsis--l2">
        {{ info.title }}
      </div>
      <div class="bottom">
        <div class="b1">{{ info.created_at | formatTime }}</div>
        <i class="iconfont b2">&#xe644;</i>
        <span class="b3">{{ info.read }}</span>
        <i class="iconfont b4">&#xe638;</i>
        <span class="b5">{{ info.star }}</span>
      </div>
    </div>
    <img v-if="info.cover" class="right" :src="$baseURL + info.cover" alt="" />
  </div>
</template>

<script>
// import moment from 'moment'
export default {
  props: {
    info: {
      type: Object
    }
  },
  filters: {
    // formatTime (date) {
    //   const date1 = moment(date)
    //   let _diff = moment().diff(date1, 'S')
    //   let result = '刚刚'
    //   if (_diff > 60) {
    //     _diff = moment().diff(date1, 'm')
    //     result = _diff + '分前'
    //     if (_diff > 60) {
    //       _diff = moment().diff(date1, 'h')
    //       result = _diff + '小时前'
    //       if (_diff > 24) {
    //         _diff = moment().diff(date1, 'd')
    //         result = _diff + '天前'
    //         if (_diff > 31) {
    //           _diff = moment().diff(date1, 'M')
    //           result = _diff + '月前'
    //           if (_diff > 12) {
    //             _diff = moment().diff(date1, 'Y')
    //             result = _diff + '年前'
    //           }
    //         }
    //       }
    //     }
    //   }
    //   return result
    // }
  },

  methods: {
    goInfo () {
      this.$router.push(
        `/home/technicInfo/'${this.info.id}?backPath=${this.$route.fullPath}`
      )
    }
  }
}
</script>

<style lang="less" scoped>
.technic-item {
  background-color: #fff;
  padding: 19px @p15;
  display: flex;
  justify-content: space-between;
  .left {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;
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
      align-items: center;
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
        margin: 0px 0px 0px 8px;
        width: 35px;
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
    border-radius: 4px;
    margin-left: 15px;
  }
}
</style>
