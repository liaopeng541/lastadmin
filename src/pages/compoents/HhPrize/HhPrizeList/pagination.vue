<template>
    <div style="text-align: right">
        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                @prev-click="prevClick"
                @next-click="nextClick"
                :current-page="this.$parent.storeData.pagination.currentPage"
                :page-sizes="this.$parent.storeData.pagination.pageSizes"
                :page-size="this.$parent.storeData.pagination.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="this.$parent.storeData.pagination.total">
        </el-pagination>
    </div>
    
</template>

<script>
  export default {
    name: "pagination",
    methods:{
      handleSizeChange(val)
      {
        this.$parent.storeData.pagination.pageSize=val
        this.$parent.storeData.pagination.currentPage=1;
        this.$store.dispatch(this.storePath+"loadTable")
      },
      handleCurrentChange(val)
      {
        this.$parent.storeData.pagination.currentPage=val;
        this.$store.dispatch(this.storePath+"loadTable")
      },
      prevClick(val)
      {
        this.$parent.storeData.pagination.currentPage=val;
        this.$store.dispatch(this.storePath+"loadTable")
      },
      nextClick(val)
      {
        this.$parent.storeData.pagination.currentPage=val;
        this.$store.dispatch(this.storePath+"loadTable")
      }
    },


  }
</script>

<style scoped>

</style>