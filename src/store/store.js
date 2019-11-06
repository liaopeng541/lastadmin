/**
 * 全局扫描store。注意，只会扫描路径中带有store的文件
 * @type {{}}
 */

//引入store模板
import storetpl from "@resource/storetpl/index";
window.store={tpl:storetpl};
console.log(window.store)
let modules = {};
//扫描
const Context = require.context('../pages', true, /(?:store)\/[\w|\/]*\.js$/);
Context.keys()
  .map((key) => {
    let patharr = key.replace('.js', '').replace("./", "")
      .replace("/store/", "/").split("/");
    let module = {};
    for (var i = patharr.length - 1; i > 0; i--) {
      //第一层不用添加父模块，第一层等于index或者store的用父文件夹名做模块名，第一层等于父文件夹名的用父文件夹名做模块名，
      if (i == patharr.length - 1 || (i == patharr.length - 2 && (patharr[i + 1].toLowerCase() == 'index'||patharr[i + 1].toLowerCase() == 'store'))
        || (i == patharr.length - 2 && patharr[i + 1] == patharr[i])) {
        module={};
        module[patharr[i]] = Context(key).default;
      } else {
        let temp = {};
        temp[patharr[i]] = {namespaced: true, modules: module}
        module = temp
      }
    }

    modules = _.merge({},modules, module)
  })
//注册一个合局的模块，用于放置没有指定路径的store
modules['top']={namespaced: true};
const store = new Vuex.Store({
  modules: modules
})
export default store;