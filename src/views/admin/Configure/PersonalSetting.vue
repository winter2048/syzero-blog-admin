<template>
  <el-form ref="form"
           :model="form"
           label-width="170px"
           style="width:70%">
    <el-form-item label="头像">
      <el-upload class="avatar-uploader"
                 :action="`${$baseApiUrl}User/ChangeAvatar`"
                 :show-file-list="false"
                 :on-success="handleAvatarSuccess"
                 :before-upload="beforeAvatarUpload"
                 :headers="{
          Authorization: token
        }">
        <img v-if="form.pictureUrl"
             :src="form.pictureUrl"
             class="avatar" />
        <i v-else
           class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-form-item>
    <el-form-item label="昵称">
      <el-input v-model="form.nickName"></el-input>
    </el-form-item>
    <el-form-item label="邮箱">
      <el-input v-model="form.mail"></el-input>
    </el-form-item>
    <el-form-item label="个人描述">
      <el-input type="textarea"
                :autosize="{ minRows: 4, maxRows: 10 }"
                v-model="form.description"></el-input>
    </el-form-item>
    <el-form-item label="登录名">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="新密码">
      <el-input v-model="form.newPassword"
                placeholder="不小于6位，不修改请留空"></el-input>
    </el-form-item>
    <el-form-item label="再输入一次新密码">
      <el-input v-model="form.newRepeatPassword"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary"
                 @click="onSubmit">保存设置</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { GetUserInfo, UpdataUserInfo } from '../../../api/User.js'
import util from '@/libs/util'
export default {
  data () {
    return {
      activeName: 'first',
      form: {
        nickName: '',
        mail: '',
        description: '',
        name: '',
        newPassword: '',
        newRepeatPassword: '',
        pictureUrl: ''
      },
      token: util.cookies.get('token')
    }
  },
  created () {
    GetUserInfo().then(res => {
      res.newPassword = ''
      res.newRepeatPassword = ''

      this.form = res
    })
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
    },
    handleAvatarSuccess (res, file) {
      console.log(res)
      this.form.pictureUrl = URL.createObjectURL(file.raw)
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
      UpdataUserInfo(this.form).then(res => {
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
