<template>
  <d2-container>
    <template slot="header">评论管理</template>
    <el-header>
      <el-row :gutter="20">
        <el-col :span="17">
          <el-button @click="addRow">审核</el-button>
          <el-button @click="delRow"
                     type="danger">批量删除</el-button>
        </el-col>
        <el-col :span="3">
          <el-select v-model="value"
                     clearable
                     placeholder="请选择"
                     style="width:100%">
            <el-option label="全部"
                       value="">
            </el-option>
            <el-option label="未审"
                       :value="0">
            </el-option>
            <el-option label="已审"
                       :value="1">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-input placeholder="请输入关键字"
                    prefix-icon="el-icon-search"
                    v-model="tempKey"
                    @keyup.enter.native="searchKey">
          </el-input>
        </el-col>
      </el-row>

    </el-header>
    <!-- Table -->
    <el-table :data="data"
              style="width: 100%;margin-bottom: 20px;"
              row-key="id"
              border
              default-expand-all>
      <el-table-column type="selection"
                       width="55"> </el-table-column>
      <el-table-column prop="content"
                       label="内容">
      </el-table-column>
      <el-table-column prop="author"
                       label="评论者"
                       width="200">
      </el-table-column>
      <el-table-column prop="status"
                       label="状态"
                       width="80">
      </el-table-column>
      <el-table-column prop="ip"
                       label="IP"
                       width="200">
      </el-table-column>
      <el-table-column prop="createTime"
                       label="时间"
                       width="200">
      </el-table-column>
      <el-table-column prop="createTime"
                       label="文章"
                       width="200">
      </el-table-column>
      <el-table-column label="操作"
                       fixed="right"
                       width="145"
                       align="center">
        <template slot-scope="scope">
          <el-button size="mini"
                     @click="editRow(scope.$index, scope.row)">审核</el-button>
          <el-button size="mini"
                     type="danger"
                     @click="handleRowRemove(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page="currentPage"
                   :page-sizes="[10, 20, 40, 80, 100]"
                   :page-size="pageSize"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="total">
    </el-pagination>
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
  GetComment,
  AddComment,
  UpdataComment,
  DelComment
} from '../../../api/Comment'
export default {
  data () {
    return {
      data: [],
      dialogFormVisible: false,
      form: {
        name: '',
        order: '',
        describe: '',
        alias: ''
      },
      formLabelWidth: '120px',
      formTitle: '添加',
      value: '',
      currentPage: 1,
      pageSize: 10,
      tempKey: '',
      Key: ''
    }
  },
  created () {
    this.loadData()
  },
  methods: {
    // 加载数据
    loadData () {
      GetComment({
        Sort: 'CreateTime',
        Skip: (this.currentPage - 1) * this.pageSize,
        Limit: this.pageSize,
        Key: this.Key
      }).then(res => {
        this.data = res.list
        this.total = Number(res.total)
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
          DelComment(row.id).then(res => {
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
      AddComment(this.form).then(res => {
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
      UpdataComment(this.form).then(res => {
        console.log(res)
        this.$message({
          message: '编辑成功',
          type: 'success'
        })
        this.loadData()
        this.dialogFormVisible = false
      })
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.pageSize = val
      this.loadData()
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.currentPage = val
      this.loadData()
    }
  }
}

</script>
<style scoped>
.el-header {
  padding: 0;
}
</style>
