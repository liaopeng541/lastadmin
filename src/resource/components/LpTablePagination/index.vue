<template>
    <div style="text-align: right">
        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                @prev-click="prevClick"
                @next-click="nextClick"
                :current-page="this.$parent.$store.state.pagination.currentPage"
                :page-sizes="this.$parent.$store.state.pagination.pageSizes"
                :page-size="this.$parent.$store.state.pagination.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="this.$parent.$store.state.pagination.total">
        </el-pagination>
    </div>
</template>

<script>
  import LpBase from  "@resource/mixins/LpBase"
  export default {
    name: "LpTablePagination",
    mixins:[LpBase],
    methods:{
      handleSizeChange(val)
      {
        this.$parent.$store.state.pagination.pageSize=val
        this.$parent.$store.state.pagination.currentPage=1;
        this.$parent.$store.dispatch("loadTable")
      },
      handleCurrentChange(val)
      {
        this.$parent.$store.state.pagination.currentPage=val;
        this.$parent.$store.dispatch("loadTable")
      },
      prevClick(val)
      {
        this.$parent.$store.state.pagination.currentPage=val;
        this.$parent.$store.dispatch("loadTable")
      },
      nextClick(val)
      {
        this.$parent.$store.state.pagination.currentPage=val;
        this.$parent.$store.dispatch("loadTable")
      }
    },
    mounted(){
      console.log(this.$parent)
    }


  }
</script>

<style scoped>

</style>