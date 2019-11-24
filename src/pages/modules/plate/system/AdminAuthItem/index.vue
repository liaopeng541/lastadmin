<template>
    <div class="tab_page">
        <pagebreadcrumb :data="breadcrumb" @refresh="resetSearch(),resetTable(),reFresh()"/>
        <div class="pageBox" style="flex:1;display: flex;flex-direction: column;">
            <div class="table_bar">
                <el-button-group>
                    <el-button type="primary" icon="el-icon-plus" @click="showForm()">添加</el-button>
                    <el-button type="danger" icon="el-icon-delete" @click="deleteSelected">批量删除</el-button>
                </el-button-group>
            </div>
            <search-box
                    @refresh="resetSearch(),resetTable(),reFresh()"
                    @search="reFresh"
                    @reset="resetSearch(),reFresh()"
                    :search-item="this.storeData.searchForm.items"
                    :table-item="this.storeData.table.items"
                    :tool="['export','print','refresh','settable']"
            >
            </search-box>
            <table-list
                    :data="this.storeData.table.list"
                    :tableItem="this.storeData.table.items"
                    :row-key="this.storeData.table.rowKey?this.storeData.table.rowKey:''"
                    @sortTable="sortTable"
                    @selection-change="handleSelectionChange"
                    v-loading="this.storeData.table.loading"
            >
                <el-table-column slot="action" label="操作" width="100" align="center">
                    <template slot-scope="scope">
                        <el-row>
                            <!--<el-button icon="el-icon-search" circle></el-button>-->
                            <el-tooltip class="item" effect="dark" content="修改" placement="bottom-start">
                                <el-button type="primary" icon="el-icon-edit" circle
                                           @click="showForm(scope.row)"></el-button>
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
                                    <el-button type="primary" size="mini" @click="deleteData([scope.row.name])">确定
                                    </el-button>
                                </div>
                                <el-tooltip slot="reference" class="item" effect="dark" content="删除"
                                            placement="bottom-start">
                                    <el-button type="danger" icon="el-icon-delete" circle></el-button>
                                </el-tooltip>
                            </el-popover>
                            <!--<el-tooltip class="item" effect="dark" content="详情" placement="bottom-start">-->
                                <!--<el-button type="success" icon="el-icon-view" circle></el-button>-->
                            <!--</el-tooltip>-->

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
    </div>
</template>

<script>
  import store from "./store/store"
  import LpBase from "@resource/mixins/LpBase"
  import LpBaseTabPage from "@resource/mixins/LpBaseTabPage"
  import SearchBox from "@src/resource/components/TableList/searchBox";
  import AdminAuthItemTableList from "@src/pages/modules/admin/AdminAuthItem/component/list/AdminAuthItemTableList";
  import HhPrizeForm from "./component/form";
  import LpTableList from "@src/resource/mixins/LpTableList";

  export default {
    name: "index",
    components: {AdminAuthItemTableList, SearchBox},
    mixins: [LpBaseTabPage, LpBase, LpTableList],
    created() {
      this.setStore(store);
    },
    mounted() {
      console.log(this.storePath)
    },
    methods: {
      showForm(row = null) {
        var config = {
          title: row ? "修改" : "添加",
          icon: row ? "edit" : "save",
          params: row ? {type: "update", data: row} : {type: "add"},
        }
        this.showModal(HhPrizeForm, config)
      },

    }
  }
</script>

<style lang="less" scoped>
    @import "~@resource/assets/styles/subpage.less";
</style>