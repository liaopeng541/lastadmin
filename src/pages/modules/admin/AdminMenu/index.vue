<template>
    <div class="tab_page">
        <pagebreadcrumb :data="breadcrumb" @refresh="reFresh()"/>
        <div class="pageBox" style="flex:1;display: flex;flex-direction: column;">
            <split-pane v-on:resize="resize" :min-percent='15' :max-percent='30' :default-percent='25' split="vertical">
                <template slot="paneL">
                    <AdminMenuTree />
                </template>
                <template slot="paneR" >
                    <split-pane split="horizontal" :min-percent='40' :default-percent='70'>
                        <template slot="paneL">
                           <AdminMenuTreeTableList />
                        </template>
                        <template slot="paneR" >
                            <AdminMenuTreeTableList />
                        </template>
                    </split-pane>
                </template>
            </split-pane>
        </div>
    </div>
</template>

<script>
  import store from "./store/store"
  import LpBase from "@resource/mixins/LpBase"
  import LpBaseTabPage from "@resource/mixins/LpBaseTabPage"
  import AdminMenuTreeTableList from "@src/pages/modules/admin/AdminMenu/component/treeTableList/AdminMenuTreeTableList/index";
  import AdminMenuTree from "@src/pages/modules/admin/AdminMenu/component/tree/AdminMenuTree/index";

  export default {
    name: "index",
    components: {AdminMenuTree, AdminMenuTreeTableList},
    mixins: [LpBaseTabPage, LpBase],
    created() {
      this.setStore(store);
    },
    mounted() {
      console.log(this.storePath)
    },
    methods: {


    }
  }
</script>

<style lang="less" scoped>
    @import "~@resource/assets/styles/subpage.less";
</style>