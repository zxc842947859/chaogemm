<template>
  <div class="mine-info-edit">
    <CGNavBar
      path="/home/mineInfo"
      title="修改昵称"
      :right="saveStr"
      :rightEvent="saveNickInfo"
    ></CGNavBar>
    <div class="content">
      <van-field v-model="nickname" class="field"></van-field>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { auEdit } from '@/api/mine.js'
export default {
  data () {
    return {
      nickname: '',
      saveStr: ''
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  created () {
    this.nickname = this.userInfo.nickname
  },
  methods: {
    async saveNickInfo () {
      // 弹出加载中
      this.$toast.loading()
      // 提交修改请求
      await auEdit({ nickname: this.nickname })
      // 提示修改成功
      this.$toast.success('资料修改成功')
      // 异步更新vuex中用户信息
      await this.$store.dispatch('refreshUserInfo')
      this.$router.push('/home/mineInfo')
    }
  },
  watch: {
    nickname (newVal) {
      this.saveStr = newVal && newVal !== this.userInfo.nickname ? '保存' : ''
    }
  }
}
</script>

<style lang="less" scoped>
.mine-info-edit {
  min-height: 100%;
  .content {
    padding: 20px @p15;
    .field {
      border-radius: 8px;
      background: #f6f4f5;
    }
  }
}
</style>
