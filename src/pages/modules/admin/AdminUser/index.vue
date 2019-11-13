<template>
    <div class="tab_page">
        <pagebreadcrumb :data="breadcrumb" @refresh="resetSearch(),resetTable(),reFresh()"/>
        <div  style="flex:1;display: flex;flex-direction: column;">
            <admin-user-table-list />


        </div>
    </div>
</template>

<script>
  import store from "./store/store"
  import LpBase from "@resource/mixins/LpBase"
  import LpBaseTabPage from "@resource/mixins/LpBaseTabPage"
  import LpTableList from "@src/resource/mixins/LpTableList";
  import AdminUserTableList from "@src/pages/modules/admin/AdminUser/component/tableList/AdminUserTableList";

  export default {
    name: "index",
    components: {AdminUserTableList},
    // components: {AdminAuthItemTableList, SearchBox},
    mixins: [LpBaseTabPage, LpBase, LpTableList],
    created() {
      this.setStore(store);
    },
    mounted() {
      console.log(this.storePath)
    },
    methods: {
      showForm(row = null) {
        var config = {
          title: row ? "修改" : "添加",
          icon: row ? "edit" : "save",
          params: row ? {type: "update", data: row} : {type: "add"},
        }
        this.showModal(HhPrizeForm, config)
      },
      deleteSelected(){

        if(this.storeData.table.selected&&this.storeData.table.selected.length>0)
        {

          //弹窗确认
          this.LpAlert({
            title:"系统提示",
            message:"您确认批量删除 ("+this.storeData.table.selected.length+") 条数据么?",
            ok:()=>{
              var ids=[];
              this.storeData.table.selected.map((item)=>{
                ids.push(item.name)
              })
              this.$store.dispatch(this.storePath + "/delRow", {ids:ids,__this:this});
            }
          })
        }else{
          this.$message.info("请选择要删除的数据")
        }

      }
    }
  }
</script>

<style lang="less" scoped>
    @import "~@resource/assets/styles/subpage.less";
</style>