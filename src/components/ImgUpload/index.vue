<template>
  <el-upload
    class="avatar-uploader"
    :action="action"
    :headers="{
      Authorization: token
    }"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload"
    accept="image/png, image/jpeg"
  >
    <img v-if="imageUrl" :src="imageUrl" class="avatar">
    <i v-else class="el-icon-plus avatar-uploader-icon" />
  </el-upload>
</template>

<script>
import { getToken } from '@/utils/auth'

export default {
  name: 'ImgUpload',
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      imageUrl: this.value,
      token: '',
      action: process.env.VUE_APP_BASE_API+'/api/util/uploadFile'
    }
  },
  watch: {
    value: {
      immediate: true, // 这句重要
      handler(val) {
        this.imageUrl = val
      }
    }
  },
  mounted() {
    // console.log('mounted')
    this.token = getToken('Token')
  },
  methods: {
    handleAvatarSuccess(res, file) {
      // console.log(res)
      // this.imageUrl = URL.createObjectURL(file.raw)
      this.imageUrl = res
      this.$emit('input', this.imageUrl)
    },
    beforeAvatarUpload(file) {
      const isIMG = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt1M = file.size / 1024 / 1024 < 1

      if (!isIMG) {
        this.$message.error('上传图片只能是 JPG 格式!')
      }
      if (!isLt1M) {
        this.$message.error('上传图片大小不能超过 1MB!')
      }
      return isIMG && isLt1M
    }
  }
}
</script>

<style>
.avatar-uploader{
  overflow: hidden;
  width: 120px;
  height: 120px;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
}
.avatar-uploader .el-upload {

  cursor: pointer;
  position: relative;
  overflow: hidden;
  height: 120px;
  display: table-cell;
  vertical-align: middle;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
}
.avatar {
  width: 100%;
  /* height: 120px; */
  display: block;
}
</style>
