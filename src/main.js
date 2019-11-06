const App =Vue.component('App', (resolve) => {require.ensure([], () => resolve(require('./App')), 'App')})
import router from './router/router'

import '@resource/assets/styles/global.css';

//自定义的加载中状态组件
import LPspin from "@resource/components/LPspin/index"
//自定义公用函数
import * as common from "@resource/libs/common"
import Api from "@resource/config/Api"
import util from "@resource/libs/util"
Vue.prototype.$util=util;
Vue.prototype.$common=common;
Vue.prototype.$Api=Api;
Vue.use(LPspin);

// import uploader from 'vue-simple-uploader'
// Vue.use(uploader)


//网络库
import request from "@resource/components/LPrequest"

Vue.prototype.$request=request;

Vue.prototype.$http=request.http;

//引入全局状态树
import store from "./store/store"
Vue.prototype.$store=store;




//注册全局页面组件

import LpPopPage from "@resource/components/LpPopPage";
window.LpPopPage=LpPopPage;

  //子页面头部
import pagebreadcrumb from "@resource/components/pagebreadcrumb";
Vue.component("pagebreadcrumb",pagebreadcrumb)
  //搜索框
import searchform from "@resource/components/searchform";
Vue.component("searchform",searchform)

  //表工具条
import tableBar from "@resource/components/TableList/TableBar";
Vue.component("tableBar",tableBar)
  //修改后的table
import TableList from "@resource/components/TableList";
Vue.component("TableList",TableList)

//全局设置elementUI尺寸
Vue.prototype.$ELEMENT = { size: 'mini'};


//定主全局可调用的核心
window.lp=Vue.prototype
//全局事件广播
window.lp.event=new Vue();
//注册tabframe框架
import tabFrame from "@resource/components/LpTabFrame"

import splitPane from 'vue-splitpane'
Vue.component('split-pane', splitPane);

//引入图表库
import VCharts from 'v-charts'
Vue.use(VCharts)


Vue.use(tabFrame)
new Vue({
  el: '#app',
    router,
  render: h => h(App)
})

