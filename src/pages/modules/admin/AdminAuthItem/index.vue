<template>
    <div class="tab_page">
        <pagebreadcrumb :data="breadcrumb" @refresh="reFresh"/>
        <div class="pageBox" style="flex:1;display: flex;flex-direction: column;">
            <AdminAuthItemTableList />
        </div>
    </div>
</template>

<script>
  import LpBase from "@resource/mixins/LpBase"
  import LpBaseTabPage from "@resource/mixins/LpBaseTabPage"
  import AdminAuthItemTableList from "@src/pages/modules/admin/AdminAuthItem/component/list/AdminAuthItemTableList";
  export default {
    name: "index",
    components: {AdminAuthItemTableList},
    mixins: [LpBaseTabPage,LpBase],
  }
</script>

<style lang="less" scoped>
    @import "~@resource/assets/styles/subpage.less";
</style>