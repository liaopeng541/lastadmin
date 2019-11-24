<template>
    <TreeSelect
            :treeData="options"
            v-model="value"
            v-bind="$attrs" v-on="$listeners"
            @focus="showItem"


    />

</template>

<script>
  import "@resource/assets/styles/antd.less";
  import {TreeSelect} from "ant-design-vue"
  export default {
    components:{TreeSelect},
    name: "LpTreeSelect",
    mounted(){
      this.initlabel();
    },
    data() {
      return {
        options: [],
        arrvalue:[],
        isinit:false,
      }
    },
    model:{
      prop: 'value',
      event: 'input'
    },
    props:{
      value:{
    type:Number,
  default:0,
  },
      url:{
        type:String,
        default:'',
      },
      rootTitle: {
        type:String,
        default:'顶级分类',
      },
      rootKey: {
        type:Number,
        default:0,
      },

    },
    methods: {
      initlabel()
      {
        lp.$http().onLoading((loading) => {
          //   context.state.loading = loading
        })
          .post(lp.$Api.baseurl + this.url, {id: this.value}, (response) => {
            console.log(this.rootKey)
            console.log(this.rootTitle)
            response.data.option.unshift({key:this.rootKey,value:this.rootKey,title:this.rootTitle})
                this.options=response.data.option;
          })
      },
      showItem() {
        if (this.options.length==0) {
          this.initlabel();
        }

      },
      // getOption(data, id) {
      //   var item;
      //   for (var i = 0; i < data.length; i++) {
      //     if (data[i].value == id) {
      //       item = data[i]
      //     } else {
      //       if (data[i].children && !item) {
      //         item = this.getOption(data[i].children, id)
      //       }
      //     }
      //   }
      //   return item;
      // },
      // getItem(pid) {
      //   lp.$http().onLoading((loading) => {
      //     //   context.state.loading = loading
      //   })
      //     .post(lp.$Api.baseurl + this.url, {pid: pid}, (response) => {
      //       if (!pid || pid == 0) {
      //         this.options = response.data
      //       } else {
      //         var item = this.getOption(this.options, pid)
      //         if (item) {
      //           item.children = response.data
      //         }
      //       }
      //
      //     })
      // },
      //
      // handleItemChange(val) {
      //   var pid = val[val.length - 1];
      //   this.getItem(pid);
      //
      // },
    }
  }
</script>

<style scoped>

</style>