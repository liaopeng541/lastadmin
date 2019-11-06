<template>
    <search-box
            :search-item="this.$parent.storeData.searchForm.items"
            :table-item="this.$parent.storeData.table.items"
            :tool="['export','print','refresh','settable']"
            v-bind="$attrs"
            v-on="$listeners"
    >
    </search-box>
</template>

<script>
  import SearchBox from "@src/resource/components/TableList/searchBox";
  export default {
    name: "searchForm",
    components: { SearchBox},
    methods:{


    }

  }
</script>

<style lang="less" scoped>

</style>