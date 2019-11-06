<template>
    <div class="table_bar">
        <div style="flex:1">
            <slot name="left">

            </slot>
            <slot name="right">

            </slot>

        </div>
    </div>
</template>

<script>
  import LpBase from  "@resource/mixins/LpBase"


  export default {
    name: "TableBar",
    mixins:[LpBase],
    methods:
    {
      reFreshData()
      {
        this.dataSource.isRefresh++;
      }

    }
  }
</script>

<style lang="less" scoped>
@import "table.less";
</style>