const main = {
  namespaced: true,
  state: {
    userInfo: null,
    token: null,
    userMenu: [],
    leftMenu: [],
    sysConfig: {
      appName: null
    },
    windowSize:{
      width:1024,
      height:768,
    },
    openTabs: [
      {title: "首页", index: "-1", component: "home"},
    ],
    loading: true,
  },
  mutations: {
    setMainData(state,data)
    {
      state=Object.assign(state,data);

      console.log(state)
    },
    getLocalToken(state)
    {
      var token = localStorage.getItem('token')
      if(token)
      {
        state.token=token;
      }
    },
    /**
     * 初使化系统
     * @param context
     */
    init(state) {
      var databody={
        token:state.token
      }
      lp.$http().get(lp.$Api.init, databody, (response) => {
        state.token=response.data.token;
        localStorage.setItem("token", state.token);
          lp.$request.data({
            token:state.token
          })
        if(!response.data.userInfo)
        {
          state.userInfo=response.data.userInfo;
          lp.route.push("/login");
        }else{
          lp.route.push("/");
        }
        state.loading=false
      })
    },
  },
  actions: {
    /**
     * 获取用户菜单及信息
     * @param context
     */
    getUserData(context) {
      lp.$http().showError(false).get(lp.$Api.getuserdata, null, (response) => {
        if (response.status == 100) {
          response.data.userMenu = lp.$util.setpath(response.data.userMenu)
          var leftMenu = [];
          if (response.data.userMenu && response.data.userMenu.length > 0 && response.data.userMenu[0].sub) {
            leftMenu = response.data.userMenu[0].sub;
          }
          context.commit("setMainData", {
            userInfo: response.data.userInfo,
            userMenu: response.data.userMenu,
            leftMenu: leftMenu
          })
        }
      })
    },
    /**
     * 退出登录
     * @param command
     */
    loginOut(context)
    {
      lp.$LPspin.show("正在退出")
      //  localStorage.removeItem("token");
        context.state.userInfo = null
       //   context.state.token=null
          context.state.openTabs=[
      {title: "首页", index: "-1", component: "Home"},
    ]
    },
    /**
     * 监听窗口在小变化
     */
    checkResize(context)
    {
      if(!window.onresize){
        context.dispatch("setWindowSize")
        rxjs.fromEvent(window,'resize')
          .pipe(rxjs.operators.debounceTime(100),rxjs.operators.throttleTime(150))
          .subscribe(()=>{
          context.dispatch("setWindowSize")
        })
      }
    },
    setWindowSize(context)
    {
      if(context.state.windowSize.width!=document.body.clientWidth||context.state.windowSize.height!=document.body.clientHeight)
      {
        context.state.windowSize={
          width:document.body.clientWidth,
          height:document.body.clientHeight,
        }
      }

    }

  }
}
export default main;