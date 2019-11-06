// import UUID from "node-uuid"
//回车换input框
export const bindEnterNextInput=(ele,type)=>{
    if(type)
    {
        var inputs=ele.find('input[type='+type+']:not(:disabled)');
    }else{
        var inputs=ele.find('input:not(:disabled)');
    }

    inputs.unbind("keyup").bind('keyup',function (e) {
        if(e.keyCode==13)
        {
            var nextIndex = inputs.index(this) + 1;
            if(nextIndex<inputs.length)
            {
                inputs[nextIndex].select();
                inputs[nextIndex].focus();
            }

        }
    })
}
//取两数组交集
export const getArrayMerg=(arr1,arr2,key)=>
{
    var arr=[];
    if(arr1&&arr2){
        arr1.map((item)=>{
            arr2.map((item2)=>{
                if(item[key]==item2[key])
                {
                    arr.push(item);
                }
            })
        })

    }
    return arr;

}
//对像是否存在数组中
export const getArrayIn=(obj,arr,key)=>
{
    var has =false;
    arr.map((item)=>{
        if(obj[key]==item[key])
        {
            has=true;
        }
    })

    return has

}
//取两数组差集
export const getArrayDiff=(arr1,arr2,key)=>
{
    var merg=getArrayMerg(arr1,arr2,key)

    var arr=[];
    arr1.map((item)=>{
        if(!getArrayIn(item,merg,key))
        {
            arr.push(item)
        }
    })
    arr2.map((item2)=>{
        if(!getArrayIn(item2,merg,key))
        {
            arr.push(item2)
        }
    })
    return arr;

}
export const  checkSelected=(data,key)=>
{
    var re =[];
    if(data.length>0)
    {
        data.map((item)=>{
            re.push(item[key])
        })
        return re;

    }else {
        return false;
    }

}
export const  buildCondition=(condition)=>
{
    var c=[];
    c.push("and");
    Object.keys(condition).forEach((key)=>{
        if((condition[key].value!==""&&condition[key].value.length>0)||condition[key].value===0||condition[key].value==="0")
        {
            c.push([condition[key].searchType,key,condition[key].value]);

        }
    })
    return c;

}
//搜索树；
export const searchTree=(menu,key,val)=>{
    var menus=[];
    menu.map((item)=>{
        if(item[key].includes(val))
        {
            menus.push(item);
        }
        if(item.children && item.children.length>0)
        {
            var temp = searchTree(item.children,key,val);
            if(temp.length>0)
            {
                menus=menus.concat(temp)
            }
        }
    })

    return menus;

}
//处理树型表格当前展开情况
export const getExpandid=(menu,ids)=>{
    menu.map((item)=>{
        if(item._expanded)
        {
            ids.push(item.id);
        }
        if(item.children && item.children.length>0)
        {
            getExpandid(item.children,ids);
        }
    })
}
export const setpath=(menu, path = null)=>{
    menu && menu.map((item, i) => {
        if (path) {
            menu[i]['path'] = path.concat([item.id]);
        } else {
            menu[i]['path'] = [item.id]
        }
        if (item.children) {
            menu[i]['children'] = setpath(item.children, menu[i]['path'])
        }
    })

    return menu;

}
export const getpath=(row,menu, key)=>{
    var data;
    menu && menu.map((item, i) => {
        if(item[key]==row)
        {
            data=item;
        }else{
            if(item.children)
            {
                data=getpath(row,item.children,key);
            }
        }

    })

    return data;

}
export const setExpanded=(menu,ids)=>{
    menu.map((item)=>{
        if(ids == "*")
        {
            item._expanded=true;
        }else{
            if(ids.includes(item.id))
            {
                item._expanded=true;
            }else{
                item._expanded=false;
            }
        }


        if(item.children && item.children.length>0)
        {
            setExpanded(item.children,ids);
        }
    })

}


//查的菜单数据
export const getMenuData=(key, menu)=>{
    var re = null;
    menu && menu.map((item) => {
        if (item.id == key) {
            re = item;
            return true;
        } else {
            if (item.children) {
                var t = getMenuData(key, item.children);
                if (t) {
                    re = t;
                }
            }
        }
    })
    return re;
}
//获取菜单路径名数组
export const setMenuNamePath=(menu, path = null) => {
    menu && menu.map((item, i) => {
        if (path) {
            menu[i]['path'] = path.concat([item.nav_name]);
        } else {
            menu[i]['path'] = [item.nav_name]
        }
        if (item.children) {
            menu[i]['children'] = setMenuNamePath(item.children, menu[i]['path'])
        }
    })
    return menu;
}
//获取菜单id路径数组
export const setMenuIdPath=(menu, path = null) => {
    menu && menu.map((item, i) => {
        if (path) {
            menu[i]['pidPath'] = path.concat([item.id]);
        } else {
            menu[i]['pidPath'] = [item.id]
        }
        if (item.children) {
            menu[i]['children'] = setMenuIdPath(item.children, menu[i]['pidPath'])
        }
    })
    return menu;
}
//添加事件绑定
export const addEvent = (obj, sEv, fn)=>{
    if (obj.addEventListener) {
        obj.addEventListener(sEv, fn, false);
    } else {
        obj.attachEvent('on' + sEv, fn);
    }
}
//删除事件绑定
export const removeEvent=(obj, sEv, fnName)=>{
    if (obj.removeEventListener) {
        obj.removeEventListener(sEv, fnName, false);
    } else {
        obj.detachEvent('on' + sEv, fnName);
    }
}
//查找鼠标事件上的选中组件
export const getBoxEle = (ele,typeKey="build-type",type="box")=>
{
    var findele;
    //到最外层
    if(ele.tagName=="BODY")
    {
        return findele;
    }

    var id =ele.getAttribute("id");
    if(id && id =="canvas")
    {
        return findele;
    }
    if(ele.getAttribute(typeKey)==type){
        findele = ele;
    }else{
        if(ele.parentNode.tagName){
            findele = getBoxEle(ele.parentNode)
        }

    }
    return findele;

}

export const getnum=(name, ele)=>{
    var num = 0;
    if (ele && ele.component == name) {
        num++;
    }
    if (ele && ele.sub) {
        for (var i = 0; i < ele.sub.length; i++) {
            num += getnum(name, ele.sub[i]);
        }
    }
    return num;
}
//获取鼠标在元素上的位置
export const getNodeInsertdire=(e,node)=>
{
    var rect=node.getBoundingClientRect();
    if(e.clientX>rect.right-20)
    {
        return {dire:"right",rect:rect}
    }else if( e.clientX<rect.left+20)
    {
        return {dire:"left",rect:rect}
    }
    return {dire:"center",rect:rect}

}

//设置元素不可拖入
export const setBanDrag=(ele)=>{

    $(ele).addClass("noup");
    // addClass(ele,"noup")
}
//取消元素不可拖入设置
export const removeBanDrag=()=>{
    $(".noup").removeClass("noup");
}
export const getDisplay=(obj)=>{
    // 浏览器兼容
    if (obj.currentStyle) {
        return obj.currentStyle.display;
    }
    else {
        return getComputedStyle(obj, false).display;
    }
}
export const reBuild=(ele)=>{
    if(ele.sub && ele.sub.length>0)
    {
        for(var i=0;i<ele.sub.length;i++)
        {

            ele.sub[i].id=UUID.v1();
            reBuild(ele.sub[i]);
        }
    }
}


//遍历查找元素列表中的元素
export const getCanvasEleObj=(id,ele,parent=null,index=0)=>
{

    if(ele.id==id)
    {
        return {parent:parent,ele:ele,index:index}
    }else{

        if(ele.sub)
        {
            for(var i=0;i<ele.sub.length;i++)
            {
                var re = getCanvasEleObj(id,ele.sub[i],ele,i);
                if(re.ele)
                {
                    return re;
                    break;
                }

            }

        }
    }
    return {parent:null,ele:null,index:0}


}
//检测远程图片是否存在
export const CheckImgExists=(imgurl)=>{
    var ImgObj = new Image(); //判断图片是否存在
    ImgObj.src = imgurl;
    //没有图片，则返回-1
    if (ImgObj.fileSize > 0 || (ImgObj.width > 0 && ImgObj.height > 0)) {
        return true;
    } else {
        return false;
    }
}
//转驼峰命名
export const L_T=(str)=>{
    var re=/-(\w)/g;
    var restr = str.replace(re,function ($0,$1){
        return $1.toUpperCase();
    });

  restr =restr.slice(0, 1).toUpperCase() + restr.slice(1)
    return restr;
}
export const reBuildId=(ele)=>
{
    ele.id=UUID.v1();
    if(ele.sub)
    {
        for(var i = 0; i< ele.sub.length;i++)
        {
            reBuildId(ele.sub[i]);
        }
    }

}



