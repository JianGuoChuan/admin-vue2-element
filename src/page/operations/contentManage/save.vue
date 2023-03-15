<template>
  <el-drawer :with-header="false" :visible="showDrawer" size="600px" @close="cancel">
    <div class="drawer-content">
      <h3 class="h3-title">内容配置</h3>
      <el-form ref="form" :model="formData" label-width="80px">
        <el-form-item label="模块key" prop="ckey" :rules="requirRule">
          <el-input v-model="formData.ckey" placeholder="用于小程序端唯一键值识别，不可修改" :disabled="isEdit" autocomplete="off" />
        </el-form-item>
        <el-form-item label="模块名称" prop="cname" :rules="requirRule">
          <el-input v-model="formData.cname" autocomplete="off" />
        </el-form-item>

        <el-form-item label="模块内容">
          <item-list v-model="formData.itemList" />
        </el-form-item>

        <el-form-item label="备注">
          <el-input
            v-model="formData.ccomment"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="补充其他备注"
          />
        </el-form-item>
      </el-form>
      <div class="t-c">
        <el-button
          type="primary"
          :loading="loading"
          @click="submitForm()"
        >{{ loading ? '提交中 ...' : '保 存' }}</el-button>
        <el-button @click="cancelForm">取 消</el-button>
      </div>
    </div>
  </el-drawer>
</template>

<script>
import { tagList } from './config'
import { putForm, postForm } from '../../../utils/axios'
import itemList from './itemList'

export default {
  components: { itemList },
  props: {
    formData: {
      type: Object,
      default: function() {
        return {}
      }
    },
    showDrawer: Boolean,
    success: {
      type: Function,
      default: function() {}
    },
    cancel: {
      type: Function,
      default: function() {}
    }
  },
  data() {
    return {
      tagList,
      requirRule: [
       { required: true, message: '该项为必填项',trigger:'blur' }
      ],
      loading: false
      // formLabelWidth: '80px'
    }
  },
  computed: {
    isEdit() {
      return !!this.formData.cid
    }
  },
  created() {

  },
  methods: {
    cancelForm() {
      this.cancel()
    },
    submitForm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading = true
          const params = {
            ...this.formData
          }

          if (params.itemList && params.itemList.length > 0) {
            params.content = JSON.stringify(params.itemList)
            delete params.itemList
          } else {
            params.content = ''
          }
          // console.log('submit', this.formData)
          if (this.isEdit) {
            putForm('/api/content/edit', params, data => {
              // console.log(data)
              this.$message.success('修改成功')
              this.loading = false
              this.success()
            }, () => {
              this.loading = false
            })
          } else {
            postForm('/api/content/insert', params, data => {
              // console.log(data)
              this.$message.success('新增成功')
              this.loading = false
              this.success()
            }, () => {
              this.loading = false
            })
          }
        } else {
          return false
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
</style>
