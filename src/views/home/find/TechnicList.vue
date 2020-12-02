<template>
  <div class="technic-list">
    <CGNavBar path="/home/find" title="面试技巧"></CGNavBar>
    <van-search
      shape="round"
      :show-action="!!searchKeyWord"
      v-model="searchKeyWord"
      :input-align="bol ? 'left' : 'center'"
      :placeholder="bol ? '' : '请输入关键字'"
      @focus="bol = true"
      @blur="bol = false"
    >
      <template #left-icon>
        <div>
          <i class="iconfont " :class="{ position: !bol }">&#xe647;</i>
        </div>
      </template>
    </van-search>
  </div>
</template>

<script>
export default {
  data () {
    return {
      bol: false,
      searchKeyWord: '', // 搜索关键字
      inputAlign: 'center'
    }
  }
}
</script>

<style lang="less" scoped>
.technic-list {
  .van-field {
    .iconfont {
      color: #ababb4;
      position: relative;
      left: 0;
    }
    .position {
      position: absolute;
      left: 50%;
      margin-left: -65px;
    }
  }
}
</style>
