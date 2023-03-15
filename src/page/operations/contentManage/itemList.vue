<template>
  <div class="inp-itemList">
    <div v-for=" (item, index) in value " :key="index" class="item">
      <div class="img">
        <ImgUpload v-model="item.url" />
      </div>

      <div class="text">
        <el-input v-model="item.title" placeholder="标题" autocomplete="off" />
        <el-input v-model="item.link" placeholder="链接" autocomplete="off" />
        <el-input v-model="item.desc" placeholder="描述" autocomplete="off" />
      </div>

      <div class="icons">
        <el-button v-if="index > 0" icon="el-icon-top" type="text" @click="upItem(index)" />
        <el-button v-if="index < value.length-1" icon="el-icon-bottom" type="text" @click="downItem(index)" />
        <el-button icon="el-icon-close" type="text" @click="handleDelete(index)" />
      </div>
    </div>

    <el-button type="text" @click="handleAdd">新增内容</el-button>
  </div>
</template>

<script>
import ImgUpload from '@/components/ImgUpload/index'

export default {
  name: 'ItemList',
  components: { ImgUpload },
  props: {
    value: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {}
  },
  mounted() {},
  methods: {
    handleAvatarSuccess(res, file) {
      // console.log(res)
      // this.imageUrl = URL.createObjectURL(file.raw)
      this.imageUrl = res
      this.$emit('input', this.imageUrl)
    },
    handleAdd() {
      const newList = this.value.map(item => ({ ...item }))
      newList.push({
        url: '',
        title: '',
        link: '',
        desc: ''
      })
      this.$emit('input', newList)
    },
    handleDelete(index) {
      const newList = this.value.map(item => ({ ...item }))
      newList.splice(index, 1)
      this.$emit('input', newList)
    },
    upItem(index) {
      // 上移一行
      if (index > 0) {
        const tempList = this.value.map(item => ({ ...item }))
        // 交换两个值
        const temp = tempList[index]
        tempList[index] = tempList[index - 1]
        tempList[index - 1] = temp
        this.$emit('input', tempList)
      }
    },
    downItem(index) {
      const { length } = this.value
      if (index < length - 1) {
        const tempList = this.value.map(item => ({ ...item }))
        // 交换两个
        const temp = tempList[index]
        tempList[index] = tempList[index + 1]
        tempList[index + 1] = temp
        this.$emit('input', tempList)
      }
    }
  }
}
</script>

<style lang="less">
.inp-itemList {
  text-align: center;

  .item {
    display: flex;
    align-items: center;

    .img {
      width: 122px;

      .avatar-uploader{
        height: 123px;
      }
    }

    .text {
      flex: 1;
      padding: 0 10px;

      .el-input{
        margin-bottom: 1px;
      }
    }
    .icons {
      width: 40px;
      text-align: center;

      .el-button.el-button--text{
        display: block;
        margin: 0 auto;
      }
    }
  }
}
</style>
