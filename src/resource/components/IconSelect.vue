<template>
    <div>
        <div >
            <div v-if="!icon||icon.includes('&#')" style="float: left;min-width: 50px;height: 40px;display: flex;align-items: center;justify-content: center;flex-direction: row;padding-left: 10px">
                <span style="font-size: 12px;color: #999999">请选择</span>
            </div>
            <div v-if="icon&&!icon.includes('&#')" style="float: left;min-width: 50px;height: 40px;display: flex;align-items: center;justify-content: center;flex-direction: row;padding-left: 10px">
                <icon :name="icon" :w="24" :h="24" />
                <div style="margin-left: 10px">
                    {{icon}}
                </div>
            </div>
            <div style="float: left;width: 50px;height: 40px;display: flex;align-items: center;justify-content: center;flex-direction: row;margin-left: 20px">
                <el-popover
                        :placement="placement"
                        trigger="click"
                        v-model="isshow"
                >
                    <div style="width: 350px;height: 310px;overflow-y:auto">
                        <div class="iconitem" v-for="item in this.list" @click="checked(item)">
                            <icon :name="item" :w="24" :h="24" />
                            <div style="margin-top: 3px">
                                {{item}}
                            </div>

                        </div>
                        <div style="clear: both">

                        </div>
                    </div>

                    <el-button slot="reference">选择</el-button>

                </el-popover>
            </div>

        </div>


    </div>

</template>

<script>
    export default {
        name: "IconSelect",
        props: {
            placement:{
                type:String,
                default:'bottom-start'
            },
            value:{
                type:String
            },
            show: {
                type: Boolean,
                default: false,
            },
        },
        computed: {
            icon: {
                get: function () {
                    return this.value
                },
                set: function (val) {
                    this.$emit('input', val)
                }
            }
        },
        model: {
            prop: 'value',
            event: 'input'
        },
        data(){
          return {
              isshow:false,
              list:[],
          }
        },
        mounted(){
            const requireComponent = require.context('../resource/assets/svg', true, /\.svg/)
            this.list=[];
            requireComponent.keys().forEach(
                (filePath) => {
                    this.list.push(filePath.replace("./","").replace(".svg",""));
                }
            )
        },
        methods:{
            checked(item){
                this.icon=item;
                this.isshow=false;
            }
        }
    }
</script>

<style scoped>
    .iconitem{
        width: 80px;height: 80px;border: 1px solid #cccccc;float: left; flex-direction:column;display: flex;align-items: center;justify-content: center;cursor: pointer
    }
    .iconitem:hover{
        background: #f0f2f5
    }

</style>