<template>
    <el-container>
        <el-header>
            <div class="admin-header">
                <div class="top-logo" style="display: flex;align-items: center;justify-content: center">
                    <h1 style="color:rgba(255, 255, 255, 0.85);">
                        亨亨养车
                    </h1>
                </div>
                <div class="top-menu">
                    <el-menu
                            :default-active="this.$store.state.main.userMenu && this.$store.state.main.userMenu.length>0?this.$store.state.main.userMenu[0].id+'':0+''"
                            class="top-menu-list"
                            mode="horizontal"
                            @select="handleSelectTopMenu"
                            background-color="#1366aa"
                            text-color="rgba(255, 255, 255, 0.67)"
                            active-text-color="#ffffff"
                    >
                        <el-menu-item v-for="menuItem in this.$store.state.main.userMenu" :index="menuItem.id" :key="menuItem.id">
                            {{menuItem.name}}
                        </el-menu-item>


                    </el-menu>

                </div>
                <div class="top-tool">
                    <el-dropdown @command="loginOut">
                          <span class="el-dropdown-link user-avatar">
                              <img :src="admin_avatar" style="width: 30px;height: 30px;border-radius: 15px;"/>
                              <span style="margin-left: 5px;">admin</span>
                              <i class="el-icon-arrow-down el-icon--right"></i>
                          </span>
                        <el-dropdown-menu slot="dropdown" style="width: 120px">
                            <el-dropdown-item>修改密码</el-dropdown-item>
                            <el-dropdown-item command="loginOut">退出</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </div>
        </el-header>
        <el-container>
            <el-aside style="width: auto;overflow: hidden">
                <el-menu text-color="#666666"
                         active-text-color="#333333" class="leftmenu" :collapse="isCollapse"
                         :default-openeds="defaultOpeneds" @select="handleSelectLeftMenu">
                    <div style="width: 100%;overflow: hidden">
                        <div style="padding-left: 20px; color: #ffffff;background: #108ee9;height: 40px;display: flex;align-items: center;"
                             :class="{'menu-pointer':isCollapse}" @click="menuOut">
                            <i :class="{'el-icon-menu':!isCollapse,'el-icon-caret-right':isCollapse}" style="vertical-align: middle;
    margin-right: 5px;
    width: 24px;
    text-align: center;
    font-size: 18px;"></i>
                            <span v-if="!isCollapse"
                                  style="flex: 1;padding-left: 20px;white-space: nowrap;overflow: hidden;font-size: 14px">导航菜单</span>

                            <div v-if="!isCollapse" class="sild-b0tn" style="cursor: pointer" @click.stop="menuIn">
                                <i class="el-icon-caret-left" style="vertical-align: middle;
    font-size: 20px;"></i>
                            </div>

                        </div>
                    </div>
                    <LpMenu v-for="navMenu in this.$store.state.main.leftMenu" :navMenus="navMenu"/>
                </el-menu>
            </el-aside>
            <el-main style="overflow: hidden">
                <div style="position: absolute;right: 0px;height: 39px;width: 50px;z-index: 10;text-align: center;line-height: 39px">
                    <el-tooltip class="item" effect="dark" content="全部关闭" placement="bottom">
                        <el-button icon="el-icon-close" @click="closeAll" size="mini" circle></el-button>
                    </el-tooltip>

                </div>
                <el-tabs type="card" :value="currentTabIndex" @input="$tab.showTab" @tab-remove="$tab.close"
                         class="main-tabs">
                    <el-tab-pane
                            v-for="item in openedTabs"
                            :key="item.menuId"
                            :label="item.title"
                            :name="item.menuId"
                            :closable="item.menuId !== homeTabMenuId"
                    >
                               <!--<span slot="label" @contextmenu.prevent="(e)=>rightClick(e,item)">-->
                                  <!--<i class="el-icon-date"></i>-->
                                     <!--<span>{{item.title}}</span>-->
                               <!--</span>-->

                        <transition name="fade" >
                        <component :is="item.components[item.components.length - 1].path" :breadcrumb="item.breadcrumb"
                                   :storePath="item.storePath"
                                   v-if="item.components.length" :style="{height:tabPaneHeight+'px'}"></component>
                        </transition>


                    </el-tab-pane>


                </el-tabs>
            </el-main>
        </el-container>

        <el-footer style="height: 30px;line-height: 30px;text-align: center;border-top:1px solid #cccccc;z-index: 3">
            <div>
                版权所有@hengheng
            </div>
        </el-footer>
    </el-container>
</template>

<script>
  import LpMenu from "@resource/components/LpMenu";
  export default {
    name: "Index",
    components: { LpMenu},
    data() {
      return {
        isCollapse: false,
        activeTab: "-1",
        timer: null,
      }
    },
    computed: {
      // 当前 tab 项的 name
      currentTabIndex() {
        return this.$store.getters['frame/GetCurrentTabIndex']
      },
      // 打开的页签列表
      openedTabs() {
        return this.$store.getters['frame/GetOpenedTabs']
      },
      // 主页 tab 的 menuId
      homeTabMenuId() {
        return this.$store.getters['frame/GetHomeTabMenuId']
      },
      tabPaneHeight: {
        get: function () {
          return this.$store.state.main.windowSize.height - 180
        }
      },
      admin_avatar: {
        get: function () {
          if (this.$store.state.main.userInfo && this.$store.state.main.userInfo.admin_avatar) {
            var img = this.$Api.upurl + this.$store.state.main.userInfo.admin_avatar;
            if (this.$common.CheckImgExists(img)) {
              return img
            } else {
              return require('@resource/assets/images/bg-new.png');
            }
          } else {
            return require('@resource/assets/images/bg-new.png');
          }
        }
      }
    },
    mounted() {
       this.$LPspin.show("加载用户操作配置...")
       this.$store.dispatch("main/getUserData");
       this.$store.dispatch("main/checkResize");
    },
    methods: {
      closeAll() {
        this.activeTab = "-1";
        this.$store.state.main.openTabs.splice(1, this.$store.state.main.openTabs.length - 1)
      },

      menuIn() {
        this.isCollapse = true
      },
      menuOut() {
        if (this.isCollapse) {
          this.isCollapse = false
        }
      },
      handleSelectTopMenu(key) {
        this.$store.state.main.userMenu.map((item, i) => {
          if (item.id == key) {
            this.$store.state.main.leftMenu = item.sub;
          }
        })

      },
      getComponentName(filepath) {
        return filepath.replace("./", "").replace(/\//g, "_").replace(".vue", "");
      },

      urlToFilePath(url) {
        if (url.indexOf("/") == -1) {
          return this.$common.L_T(url);
        } else {
          var items = url.split("/")
          if(!items[2])
          {
            items[2]='index';
          }
         // return './' + items[0] + '/' + this.$common.L_T(items[1]) +'/'+items[2]+ ".vue";
          return './' + items[0] + '/' + items[1] +'/'+items[2]+ ".vue";
        }

      },
      handleSelectLeftMenu(key) {
        var item = this.getMenuData(key, this.$store.state.main.leftMenu);
        if (item.url) {
          console.log(item.url)
          var componentFilepath = this.urlToFilePath(item.url)
          console.log(componentFilepath)
          var componentName = this.getComponentName(componentFilepath)
          console.log(componentName)
          var tabpanel = {
            title: item.name,
            icon: 'el-icon-menu',
            menuId: item.id,
            component: componentName,
            breadcrumb: item.path,
            storePath: componentName.replace(/\_/g, "/")
          }
          this.$tab.open(tabpanel)
        }
      },
      getMenuData(key, menu) {
        var re = null;
        menu && menu.map((item) => {
          if (item.id == key) {
            re = item;
            return true;
          } else {
            if (item.sub) {
              var t = this.getMenuData(key, item.sub);
              if (t) {
                re = t;
              }
            }
          }
        })
        return re;
      },
      loginOut(command) {
        if (command == "loginOut") {
          this.$router.push("/login")
        }
        if (command == "showrepass") {
          //  this.showrepass();
        }
      },
    }
  }
</script>

<style scoped>
    @import "~@resource/assets/styles/home.less";
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }
</style>