<template>
  <div id="app">
    <router-view v-if="!this.$store.state.main.loading"/>
    <div v-if="this.$store.state.main.loading" style="position: fixed;top:0px;left:0px;right: 0px;bottom: 0px;background: #1366aa;z-index: 99">

    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
    mounted() {
      //设置通用网络跳转

      var that=this;
      this.$request.setGlobalHandle(109,()=>{
        that.$LPspin.hide();
        that.$message.error("请重新登录")
        setTimeout(()=>{
          that.$router.push("/login");
        },500)
        return true;
      })

      this.$request.setGlobalHandle(401,()=>{
        that.$LPspin.hide();
        that.$message.error("您没有权限操作")
        return false;
      })
      //从本地获取token
      var token=this.$store.commit("main/getLocalToken");

      //获取系统信息及token 和登陆状态
      this.$store.commit("main/init")








        // if (!this.$store.state.main.appName) {
        //     var sysConfig = localStorage.getItem("sysConfig");
        //     if (sysConfig) {
        //         var data = JSON.parse(sysConfig);
        //         console.log(data)
        //         if (data.appName) {
        //           this.$store.state.main.loading=false
        //             this.$store.dispatch("main/setMainData", {sysConfig: JSON.parse(sysConfig)})
        //         } else {
        //             this.$store.dispatch("main/init", this)
        //         }
        //
        //     } else {
        //       this.$store.dispatch("main/init", this)
        //     }
        // }

      lp.route=this.$router
      //监控窗口尺寸变化
      this.$store.dispatch("main/checkResize");



    }



}
</script>



