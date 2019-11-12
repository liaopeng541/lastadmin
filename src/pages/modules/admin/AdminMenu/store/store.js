export default _.merge({}, store.tpl.page, {
  state: {
    table: {
      url: {
        list: "system/admin-menu/list",
        del:"system/admin-menu/delete"
      },
      params: {},
      rowKey: false,
      list: [],
      loading:false,
      multipleSelection: [],
      expandcolum:"name",
      expandname:"菜单名称",
      expandAll:false,
      items: [
        {field: "id", label: "编号", tpl: "hidden", show: false, sort: true,width:80},
        {field: "name", label: "菜单名称", tpl: "hidden", show: false, sort: true},
        {field: "url", label: "链接", tpl: "text", show: true, sort: true},
      ],
      sort: {},
      selected:[],
    },
    searchForm: {
      items: [
        {field: "name", label: "菜单名称", tpl: "input", value: "", searchType: "like"},
      ],

    },
    pagination: {
      pageSize: 10,
      pageSizes: [10, 20, 50, 100],
      currentPage: 1,
      total: 0,
    },

  },
  mutations: {
    expandAll(state){
      state.table.expandAll=!state.table.expandAll
      var list=[];
      state.table.list.map((item,i)=>{
        list.push(Object.assign(item,{_expanded:state.table.expandAll}))
      })
      state.table.list=list
    }
  },
  actions: {
    /**
     * 加载列表数据
     */
    loadTable(context) {
      context.commit("recordInitData")
      let searchParams = lp.$util.getSearchParams(context.state.searchForm.items);
      let pageParams = context.state.pagination;
      let sortParams = context.state.table.sort
      let query = {
        pagination: pageParams,
        condition: searchParams,
        sort: sortParams
      };
      let params = Object.assign({}, query, context.state.table.params)
      var databody = {
        query: JSON.stringify(params)
      };
      //合并查询分页排序参
      //获取数据
      lp.$http().onLoading((loading) => {
        context.state.table.loading = loading
      })
        .post(lp.$Api.baseurl + context.state.table.url.list, databody, (response) => {
          context.state.table.list = response.data.list;
          context.state.pagination && (context.state.pagination.total = parseInt(response.data.total));
        })
    },

    /**
     * 表格排序
     */
    sortTable(context, params) {
      if (context.state.table.sort) {
        if (params.column) {
          let sort = (params.column.order == 'ascending' || params.column.order == 'asc') ? 'asc' : 'desc'
          context.state.table.sort[params.column.sortable] = sort
        } else {
          if (params.curThead.sortable && context.state.table.sort[params.curThead.sortable]) {
            delete context.state.table.sort[params.curThead.sortable];
          }
        }
        context.dispatch("loadTable")
      }
    },
    /**
     * 设置列表选中项
     */
    changeSelected(context, {data, __this}) {
      context.state.table.selected = data;
    },
    /**
     *删除列表选中项
     */
    delRow(context, {ids, __this}) {
      var databody = {
        delete_data: JSON.stringify(ids)
      }
      lp.$http().onLoading((loading) => {
        context.state.loading = loading
      })
        .post(lp.$Api.baseurl + context.state.table.url.del, databody, (response) => {
          __this.$message.success(response.message)
          __this.reFresh()
        })
    },
    /**
     * 获取详情，即是详情页接口，同时也返回需要的数据（例如下拉选择项，单多选项）
     * @param context
     * @param data
     */
    getDetail(context, data) {
      context.commit("recordInitData")
      context.commit("reset", "form")
      //获取数据
      lp.$http().onLoading((loading) => {
        context.state.loading = loading
      })
        .post(lp.$Api.baseurl + context.state.form.url.detail, data.data, (response) => {
          //设置选项参数
          if (response.data && response.data.options) {
            Object.keys(response.data.options).map((item) => {
              context.state.form.items && context.state.form.items.map((formItem, key) => {
                if (item == formItem.field) {
                  formItem.option = response.data.options[item]
                }
              })

            })
          }
          //设置数据
          if (response.data && response.data.model) {
            Object.keys(response.data.model).map((item) => {
              context.state.form.items && context.state.form.items.map((formItem, key) => {
                if (item == formItem.field) {
                  formItem.value = response.data.model[item]
                }
              })

            })
          }
          //清除验证，此项有待改进。。。
          data.__this.$refs.form.clearValidate();
        })
    },

  },
  getters: {
    formItem: state => {
      return lp.$util.getItem(state.form.item, 'field', 'value');
    },
    formRules: state => {
      return lp.$util.getItem(state.form.item, 'field', 'rule');
    },
  }
});