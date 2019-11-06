const util={
  setpath:(menu, path = null)=>{
    menu && menu.map((item, i) => {
      if (path) {
        menu[i]['path'] = path.concat([item.name]);
      } else {
        menu[i]['path'] = [item.name]
      }
      if (item.sub) {
        menu[i]['sub'] = util.setpath(item.sub, menu[i]['path'])
      }
    })
    return menu;
  },
  getobjforpath(obj,path)
  {
    var reobj=obj;
    var tempobj=null;
    path=path.replace(/[\_|\/|\\]/g,".");
    var patharr=path.split(".");

    if(patharr)
    {
      for(var index in patharr)
      {
        tempobj=null;
        if(reobj[patharr[index]])
        {
          tempobj=reobj[patharr[index]]
          reobj=tempobj
        }
      }
    }
    return reobj
  },
  registerStore(store,arr,storedata,state=null)
  {
    if(!state)
    {
      state=store.state;
    }
    var temp=[];
    var tmep_storedata={namespaced: true}
    for(var i=0;i<arr.length;i++)
    {
      temp.push(arr[i]);
      if(i==arr.length-1)
      {
        tmep_storedata=storedata;
      }
      if(!state[arr[i]])
      {
        if(i==0&&arr.length>1)
        {
          store.registerModule(arr[i],tmep_storedata);
        }else{
          store.registerModule(temp,tmep_storedata);
        }
      }
      state=state[arr[i]];
    }

  },
  getItem(state,key,value)
  {
    let items={};
    if(state&&state.length>0)
    {
      state.map((item)=>{
        if(item[value]){
          items[item[key]]=item[value];
        }
      })
    }
    return items;
  },
  getFormBody(state){
    var formBody={};
    state&&state.map((item)=>{
      formBody[item.field]=item.value;
    })
    return formBody;
  },
  getFormItem(state)
  {
    var formItem={};
    state&&state.map((item)=>{
      formItem[item.field]=item;
    })

    return formItem;
  },
  getSearchParams(state)
  {
    let params=[];
 //   console.log(state)
    if(state)
    {
      state.map((item)=>{
        if(item.value)
        {
          item.searchType||(item.searchType='=')
          params.push([
            item.searchType,item.field,item.value
          ])
        }
      })
      if(params&&params.length>1)
      {
        params.unshift('and');
      }
      if(params&&params.length==1)
      {
        params=params[0]
      }
    }
    return params

  }
}
export default util;