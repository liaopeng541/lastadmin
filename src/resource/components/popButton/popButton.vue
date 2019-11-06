<template>
    <el-popover
            :placement="popPlacement"
            :title="popTitle"
            :width="popWidth"
            :trigger="popTrigger"
            v-model="isshow"
    >
        <slot />


        <el-button
                :icon="bottonicon"
                style="margin-left: 10px"
                slot="reference"
                :circle="circle"
                :type="buttonType"
                :disabled="disabled"
                :size="buttonSize">
            {{buttonText&&buttonText}}
        </el-button>
    </el-popover>
</template>

<script>
    export default {
        name: "popButton",

        computed:{
          isshow:{
              get:function () {
                  return this.show
              },
              set:function (val) {
                  this.$emit('input',val)
              }
          }
        },
        model: {
            prop: 'show',
            event: 'input'
        },
        props: {
            bottonicon:{
              type:String,
              default:"",
            },
            circle:{
              type:Boolean,
                default:false
            },
            show:{
              type:Boolean,
              default:false,
            },
            click:{
              type:Function,
            },
            popPlacement:{
              type:String,
              default:'bottom'
            },
            popTitle: {
                type: String,
                default: '提示'
            },
            popWidth:{
                type:String,
                default: ''
            },
            popTrigger: {
                type: String,
                default: 'click'
            },
            buttonText:{
                type: String,
                default: ""
            },
            buttonSize:{
                type: String,
                default: ''
            },
            buttonType:{
                type:String,
                default:"text"
            },
            disabled:{
                type:Boolean,
                default:false
            }
        }
    }
</script>

<style scoped>

</style>