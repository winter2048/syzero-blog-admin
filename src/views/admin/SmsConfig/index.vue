<template>
  <d2-container>
    <el-tabs v-model="activeName"
             type="card"
             @tab-click="handleClick">
      <el-tab-pane label="阿里短信"
                   name="first">
        <aliyun-setting></aliyun-setting>
      </el-tab-pane>
      <el-tab-pane label="腾讯短信"
                   name="tengxun">

      </el-tab-pane>
    </el-tabs>
  </d2-container>
</template>
<script>
import AliyunSetting from './AliyunSetting'

export default {
  name: 'SmsConfig',
  components: {
    AliyunSetting
  },
  data () {
    return {
      activeName: 'first',
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
    }
  }
}
</script>
