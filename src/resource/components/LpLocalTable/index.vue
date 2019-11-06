<template>

    <lp-table :data="this.$store.state.list"
              ref="multipleTable"
              header-row-class-name="table_th"
              :border="true"
              :stripe="true"
              @sort-change="sortTable"
              class="table"
              @selection-change="handleSelectionChange"
              v-loading="this.$store.state.loading"
              :height="defaultTableHeight"
              @header-click="setCurThead"

    >
        <slot name="selection" v-if="selection">
            <el-table-column
                    type="selection"
                    width="55">
            </el-table-column>
        </slot>
        <slot v-for="item in this.$store.state.item" v-if="item.show!==false" :name="item.field">
            <el-table-column :label="item.label?item.label:item.field" :sortable="item.sort==true?item.field:false"
                             :show-overflow-tooltip="true">

                <template slot-scope="scope">
                    <template v-if="!item.tpl||item.tpl=='text'">
                        {{scope.row[item.field]}}
                    </template>
                    <!--需要补充数据模板-->
                    <template v-if="item.tpl&&item.tpl=='image'">
                        {{scope.row[item.field]}}
                    </template>


                </template>
            </el-table-column>
        </slot>
        <slot name="action" v-if="action">

        </slot>
    </lp-table>


</template>
<script>
  import LpBaseTable from "../../mixins/LpBaseTable"
  import LpTable from "@src/resource/components/LpTable/LpTable"
  import LpBase from "@resource/mixins/LpBase"
  import SearchBox from "@src/resource/components/TableList/searchBox";
  import LpPagination from "@resource/components/LpPagination/index";

  export default {
    props: {
      selection: {
        type: Boolean,
        default: true
      },
      action: {
        type: Boolean,
        default: true
      }
    },
    name: "LpLocalTable",
    components: {SearchBox, LpTable, LpPagination},
    mixins: [LpBase, LpBaseTable],
    created() {
      this.$store = this.$parent.$store
    },
    data() {
      return {
        defaultTableHeight: 100
      }
    },
    methods: {
      setCurThead(val) {
        this.curThead = val;
        console.log(val)
      },
      handleSelectionChange(val) {
        this.$parent.$store.dispatch("/changeSelected", {data: val, __this: this});
      }
    }


  }
</script>
<style scoped>
    @import "./table.less";
</style>