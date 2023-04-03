<template>
  <el-form ref="form" :model="form" label-width="170px" style="width:70%">
    <el-form-item label="站点浏览器标题">
      <el-input v-model="form.seoTitle"></el-input>
    </el-form-item>
    <el-form-item label="站点关键字">
      <el-input v-model="form.seoKeywords"></el-input>
    </el-form-item>
    <el-form-item label="站点浏览器描述">
      <el-input
        type="textarea"
        :autosize="{ minRows: 4, maxRows: 10 }"
        v-model="form.seoDescription"
      ></el-input>
    </el-form-item>
    <el-form-item label="文章浏览器标题方案">
      <el-select v-model="form.seoTitleStyle" placeholder="请选择">
        <el-option label="文章标题" :value="0"></el-option>
        <el-option label="文章标题 - 站点标题" :value="1"></el-option>
        <el-option label="文章标题 - 站点浏览器标题" :value="2"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="onSubmit">保存设置</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { GetSeoSetting, UpdataSeoSetting } from '../../../api/Config.js'
export default {
  data () {
    return {
      activeName: 'first',
      form: {
        seoTitle: '',
        seoKeywords: '',
        seoDescription: '',
        seoTitleStyle: 0
      }
    }
  },
  created () {
    GetSeoSetting().then(res => {
      this.form = res
    })
  },
  methods: {
    onSubmit () {
      UpdataSeoSetting(this.form).then(res => {
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
