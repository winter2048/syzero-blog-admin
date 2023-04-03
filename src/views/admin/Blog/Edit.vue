<template>
  <d2-container>
    <template slot="header">{{ data.title }}</template>
    <el-row>
      <el-col :span="18">
        <!-- Form -->
        <el-form :model="data.form">
          <el-form-item label="标题"
                        :label-width="data.formLabelWidth">
            <el-input v-model="data.form.title"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="内容"
                        :label-width="data.formLabelWidth">
            <mavon-mde v-model="data.form.content" />
          </el-form-item>
          <el-form-item label="摘要"
                        :label-width="data.formLabelWidth">
            <mavon-mde v-model="data.form.describe" />
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="6">
        <el-form :model="data.form">
          <el-form-item label="分类"
                        :label-width="data.formLabelWidth">
            <el-cascader :options="data.cateOptions"
                         :props="data.cateProps"
                         v-model="data.form.categoryId"
                         clearable
                         class="sy-select"></el-cascader>
          </el-form-item>
          <el-form-item label="状态"
                        :label-width="data.formLabelWidth">
            <el-select v-model="data.form.status"
                       placeholder="请选择"
                       class="sy-select">
              <el-option v-for="item in data.stateOptions"
                         :key="item.id"
                         :label="item.name"
                         :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="模板"
                        :label-width="data.formLabelWidth">
            <el-input v-model="data.form.template"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="标签"
                        :label-width="data.formLabelWidth">
            <el-select v-model="data.form.tags"
                       multiple
                       placeholder="请选择"
                       class="sy-select"
                       filterable>
              <el-option v-for="item in data.tagOptions"
                         :key="item.id"
                         :label="item.name"
                         :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="发布时间"
                        :label-width="data.formLabelWidth">
            <el-date-picker v-model="data.form.createTime"
                            type="datetime"
                            placeholder="选择日期时间"
                            value-format="yyyy-MM-dd HH:mm:ss">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="别名"
                        :label-width="data.formLabelWidth">
            <el-input v-model="data.form.alias"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="排序"
                        :label-width="data.formLabelWidth">
            <el-input-number v-model="data.form.order"
                             :min="0"></el-input-number>
          </el-form-item>
          <el-form-item label="是否顶置"
                        :label-width="data.formLabelWidth">
            <el-switch v-model="data.form.isTop"
                       active-color="#13ce66">
            </el-switch>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

    <div slot="footer"
         class="dialog-footer">
      <el-button type="primary"
                 @click="saveBlog">保存</el-button>
    </div>
  </d2-container>
</template>

<script>
import { AddBlog, UpdataBlog, GetBlogDetail } from '../../../api/Blog'
import { GetBlogCategory } from '../../../api/BlogCategory'
import { GetTag } from '../../../api/Tag'
export default {
  name: 'BlogEdit',
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      datas: [],
      data: {
        title: '编辑文章',
        stateOptions: [
          { id: 1, name: '公开' },
          { id: 0, name: '草稿' }
        ],
        cateProps: {
          value: 'id',
          label: 'name',
          children: 'childs',
          checkStrictly: true,
          emitPath: false
        },
        cateOptions: [],
        tagOptions: [],
        form: {
          title: '',
          content: '',
          describe: '',
          categoryId: null,
          status: 0,
          template: '',
          tags: [],
          createTime: '',
          isTop: true,
          order: 0,
          alias: ''
        },
        formLabelWidth: '100px',
        Id: '',
        config: {
          autosave: {
            uniqueId: 'ssss'
          }
        }
      }
    }
  },
  created () {
    this.loadData()
  },
  computed: {},
  methods: {
    // 加载数据
    loadData () {
      this.data.Id = this.$route.params.id
      this.data.config.uniqueId = this.data.Id
      console.log(this.$route.params.id)
      if (this.data.Id === 'new') {
        this.data.title = '新增文章'
      } else {
        let id = this.$route.params.id
        GetBlogDetail(id).then(res => {
          res.tags = res.tags.map(p => {
            return p.id
          })
          this.data.form = res
        })
      }
      GetBlogCategory({ Sort: 'order' }).then(res => {
        this.data.cateOptions = res.list
      })
      GetTag({ Sort: 'order' }).then(res => {
        this.data.tagOptions = res.list
      })
    },
    // 保存
    saveBlog () {
      if (this.data.form.id) {
        UpdataBlog(this.data.form).then(res => {
          this.$message({
            message: '保存成功',
            type: 'success'
          })
        })
      } else {
        AddBlog(this.data.form).then(res => {
          this.$message({
            message: '添加成功',
            type: 'success'
          })
          this.data.form.id = res.id
        })
      }
    },
    switchData (id) {
      let data = this.datas[id]
      if (!data) {
        data = {
          title: '编辑文章',
          stateOptions: [
            { id: 1, name: '公开' },
            { id: 0, name: '草稿' }
          ],
          cateProps: {
            value: 'id',
            label: 'name',
            children: 'childs',
            checkStrictly: true,
            emitPath: false
          },
          cateOptions: [],
          tagOptions: [],
          form: {
            title: '',
            content: '',
            describe: '',
            categoryId: null,
            status: 0,
            template: '',
            tags: [],
            createTime: '',
            isTop: true,
            order: 0,
            alias: ''
          },
          formLabelWidth: '100px',
          Id: '',
          config: {
            autosave: {
              uniqueId: 'ssss'
            }
          }
        }
        this.datas[id] = data
      }
      this.data = data
    }
  },
  // 第一次进入或从其他组件对应路由进入时触发
  beforeRouteEnter (to, from, next) {
    const id = to.params.id
    console.log(id)
    if (id) {
      next(instance => {
        instance.switchData(id)
        instance.loadData()
      })
    } else {
      next(new Error('未指定ID'))
    }
  },
  // 在同一组件对应的多个路由间切换时触发
  beforeRouteUpdate (to, from, next) {
    const id = to.params.id
    if (id) {
      this.switchData(id)
      next()
    } else {
      next(new Error('未指定ID'))
    }
  }
}
</script>
<style scoped>
.el-header {
  padding: 0;
}
.sy-select {
  width: 100%;
}
</style>
