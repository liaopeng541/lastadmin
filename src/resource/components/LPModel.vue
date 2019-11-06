<template>
    <div style="position: absolute;left: 0;right:0;bottom: 0;top: 0;z-index: 5;pointer-events: none;display: flex">
        <div v-show="mask"
             style="position: absolute;top:0;left: 0;bottom: 0;right: 0;background:rgba(0,0,0,0.2);z-index: 6;pointer-events: auto">
        </div>
        <div ref="toolbox" class="toolbox"
             :style="{top:this.style.top+'px',left:this.style.left+'px','width':width,'height':height}">
            <div class="header" @mousedown="holdheader">
                <div style="flex: 1;display: flex;align-items: center;">
                    <Icon v-if="icon" :name="icon" :w="18" :h="18"/>
                    <span style="margin-left: 5px">{{title&&title}}</span>
                </div>
                <div @click="hide" style="width: 25px;text-align: center;cursor: pointer">
                    <i class="el-icon-close"></i>
                </div>

            </div>
            <div class="toolbody">
                <div style="flex: 1;overflow: auto">
                    <slot></slot>
                </div>


                <div style="text-align: center;background: #ffffff;border-top: 1px solid #f0f2f5">
                    <slot name="footer">

                    </slot>
                </div>


            </div>

        </div>
    </div>

</template>

<script>
  import LpBase from "@resource/mixins/LpBase"

  export default {
    watch: {
      "isshow": function () {
        console.log("显示")
        if (this.isshow) {
          this.$nextTick(() => {
            this.setPosition()
          })
        }
      }
    },
    mixins: [LpBase],
    name: "LPModel",
    props: {
      title: {
        type: String,
        default: "设置"
      },
      icon: {
        type: String,
        default: "save"
      },
      center: {
        type: Boolean,
        default: true,
      },
      onclose: {
        type: Function,
        default: () => {
        },
      },
      styleName: {
        type: String,
        default: ""
      },
      mask: {
        type: Boolean,
        default: true
      },
      width: {
        type: String,
        default: "auto"
      },
      height: {
        type: String,
        default: "auto"
      },

    },
    data() {
      return {
        style: {
          top: 90,
          left: 2000,
          maxtop: 0,
          maxleft: 0,
          maxright: 2000,
          maxbottom: 2000,
          top_cha: 0,
          left_cha: 0,
          right_cha: 0,
          bottom_cha: 0,
          hold: false,
        },

      }
    },

    mounted() {
      console.log("eee")
      console.log(this.config)
      this.$nextTick(() => {
        if (this.isshow) {
          this.setPosition();

        }
      })

    },

    methods: {
      setPosition() {
        var bodywidth = this.$el.clientWidth
        var bodyhight = this.$el.clientHeight
        var boxwidth = this.$refs.toolbox.clientWidth;
        var boxheight = this.$refs.toolbox.clientHeight
        var style = {};
        if (this.style.left == 2000) {
          if (this.center) {

            style = {
              left: (bodywidth / 2) - (boxwidth / 2),
              top: (bodyhight / 2) - (boxheight / 2),
            }

            if (style.left < 0) {
              style.left = 0
            }
            if (style.top < 0) {
              style.top = 0
            }
            if (style.top >= 40) {
              style.top -= 40
            }

          } else {
            style = {
              left: bodywidth - boxwidth - 20,
              top: (bodyhight / 2) - (boxheight / 2) + 40,
            }
          }
        }


        this.style = Object.assign(this.style, style)
      },

      holdheader(e) {
        var bodywidth = $(this.$el).outerWidth(true)
        var bodyhight = $(this.$el).outerHeight(true)
        var boxwidth = this.$refs.toolbox.clientWidth;
        var boxheight = this.$refs.toolbox.clientHeight
        var rect = e.currentTarget.getBoundingClientRect();
        var style = {
          maxright: bodywidth + boxwidth - 40,
          maxleft: 0 - boxheight + 40,
          maxbottom: bodyhight - 40,
          top_cha: e.clientY - rect.top,
          left_cha: e.clientX - rect.left,
          right_cha: e.clientX - rect.right,
          bottom_cha: e.clientY - rect.bottom,
          hold: true
        }

        this.style = Object.assign(this.style, style)
        this.$common.addEvent(window, "mousemove", this.movetool)
        this.$common.addEvent(window, "mouseup", this.moveover)
      },
      movetool(e) {
        var pageRect = this.$el.getBoundingClientRect();
        if (this.style.hold) {
          if (e.clientX - pageRect.x - this.style.left_cha > this.style.maxleft && e.clientX - pageRect.x - this.style.right_cha < this.style.maxright) {
            this.style.left = e.clientX - pageRect.x - this.style.left_cha

          }
          if (e.clientY - pageRect.y - this.style.top_cha > this.style.maxtop && e.clientY - pageRect.y - this.style.bottom_cha < this.style.maxbottom) {
            this.style.top = e.clientY - pageRect.y - this.style.top_cha
          }
          e.preventDefault();
          return
        }
      },
      moveover(e) {
        this.$common.removeEvent(window, "mousemove", this.movetool)
        this.$common.removeEvent(window, "mouseup", this.moveover)

      }
    }
  }
</script>

<style scoped>
    .toolbox {
        border-radius: 4px;
        box-shadow: 0 -2px 20px 0 rgba(39, 54, 78, .11);
        pointer-events: auto;
        position: absolute;
        z-index: 13;
        background: #ffffff;
        display: flex;
        flex-direction: column;
    }

    .toolbody {
        flex: 1;
        display: flex;
        flex-direction: column;
    }

    .header {
        height: 40px;
        padding-left: 10px;
        padding-right: 5px;
        display: flex;
        font-size: 14px;
        justify-content: space-between;
        align-items: center;
        background: #f6f7f8;
        border-bottom: 1px solid #d9d9d9;
        cursor: move;
        display: flex;
    }

</style>