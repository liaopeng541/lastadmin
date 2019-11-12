export default {

  created() {


  },
  mounted() {
    //加载数据
    this.reFresh();
  },
  data: function () {
    return {}
  },
  methods: {
    reFresh() {
      // this.$store.commit(this.storePath + '/reset', 'searchForm')
      // this.$store.commit(this.storePath + '/reset', 'table')
      this.$store.dispatch(this.storePath + '/loadTable')

    },
    resetSearch() {
      this.$store.commit(this.storePath + '/reset', 'searchForm')
    },
    resetTable()
    {
      this.$store.commit(this.storePath + '/reset', 'table')

      this.isReset++;
    },

    sortTable(params) {
      this.$store.dispatch(this.storePath + "/sortTable", params);
    },
    handleSizeChange(val)
    {
      this.storeData.pagination.pageSize=val
      this.storeData.pagination.currentPage=1;
      this.$store.dispatch(this.storePath+"/loadTable")
    },
    handleCurrentChange(val)
    {
      this.storeData.pagination.currentPage=val;
      this.$store.dispatch(this.storePath+"/loadTable")
    },
    prevClick(val)
    {
      this.storeData.pagination.currentPage=val;
      this.$store.dispatch(this.storePath+"/loadTable")
    },
    nextClick(val)
    {
      this.storeData.pagination.currentPage=val;
      this.$store.dispatch(this.storePath+"/loadTable")
    },
    deleteData(ids)
    {
      this.$store.dispatch(this.storePath + "/delRow", {ids:ids,__this:this});
    },
    handleSelectionChange(val)
    {
      this.$store.dispatch(this.storePath+"/changeSelected",{data:val,__this:this});
    },


  }


}
