<template>
  <div class="mine-info">
    <CGNavBar title="我的资料" path="/home/mine"></CGNavBar>
    <div class="content">
      <MineCell
        class="icon"
        title="头像"
        :value="userInfo.avatar"
        type="img"
      ></MineCell>
      <div class="middle">
        <MineCell title="昵称" :value="userInfo.nickname"></MineCell>
        <MineCell
          title="性别"
          :value="genderObj[userInfo.gender]"
          @click.native="showGenderUpdateBox = true"
        ></MineCell>
        <MineCell
          title="地区"
          :value="area.city_list[userInfo.area]"
        ></MineCell>
        <MineCell title="个人简介" :value="userInfo.intro"></MineCell>
      </div>
      <van-button block color="#fff" class="logout" @click="logout">
        <template #default>
          <div class="logout-txt">
            退出登录
          </div>
        </template>
      </van-button>
    </div>
    <van-popup v-model="showGenderUpdateBox" position="bottom">
      <van-picker
        title="修改性别"
        show-toolbar
        :default-index="userInfo.gender"
        :columns="Object.values(genderObj)"
        @confirm="onConfirm"
        @cancel="showGenderUpdateBox = false"
      />
    </van-popup>
  </div>
</template>

<script>
import MineCell from './MineCell'
import { mapState } from 'vuex'
import area from '@/assets/js/area.js'
import { removeLocal } from '@/utils/local.js'
import { auEdit } from '@/api/mine.js'
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
      area,
      showGenderUpdateBox: false
    }
  },
  methods: {
    logout () {
      this.$dialog
        .confirm({
          title: '温馨提示',
          message: '您确定要退出登录吗?'
        })
        .then(() => {
          removeLocal('token') // 删除token
          this.$store.commit('setLoginState', false) // 修改登录状态
          this.$router.push('/login') // 跳转登录界面
        })
        .catch(() => {})
    },
    onConfirm (value, index) {
      this.showGenderUpdateBox = false
      this.userInfo.gender = index
      auEdit({ gender: index }).then(() => {
        this.$toast.success('修改成功')
      })
    }
  }
}
</script>

<style lang="less" scope>
.mine-info {
  min-height: 100%;
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
