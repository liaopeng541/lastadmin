<template>
    <div class="fixBox">
        <div class="table_bar">
            <el-button-group>
                <el-button type="primary" icon="el-icon-plus" @click="showadd">添加</el-button>
                <el-button type="danger" icon="el-icon-delete" @click="deleteSelected">批量删除</el-button>
            </el-button-group>
        </div>
        <search-form
                @refresh="reFresh"
                @print="test"
                @search="reFresh"
                @reset="resetSearch"
                @export="test"
        />
        <table-list
                :data="this.storeData.table.list"
                :tableItem="this.storeData.table.items"
                :row-key="this.storeData.table.rowKey?this.storeData.table.rowKey:''"
                @sortTable="sortTable"
                @selection-change="handleSelectionChange"
                v-loading="this.storeData.table.loading"
        >
            <el-table-column slot="action" label="操作" width="120">
                <template slot-scope="scope">
                    <el-row>
                        <!--<el-button icon="el-icon-search" circle></el-button>-->
                        <el-tooltip class="item" effect="dark" content="修改" placement="bottom-start">
                            <el-button type="primary" icon="el-icon-edit" circle
                                       @click="showedit(scope.row)"></el-button>
                        </el-tooltip>
                        <!--<el-button type="success" icon="el-icon-check" circle></el-button>-->
                        <!--<el-button type="info" icon="el-icon-message" circle></el-button>-->
                        <el-popover
                                placement="bottom"
                                title="标题"
                                width="200"
                                trigger="click"
                                v-model="scope.row.deleteShow"
                        >
                            <p>确定删除此条记录吗</p>
                            <div style="text-align: right; margin: 0">
                                <el-button size="mini" type="text" @click="scope.row.deleteShow = false">取消
                                </el-button>
                                <el-button type="primary" size="mini" @click="deleteData(scope.row)">确定
                                </el-button>
                            </div>
                            <el-tooltip slot="reference" class="item" effect="dark" content="删除"
                                        placement="bottom-start">
                                <el-button type="danger" icon="el-icon-delete" circle></el-button>
                            </el-tooltip>
                        </el-popover>
                        <el-tooltip class="item" effect="dark" content="详情" placement="bottom-start">
                            <el-button type="success" icon="el-icon-view" circle></el-button>
                        </el-tooltip>

                    </el-row>
                </template>
            </el-table-column>
        </table-list>
        <div style="text-align: right">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    @prev-click="prevClick"
                    @next-click="nextClick"
                    :current-page="this.storeData.pagination.currentPage"
                    :page-sizes="this.storeData.pagination.pageSizes"
                    :page-size="this.storeData.pagination.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="this.storeData.pagination.total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
  import SearchForm from "./searchForm";
  import LpTable from "@src/resource/components/TableList/LpTable";
  import LpBase from "@src/resource/mixins/LpBase";
  import LpTableList from "@src/resource/mixins/LpTableList";
  import HhPrizeForm from "@pages/compoents/HhPrize/HhPrizeForm";
  import store from "./store"
  export default {
    name: "HhprizeList",
    mixins: [LpBase, LpTableList],
    components: {LpTable, SearchForm},
    created() {
      this.setStore(store);
      console.log(this.$store)
    },
    methods: {
      showadd() {
        this.showModal(HhPrizeForm, {
          title: "添加",
          icon: "save",
          width: "90%",
          height: "90%",
          params: {id: 1}
        })
      },
    }

  }
</script>

<style scoped>

</style>