//异步引入组件

// import routerMap from "./routerMap";
//
// window.routers = [];
// routerMap.map((item) => {
//   window.routers[item.name] = item;
// })
let Index = Vue.component('Index', (resolve) => {require.ensure([], () => resolve(require(`../pages/frame/Index`)))})
let Login = Vue.component('Login', (resolve) => {require.ensure([], () => resolve(require('../pages/frame/Login')))})

const router = new VueRouter({
  mode: "history",
  routes: [
    {path: '/', name: 'Index', component: Index, meta: {title: '亨亨养车-管理中心'}},
    {path: '*', redirect: '/'},
    {path: '/Login', name: 'Login', component: Login, meta: {title: '亨亨养车-登陆'}},
  ]
})
//修改每个路由的标题
router.beforeEach((to, from, next) => {
  if (to.meta.title) {//如果设置标题，拦截后设置标题
    document.title = to.meta.title
  }
  //搞个进度条。
  NProgress.start();
  next()
})
//当路由跳转结束后
router.afterEach(() => {
  // 关闭进度条
  NProgress.done()
})
export default router;