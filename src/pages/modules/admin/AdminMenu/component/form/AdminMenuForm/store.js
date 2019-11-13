export default _.merge({}, store.tpl.page, store.tpl.data, {
  state: {
    form: {
      url: {
        detail: "system/admin-menu/detail",
        update: "system/admin-menu/update",
      },
      loading: false,
      items: [
        {field: "id", label: "编号", tpl: "hidden", show: false, sort: true,value:""},
        {field: "pid", label: "上级菜单", tpl: "cascader",show: true, options:{
          url:'system/admin-menu/get-tree-child',
          props:{ value: 'id', label: 'name'}
          },value:"",span:24,width:500},
        {field: "name", label: "菜单名称", tpl: "input", show: true, value:""},
        {field: "iconfont", label: "图标", tpl: "input", show: true, value:""},
        {field: "url", label: "链接", tpl: "input", show: true, value:""},
      ],
      rules: {
        name: [
          {required: true, message: '请输入活动名称', trigger: 'blur'},
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