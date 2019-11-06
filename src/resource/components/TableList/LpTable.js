import {Table} from "element-ui"
import parentSize from "../../mixins/parentSize"

export default {
  name: "LpTable",
  mixins: [parentSize],

  watch: {
    "parentSize.height": function () {
      if (this.parentSize.height > 0 && this.layout.height != this.parentSize.height) {
        this.layout.setHeight(this.parentSize.height);
      }
    },
    // "parentSize.width": function () {
    //   if (this.parentSize.width > 0 && this.layout.width != this.parentSize.width) {
    //     this.layout.width = this.parentSize.width;
    //   }
    // },
  },
  mounted() {
    let haldfun = this.$refs.tableHeader.handleSortClick;
    this.$refs.tableHeader.handleSortClick = (event, column, givenOrder) => {
      window.tablesort || (window.tablesort = {});
      if (column.sortable) {
        if (tablesort[column.sortable] == column.order) {
          return;
        }
        this.store.states.sortingColumn = null
        this.store.states.sortingColumn = _.clone(column);
        this.store.states.sortingColumn.order = tablesort[column.sortable];
        tablesort[column.sortable] = column.order
      }
      this.$nextTick(() => {
        haldfun(event, column, givenOrder);
      })
    }
  },


  method: {},
  extends: Table,
}
