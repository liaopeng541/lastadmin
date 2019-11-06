<template>
    <el-cascader
            :options="options"
            v-model="arrvalue"
            :props="dataAssign"
            change-on-select
            :clearable="true"
            placeholder="顶级分类"
            @visible-change="showItem"
    >
    </el-cascader>
</template>

<script>
  export default {
    watch:{
      arrvalue(val){
        if(val&&val.length>0)
        {
          this.$emit("input",val[val.length-1])
        }else{
          this.$emit("input",'')
        }
      },
      value(val)
      {

        if(!val)
        {
          this.arrvalue=[];
        }
        if(!this.isinit&&val){
          this.isinit=true
          this.initlabel();
        }


      }
    },
    name: "LpCasader",
    data() {
      return {
        url: "demo/hh-service-cat/get-tree-child",
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
      value:"",
      url:{
        type:String,
        default:'',
      },
      dataAssign:{
        type:Object,
        default:{
            value: 'value',
            label:'label',
            children: 'children'
        }
      }

    },
    methods: {
      initlabel()
      {
        lp.$http().onLoading((loading) => {
          //   context.state.loading = loading
        })
          .post(lp.$Api.baseurl + this.url, {id: this.value}, (response) => {
                this.options=response.data.option;
                this.arrvalue=response.data.value;
                this.$nextTick(()=>{
                  this.isinit=false;
                })
          })

      },
      showItem(isshow) {
        if (isshow&&this.options.length==0) {
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