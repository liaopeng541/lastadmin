<template>
    <div style="flex:1;display: flex;flex-direction: column;height: 100%">
        <div style="flex: 1;display: flex;flex-direction: column;height: 100%">
            <div style="padding: 16px 32px;flex:1;overflow-y: auto">
                <el-form v-loading="this.storeData.form.loading" ref="form" :model="formBody" :rules="formRules" label-width="80px">
                    <LpFormItem :itemData="formItem.id" />
                    <LpFormItem :itemData="formItem.route" />
                    <LpFormItem :itemData="formItem.description" />
                    <LpFormItem :itemData="formItem.created_at" />
                    <LpFormItem :itemData="formItem.user_id" />
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
  import store from "./store";
  import LpBase from "@src/resource/mixins/LpBase";
  import LpBaseForm from "@src/resource/mixins/LpBaseForm";
  import LpFormItem from "@src/resource/components/LpForm/LpFormItem";
  export default {
    name: "HhProcessCatForm",
    components: {LpFormItem},
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