<template>
    <div class="tab_page">
        <pagebreadcrumb :data="breadcrumb" @refresh="reFresh()"/>
        <div class="pageBox" style="flex:1;display: flex;flex-direction: column;">
            <!--<AdminMenuTreeTableList />-->
            <TreeSelect
                    style="width: 300px"
                    :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
                    :treeData="treeData"
                    placeholder="Please select"
                    treeDefaultExpandAll
                    v-model="value"

            >

            </TreeSelect>
        </div>
    </div>
</template>

<script>
  import store from "./store/store"
  import LpBase from "@resource/mixins/LpBase"
  import LpBaseTabPage from "@resource/mixins/LpBaseTabPage"
  import AdminMenuTreeTableList from "@src/pages/modules/admin/AdminMenu/component/treeTableList/AdminMenuTreeTableList/index";
  import AdminMenuTree from "@src/pages/modules/admin/AdminMenu/component/tree/AdminMenuTree/index";

  import {TreeSelect} from "ant-design-vue"
  const treeData = [
    {
      title: 'Node1',
      value: '0-0',
      key: '0-0',
      children: [
        {
          value: '0-0-1',
          key: '0-0-1',
          scopedSlots: {
            // custom title
            title: 'title',
          },
        },
        {
          title: 'Child Node2',
          value: '0-0-2',
          key: '0-0-2',
        },
      ],
    },
    {
      title: 'Node2',
      value: '0-1',
      key: '0-1',
    },
  ];
  export default {
    name: "index",
    components: {AdminMenuTree, AdminMenuTreeTableList},
    mixins: [LpBaseTabPage, LpBase],
    data() {
      return {
        value: undefined,
        treeData,
      };
    },
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
    @import "~@resource/assets/styles/antd.less";
</style>