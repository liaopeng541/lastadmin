<template>
    <pop-button v-model="show" pop-placement="bottom" pop-title="选择服务" pop-trigger="click" button-text="添加服务" button-type="default">
        <slot name="search"/>
        <el-table
                :data="this.$store.state.admin_cooperatePacket.table.list"
                style="width: 100%"

                header-row-class-name="table_th"
                :border="true"
        >
            <slot name="column"/>
        </el-table>
        <div style="text-align: right">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[100, 200, 300, 400]"
                    :page-size="100"
                    layout="total,  prev, pager, next"
                    :total="total">
            </el-pagination>
        </div>
        <div style="text-align: right; margin-top: 5px">
            <el-button size="mini" type="text" @click="show = false">取消
            </el-button>
            <el-button type="primary" size="mini" >确定
            </el-button>
        </div>
    </pop-button>
</template>

<script>
    import PopButton from "./popButton";
    export default {
        name: "selectTable",
        components: {PopButton},
        data(){
            return {
                show:false
            }
        }
    }
</script>

<style scoped>

</style>