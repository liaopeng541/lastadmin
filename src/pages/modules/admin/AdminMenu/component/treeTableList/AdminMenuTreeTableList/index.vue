<template>
    <div style="flex:1;display: flex;flex-direction: column;height: 100%;width: 100%">
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
            <template slot="toolbtn">
                <el-tooltip class="item" effect="dark" :content="storeData.table.expandAll?'全部收起':'全部展开'"
                            placement="bottom-start">
                    <el-button :icon="storeData.table.expandAll?'el-icon-caret-top':'el-icon-caret-bottom'" circle
                               @click="doexpandALL"
                    ></el-button>
                </el-tooltip>
            </template>

        </search-box>
        <tree-table-list
                v-loading="storeData.table.loading"
                :data="storeData.table.list"
                :expandAll="storeData.table.expandAll"
                border
                :expandname="storeData.table.expandname" :expandcolum="storeData.table.expandcolum"
                :tableItem="this.storeData.table.items"
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
                                <el-button type="primary" size="mini" @click="deleteData([scope.row.id])">确定
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
        </tree-table-list>
    </div>
</template>

<script>
  import store from "./store"
  import LpBase from "@resource/mixins/LpBase"
  import LpBaseTabPage from "@resource/mixins/LpBaseTabPage"
  import SearchBox from "@src/resource/components/TableList/searchBox";
  import AdminAuthItemTableList from "@src/pages/modules/admin/AdminAuthItem/component/list/AdminAuthItemTableList";
  import AdminMenuForm from "../../form/AdminMenuForm";
  import LpTableList from "@src/resource/mixins/LpTableList";
  import TreeTableList from "@src/resource/components/TreeTableList/index";

  export default {
    name: "AdminMenuTreeTableList",
    components: {TreeTableList, AdminAuthItemTableList, SearchBox},
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
        this.showModal(AdminMenuForm, config)
      },
      deleteSelected() {

        if (this.storeData.table.selected && this.storeData.table.selected.length > 0) {

          //弹窗确认
          this.LpAlert({
            title: "系统提示",
            message: "您确认批量删除 (" + this.storeData.table.selected.length + ") 条数据么?",
            ok: () => {
              var ids = [];
              this.storeData.table.selected.map((item) => {
                ids.push(item.id)
              })
              this.$store.dispatch(this.storePath + "/delRow", {ids: ids, __this: this});
            }
          })
        } else {
          this.$message.info("请选择要删除的数据")
        }

      },
      doexpandALL() {
        this.storeData.table.loading = true;
        this.$nextTick(() => {
          this.$store.commit(this.storePath + '/expandAll')
          this.$nextTick(() => {
            this.storeData.table.loading = false;
          })
        })
      }
    }
  }
</script>

<style lang="less" scoped>
    @import "~@resource/assets/styles/subpage.less";
</style>