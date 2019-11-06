<template>
    <div>
        <el-popover
                placement="bottom-start"
                width="800"
                trigger="click"
                v-model="isshow"
                popper-class="lppop"
                @show="showselect"
        >
            <div style="padding: 5px 10px">
                <el-form :inline="true" class="search_form" style="flex: 1">
                    <el-form-item label="商品名称"  :show-message="false">
                        <el-input @keyup.enter.native="search" v-model="searchForm.name.value"
                                  placeholder="请输入商品名称"></el-input>
                    </el-form-item>
                    <el-form-item label="类别名称" :show-message="false" >
                        <el-cascader  placeholder="请选择类别名称" :clearable="true"
                                      :options="this.pageData.cat_id.list"
                                      :props="this.pageData.cat_id.props"
                                      v-model="searchForm.cat_id.value"
                                      change-on-select
                        ></el-cascader>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
                        <el-button @click="resetSearchForm">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <el-table :data="table.list"
                      ref="multipleTable"
                      header-row-class-name="table_th"
                      :border="true"
                      @selection-change="handleSelectionChange"
            >
                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column
                        width="50">
                    <template slot-scope="scope">
                        <el-radio v-model="selected_cat" :label="scope.row.id"/>
                    </template>
                </el-table-column>

                <el-table-column label="商品名称">
                    <template slot-scope="scope">
                        {{scope.row.name}}
                    </template>
                </el-table-column>
                <el-table-column label="类别名称">
                    <template slot-scope="scope">
                        {{scope.row.cat_id}}
                    </template>
                </el-table-column>
                <el-table-column label="详情">
                    <template slot-scope="scope">
                        {{scope.row.memo}}
                    </template>
                </el-table-column>
                <el-table-column label="库存数量">
                    <template slot-scope="scope">
                        {{scope.row.store_count}}
                    </template>
                </el-table-column>
            </el-table>
            <div style="display: flex;padding: 5px 5px 2px 5px">
                <el-pagination
                        style="flex: 1;"
                        v-loading="table.loading"
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="table.pagination.currentPage"
                        :page-sizes="table.pagination.pageSizes"
                        :page-size="table.pagination.pageSize"
                        layout="total,  prev, pager, next"
                        :total="table.pagination.total">
                </el-pagination>
                <div style="text-align: right;width: 120px;">
                    <el-button size="mini" type="text" @click="selectedCat = false">取消
                    </el-button>
                    <el-button type="primary" size="mini" @click="setCat">
                        确定
                    </el-button>
                </div>
            </div>

            <div>

            </div>
            <div slot="reference">
                <el-input  placeholder="" :readonly="true" :clearable="true">

                    <i slot="suffix" style="cursor: pointer;font-size: 20px; "
                       class="el-input__icon el-icon-caret-bottom"
                       :class="isshow?'el-icon-caret-top':'el-icon-caret-bottom'"></i>
                </el-input>
            </div>
        </el-popover>

    </div>
</template>

<script>
    import TreeTable from "../../components/TreeTable/index";
    import LPModel from "../../components/LPModel";
    import IconSelect from "../../components/IconSelect";
    import PopButton from "../../components/popButton/popButton";
    import LPup from "../../components/LPup/LPup";
    import LPups from "../../components/LPup/LPups";

    export default {
        name: "popInputTable",
        components: {LPup, LPups,PopButton,  LPModel, TreeTable},
        data() {
            return {
                selected_cat:"",
                isshow:false,
                imageUrl: '',
                pageData: {
                    cat_id: {
                        list: [],
                        props: {
                            value: "id",
                            label: "name"
                        }
                    },
                    c_id: {
                        list: [],
                    },
                    cat_id: {
                        list: [],
                        props: {
                            value: "id",
                            label: "name"
                        }
                    },
                    c_id: {
                        list: [],
                    },

                },
                searchExpand:{
                    expand:false,
                    btnText:"展开",
                    btnIcon :"el-icon-arrow-down"
                },
                searchForm: {
                    name: {
                        value: "",
                        searchType: "like",
                    },
                    cat_id: {
                        value: [],
                        searchType: "like",
                    },
                    c_id: {
                        value: "",
                        searchType: "like",
                    },

                },
                editorForm: {
                    title: "添加商品",
                    show: false,
                    items: {
                        name: "",
                        cat_id: [],
                        memo: "",
                        store_count: "",
                        c_id: "",
                        price: "",
                        unit: "",
                        c_length: "",
                        c_width: "",
                        c_hight: "",
                        aux_unit: "",
                        period: "",
                        spec: "",
                        weight: "",
                        imgs: [],

                    },
                    rules: {
                        name: [
                            {required: true, message: '请输入商品名称', trigger: 'blur'},
                        ],
                        cat_id: [
                            {required: true, message: '请输入类别名称', trigger: 'blur'},
                        ],
                        store_count: [
                            {required: true, message: '请输入库存数量', trigger: 'blur'},
                        ],
                        c_id: [
                            {required: true, message: '请选择商户'},
                        ],

                    }
                },
                table: {
                    loading: true,
                    list: [],
                    pagination: {
                        pageSize: 10,
                        pageSizes: [10, 20, 50, 100],
                        currentPage: 1,
                        total: 0,
                    },
                    multipleSelection: []
                }
            }
        },
        mounted() {

        },
        methods: {
            setCat(){

            },
            showselect()
            {
                this.fetchData();
                this.fetchPageData();
            },
            handleSearchExpand()
            {
                this.searchExpand.expand=!this.searchExpand.expand;
                this.searchExpand.btnText= this.searchExpand.expand?"收起":"展开";
                this.searchExpand.btnIcon= this.searchExpand.expand?"el-icon-arrow-up":"el-icon-arrow-down";
            },
            handleCheckChange()
            {
                this.editorForm.items.memo=this.getTreeKeys().join(",");
            },
            delDatas() {
                var selected = this.checkSelected();
                if (selected) {
                    this.$confirm('你确认删除这些数据么?', '提示', {
                        distinguishCancelAndClose: true,
                        confirmButtonText: '确认',
                        cancelButtonText: '取消',
                        // type: 'warning'
                    }).then(() => {
                        this.delData(selected);
                    }).catch(action => {


                    });

                }
            },
            setDatas(field, value) {
                var selected = this.checkSelected();
                var sets = [];
                if (selected) {
                    selected.map((item) => {
                        sets.push({
                            name: 'WtCargo',
                            key: field,
                            value: value,
                            condition: ['=', id, item],
                        })
                    })

                }

                var databody = {
                    access_token: this.$store.state.main.token,
                    set: JSON.stringify(sets)
                }
                this.fetch(databody, () => {
                    this.$message.success("设置成功");
                    this.fetchData();
                })


            },
            checkSelected() {
                var selected = this.$common.checkSelected(this.table.multipleSelection, id);
                if (selected) {
                    return selected;
                } else {
                    this.$message.info("请选择数据");
                }

            },
            getcat_id()
            {
                var databody = {
                    access_token: this.$store.state.main.token,
                    query: JSON.stringify({
                        name: "WtCategory",
                        tree: {
                            key: 'id',
                            pkey: 'for_id',
                            rootkey:0,
                            subname:'children',
                        },
                        pagination: 'all'
                    })
                }
                this.$http().post(this.$Api.fetchData, databody).then((response) => {

                    if (response.status == 100) {
                        this.pageData.cat_id.list = response.data.data;

                    } else if (response.status == 109) {
                        this.$store.dispatch("main/reLogin", this);
                    } else {
                        this.$message.error(response.msg);
                    }
                }).catch((e) => {
                    this.$message.error("网络访问失败，请重试")
                })

            },
            getc_id()
            {
                var databody = {
                    access_token: this.$store.state.main.token,
                    query: JSON.stringify({
                        name: "WtCompany",
                        pagination: 'all',
                    })
                }
                this.$http().post(this.$Api.fetchData, databody).then((response) => {

                    if (response.status == 100) {
                        this.pageData.c_id.list = response.data.data;

                    } else if (response.status == 109) {
                        this.$store.dispatch("main/reLogin", this);
                    } else {
                        this.$message.error(response.msg);
                    }
                }).catch((e) => {
                    this.$message.error("网络访问失败，请重试")
                })

            },
            getcat_id()
            {
                var databody = {
                    access_token: this.$store.state.main.token,
                    query: JSON.stringify({
                        name: "WtCategory",
                        tree: {
                            key: 'id',
                            pkey: 'for_id',
                            rootkey:0,
                            subname:'children',
                        },
                        pagination: 'all'
                    })
                }
                this.$http().post(this.$Api.fetchData, databody).then((response) => {

                    if (response.status == 100) {
                        this.pageData.cat_id.list = response.data.data;

                    } else if (response.status == 109) {
                        this.$store.dispatch("main/reLogin", this);
                    } else {
                        this.$message.error(response.msg);
                    }
                }).catch((e) => {
                    this.$message.error("网络访问失败，请重试")
                })

            },
            getc_id()
            {
                var databody = {
                    access_token: this.$store.state.main.token,
                    query: JSON.stringify({
                        name: "WtCompany",
                        pagination: 'all',
                    })
                }
                this.$http().post(this.$Api.fetchData, databody).then((response) => {

                    if (response.status == 100) {
                        this.pageData.c_id.list = response.data.data;

                    } else if (response.status == 109) {
                        this.$store.dispatch("main/reLogin", this);
                    } else {
                        this.$message.error(response.msg);
                    }
                }).catch((e) => {
                    this.$message.error("网络访问失败，请重试")
                })

            },

            fetchPageData() {
                this.getcat_id();
                this.getc_id();
                this.getcat_id();
                this.getc_id();

            },
            resetSearchForm() {
                this.searchForm = {
                    name: {
                        value: "",
                        searchType: "like",
                    },
                    cat_id: {
                        value: [],
                        searchType: "like",
                    },
                    c_id: {
                        value: "",
                        searchType: "like",
                    },

                }
                this.fetchData();
            },
            resetForm() {
                this.editorForm.items = {
                    name: "",
                    cat_id: [],
                    memo: "",
                    store_count: "",
                    c_id: "",
                    price: "",
                    unit: "",
                    c_length: "",
                    c_width: "",
                    c_hight: "",
                    aux_unit: "",
                    period: "",
                    spec: "",
                    weight: "",
                    imgs: [],

                }
            },
            submit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        var condition = {};
                        if (this.editorForm.items.id) {
                            condition = {id: this.editorForm.items.id}
                        }
                        var databody = {
                            access_token: this.$store.state.main.token,
                            save: JSON.stringify({
                                name: "WtCargo",
                                data: this.editorForm.items,
                                condition: condition,
                                unique: []
                            })
                        }
                        this.$LPspin.show("正在保存...")
                        this.fetch(databody, (response) => {
                            this.$message.success("保存成功");
                            this.fetchData();
                            this.editorForm.show = false;
                        }, () => {
                            this.$LPspin.hide();
                        })
                    } else {
                        this.$message.error("请按要求填写后提交")
                        return false;
                    }
                });

            },
            setStatus(id, key, val) {
                var databody = {
                    access_token: this.$store.state.main.token,
                    set: JSON.stringify([{
                        name: 'WtCargo',
                        key: key,
                        value: val,
                        condition: ['=', id, id],
                    }])
                }
                this.fetch(databody, () => {
                    this.fetchData();
                });
            },
            delData(ids) {
                if (typeof(ids) != 'object') {
                    ids = [ids];
                }
                var databody = {
                    access_token: this.$store.state.main.token,
                    del: JSON.stringify({
                        name: 'WtCargo',
                        condition: ['in', id, ids]
                    })
                }
                this.fetch(databody, () => {
                    this.$message.success("删除成功")
                    this.fetchData();
                })


            },
            addData() {
                this.resetForm();
                this.editorForm.title = "添加商品";
                this.editorForm.show = true;

            },
            editData(row) {
                this.resetForm();
                this.editorForm.items = _.cloneDeep(row);

                this.editorForm.title = "编辑商品";
                this.editorForm.show = true;
                this.$nextTick(function () {
                    this.setCheckedKeys();
                });

            },

            handleSelectionChange(val) {
                this.table.multipleSelection = val;
            },
            setSelected(selected) {
                if (selected.length > 0) {
                    selected.map((item) => {
                        this.table.list.map((row) => {
                            if (row.id == item.id) {
                                this.$refs.multipleTable.toggleRowSelection(row, true);
                            }
                        })

                    })
                }
            },
            fetchData() {
                var databody = {
                    access_token: this.$store.state.main.token,
                    query: JSON.stringify({
                        name: "WtCargo",
                        condition: this.$common.buildCondition(this.searchForm),
                        pagination: this.table.pagination,
                    })
                }
                var selected = _.cloneDeep(this.table.multipleSelection);
                this.fetch(databody, (response) => {
                    this.table.list = response.data.data;
                    this.table.pagination.total = parseInt(response.data.total);
                    this.$nextTick(function () {
                        this.setSelected(selected)
                    });


                }, () => {
                    this.table.loading = false;
                });
            },
            handleSizeChange() {

            },
            handleCurrentChange() {
                this.fetchData();
            },


            search() {
                this.fetchData();

            },
            fetch(databody, callBack = null, commonCallBack = null) {
                this.$http().post(this.$Api.fetchData, databody).then((response) => {
                    if (response.status == 100) {
                        callBack && callBack(response);
                    } else if (response.status == 109) {
                        this.$store.dispatch("main/reLogin", this);
                    } else {
                        this.$message.error(response.msg);
                    }
                    commonCallBack && commonCallBack();

                }).catch((e) => {
                    commonCallBack && commonCallBack();
                    this.$message.error("网络访问失败，请重试")
                })
            },

        }
    }
</script>

<style lang="less" scoped>
    @import "~@resource/assets/styles/subpage.less";
</style>