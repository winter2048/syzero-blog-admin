<template>
  <el-form ref="form"
           :model="form"
           label-width="170px"
           style="width:70%">
    <el-row>
      <el-col :span="12">
        <el-form-item label="首页Banner">
          <el-upload class="avatar-uploader"
                     :action="`${$baseApiUrl}Upload`"
                     :show-file-list="false"
                     :on-success="handleAvatarSuccessBanner"
                     :before-upload="beforeAvatarUpload"
                     :headers="{
          Authorization: token
        }">
            <img v-if="form.otherBanner"
                 :src="form.otherBanner"
                 class="avatar" />
            <i v-else
               class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="介绍Banner">
          <el-upload class="avatar-uploader"
                     :action="`${$baseApiUrl}Upload`"
                     :show-file-list="false"
                     :on-success="handleAvatarSuccessRightImg"
                     :before-upload="beforeAvatarUpload"
                     :headers="{
          Authorization: token
        }">
            <img v-if="form.otherRightImg"
                 :src="form.otherRightImg"
                 class="avatar" />
            <i v-else
               class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="登录Banner">
          <el-upload class="avatar-uploader"
                     :action="`${$baseApiUrl}Upload`"
                     :show-file-list="false"
                     :on-success="handleAvatarSuccessLoginImg"
                     :before-upload="beforeAvatarUpload"
                     :headers="{
          Authorization: token
        }">
            <img v-if="form.otherLoginImg"
                 :src="form.otherLoginImg"
                 class="avatar" />
            <i v-else
               class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item label="Github">
      <el-input v-model="form.otherGithub"></el-input>
    </el-form-item>
    <el-form-item label="QQ">
      <el-input v-model="form.otherQQ"></el-input>
    </el-form-item>
    <el-form-item label="微博">
      <el-input v-model="form.otherWeibo"></el-input>
    </el-form-item>
    <el-form-item label="微信">
      <el-input v-model="form.otherWx"></el-input>
    </el-form-item>
    <el-form-item label="CSDN">
      <el-input v-model="form.otherCsdn"></el-input>
    </el-form-item>
    <el-form-item label="简历">
      <el-input v-model="form.otherJianli"></el-input>
    </el-form-item>
    <el-form-item label="更多">
      <el-input v-model="form.otherMore"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary"
                 @click="onSubmit">保存设置</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { GetOtherSetting, UpdataOtherSetting } from '../../../api/Config.js'
import util from '@/libs/util'
export default {
  data () {
    return {
      activeName: 'first',
      form: {
        otherBanner: '',
        otherRightImg: '',
        otherLoginImg: '',
        otherGithub: '',
        otherQQ: '',
        otherWeibo: '',
        otherWx: '',
        otherCsdn: '',
        otherJianli: '',
        otherMore: ''
      },
      token: util.cookies.get('token')
    }
  },
  created () {
    GetOtherSetting().then(res => {
      this.form = res
    })
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
    },
    handleAvatarSuccessBanner (res, file) {
      this.form.otherBanner = res.data
    },
    handleAvatarSuccessRightImg (res, file) {
      this.form.otherRightImg = res.data
    },
    handleAvatarSuccessLoginImg (res, file) {
      this.form.otherLoginImg = res.data
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
      UpdataOtherSetting(this.form).then(res => {
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
  width: 350px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 350px;
  height: 178px;
  display: block;
}
</style>
