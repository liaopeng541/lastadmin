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
      console.log("resetPateData")
      if (state.initData && state.initData[dataName]) {
        state[dataName]=_.cloneDeep(state.initData[dataName])
      }
    },
  },
  actions:{
    /**
     * 获取详情，即是详情页接口，同时也返回需要的数据（例如下拉选择项，单多选项）
     * @param context
     * @param data
     */
    getDetail(context, data) {
      context.commit("recordInitData")
      context.commit("reset", "form")
      if(!data)
      {
        return
      }
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
    submit(context,{__this})
    {
      // console.log(context.state.form)
      // //组织别表单数据
      // var databody1=context.getters["formItem"];
      // console.log(databody1)
      // var databody=context.getters["formData"];
      // console.log(databody);

      var databody=lp.$util.getFormData(context.state.form.items)
      console.log(databody)
      //
      // Object.keys(databody).map((key)=>{
      //   if(typeof databody[key]=='object')
      //   {
      //     databody[key]=JSON.stringify(databody[key]);
      //   }
      //   if(databody[key]===true)
      //   {
      //     databody[key]=1
      //   }
      //   if(databody[key]===false)
      //   {
      //     databody[key]=0
      //   }
      // })
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
    // searchParams: state => {
    //   return lp.$util.getSearchParams(state);
    // },
    // formItem: state => lp.$util.getFormItem(state.form.items),
    // formRules: state => {
    //   return lp.$util.getItem(state.item,'field', 'rule');
    // },
    // formData:(state,getters)=>{
    //   var databody=getters.formItem;
    //   Object.keys(databody).map((key)=>{
    //     if(typeof databody[key]=='object')
    //     {
    //       databody[key]=JSON.stringify(databody[key]);
    //     }
    //     if(databody[key]===true)
    //     {
    //       databody[key]=1
    //     }
    //     if(databody[key]===false)
    //     {
    //       databody[key]=0
    //     }
    //   })
    //   return databody
    // }
  }
}