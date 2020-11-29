<template>
  <div class="mine-info-edit">
    <CGNavBar
      path="/home/mineInfo"
      :title="navTitleObj[type]"
      :right="saveStr"
      @navRightSave="navRightSave"
    ></CGNavBar>
    <div class="content">
      <van-field
        v-if="type !== 'avatar'"
        v-model="inputValue"
        class="field"
        :type="type !== 'intro' ? 'text' : 'textarea'"
      ></van-field>
      <CGUploadFile v-else v-model="inputValue"></CGUploadFile>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { auEdit } from '@/api/mine.js'
export default {
  data () {
    return {
      inputValue: '',
      saveStr: '',
      type: this.$route.query.type,
      navTitleObj: {
        nickname: '修改昵称',
        intro: '修改个人简介',
        position: '修改职位',
        avatar: '上传头像'
      }
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  created () {
    // 修改前用户信息显示
    this.inputValue = this.userInfo[this.type]
  },
  methods: {
    async navRightSave () {
      // 弹出加载中
      this.$toast.loading()
      // 提交修改请求
      await auEdit({ [this.type]: this.inputValue })
      // 提示修改成功
      this.$toast.success('资料修改成功')
      // 异步更新vuex中用户信息
      await this.$store.dispatch('refreshUserInfo')
      this.$router.push(
        this.type !== 'position' ? '/home/mineInfo' : '/home/mine'
      )
    }
  },
  watch: {
    // 根据用户是否修改及是否为空 动态显示导航条右上角保存
    inputValue (newVal) {
      this.saveStr = newVal && newVal !== this.userInfo[this.type] ? '保存' : ''
    }
  }
}
</script>

<style lang="less" scoped>
.mine-info-edit {
  min-height: 100%;
  .content {
    text-align: center;
    padding: 20px @p15;
    .field {
      border-radius: 8px;
      background: #f6f4f5;
    }
  }
}
</style>
