<template>
    <div>
        <LpComboGrid
            :table_items="table.items"
            :url="table.url.list"
            :table_data="table.list"
            :tableUrl="table.url.list"
            :search_items="searchForm.items"
            :pagination="pagination"
            :sort_items="table.sort"
            LabelColumn="name"
            ValueColumn="id"
            v-model="value"
            initlabel=""
            v-bind="$attrs"
            v-on="$listeners"
        >
            <solt name="tableCoulumn">

            </solt>


        </LpComboGrid>
    </div>
</template>

<script>
  import LpComboGrid from "@src/resource/components/LpComboGrid/index";
  export default {
    name: "GoodsComboGrid",
    components: {LpComboGrid},
    model: {
      prop: 'value',
      event: 'input'
    },
    props:{
      value: "",
    },
    data(){
      return  {
        table: {
          url: {
            list: "shop/prize/prize-list",
          },
          params: {},
          rowKey: false,
          list: [],
          multipleSelection: [],
          items: [
            {field: "id", label: "编号", tpl: "text", show: true, sort: true},
            {field: "name", label: "name", tpl: "text", show: true, sort: true},
            {field: "type", label: "type", tpl: "text", show: true, sort: true},
            {field: "goods_id", label: "goods_id", tpl: "text", show: true, sort: true},
            {field: "attr_id", label: "attr_id", tpl: "text", show: true, sort: true},
            {field: "user_money", label: "user_money", tpl: "text", show: true, sort: true},
            {field: "wx_moeny", label: "wx_moeny", tpl: "text", show: true, sort: true},
            {field: "day_max_total_money", label: "day_max_total_money", tpl: "text", show: true, sort: true},
            {field: "min_money", label: "min_money", tpl: "text", show: true, sort: true},
            {field: "max_money", label: "max_money", tpl: "text", show: true, sort: true},
            {field: "add_time", label: "add_time", tpl: "text", show: true, sort: true},
            {field: "prize_level", label: "prize_level", tpl: "text", show: true, sort: true}
          ],
          sort: {},
        },
        searchForm: {
          items: [
            {field: "name", label: "名称", tpl: "input", value: "", searchType: "like"},
          ],

        },
        pagination: {
          pageSize: 10,
          pageSizes: [10, 20, 50, 100],
          currentPage: 1,
          total: 0,
        },
      }
    }
  }
</script>

<style scoped>

</style>