<template>
    <div class="tab_page">
        <pagebreadcrumb :data="breadcrumb" @refresh="reFresh()"/>
        <div class="pageBox" style="flex:1;display: flex;flex-direction: column;">


        </div>
    </div>
</template>

<script>
  import store from "./store/store"
  import LpBase from "@resource/mixins/LpBase"
  import LpBaseTabPage from "@resource/mixins/LpBaseTabPage"
  export default {
    name: "HhProcess",
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