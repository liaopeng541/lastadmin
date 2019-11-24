<template>
    <div class="tab_page">
        <pagebreadcrumb :data="breadcrumb" @refresh="reFresh()"/>
        <div class="pageBox" style="flex:1;display: flex;flex-direction: column;">
<hh-process-cat-table-list />
            

        </div>
    </div>
</template>

<script>
  import store from "./store/store"
  import LpBase from "@resource/mixins/LpBase"
  import LpBaseTabPage from "@resource/mixins/LpBaseTabPage"
  import HhProcessCatTableList
    from "@src/pages/modules/system/process/HhProcessCat/tableList/HhProcessCatTableList/index";
  export default {
    name: "HhProcessCat",
    components: {HhProcessCatTableList},
    mixins: [LpBaseTabPage, LpBase],
    data() {
      return {

      };
    },
    created() {
      this.setStore(store);
    },
    mounted() {

    },
    methods: {


    }
  }
</script>
<style lang="less" scoped>
    @import "~@resource/assets/styles/subpage.less";
</style>