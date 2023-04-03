<template>
  <el-form ref="form"
           :model="form"
           label-width="170px"
           style="width:70%">
    <el-form-item label="站点图标">
      <el-upload class="avatar-uploader"
                 :action="`${$baseApiUrl}Upload`"
                 :show-file-list="false"
                 :on-success="handleAvatarSuccessIcon"
                 :before-upload="beforeAvatarUpload"
                 :headers="{
          Authorization: token
        }">
        <img v-if="form.blogIcon"
             :src="form.blogIcon"
             class="avatar" />
        <i v-else
           class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-form-item>
    <el-form-item label="站点标题">
      <el-input v-model="form.blogName"></el-input>
    </el-form-item>
    <el-form-item label="站点副标题">
      <el-input v-model="form.blogInfo"></el-input>
    </el-form-item>
    <el-form-item label="站点地址">
      <el-input v-model="form.blogUrl"></el-input>
    </el-form-item>
    <el-form-item label="每页文章的数量">
      <el-input v-model="form.indexLogNum"></el-input>
    </el-form-item>
    <el-form-item label="版权说明">
      <el-input type="textarea"
                :autosize="{ minRows: 4, maxRows: 10 }"
                placeholder="可以填入网站统计、备案号等内容。"
                v-model="form.footerInfo"></el-input>
    </el-form-item>
    <el-form-item label="允许上传文件类型">
      <el-input v-model="form.attType"></el-input>
    </el-form-item>
    <el-form-item label="允许上传文件大小(MB)">
      <el-input v-model="form.attMaxSize"></el-input>
    </el-form-item>
    <el-form-item label="关闭网站">
      <el-switch v-model="form.isClose"></el-switch>
    </el-form-item>
    <el-form-item>
      <el-button type="primary"
                 @click="onSubmit">保存设置</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { GetBasicsSetting, UpdataBasicsSetting } from '../../../api/Config.js'
import util from '@/libs/util'
export default {
  data () {
    return {
      activeName: 'first',
      form: {
        blogIcon: '',
        blogName: '',
        blogInfo: '',
        blogUrl: '',
        indexLogNum: 10,
        footerInfo: '',
        attType: 'jpg/png/jpge',
        attMaxSize: 2048,
        isClose: false
      },
      token: util.cookies.get('token')
    }
  },
  created () {
    GetBasicsSetting().then(res => {
      this.form = res
    })
  },
  methods: {
    handleAvatarSuccessIcon (res, file) {
      this.form.blogIcon = res.data
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG/PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }

      return isJPG && isLt2M
    },
    onSubmit () {
      UpdataBasicsSetting(this.form).then(res => {
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

<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
