export default{
  state: {

  },
  mutations: {
    //记录值用于重置表单
    recordInitData(state) {
      if (!state.initData) {
        state.initData = _.cloneDeep(state);
      }
    },
    //重置某个数据
    reset(state, dataName) {
      if (state.initData && state.initData[dataName]) {
        state[dataName]=_.cloneDeep(state.initData[dataName])
      }
    }
  },
  actions:{
    /**
     * 获取详情，即是详情页接口，同时也返回需要的数据（例如下拉选择项，单多选项）
     * @param context
     * @param data
     */
    getDetail(context,data){
      context.commit("recordInitData")
      context.commit("reset","item")
      //获取数据
      lp.$http().onLoading((loading) => {
        context.state.loading = loading
      })
        .post(lp.$Api.baseurl + context.state.url.detail, data.data, (response) => {

          if(response.data)
          {
            context.state.item.map((item,i)=>{
              if(response.data[item.field])
              {
                context.state.item[i].value=response.data[item.field];
              }
            })
          }
      //    data.__this.$refs.form.clearValidate();
        })
    },
    submit(context,{__this})
    {
      //组织别表单数据
      var databody=context.getters["formItem"];



      Object.keys(databody).map((key)=>{
        if(typeof databody[key]=='object')
        {
          databody[key]=JSON.stringify(databody[key]);
        }
        if(databody[key]===true)
        {
          databody[key]=1
        }
        if(databody[key]===false)
        {
          databody[key]=0
        }
      })
      lp.$http().onLoading((loading) => {
        context.state.loading = loading
      }).post(lp.$Api.baseurl + context.state.url.submit, databody, (response) => {
        __this.$message.success(response.message);
        __this.$parent.$parent.reFresh()
        __this.hide()
      })
    }

  },
  getters: {
    searchParams: state => {
      return lp.$util.getSearchParams(state);
    },
    formItem: state => {
      return lp.$util.getItem(state.item, 'field', 'value');
    },
    formRules: state => {
      return lp.$util.getItem(state.item,'field', 'rule');
    },
  }
}