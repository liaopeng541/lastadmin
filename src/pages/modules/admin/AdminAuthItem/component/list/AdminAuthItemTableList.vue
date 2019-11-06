<template>
    <div class="fixBox">
        <TableList :table-item="item"/>


    </div>
</template>

<script>
  import SearchBox from "@src/resource/components/TableList/searchBox";
  export default {
    name: "AdminAuthItemTableList",
    components: {SearchBox},
    data(){
      return {
        item:[
          {field: "id", label: "编号", tpl: "text", show: true, sort: true,width:''},
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
        ]
      }
    },
    mounted(){
      console.log("a");
    }
  }
</script>

<style scoped>

</style>