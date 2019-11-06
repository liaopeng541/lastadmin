export default _.merge({}, store.tpl.page, {
  state: {
    table: {
      url: {
        list: "shop/prize/prize-list",
      },
      params: {},
      rowKey: false,
      list: [],
      loading:false,
      multipleSelection: [],
      items: [
        {field: "id", label: "编号", tpl: "text", show: true, sort: true,width:''},
        {field: "name", label: "name", tpl: "text", show: true, sort: true},
        {field: "type", label: "type", tpl: "text", show: true, sort: true},
        {field: "goods_id", label: "goods_id", tpl: "text", show: true, sort: true},
        {field: "attr_id", label: "attr_id", tpl: "text", show: true, sort: true},
        {field: "user_money", label: "user_money", tpl: "text", show: true, sort: true},
        {field: "wx_moeny", label: "wx_moeny", tpl: "text", show: true, sort: true},
        {field: "day_max_total_money", label: "day_max_total_money", tpl: "text", show: true, sort: true},
        {field: "min_money", label: "min_money", tpl: "text", show: true, sort: true},
        {field: "max_money", label: "max_money", tpl: "text", show: true, sort: true},
        {field: "add_time", label: "add_time", tpl: "text", show: true, sort: true},
        {field: "prize_level", label: "prize_level", tpl: "text", show: true, sort: true}
      ],
      sort: {},
    },
    searchForm: {
      items: [
        {field: "uid", label: "用户ID", tpl: "input", value: "", searchType: "="},
        {field: "use_type", label: "UseType", tpl: "input", value: "", searchType: "="},
      ],

    },
    pagination: {
      pageSize: 10,
      pageSizes: [10, 20, 50, 100],
      currentPage: 1,
      total: 0,
    },
    form: {
      url: {
        detail: 'shop/prize/prize-form-detail'
      },
      loading: false,
      items: [
        {field: "id", label: "编号", tpl: "", value: "", placeholder: ""},
        {field: "name", label: "名称", tpl: "input", value: "", placeholder: ""},
        {
          field: "type", label: "类型", tpl: "select", value: 1, placeholder: "", option: [
            {value: '1', label: '外围商品'},
          ]
        },
        {field: "goods_id", label: "商品", tpl: "input", value: "", placeholder: ""},
        {field: "attr_id", label: "商品属性", tpl: "input", value: "", placeholder: ""},
        {field: "user_money", label: "用户余额", tpl: "input", value: "", placeholder: ""},
        {field: "wx_moeny", label: "微信红包", tpl: "input", value: "", placeholder: ""},
        {field: "day_max_total_money", label: "每日总限额", tpl: "input", value: "", placeholder: ""},
        {field: "min_money", label: "最小金额", tpl: "date", value: "", placeholder: ""},
        {field: "max_money", label: "最大金额", tpl: "input", value: "", placeholder: ""},
        {field: "add_time", label: "add_time", tpl: "input", value: "", placeholder: ""},
        {field: "prize_level", label: "奖品等级", tpl: "number", value: "", placeholder: ""},
        {field: "winning_rate", label: "中奖率", tpl: "number", value: "20", placeholder: ""},
        {field: "status", label: "是否开启", tpl: "number", value: "1", placeholder: ""},
      ],
      rules: {
        name: [
          {required: true, message: '请输入活动名称', trigger: 'blur'},
          {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
        ],
      }
    }
  },
  mutations: {},
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
      console.log(params)
      var databody = {
        query: JSON.stringify(params)
      };
      //合并查询分页排序参
      //获取数据
      lp.$http().onLoading((loading) => {
        context.state.loading = loading
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
      context.state.selected = data;
    },
    /**
     *删除列表选中项
     */
    delRow(context, {data, __this}) {
      var databody = {
        data: JSON.stringify(data)
      }
      lp.$http().onLoading((loading) => {
        context.state.loading = loading
      })
        .post(lp.$Api.baseurl + context.state.url.del, databody, (response) => {
          __this.$message(response.message)
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