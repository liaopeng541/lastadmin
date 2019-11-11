<template>
    <div class="fixBox">
        <div class="tablelisttable">
            <lp-table
                      ref="multipleTable"
                      header-row-class-name="table_th"
                      :border="true"
                      :stripe="true"
                      class="table"
                      :height="defaultTableHeight"

                      v-bind="$attrs"
                      v-on="$listeners"
                      @sort-change="sortTable"
                      @selection-change="handleSelectionChange"
            >
                <slot />
                <slot name="selection" v-if="selection">
                    <el-table-column
                            type="selection"
                            width="55">
                    </el-table-column>
                </slot>
                <slot v-for="item in tableItem" v-if="item.tpl && item.show" :name="item.field">
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
                                <div v-if="scope.row[item.field]" style="display: flex;align-items: center;justify-content: center;border: solid 1px #f0f2f5; box-sizing: border-box;border-radius: 5px;width: 80px;height: 80px">
                                    <img  :src="scope.row[item.field].indexOf('http')===-1?'http://www.yiishop.com/backend/web/'+scope.row[item.field]:scope.row[item.field]" style="max-width: 76px;max-height: 76px"/>
                                    <!--<pic-zoom  :url="'http://www.yiishop.com/backend/web/'+scope.row[item.field]" style="max-width: 100px;max-height: 100px"  :scale="5"></pic-zoom>-->
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
                <slot name="action" v-if="action">

                </slot>
            </lp-table>
        </div>
    </div>

</template>
<script>
  import LpTable from "./LpTable"
  import PicZoom from 'vue-piczoom'
  export default {
    watch: {
      "$parent.isReset": function () {
        this.curThead='';
        this.$refs.multipleTable.clearSort();
      },
    },
    props: {
      selection: {
        type: Boolean,
        default: true
      },
      action: {
        type: Boolean,
        default: true
      },
      tableItem:{
        type:Array,
        default:[]
      }
    },
    name: "TableList",
    components: {LpTable,PicZoom},
    data() {
      return {
        defaultTableHeight: 100,
        curThead: ''
      }
    },
    methods:{
      setCurThead(val)
      {
        this.curThead=val;
      },
      handleSelectionChange(val)
      {
        this.$emit('selectionChange',val)
     //   this.$parent.$store.dispatch(this.storePath+"changeSelected",{data:val,__this:this});
      },
      sortTable(params)
      {
        params.curThead=this.curThead;
        this.$emit('sortTable',params)

      },

    }


  }
</script>
<style   scoped>
    @import "./table.less";
</style>