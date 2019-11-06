const domain='http://www.lpyii.com';
//const domain='http://app.jzdzsw.cn';
const baseurl=domain+'/admin/web/index.php?r=';
const resturl=domain+'/api/web/'
const upurl=domain+"/admin/web/"
const Api={
    domain:domain,
    baseurl:baseurl,
    upurl:domain+"/admin/web/",
    systemInfo:domain+"/system/info",
    init:baseurl+'admin/init',
    getuserdata:baseurl+'user/get-user-data',
    login: baseurl + 'user/login',


    'captcha':baseurl+'admin/captcha',

    addCooperateCat: baseurl + 'cooperate/add-cooperate-cat',
    getCooperateCat:baseurl + 'cooperate/get-cooperate-list',
    delCooperateCat:baseurl + 'cooperate/del-cooperate-cat',



    addCooperatePacket: baseurl + 'cooperate/add-cooperate-packet',
    getCooperatePacket:baseurl + 'cooperate/get-cooperate-packet',
    delCooperatePacket:baseurl + 'cooperate/del-cooperate-packet',


    getCooperateBatch:baseurl + 'cooperate/get-cooperate-batch',
    delCooperateBatch:baseurl + 'cooperate/del-cooperate-batch',
    addCooperateBatch:baseurl + 'cooperate/add-cooperate-batch',

    getCooperateBatchCard:baseurl + 'cooperate/get-cooperate-batch-card',
    delCooperateBatchCard:baseurl + 'cooperate/del-cooperate-batch-card',
    addCooperateBatchCard:baseurl + 'cooperate/add-cooperate-batch-card',

    getCooperateBatchLog:baseurl + 'cooperate/get-cooperate-batch-card-log',

    getPateData:baseurl + 'cooperate/get-page-data',

    getServiceList:baseurl + 'cooperate/get-service-list',


    'fetchdata':baseurl+'api/getdata',

  hhService:{
    list:baseurl+"system/hhservice/list"
  },
    fetchData:baseurl+'fetch/datas',

    initaddress:baseurl+'v1/common/initaddress',
    goods:{
        getspec:baseurl+'v1/goods/getspec',
        savegoods:baseurl+"v1/goods/savegoods"
    }
}
export default Api;

