export default _.merge({}, store.tpl.page, store.tpl.data, {
  state: {
    form: {
      url: {
        detail: "system/process/admin-menu-detail",
        update: "system/process/admin-menu-update",
      },
      loading: false,
      items: [
        {field: "id", label: "ID", tpl: "input",span:24},
        {field: "pid", label: "父菜单", tpl: "input",span:24},
        {field: "name", label: "菜单名称", tpl: "input",span:24},
        {field: "url", label: "菜单链接", tpl: "input",span:24},
        {field: "display", label: "是否显示", tpl: "input",span:24},
        {field: "sort", label: "排序", tpl: "input",span:24},
        {field: "iconfont", label: "菜单图标", tpl: "input",span:24},
        {field: "group_id", label: "分组", tpl: "input",span:24},
      ],
      rules: {
        name: [
          {required: true, message: '请输入用户名', trigger: 'admin_name'},
        ],
      }
    }
  },
  mutations: {},
  actions: {
    /**
     * 获取详情，即是详情页接口，同时也返回需要的数据（例如下拉选择项，单多选项）
     * @param context
     * @param data
     */
    getDetail(context, {data,__this}) {
      context.commit("recordInitData")
      context.commit("reset", "form")
      if (!data) {
        return
      }
      var databody={
        detail_data:JSON.stringify(data)
      }
      //获取数据
      lp.$http().onLoading((loading) => {
        context.state.loading = loading
      })
        .post(lp.$Api.baseurl + context.state.form.url.detail, databody, (response) => {
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
                  context.state.form.items[key].value = response.data.model[item]
                }
              })

            })
          }
          context.state.form.items=_.cloneDeep(context.state.form.items)
        })
    },
    submit(context, {__this}) {
      var databody={};
      databody["submit_data"] = JSON.stringify(lp.$util.getFormData(context.state.form.items))
      databody["submit_type"] = __this.params.type
      console.log(databody)
      lp.$http().onLoading((loading) => {
        context.state.loading = loading
      }).post(lp.$Api.baseurl + context.state.form.url.update, databody, (response) => {
        __this.$message.success(response.message);
        __this.$parent.$parent.reFresh()
        __this.hide()
      })
    }
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