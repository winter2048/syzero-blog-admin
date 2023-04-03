<template>
  <el-form ref="form"
           :model="form"
           label-width="170px"
           style="width:70%">
    <el-form-item label="AccessKeyID">
      <el-input v-model="form.accessKeyID"></el-input>
    </el-form-item>
    <el-form-item label="AccessKeySecret">
      <el-input v-model="form.accessKeySecret"></el-input>
    </el-form-item>
    <el-form-item label="签名">
      <el-input v-model="form.signName"></el-input>
    </el-form-item>
    <el-form-item label="注册模板Code">
      <el-input v-model="form.registerCode"></el-input>
    </el-form-item>
    <el-form-item label="登录模板Code">
      <el-input v-model="form.signInCode"></el-input>
    </el-form-item>
    <el-form-item label="找回密码模板Code">
      <el-input v-model="form.retrieveCode"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary"
                 @click="onSubmit">保存设置</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { GetAliyunSmsConfig, UpdataAliyunSmsConfig } from '../../../api/Config.js'
export default {
  data () {
    return {
      activeName: 'first',
      form: {
        blogName: '',
        blogInfo: '',
        blogUrl: '',
        indexLogNum: 10,
        footerInfo: '',
        attType: 'jpg/png/jpge',
        attMaxSize: 2048,
        isClose: false
      }
    }
  },
  created () {
    GetAliyunSmsConfig().then(res => {
      this.form = res
    })
  },
  methods: {
    onSubmit () {
      UpdataAliyunSmsConfig(this.form).then(res => {
        if (res) {
          this.$message({
            message: '保存成功',
            type: 'success'
          })
        } else {
          this.$message({
            message: '保存失败',
            type: 'warning'
          })
        }
      })
    }
  }
}
</script>
