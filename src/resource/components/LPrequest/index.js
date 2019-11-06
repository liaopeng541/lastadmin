/**
 * Created by liaopeng on 17/3/4.
 */
'use strict'
import querystring from 'query-string';

var request = function () {
  this.defaultSpin = true;
  this.defaultShowError = true;
  this.defaultUseCookie = false;
  this.defaultStatusError = true;
  this.defaultcontentType = 'form';
  this.defaultmethod = 'GET';
  this.defaultovertime = 30;
  this.defaultparams = null;
  this.success_code = 200;
  this.defaulturl = "";
  this.success_fun = null;
  this.catch_fun = null;
  this.complete_fun = null;
  this.loadingCallback=null
  this.globalCodeFuns={}
  var __this=this;
  this.setGlobalHandle=function (code,fun) {
    this.globalCodeFuns[code]=fun;
  }
  this.showSpin = function (show_spin) {
    this.defaultSpin = show_spin;
    return this
  },
    this.onLoading=function(lodingCallback){
      this.defaultSpin=false;
      this.loadingCallback=lodingCallback;
      return this
    },
    this.showCatch = function (show_catch) {
      this.defaultShowError = show_catch;
      return this
    },
    this.useCookie = function (use_cookie=true) {
      this.defaultUseCookie = use_cookie;
      return this
    },
    this.setCode = function (_success_code) {
      this.success_code = success_code;
      return this
    },
    this.showError = function (show_error) {
      this.defaultStatusError = show_error;
      return this
    },
    this.success = function (_success) {
      this.success_fun = _success;
      return this
    },
    this.catch = function (_catch) {
      this.catch_fun = _catch;
      return this
    },
    this.method = function (_method) {
      this.defaultmethod = _method;
      return this
    },
    this.contentType = function (_contentType) {
      this.defaultcontentType = _contentType;
      return this
    },
    this.overtime = function (_overtime) {
      this.defaultovertime = _overtime;
      return this
    },
    this.complete = function (_complete) {
      this.complete_fun = _complete;
      return this
    },
    this.data = function (_databody) {
      this.defaultparams = Object.assign({},this.defaultparams,_databody);
      return this
    },
    this.url = function (_url) {
      this.defaulturl = _url;
      return this
    },
    this.buildthis = function () {
      var header = {
        method: this.defaultmethod,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
      }
      if (this.defaultUseCookie) {
     //   header.mode = 'no-cors';
        header.credentials = "include";
      }
      if (this.defaultparams) {
        if (this.defaultmethod.toUpperCase() == "GET") {
          let opera = '';
          this.defaulturl.indexOf("?") >= 0 ? opera = '&' : opera = "?";
          this.defaulturl += opera + querystring.stringify(this.defaultparams);
        }
        if (this.defaultmethod.toUpperCase() == 'POST') {
          header.body = querystring.stringify(this.defaultparams)
        }
        if (this.defaultcontentType == 'json') {
          header.headers['Content-Type'] = 'application/json';
          header.body = JSON.stringify(this.defaultparams)
        }
      }
      return Promise.race([
        fetch(this.defaulturl, header),
        new Promise((resolve, reject) => {
          setTimeout(() => reject({
            status: 150,
            message: "访问超时!"
          }), this.defaultovertime > 0 ? this.defaultovertime * 1000 : 30 * 1000);
        })
      ]).then((response) => {
        return new Promise((resolve, reject) => {
          if (response.status != 200) {
            reject({status: response.status, message: "网络异常!请重试"});
          } else {
            resolve(response.json());
          }

        })
      })
    },
    this.http=function () {
      return _.clone(__this)
    }
    this.post = function (url, databody, success, fail, complete) {
     this.url(url).data(databody).success(success).catch(fail).method('POST').complete(complete).fetchData();
    },
    this.get = function (url, databody, success, fail, complete) {
      this.url(url).data(databody).success(success).catch(fail).method('GET').complete(complete).fetchData();
    },
    this.json = function (url, databody, success, fail, complete) {
      this.url(url).data(databody).success(success).catch(fail).method('GET').contentType('json').complete(complete).fetchData();
    },
    this.successCallback = function (data) {
      if (this.defaultStatusError) {
        if(this.globalCodeFuns[data.status])
        {
          if(this.globalCodeFuns[data.status] && this.globalCodeFuns[data.status](data))
          {
            this.success_fun && this.success_fun(data);
          }
          return;
        }else
        if (data.status > this.success_code) {
          if (!data.message) {
            data.message = "未知错误"
          }
          Vue.prototype.$message.error(data.message)
        }
        else {
          this.success_fun && this.success_fun(data);
        }
      } else {
        this.success_fun && this.success_fun(data);
      }
      this.complete_fun && this.complete_fun(data);
      this.loadingCallback && this.loadingCallback(false);
      this.defaultSpin && (Vue.prototype.$LPspin.hide());
    },
    this.catchCallback = function (e) {
        console.log(e)
        if(!e.status)
        {
          e.message="获取数据异常！"
        }
      this.catch_fun && this.catch_fun(e)
      this.complete_fun && this.complete_fun(e);
      this.loadingCallback && this.loadingCallback(false);
      this.defaultSpin && (Vue.prototype.$LPspin.hide());
      this.defaultShowError && (Vue.prototype.$message.error(e.message))
    },
    this.fetchData = function () {
      this.defaultSpin && (Vue.prototype.$LPspin.show());
      this.loadingCallback&&this.loadingCallback(true)
      this.buildthis().then((data) => {
        this.successCallback(data)
      }).catch((e) => {
        this.catchCallback(e)
      })
    }
}
var obj =new request();
export default obj