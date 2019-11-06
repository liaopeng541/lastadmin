<template>
    <div class="top_box">
        <el-breadcrumb separator="\" style="flex: 1">
            <el-breadcrumb-item v-for="bread in data">
                {{bread}}
            </el-breadcrumb-item>

        </el-breadcrumb>
        <div style="padding-right: 20px">
            <el-tooltip class="item" effect="dark" content="刷新" placement="bottom">
                <el-button class="lp-mimi-btn" icon="el-icon-refresh" circle @click="refresh"></el-button>
            </el-tooltip>
        </div>
    </div>
</template>
<script>
  export default {
    name: "pagebreadcrumb",
    props:{
      data:{
        type:Array,
        default:[]
      }
    },
    methods:{
      refresh()
      {
        this.$emit("refresh")
      }
    }
  }
</script>

<style  scoped>
@import "./pagebreadcrumb.less";
</style>