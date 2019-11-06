<template>
    <tree-table
            v-loading="this.$store.state.loading"
            :data="this.$store.state.list"
            :expandAll="this.$store.state.expandAll"
            border

            :expandname="this.$store.state.expandname" :expandcolum="this.$store.state.expandcolum"
    >
        <slot slot="section" name="selection" >
            <el-table-column
                    type="selection"
                    width="55">
            </el-table-column>
        </slot>
        <slot v-for="item in this.$store.state.item" v-if="item.tpl" :name="item.field">
            <el-table-column :label="item.label?item.label:item.field"
                             :sortable="item.sort==true?item.field:false"
                             :show-overflow-tooltip="true"
                             :width="item.width">

                <template slot-scope="scope">
                    <template v-if="!item.tpl||item.tpl=='text'">
                        {{scope.row[item.field]}}
                    </template>
                    <!--需要补充数据模板-->
                    <template v-if="item.tpl&&item.tpl=='image'">
                        <div v-if="scope.row[item.field]"
                             style="display: flex;align-items: center;justify-content: center;border: solid 1px #f0f2f5; box-sizing: border-box;border-radius: 5px;width: 80px;height: 80px">
                            <img :src="scope.row[item.field].indexOf('http')===-1?'http://www.yiishop.com/backend/web/'+scope.row[item.field]:scope.row[item.field]"
                                 style="max-width: 76px;max-height: 76px"/>
                        </div>
                    </template>

                    <template v-if="item.tpl&&item.tpl=='switch'">

                        <el-switch
                                v-model="scope.row[item.field]"
                                active-color="#13ce66"
                                inactive-color="#cccccc"
                                active-value="1"
                                inactive-value="0">
                        </el-switch>
                    </template>


                </template>
            </el-table-column>
        </slot>
        <slot name="action">

        </slot>
    </tree-table>


</template>

<script>
  import TreeTable from "@src/resource/components/TreeTable/index";
  import LpBaseTable from "../../mixins/LpBaseTable"
  import LpBase from "@resource/mixins/LpBase"

  export default {
    name: "TreeTableList",
    components: {TreeTable},
    mixins: [LpBase, LpBaseTable],
    created() {
      this.$store = this.$parent.$store
    },
    methods: {
      tableRowClassName() {

      }
    }

  }
</script>

<style scoped>

</style>