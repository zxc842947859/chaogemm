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
        <MineCell
          title="昵称"
          :value="userInfo.nickname"
          @click.native="$router.push('/home/infoEdit?type=nickname')"
        ></MineCell>
        <MineCell
          title="性别"
          :value="genderObj[userInfo.gender]"
          @click.native="showGenderUpdateBox = true"
        ></MineCell>
        <MineCell
          title="地区"
          :value="area.city_list[userInfo.area]"
          @click.native="showCity = true"
        ></MineCell>
        <MineCell
          title="个人简介"
          :value="userInfo.intro"
          @click.native="$router.push('/home/infoEdit?type=intro')"
        ></MineCell>
      </div>
      <van-button block color="#fff" class="logout" @click="logout">
        <template #default>
          <div class="logout-txt">
            退出登录
          </div>
        </template>
      </van-button>
    </div>
    <!-- van-popup 弹出层
      一般配合picker 和 城市选择使用
      v-model="Boolean" 是否弹出
      position="显示位置"
     -->

    <!-- van-picker 数据滚动选择
        title="toolbar中的标题"
        default-index="默认选择的数据和columns中的元素对应"
        columns="要选择的数组数据"
        @cancel="取消事件"
        @confirm="确定事件"
     -->
    <van-popup v-model="showGenderUpdateBox" position="bottom">
      <van-picker
        title="修改性别"
        show-toolbar
        :default-index="userInfo.gender"
        :columns="Object.values(genderObj)"
        @confirm="genderConfirm"
        @cancel="showGenderUpdateBox = false"
      />
    </van-popup>
    <!-- 城市选择
    van-area
      title: 中间标题
      https://raw.githubusercontent.com/youzan/vant/dev/src/area/demo/area.js
      area-list: 我们导入的area.js (传数据省市区数据)
      value: 默认选择的城市(城市code)
      columns-num: (3:省市区, 2:省市, 1:省)
      @cancel="取消事件"
      @confirm="确定事件"
     -->
    <van-popup v-model="showCity" position="bottom">
      <van-area
        title="修改地区"
        :area-list="area"
        columns-num="2"
        :value="userInfo.area"
        @cancel="showCity = false"
        @confirm="cityConfirm"
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
      showGenderUpdateBox: false,
      showCity: false
    }
  },
  methods: {
    // 退出登录
    async logout () {
      try {
        await this.$dialog.confirm({
          title: '温馨提示',
          message: '您确定要退出登录吗?'
        })
        removeLocal('token') // 删除token
        this.$store.commit('setLoginState', false) // 修改登录状态
        this.$router.push('/login') // 跳转登录界面
      } catch {}
    },
    async updateUserInfo (data) {
      // 弹出加载中
      this.$toast.loading()
      // 提交修改请求
      await auEdit(data)
      // 提示修改成功
      this.$toast.success('资料修改成功')
      // 异步更新vuex中用户信息
      this.$store.dispatch('refreshUserInfo')
    },
    genderConfirm (value, index) {
      // 关闭底部弹框
      this.showGenderUpdateBox = false
      // 修改用户性别本地数据
      this.userInfo.gender = index
      // 更新用户数据
      this.updateUserInfo({ gender: index })
    },
    cityConfirm (value, index) {
      this.showCity = false
      this.userInfo.area = value[1].code
      // 更新用户数据
      this.updateUserInfo({ area: value[1].code })
    }
    // goInfoEdit () {
    //   this.$router.push('/home/infoEdit')
    // }
  }
}
</script>

<style lang="less" scoped>
.mine-info {
  background: #f6f4f5;
  height: 100%;
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
