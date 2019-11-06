<template>
    <div style="width: 515px">
        <div>
        <el-select style="width: 168px" v-model="selected.sheng" :loading="loading" placeholder="请选择省份" @change="val=>fetchData(val,'shi')">
            <el-option
                    v-for="item in address.sheng"
                    :label="item.areaname"
                    :value="item.id">
            </el-option>
        </el-select>
        <el-select style="width: 168px"  v-model="selected.shi" :loading="loading"  placeholder="请选择市" @change="val=>fetchData(val,'xian')">
            <el-option
                    v-for="item in address.shi"
                    :label="item.areaname"
                    :value="item.id">
            </el-option>
        </el-select>
        <el-select style="width: 168px"  v-model="selected.xian" :loading="loading"   placeholder="请选择区/县" @change="buildData">
            <el-option
                    v-for="item in address.xian"
                    :label="item.areaname"
                    :value="item.id">
            </el-option>
        </el-select>
        <!--<span style="display: inline-block;width: 70px;text-align: right">街道/乡镇</span>-->
        <!--<el-select v-model="selected.xiang" :loading="loading"   placeholder="请选择街道/乡镇" @change="val=>fetchData(val,'zi')">-->
            <!--<el-option-->
                    <!--v-for="item in address.xiang"-->
                    <!--:label="item.areaname"-->
                    <!--:value="item.id">-->
            <!--</el-option>-->
        <!--</el-select>-->
        </div>
        <div style="display: flex;flex-direction: row;align-items: center;margin-top: 5px">
        <el-input type="textarea" placeholder="详细地址"  v-model="selected.dizhi" @change="buildData"/>
        </div>


    </div>
</template>

<script>
    export default {
        name: "LPaddress",
        computed:{
          addval:{
              get:function () {
                  return this.value;
              },
              set:function (val) {
                  this.$emit('input',val)
              }
          }
        },
        props:{
          value:{
              type:String,
              default:"",
          }
        },
        model:{
                prop: 'value',
                event: 'input'
        },
        data(){
            return {
                loading:false,
                selected:{
                    sheng:"",
                    shi:"",
                    xian:"",
              //      xiang:"",
                    dizhi:"",

                },
                address:{
                    sheng:[],
                    shi:[],
                //    xian:[],
                    xiang:[],
                },
                searchForm: {
                    parentid: {
                        value: "0",
                        searchType: "=",
                    }
                },
            }
        },
        mounted(){
            this.resetdata('sheng');
            if(this.addval)
            {
                console.log("aaa");
                this.initData(this.addval);
            }else{
                console.log("bbb");
                this.fetchData(0,'sheng')
            }

        },
        methods:{
            initData(val)
            {
                this.loading=true;
                var databody={
                    access_token: this.$store.state.main.token,
                    address:val
                }
                this.$http().post(this.$Api.initaddress,databody).then((response)=>{
                    this.loading=false
                    if (response.status == 100) {
                        this.selected=response.data.selected;
                        this.address=response.data.address;
                    } else if (response.status == 109) {
                        this.$store.dispatch("main/reLogin", this);
                    } else {
                        this.$message.error(response.msg);
                    }
                }).catch((e) => {
                    this.loading=false
                    this.$message.error("网络访问失败，请重试")
                })


            },
            getval(row){
                var val='';
                this.address[row].map((item)=>{
                    if(item.id==this.selected[row])
                    {
                        val=item.areaname;
                    }
                })
                return val;
            },
            buildData(){
                var hasempty=0;
                var address="";
                var finished=false;
              Object.keys(this.selected).forEach((key)=>{
                  if(this.selected[key])
                  {

                      if(key!="sheng")
                      {
                          address+='-'
                      }
                      if(key!='dizhi')
                      {
                          address+=this.getval(key)
                      }else{
                          address+=this.selected[key]
                          finished=true;
                      }

                  }else{
                      if(!finished)
                      {
                          hasempty++;
                      }

                  }

              })
                if(!hasempty)
                {
                    this.addval=address
                    console.log(this.addval)
                    return address;
                }else{
                    return "";
                }
            },
            // visible(status,row,prow)
            // {
            //     if(status)
            //     {
            //         if(this.address[row].length<1)
            //         {
            //             this.fetchData(this.selected[prow],row);
            //         }
            //
            //     }
            // },
            fetchData(pid,row)
            {
                this.loading=true;
                this.searchForm.parentid.value=pid;
                var databody = {
                    access_token: this.$store.state.main.token,
                    query: JSON.stringify({
                        name: "WtAreas",
                        condition: this.$common.buildCondition(this.searchForm),
                        pagination: 'all',
                    })
                }
                this.fetch(databody,(data)=>{
                    this.address[row]=data.data.data;
                    this.resetdata(row);
                    this.buildData();

                },()=>{
                    this.loading=false;
                })

            },
            resetdata(row)
            {
                var reset=false;
               Object.keys(this.address).forEach((key)=>{
                   if(reset)
                   {
                       this.address[key]=[];
                       this.selected[key]="";
                   }
                   if(key==row)
                   {
                       this.selected[key]="";
                       reset =true;
                   }
                 })
            },





            fetch(databody, callBack = null, commonCallBack = null) {
                this.$http().post(this.$Api.fetchData, databody).then((response) => {
                    if (response.status == 100) {
                        callBack && callBack(response);
                    } else if (response.status == 109) {
                        this.$store.dispatch("main/reLogin", this);
                    } else {
                        this.$message.error(response.msg);
                    }
                    commonCallBack && commonCallBack();

                }).catch((e) => {
                    commonCallBack && commonCallBack();
                    this.$message.error("网络访问失败，请重试")
                })
            },
        }
    }
</script>

<style scoped>

</style>