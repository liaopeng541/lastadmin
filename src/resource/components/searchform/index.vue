<template>
    <div class="search_box" style="overflow: hidden;box-sizing: border-box">
        <el-form ref="searchbox" :inline="true">
            <slot :name="item.field" :item="item" :search="search"
                  v-for="item in dataSource.table.search.map" v-if="item.show!==false"
            >
                <el-form-item
                        :label="item.label?item.label:item.field"
                        :show-message="false">
                    <template v-if="!item.tpl||item.tpl=='input'">
                        <el-input @keyup.enter.native="search"
                                  v-model="item.value"
                                  :placeholder="'请输入'+(item.label?item.label:item.field)"></el-input>
                    </template>
                </el-form-item>
            </slot>
            <el-form-item>
                <el-tooltip class="item" effect="dark" content="搜索" placement="bottom-start">
                <el-button v-show="showSearch_btn" style="padding: 5px;"  type="primary" icon="el-icon-search" @click="search"></el-button>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="清空" placement="bottom-start">
                <el-button v-show="showSearch_btn" style="padding: 5px;margin-left: 5px" icon="el-icon-close" @click="resetSearchForm"></el-button>
                </el-tooltip>.

                <el-tooltip class="item" effect="dark" :content="ovtation?'展开':'收起'" placement="bottom-start">
                    <el-button v-if="show_btn" circle icon="el-icon-d-arrow-right" style="padding: 5px;margin-left: 5px"
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

    data() {
      return {
        show_btn: true,
        ovtation: false,
        showSearch_btn:true
      }
    },
    mounted() {
      this.ovtation = !this.ovtation;
      this.doextraSearch();
    },
    methods: {
      search() {
        this.$store.dispatch(this.dataPath + "/loadTable")
      },
      resetSearchForm() {
        this.$store.commit(this.dataPath + "/reset", "search")
        this.$store.dispatch(this.dataPath + "/loadTable")
      },
      extraSearch() {
        this.ovtation = !this.ovtation;
        this.doextraSearch();
      },
      doextraSearch() {

        //总宽度
        var p_width = $(this.$el).parent().width();

        var bro = $(this.$el).siblings()

        var b_width = 0;
        bro.each((i) => {
          b_width += $(bro[i]).outerWidth(true);
        })
        //剩余宽度
        var width = p_width - b_width;
        let el = $(this.$refs.searchbox.$el);
        let children = el.children();
        //按钮宽度
        var btn_width=$(children[children.length - 1]).outerWidth(true);
        btn_width+=5
        width-=btn_width;
        let hidenum = 0;
        let haswidth=0;

        if (this.ovtation) {
          $(this.$el).parent().css("display", "flex")
          $(this.$el).removeAttr("padding")
          children.each((i) => {
            haswidth +=  $(children[i]).outerWidth(true);
            if (haswidth > width && i != children.length - 1) {
              $(children[i]).hide()
              hidenum++;
            } else {
              $(children[i]).show()
            }
          })
        } else {
          $(this.$el).parent().css("display", "block")
          $(this.$el).css("padding", "10px 10px 0px 10px")
          children.show();
        }
        if (hidenum == 0 && this.ovtation) {
          this.show_btn = false;
        } else {
          this.show_btn = true;
        }
        if(hidenum==children.length-1)
        {
          this.showSearch_btn=false
        }else{
          this.showSearch_btn=true
        }
      },
    }
  }
</script>

<style lang="less" scoped>
    @import "searchform.less";
</style>