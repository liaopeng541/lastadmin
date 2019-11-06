<template>
    <el-upload
            class="lpupimgs"
            :action="action"
            :multiple="true"
            list-type="picture-card"
            :on-success="success"
            :file-list="fileList"
            :on-remove="change"
            :before-upload="beforeAvatarUpload"

    >
        <i  class="el-icon-plus"></i>
    </el-upload>

    
</template>

<script>
    export default {
        name: "LPups",
        computed:{
          fileList:{
                get:function () {
                  var newvalue=[];
                  if(this.value&&this.value.length>0)
                  {
                    this.value.map((item)=>{
                      console.log(item)
                      if(item.indexOf('http')!==-1)
                      {
                        newvalue.push(item);
                      }else{
                        newvalue.push('http://www.yiishop.com/backend/web/'+item);
                      }
                      console.log(newvalue);
                    })
                  }
                    return newvalue
                },
                set:function (val) {
                    this.$emit('input',val)
                }
            }

        },
        props:{
            action:{
                type:String,
                default:'http://www.yiishop.com/admin/web/index.php?r=admin/upload'
            },
            value:{
                type:Array,
                default:[]
            }
        },
        model:{
            prop: 'value',
            event: 'input'
        },
        methods:{
            changfile(fileList)
            {
                var filearr=[];
              fileList &&fileList.length>0&&fileList.map((item,i)=>{
                  if(item.url)
                  {
                      filearr.push(item)
                  }else if(item.response)
                  {
                      filearr.push({name:item.name,url:item.response.data,status:item.status})
                  }else{
                    filearr.push({url:item,uid:i})
                  }

              });
              this.fileList=_.cloneDeep(filearr);
            },
            change(file,fileList)
            {
                this.changfile(fileList)
            },
            success(response, file, fileList)
            {
                this.changfile(fileList)
            },
            filepre(event)
            {
            },
            beforeAvatarUpload(file) {

                const isJPG = file.type === 'image/jpeg';
                const isPNG = file.type === 'image/png';
                const isGIF = file.type === 'image/gif';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG && !isPNG && !isGIF) {
                    this.$message.error('上传头像图片只能是 JPG/PNG/GIF 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }

                return (isJPG||isPNG||isGIF)&& isLt2M;
            },
        }
    }
</script>

<style scoped>
    @import "~@resource/assets/styles/subpage.less";
</style>