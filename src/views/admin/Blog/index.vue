<template>
  <d2-container>
    <template slot="header">文章管理</template>
    <el-header>
      <el-row :gutter="20">
        <el-col :span="17">
          <el-button @click="addRow">新增</el-button>
          <el-button @click="delRow"
                     type="danger">批量删除</el-button>
        </el-col>
        <el-col :span="3">
          <el-cascader :options="cateOptions"
                       :props="cateProps"
                       v-model="categoryId"
                       @change="searchCate"
                       clearable
                       style="width:100%"></el-cascader>
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
              border
              style="width: 100%"
              @selection-change="handleSelectionChange">
      <el-table-column type="selection"
                       width="55"> </el-table-column>
      <el-table-column prop="title"
                       fixed
                       label="标题"> </el-table-column>
      <el-table-column prop="alias"
                       label="别名"
                       width="180"> </el-table-column>
      <el-table-column prop="categoryName"
                       label="分类"
                       width="180"> </el-table-column>
      <el-table-column prop="createUserName"
                       label="作者"
                       width="180"> </el-table-column>
      <el-table-column prop="createTime"
                       label="时间"
                       width="180"> </el-table-column>
      <el-table-column prop="commentNums"
                       label="评论数"
                       width="80"
                       align="center"> </el-table-column>
      <el-table-column prop="viewNums"
                       label="查看次数"
                       width="90"
                       align="center"> </el-table-column>
      <el-table-column label="操作"
                       fixed="right"
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
    <el-pagination @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page="currentPage"
                   :page-sizes="[10, 20, 40, 80, 100]"
                   :page-size="pageSize"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="total">
    </el-pagination>
  </d2-container>
</template>

<script>
import { GetBlog, DelBlog } from '../../../api/Blog'
import { GetBlogCategory } from '../../../api/BlogCategory'
export default {
  name: 'Blog',
  data () {
    return {
      data: [],
      total: 100,
      multipleSelection: [],
      index: 0,
      currentPage: 1,
      pageSize: 10,
      tempKey: '',
      Key: '',
      categoryId: '',
      cateOptions: [],
      cateProps: {
        value: 'id',
        label: 'name',
        children: 'childs',
        checkStrictly: true,
        emitPath: false
      }
    }
  },
  created () {
    this.loadData()
    GetBlogCategory({ Sort: 'order' }).then(res => {
      this.cateOptions = res.list
    })
  },
  methods: {
    // 加载数据
    loadData () {
      GetBlog({
        Sort: 'order',
        Skip: (this.currentPage - 1) * this.pageSize,
        Limit: this.pageSize,
        Key: this.Key,
        CategoryId: this.categoryId
      }).then(res => {
        this.data = res.list
        this.total = Number(res.total)
      })
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    // 批量删除
    delRow () {
      if (this.multipleSelection.length <= 0) {
        this.$message({
          message: '请选择数据！',
          type: 'warning'
        })
        return false
      }
      this.$confirm('确定删除吗？', '删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          for (let i = 0; i < this.multipleSelection.length; i++) {
            DelBlog(this.multipleSelection[i].id).then(res => {
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
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 显示添加
    addRow () {
      this.$router.push({ path: 'BlogEdit/new' })
    },
    // 显示编辑
    editRow (index, row) {
      this.$router.push({ path: 'BlogEdit/' + row.id })
    },
    // 删除
    handleRowRemove (index, row) {
      this.$confirm('确定删除吗？', '删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          DelBlog(row.id).then(res => {
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
    // 关键字搜索
    searchKey () {
      this.Key = this.tempKey
      this.loadData()
    },
    searchCate (val) {
      this.loadData()
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
