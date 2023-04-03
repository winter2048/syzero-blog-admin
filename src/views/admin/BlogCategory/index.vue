<template>
  <d2-container>
    <template slot="header">分类管理</template>
    <el-header>
      <el-button @click="addRow">新增</el-button>
    </el-header>
    <!-- Table -->
    <el-table :data="data"
              style="width: 100%;margin-bottom: 20px;"
              row-key="id"
              border
              default-expand-all
              :tree-props="{children: 'childs', hasChildren: 'hasChildren'}">
      <el-table-column prop="name"
                       label="名称"
                       width="200">
      </el-table-column>
      <el-table-column prop="order"
                       label="排序"
                       sortable
                       width="80"
                       align="center">
      </el-table-column>
      <el-table-column prop="describe"
                       label="描述">
      </el-table-column>
      <el-table-column prop="alias"
                       label="别名"
                       width="180">
      </el-table-column>
      <el-table-column prop="blognum"
                       label="文章"
                       width="80"
                       align="center">
      </el-table-column>
      <el-table-column label="操作"
                       width="145"
                       align="center">
        <template slot-scope="scope">
          <el-button size="mini"
                     @click="editRow(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini"
                     type="danger"
                     @click="handleRowRemove(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- Form -->
    <el-dialog :title="formTitle"
               :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="名称"
                      :label-width="formLabelWidth">
          <el-input v-model="form.name"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="别名"
                      :label-width="formLabelWidth">
          <el-input v-model="form.alias"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="上级"
                      :label-width="formLabelWidth">
          <el-select v-model="form.parentId"
                     placeholder="请选择">
            <el-option label="最上级"
                       :value="null">
            </el-option>
            <el-option v-for="item in data"
                       :key="item.id"
                       :label="item.name"
                       :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="描述"
                      :label-width="formLabelWidth">
          <el-input v-model="form.describe"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="排序"
                      :label-width="formLabelWidth">
          <el-input-number v-model="form.order"
                           :min="0"></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary"
                   v-if="formTitle=='添加'"
                   @click="handleRowAdd">确 定</el-button>
        <el-button type="primary"
                   v-if="formTitle=='编辑'"
                   @click="handleRowEdit">确 定</el-button>
      </div>
    </el-dialog>
  </d2-container>
</template>

<script>
import {
  GetBlogCategory,
  AddBlogCategory,
  UpdataBlogCategory,
  DelBlogCategory
} from '../../../api/BlogCategory'
export default {
  data () {
    return {
      data: [],
      dialogFormVisible: false,
      form: {
        name: '',
        order: '',
        describe: '',
        alias: '',
        parentId: null
      },
      formLabelWidth: '120px',
      formTitle: '添加'
    }
  },
  created () {
    this.loadData()
  },
  methods: {
    // 加载数据
    loadData () {
      GetBlogCategory({ Sort: 'order' }).then(res => {
        this.data = res.list
      })
    },
    // 显示添加
    addRow () {
      this.formTitle = '添加'
      this.dialogFormVisible = true
      this.form = {
        name: '',
        order: '',
        describe: '',
        alias: '',
        parentId: null
      }
    },
    // 显示编辑
    editRow (
      index,
      row
    ) {
      this.formTitle = '编辑'
      this.dialogFormVisible = true
      this.form = row
    },
    // 删除
    handleRowRemove (
      index,
      row
    ) {
      this.$confirm('确定删除吗？', '删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          DelBlogCategory(row.id).then(res => {
            if (res) {
              this.$message({
                message: '删除成功',
                type: 'success'
              })
              this.loadData()
            } else {
              this.$message({
                message: '删除失败',
                type: 'warning'
              })
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 添加
    handleRowAdd () {
      AddBlogCategory(this.form).then(res => {
        console.log(res)
        this.$message({
          message: '保存成功',
          type: 'success'
        })
        this.loadData()
        this.dialogFormVisible = false
      })
    },
    // 编辑
    handleRowEdit () {
      UpdataBlogCategory(this.form).then(res => {
        console.log(res)
        this.$message({
          message: '编辑成功',
          type: 'success'
        })
        this.loadData()
        this.dialogFormVisible = false
      })
    }
  }
}

</script>
<style scoped>
.el-header {
  padding: 0;
}
</style>
