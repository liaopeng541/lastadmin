<template>
    <lp-table
            ref="multipleTable"
            header-row-class-name="table_th"
            :border="true"
            :stripe="true"
            :height="defaultTableHeight"
            class="table"
            :data="formatData" :row-style="showRow" v-bind="$attrs">
        <slot name="selection" v-if="true">
            <el-table-column
                    type="selection"
                    width="55">
            </el-table-column>
        </slot>
        <el-table-column v-if="columns.length===0" :label="expandname">
            <template slot-scope="scope">
                <span v-for="space in scope.row._level" class="ms-tree-space" :key="space"></span>
                <span class="tree-ctrl" v-if="iconShow(0,scope.row)" @click="toggleExpanded(scope.$index)">
          <i v-if="!scope.row._expanded" class="el-icon-plus"></i>
          <i v-else class="el-icon-minus"></i>
        </span>
                {{scope.row[expandcolum]}}
            </template>
        </el-table-column>
        <el-table-column v-else v-for="(column, index) in columns" :key="column.value" :label="column.text"
                         :width="column.width">

            <template slot-scope="scope">
                <span v-if="index === 0" v-for="space in scope.row._level" class="ms-tree-space" :key="space"></span>
                <span class="tree-ctrl" v-if="iconShow(index,scope.row)" @click="toggleExpanded(scope.$index)">
          <i v-if="!scope.row._expanded" class="el-icon-plus"></i>
          <i v-else class="el-icon-minus"></i>
        </span>
                {{scope.row[column.value]}}
            </template>
        </el-table-column>
        <slot></slot>
    </lp-table>
</template>

<script>
  /**
   Auth: Lei.j1ang
   Created: 2018/1/19-13:59
   */
  import treeToArray from './eval'
  import LpTable from "@src/resource/components/TableList/LpTable";

  export default {
    name: 'treeTable',
    components: {LpTable},
    data() {
      return {
        defaultTableHeight: 100,
        curThead: ''
      }
    },
    props: {
      data: {
        type: [Array, Object],
        required: true
      },
      expandname: {
        type: [String]
      },
      expandcolum: {
        type: [String]
      },
      columns: {
        type: Array,
        default: () => []
      },
      evalFunc: Function,
      evalArgs: Array,
      expandAll: {
        type: Boolean,
        default: false
      }
    },
    computed: {

      // 格式化数据源
      formatData: function () {
        let tmp
        if (!Array.isArray(this.data)) {
          tmp = [this.data]
        } else {
          tmp = this.data
        }
        const func = this.evalFunc || treeToArray
        const args = this.evalArgs ? Array.concat([tmp, this.expandAll], this.evalArgs) : [tmp, this.expandAll]
        return func.apply(null, args)
      }
    },
    methods: {
      showRow: function (row) {
        const show = (row.row.parents ? (row.row.parents._expanded && row.row.parents._show) : true)
        row.row._show = show
        return show ? 'animation:treeTableShow 1s;-webkit-animation:treeTableShow 1s;' : 'display:none;'
      },
      // 切换下级是否展开
      toggleExpanded: function (trIndex) {
        const record = this.formatData[trIndex]
        console.log(record)
        record._expanded = !record._expanded
      },

      // 图标显示
      iconShow(index, record) {
        return (index === 0 && record.childrens && record.childrens.length > 0)
      }
    }
  }
</script>
<style rel="stylesheet/css">
    @keyframes treeTableShow {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    @-webkit-keyframes treeTableShow {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
</style>

<style lang="scss" rel="stylesheet/scss" scoped>
    $color-blue: #2196F3;
    $space-width: 18px;
    .ms-tree-space {
        position: relative;
        top: 1px;
        display: inline-block;
        font-style: normal;
        font-weight: 400;
        line-height: 1;
        width: $space-width;
        height: 14px;
        &::before {
            content: ""
        }
    }

    .processContainer {
        width: 100%;
        height: 100%;
    }

    table td {
        line-height: 26px;
    }

    .tree-ctrl {
        position: relative;
        cursor: pointer;
        color: $color-blue;
        margin-left: -$space-width;
    }
</style>
