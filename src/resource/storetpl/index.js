/**
 * 全局扫描store模板
 * @type {{}}
 */

let tpl = {};
let modules={};
//扫描
const Context = require.context('./tpl', true, /\.js$/);
let base=null;
Context.keys()
  .map((key) => {
    var tplname = key.replace("./","").replace(".js","")
    if(tplname=="base")
    {
      base=Context(key).default;
    }else{
      tpl[tplname]=Context(key).default;
    }
  })
_.keys(tpl).map((key)=>{
  modules[key]=_.merge({},base,tpl[key])
})
export default modules;