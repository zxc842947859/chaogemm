<template>
  <van-uploader
    class="uploader"
    v-model="fileList"
    :before-read="beforeRead"
    :after-read="afterRead"
    max-count="1"
    @delete="deleteAvatarId"
  ></van-uploader>
</template>

<script>
import { uploadIcon } from '@/api/mine.js'
export default {
  name: 'CGUploadFile',
  props: ['value'],
  data () {
    return {
      fileList: [{ url: this.$baseURL + this.value }]
    }
  },
  methods: {
    // 读取文件前
    beforeRead (file) {
      // 指定允许上传文件类型
      const isType = ['image/png', 'image/jpeg', 'image/gif'].includes(
        file.type
      )
      // 指定上传文件上限
      const isLimit = file.size / 1024 / 1024 < 2
      if (!isType) {
        this.$toast.fail('只能上传png或jpeg')
      } else if (!isLimit) {
        this.$toast.fail('上传的图片不能大于2M')
      }
      // 返回true 允许文件读取
      return isType && isLimit
    },
    // 文件读取后
    async afterRead (fileRes) {
      // 指定上传组件上传样式
      this.fileList[0].status = 'uploading'
      // 将文件信息包装到formData中
      const formData = new FormData()
      formData.append('files', fileRes.file)
      // 上传
      const res2 = await uploadIcon(formData)
      this.fileList[0].status = 'done'
      // 回传上传后的头像id给父组件
      this.$emit('input', res2.data.data[0].id)
    },
    // 删除预览图片
    deleteAvatarId () {
      // 让父组件清空头像id
      this.$emit('input')
    }
  }
}
</script>

<style lang="less" scoped></style>
