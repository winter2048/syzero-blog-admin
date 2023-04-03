<template>
  <d2-container>
    <el-tabs v-model="activeName"
             type="card"
             @tab-click="handleClick">
      <el-tab-pane label="基础设置"
                   name="first">
        <basics-setting></basics-setting>
      </el-tab-pane>
      <el-tab-pane label="SEO设置"
                   name="second">
        <seo-setting></seo-setting>
      </el-tab-pane>
      <el-tab-pane label="个人设置"
                   name="third">
        <personal-setting></personal-setting>
      </el-tab-pane>
      <el-tab-pane label="其他设置"
                   name="other">
        <other-setting></other-setting>
      </el-tab-pane>
    </el-tabs>
  </d2-container>
</template>
<script>
import BasicsSetting from './BasicsSetting'
import SeoSetting from './SeoSetting'
import PersonalSetting from './PersonalSetting'
import OtherSetting from './OtherSetting'
export default {
  name: 'Configure',
  components: {
    BasicsSetting,
    SeoSetting,
    PersonalSetting,
    OtherSetting
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
