export default {
  install:(Vue)=>{
    //此注释为生成系统自动添加路由标识，使用生成时请不要删除
		Vue.component('system_process_HhProcess', (resolve) => {require.ensure([], () => resolve(require('@pages/modules/system/process/HhProcess')),'system_process_HhProcess')})
		Vue.component('system_process_HhProcessCat', (resolve) => {require.ensure([], () => resolve(require('@pages/modules/system/process/HhProcessCat')),'system_process_HhProcessCat')})
    Vue.component('home', (resolve) => {require.ensure([], () => resolve(require('@pages/modules/home')),'home')})
		Vue.component('plate_system_AdminAuthItem', (resolve) => {require.ensure([], () => resolve(require('@pages/modules/plate/system/AdminAuthItem')),'plate_system_AdminAuthItem')})
    Vue.component('plate_system_AdminUser', (resolve) => {require.ensure([], () => resolve(require('@pages/modules/plate/system/AdminUser')),'plate_system_AdminUser')})
    Vue.component('plate_system_AdminMenu', (resolve) => {require.ensure([], () => resolve(require('@pages/modules/plate/system/AdminMenu')),'plate_system_AdminMenu')})

  }
}