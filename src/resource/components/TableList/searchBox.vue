<template>
    <div style="border: 1px solid #EBEEF5;border-bottom: none;background: #EBEEF5">
        <el-form :inline="true" style="padding: 5px" @submit.native.prevent>
            <div class="tabTool">
                <div class="tabToolBox">
                    <slot></slot>
                </div>
                <div v-show="tool.length>0" class="tabToolBox">
                    <slot name="toolbtn">

                    </slot>
                    <el-tooltip v-if="tool.indexOf('export')!=-1" class="item" effect="dark" content="导出" placement="bottom-start">
                        <el-button icon="el-icon-download" circle @click="export_file"
                        ></el-button>
                    </el-tooltip>
                    <el-tooltip v-if="tool.indexOf('print')!=-1" class="item" effect="dark" content="打印" placement="bottom-start">
                        <el-button icon="el-icon-printer" circle @click="print"
                        ></el-button>
                    </el-tooltip>
                    <el-tooltip v-if="tool.indexOf('refresh')!=-1" class="item" effect="dark" content="刷新" placement="bottom-start">
                        <el-button icon="el-icon-refresh" circle @click="refresh"
                        ></el-button>
                    </el-tooltip>
                    <el-popover
                            v-if="tableItem && tool.indexOf('settable')!=-1"
                            placement="bottom"
                            width="330"
                            trigger="click">
                        <div style="width: 100%">
                            <el-checkbox v-if="item.tpl&&item.tpl!='hidden'"
                                         v-for="item in tableItem"
                                         v-model="item.show">{{item.label}}
                            </el-checkbox>
                        </div>
                        <el-tooltip slot="reference" class="item" effect="dark" content="设置表格" placement="bottom-start">
                            <el-button icon="el-icon-setting" circle
                                       style="margin-left:10px;"></el-button>
                        </el-tooltip>
                    </el-popover>
                </div>

            </div>
            <slot :name="item.field" :item="item" :search="search"
                  v-for="item in searchItem" v-if="item&&item.length>0&&item.tpl"
            >
                <el-form-item
                        :label="item.label?item.label:item.field"
                        :show-message="false">
                    <template v-if="item.tpl=='input'">
                        <el-input @keyup.enter.native="search"
                                  v-model="item.value"
                                  :placeholder="'请输入'+(item.label?item.label:item.field)"></el-input>
                    </template>
                </el-form-item>
            </slot>
            <el-form-item >
                <el-tooltip class="item" effect="dark" content="搜索" placement="bottom-start">
                    <el-button circle v-show="showSearch_btn" type="primary" icon="el-icon-search"
                               @click="search"></el-button>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="清空" placement="bottom-start">
                    <el-button circle v-show="showSearch_btn" icon="el-icon-close" @click="resetSearchForm"></el-button>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" :content="ovtation?'展开':'收起'" placement="bottom-start">
                    <el-button circle v-if="show_btn" icon="el-icon-d-arrow-right"
                               :class="ovtation?'down':'up'"
                               @click="extraSearch"/>
                </el-tooltip>

            </el-form-item>

        </el-form>
    </div>
</template>

<script>
  import LpBase from "@resource/mixins/LpBase"
  export default {
    name: "searchform",
    mixins: [LpBase],
    watch: {
      '$store.state.main.windowSize.width': function () {
        this.doextraSearch();
      }
    },
    props: {
      tool: {
        type: Array,
        default: []
      },
      searchItem:{
        type:Object,
        default:null
      },
      tableItem:{
        type:Object,
        default:null
      }
    },

    data() {
      return {
        show_btn: true,
        ovtation: false,
        showSearch_btn: true
      }
    },
    mounted() {
      this.ovtation = !this.ovtation;
      this.doextraSearch();
    },
    methods: {
      refresh(){
        this.$emit("refresh")
      },
      print()
      {
        this.$emit("print")
      },
      export_file()
      {
        this.$emit('export')
      },
      search() {
        this.$emit('search')
      },
      resetSearchForm() {
        this.$emit('reset')
      },
      extraSearch() {
        this.ovtation = !this.ovtation;
        this.doextraSearch();
      },
      doextraSearch() {
        //总宽度
        var p_width = $(this.$el).width();
        let el = $(this.$el).children();
        let children = el.children();
        //按钮宽度
        var btn_width = $(children[children.length - 1]).outerWidth(true) + $(children[0]).outerWidth(true);
        p_width -= btn_width;
        let hidenum = 0;
        let haswidth = 0;
        if (this.ovtation) {
          children.each((i) => {
            haswidth += $(children[i]).outerWidth(true);
            if (i > 0 && haswidth > p_width && i < children.length - 1) {
              $(children[i]).hide()
              hidenum++;
            } else {
              $(children[i]).show()
            }
          })

        } else {
          children.show();

        }
        if (hidenum == 0 && this.ovtation) {
          this.show_btn = false;
        } else {
          this.show_btn = true;
        }
        if (hidenum == children.length - 2) {
          this.showSearch_btn = false
        } else {
          this.showSearch_btn = true
        }
      },
    }
  }
</script>

<style lang="less" scoped>
    @import "table.less";
</style>