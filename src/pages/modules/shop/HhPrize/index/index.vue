<template>
    <div class="tab_page">
        <pagebreadcrumb :data="breadcrumb" @refresh="reFresh"/>
        <div class="pageBox" style="flex:1;display: flex;flex-direction: column;">
            <hh-prize-list />
        </div>
    </div>
</template>

<script>
  import LpBase from "@resource/mixins/LpBase"
  import LpBaseTabPage from "@resource/mixins/LpBaseTabPage"
  import HhPrizeList from "@pages/compoents/HhPrize/HhPrizeList";
  import store from "./store";
  export default {
    name: "Hhprize",
    components: {HhPrizeList},
    mixins: [LpBaseTabPage,LpBase],
    created()
    {
      this.setStore(store);
    },

    mounted(){



    },
    methods:{

    }




  }
</script>

<style lang="less" scoped>
    @import "~@resource/assets/styles/subpage.less";
</style>