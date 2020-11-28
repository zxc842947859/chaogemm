<template>
  <div class="mine-info">
    <div class="content">
      <MineCell
        class="icon"
        title="头像"
        :value="userInfo.avatar"
        type="img"
      ></MineCell>
      <div class="middle">
        <MineCell title="昵称" :value="userInfo.nickname"></MineCell>
        <MineCell title="性别" :value="genderObj[userInfo.gender]"></MineCell>
        <MineCell
          title="地区"
          :value="area.city_list[userInfo.area]"
        ></MineCell>
        <MineCell title="个人简介" :value="userInfo.intro"></MineCell>
      </div>
      <van-button block color="#fff" class="logout">
        <template #default>
          <div class="logout-txt">
            退出登录
          </div>
        </template>
      </van-button>
    </div>
  </div>
</template>

<script>
import MineCell from './MineCell'
import { mapState } from 'vuex'
import area from '@/assets/js/area.js'
export default {
  components: {
    MineCell
  },
  computed: {
    ...mapState(['userInfo'])
  },
  data () {
    return {
      genderObj: {
        0: '未知',
        1: '男',
        2: '女'
      },
      area: area
    }
  }
}
</script>

<style lang="less" scope>
.mine-info {
  height: 100%;
  background: #f6f4f5;
  .content {
    padding: 19px @p15;
    .icon {
      border-radius: 8px;
    }
    .middle {
      margin-top: 10px;
      border-radius: 8px;
      overflow: hidden;
      margin-bottom: 10px;
    }
    .logout {
      border-radius: 8px;
      .logout-txt {
        font-size: 16px;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        text-align: left;
        color: #e40137;
        line-height: 23px;
        letter-spacing: 0px;
      }
    }
  }
}
</style>
