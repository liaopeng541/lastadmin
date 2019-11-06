<template>
    <lp-popover
            placement="bottom-start"
            :width="width"
            trigger="focus"
            v-model="isshow"
            popper-class="lppop"
            @show="show"
            @hide="hide"
            :disabled="disabled"
    >
        <div class="lp-popver-box" style="min-height: 300px;display: flex;flex-direction: column">
            <table-list
                    :data="table_data"
                    :tableItem="table_items"
                    @sortTable="sortTable"
                    @selection-change="handleSelectionChange"
                    @row-click="rowClick"
                    @row-dblclick="rowDbClick"
                    :row-style="selectedHighlight"
                    v-loading="loading"
                    :selection="false"
            >
                <el-table-column
                        width="45" style="padding: 0px">
                    <template slot-scope="scope">
                        <i v-if="selectedRow&&(selectedRow[ValueColumn]==scope.row[ValueColumn])"
                           class="el-icon-caret-right" style="font-size: 20px"></i>
                    </template>
                </el-table-column>


            </table-list>
            <div style="text-align: right">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        @prev-click="prevClick"
                        @next-click="nextClick"
                        :current-page="pagination.currentPage"
                        :page-sizes="pagination.pageSizes"
                        :page-size="pagination.pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="pagination.total">
                </el-pagination>
            </div>
        </div>



        <div>

        </div>
        <div slot="reference">
            <el-input  ref="cbinput" @keydown.native="keydown($event)" @keyup.native="keyup($event)"
                      v-model="label"
                      :placeholder="_placeholder" :disabled="disabled"
            >
                <i slot="prefix" class="el-input__icon" :style="{color:(value&&value!='')? '#67C23A':'#F56C6C'}"
                   :class="(value&&value!='')?'el-icon-success':'el-icon-question'"></i>
                <i slot="suffix" class="el-input__icon"
                   :class="loading?'el-icon-loading':(isshow?'el-icon-caret-top':'el-icon-caret-bottom')"></i>
            </el-input>
        </div>
    </lp-popover>

</template>

<script>
  import LpPopover from "./LpPopover";
//  import {Pagination, Table, TableColumn, Input, Loading} from "element-ui"
  import LpTabel from "@resource/components/TableList/LpTable"
  import LpTablePagination from "@resource/components/LpTablePagination"
  // Vue.use(Pagination)
  // Vue.use(Table)
  // Vue.use(Input)
  // Vue.use(TableColumn)
  // Vue.use(Loading)
  export default {
    name: "LpComboGrid",
    components: {LpPopover,LpTabel,LpTablePagination},
    computed: {
      _placeholder: {
        get: function () {
          if (this.disabled && this.disabled_placeholder) {
            return this.disabled_placeholder
          } else {
            return this.placeholder
          }
        }
      },
      // disabled:{
      //   get:function () {
      //     if(this.status)
      //     {
      //       if(this.status.disabled)
      //       {
      //         return true
      //       }
      //     }
      //   }
      // },
      inputvalue: {
        get: function () {
          return this.value
        },
        set: function (val) {
          this.$emit('input', val)
          this.$emit('change', this.selectedRow)
        }
      }
    },
    data() {
      return {
        isshow: false,
        label: "",
        timer: null,
        selectedRow:null,
        loading:false,
      }
    },
    watch: {
      value(val) {
        this.$emit("change", val ? this.selectedRow : null);
      },
      "table_data":function () {
        if(this.table_data&&this.table_data.length>0&&!this.selectedRow)
        {
          this.selectedRow = this.table_data[0]
        }
      },
      "disabled":function () {
        if(this.disabled)
        {
          this.inputvalue = null;
          if(this.disabled_placeholder)
          {
            this.label=this.disabled_placeholder
          }
        }
      }
    },
    model: {
      prop: 'value',
      event: 'input'
    },


    props: {
      url:"",
      pagination:{
        type:Object,
        default:{
          pageSize: 10,
          pageSizes: [10, 20, 50, 100],
          currentPage: 1,
          total: 0,
        }
      },
      table_data: {
        type: Array,
        default: null,
        required: true
      },
      table_items: {
        type: Array,
        default: null,
        required: true
      },
      search_items: {
        type: Array,
        default: null
      },
      TableHeader: {
        type: Array,
        default: null,
        required: true
      },
      placeholder: "",
      ShowHeader: {
        type: Boolean,
        default: true,
      },
      url: {
        type: String,
        default: "",
        required: true
      },
      ListKey: {
        type: String,
        default: "list",
      },
      TotalKey: {
        type: String,
        default: "total"
      },
      width: {
        type: String,
        default: "800"
      },
      ValueColumn: {
        type: String,
        default: ""
      },
      LabelColumn: {
        type: String,
        default: "",
        required: true
      },
      DefaultParams: {
        type: Object,
        default: {}
      },
      status: {
        type: Object,
        default: null
      },
      disabled: {
        type: Boolean,
        default: false
      },
      disabled_placeholder: {
        type: String,
        default: ""
      },

      value: "",
      initlabel: "",

    },
    mounted() {
      console.log(this.value)
      if (this.initlabel) {
        this.label = this.initlabel
      }
    },
    methods: {
      reset() {
        this.inputvalue = ""
        this.label = "";
      },
      set(val, label) {
        this.inputvalue = val
        this.label = label

      },
      select() {
        this.$refs['cbinput'].select();
      },

      selectedHighlight(row, rowIndex) {
        if (this.selectedRow && this.selectedRow[this.ValueColumn] == row.row[this.ValueColumn]) {
          return {
            "background-color": "#f0f5f5"
          };
        }
      },
      rowDbClick(row)
      {
        this.rowClick(row);
        this.$nextTick(this.setVal)
      },
      rowClick(row) {
        this.selectedRow = row
      },
      setVal() {
        if (this.selectedRow&&this.inputvalue!==this.selectedRow[this.ValueColumn]) {
          this.inputvalue = this.selectedRow[this.ValueColumn]
          console.log(this.inputvalue)
          this.label = this.selectedRow[this.LabelColumn]
        }
        this.isshow = false;
      },
      keydown(e) {
        if (e.keyCode == 38 || e.keyCode == 40) {
          e.preventDefault();
        }
      },
      keyup(e) {
        if (e.keyCode != 13) {
          this.isshow || (this.isshow = true);

          if (e.keyCode != 37&& e.keyCode != 38&& e.keyCode != 39 && e.keyCode != 40) {
            if (this.timer) {
              clearTimeout(this.timer);
            }
            this.search_items.map((item,i)=>{
              console.log(this.LabelColumn);
              if(item.field==this.LabelColumn)
              {
                console.log(this.search_items)
                this.search_items[i].value=this.label
              }
            })
            this.timer = setTimeout(this.fetchData, 250)
            this.inputvalue = "";
          }
        } else {
          this.value && this.$emit("enter", this.selectedRow)
        }
      },
      keyaction(e) {
        switch (e.keyCode) {
          case 13://回车
            if (this.table_data.length > 0) {
              this.setVal();
            }
            break;
          case 40://下
            if (this.table_data.length > 0) {
              var index = 0
              this.table_data.map((item, i) => {
                if (this.selectedRow && item[this.ValueColumn] == this.selectedRow[this.ValueColumn]) {
                  index = i;
                }
              })
              this.selectedRow = this.table_data[index + 1] ? this.table_data[index + 1] : this.table_data[0]
            }
            e.preventDefault();
            break;
          case 38:
            if (this.table_data.length > 0) {
              var index = 0
              this.table_data.map((item, i) => {
                if (this.selectedRow && item[this.ValueColumn] == this.selectedRow[this.ValueColumn]) {
                  index = i;
                }
              })
              this.selectedRow = this.table_data[index - 1] ? this.table_data[index - 1] : this.table_data[this.table_data.length - 1]
            }
            e.preventDefault();
            break;

        }
      },
      show() {
        this.fetchData();
        document.body.addEventListener('keyup', this.keyaction, false);
      },
      hide() {
        document.body.removeEventListener('keyup', this.keyaction, false);
        this.loading = false;
      },
      fetchData() {
        let searchParams = lp.$util.getSearchParams(this.search_items);
        let pageParams = this.pagination;
        let sortParams = this.sort_items
        let query = {
          pagination: pageParams,
          condition: searchParams,
          sort: sortParams
        };
        let params = Object.assign({}, query)
        console.log(params)
        var databody = {
          query: JSON.stringify(params)
        };
        //合并查询分页排序参
        //获取数据
        lp.$http().onLoading((loading) => {
          this.loading = loading
        })
          .post(lp.$Api.baseurl + this.url, databody, (response) => {
            this.table_data = response.data.list;
            this.pagination && (this.pagination.total = parseInt(response.data.total));
          })


      },
      handleSizeChange() {

      },
      handleCurrentChange(val) {
        this.pagination.currentPage = val;
        this.$nextTick(this.fetchData)
      },


    }
  }
</script>

<style lang="less">
    @import "./ComboGrid.less";
</style>