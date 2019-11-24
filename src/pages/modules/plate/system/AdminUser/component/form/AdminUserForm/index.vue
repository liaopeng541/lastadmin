<template>
    <div>
        <div style="padding: 16px 32px;">
            <div>
                <el-form v-loading="this.storeData.form.loading" ref="form" :model="formBody" :rules="formRules"
                         label-width="80px">
                    <!--<LpFormItem  :itemData="formItem.id"/>-->
                    <LpFormItem :itemData="formItem.admin_name" :disabled="params.type=='update'"/>
                    <LpFormItem :itemData="formItem.admin_avatar"/>
                    <!--<span v-if="formItem.type.value==2">-->
                        <!--<el-col :span="24">-->
                            <!--<el-form-item label="商品">-->
                                <!--<goods-combo-grid v-model="formItem.goods_id.value"/>-->
                            <!--</el-form-item>-->
                        <!--</el-col>-->
                        <!--<el-col :span="24">-->
                            <!--<el-form-item label="商品属性">-->
                                <!--<goods-attr-combo-grid :disabled="!formItem.goods_id.value"-->
                                                       <!--disabled_placeholder="请先选择商品" v-model="formItem.attr_id.value"/>-->
                            <!--</el-form-item>-->
                        <!--</el-col>-->
                    <!--</span>-->
                    <!--<span v-if="formItem.type.value==4||formItem.type.value==3">-->
                    <!--<LpFormItem :itemData="formItem.day_max_total_money"/>-->
                    <!--<LpFormItem :itemData="formItem.min_money"/>-->
                    <!--<LpFormItem :itemData="formItem.max_money"/>-->
                    <!--</span>-->
                    <!--<LpFormItem :itemData="formItem.winning_rate"/>-->
                    <!--<LpFormItem :itemData="formItem.status"/>-->
                    <!--<LpFormItem :itemData="formItem.prize_level"/>-->
                </el-form>
            </div>
        </div>
        <div style="text-align: center;background: #ffffff;border-top: 1px solid #f0f2f5">
            <div style="height: 50px;align-items: center;display: flex;justify-content: center">
                <el-button @click="hide">取 消</el-button>
                <el-button type="primary" style="margin-left: 30px" @click="submit">提 交</el-button>
            </div>
        </div>

    </div>
</template>

<script>
  import LpBase from "@src/resource/mixins/LpBase";
  import LpBaseForm from "@src/resource/mixins/LpBaseForm";
  import LpFormItem from "@src/resource/components/LpForm/LpFormItem";
  import LpComboGrid from "@src/resource/components/LpComboGrid/index";
  import GoodsComboGrid from "@src/pages/modules/shop/Goods/component/weigets/GoodsComboGrid/index";
  import GoodsAttrComboGrid from "@src/pages/modules/shop/Goods/component/weigets/GoodsAttrComboGrid/index";
  import store from "./store";

  export default {
    name: "AdminUserForm",
    components: {GoodsAttrComboGrid, GoodsComboGrid, LpComboGrid, LpFormItem},
    mixins: [LpBase, LpBaseForm],
    props:{
      params:null
    },
    created() {
      this.setStore(store);
    },
    methods: {
      reFresh() {
        this.$store.dispatch(this.storePath + "/getDetail", {
          data: this.params.data,
          __this: this
        })
        this.$nextTick(()=>{
          this.$refs.form.clearValidate();
        })

      },
      submit() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.$store.dispatch(this.storePath + "/submit",{__this:this})
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>