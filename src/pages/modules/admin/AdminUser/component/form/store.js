export default _.merge({}, store.tpl.page, {
  state: {
    form: {
      url: {
        detail: 'shop/prize/prize-form-detail'
      },
      loading: false,
      items: [
        {field: "name", label: "角色名称", tpl: "text", show: true, sort: true},
        {field: "description", label: "角色介绍", tpl: "text", show: true, sort: true},
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
  actions: {},
  getters: {
    formItem: state => {
      return lp.$util.getItem(state.form.item, 'field', 'value');
    },
    formRules: state => {
      return lp.$util.getItem(state.form.item, 'field', 'rule');
    },
  }
});