<template>
    <div>
        <div style="padding: 16px 32px;">
            <div>
                <el-form v-loading="this.storeData.form.loading" ref="form" :model="formBody" :rules="formRules"
                         label-width="80px">
                    <LpFormItem :itemData="formItem.pid"/>
                    <LpFormItem :itemData="formItem.name" :disabled="params.type=='update'"/>
                    <LpFormItem :itemData="formItem.url"/>
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
    name: "HhprizeForm",
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