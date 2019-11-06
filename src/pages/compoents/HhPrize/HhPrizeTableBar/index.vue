<template>
    <div class="table_bar">
        <el-button-group>
            <el-button type="primary" icon="el-icon-plus" @click="showadd">添加</el-button>
            <el-button type="danger" icon="el-icon-delete" @click="deleteSelected">批量删除</el-button>
        </el-button-group>
    </div>
</template>

<script>
  import LpBase from "@src/resource/mixins/LpBase";
  import HhPrizeForm from "@pages/compoents/HhPrize/HhPrizeForm";
  export default {
    name: "HhPrizeTableBar",
    mixins:[LpBase],
    created()
    {
      this.extendStore();
    },
    methods:{
      showadd() {
        this.showModal(HhPrizeForm, {
          title: "添加",
          icon: "save",
          width:"90%",
          height:"90%",
          params:{id: 1}
        })
      },
    }
  }
</script>

<style scoped>

</style>