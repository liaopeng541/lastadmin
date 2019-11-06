<template>
    <el-form ref="form" v-loading="this.$parent.$store.state.loading" :model="formItem" label-width="100px"
             v-if="this.$parent.$store.state.item" :rules="formRules">
        <slot v-for="item in this.$parent.$store.state.item" v-if="item.tpl" :name="item.field" :item="item">
            <el-col :span="item.span?item.span:24">
                <el-form-item :label="item.label" v-if="!item.tpl||item.tpl=='input'" :prop="item.field">
                    <el-input v-model="item.value"
                              :placeholder="'请输入'+(item.label?item.label:item.field)"></el-input>
                </el-form-item>
                <el-form-item :label="item.label" v-if="item.tpl&&item.tpl=='select'">
                    <el-select v-model="item.value" :placeholder="'请选择'+(item.label?item.label:item.field)">
                        <el-option v-for="option in item.option" :label="option.label"
                                   :value="option.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="item.label" v-if="item.tpl&&item.tpl=='date'">
                    <el-date-picker type="date" :placeholder="'请选择'+(item.label?item.label:item.field)"
                                    v-model="item.value"
                    ></el-date-picker>
                </el-form-item>
                <el-form-item :label="item.label" v-if="item.tpl&&item.tpl=='datetime'">
                    <el-date-picker type="datetime" :placeholder="'请选择'+(item.label?item.label:item.field)"
                                    v-model="item.value"
                    ></el-date-picker>
                </el-form-item>
                <el-form-item :label="item.label" v-if="item.tpl&&item.tpl=='time'">
                    <el-time-select :placeholder="'请选择'+(item.label?item.label:item.field)" v-model="item.value"
                    ></el-time-select>
                </el-form-item>
                <el-form-item :label="item.label" v-if="item.tpl&&item.tpl=='switch'">
                    <el-switch v-model="item.value" active-text="是"
                               inactive-text="否" active-value="1" inactive-value="0"></el-switch>
                </el-form-item>

                <el-form-item :label="item.label" v-if="item.tpl&&item.tpl=='checkbox'">
                    <el-checkbox-group v-model="item.value">
                        <el-checkbox v-for="option in item.option" :label="option.label"
                                     :name="item.field"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item :label="item.label" v-if="item.tpl&&item.tpl=='radio'">
                    <el-radio-group v-model="item.value">
                        <el-radio v-for="option in item.option" :label="option.label" :value="option.value"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item :label="item.label" v-if="item.tpl&&item.tpl=='textarea'" :prop="item.field">
                    <el-input type="textarea" v-model="item.value"></el-input>
                </el-form-item>
                <el-form-item :label="item.label" v-if="item.tpl&&item.tpl=='upimage'" :prop="item.field">
                    <LPup action="http://www.yiishop.com/admin/web/index.php?r=admin/upload" v-model="item.value"></LPup>
                </el-form-item>
                <el-form-item :label="item.label" v-if="item.tpl&&item.tpl=='upimages'" :prop="item.field">
                    <LPups action="http://www.yiishop.com/admin/web/index.php?r=admin/upload" v-model="item.value"></LPups>
                </el-form-item>
                <el-form-item :label="item.label" v-if="item.tpl&&item.tpl=='editor'" :prop="item.field">

                    <tinymce v-model="item.value" height="500px"></tinymce>

                </el-form-item>
                <el-form-item :label="item.label" v-if="item.tpl&&item.tpl=='casader'" :prop="item.field">

                    <LpCasader v-model="item.value" :url="item.option.url"/>

                </el-form-item>
                <el-form-item :label="item.label" v-if="item.tpl&&item.tpl=='number'" :prop="item.field">

                    <el-input-number v-model="item.value"   :min="'-Infinity'" :max="'Infinity'" controls-position="right"></el-input-number>

                </el-form-item>

            </el-col>
        </slot>
    </el-form>

</template>

<script>
  import LpBase from "../../mixins/LpBase"
  import LPup from "@resource/components/LPup/LPup"
  import LPups from "@resource/components/LPup/LPups"
  import Tinymce from "@resource/components/Tinymce"
  import LpCasader from "@src/resource/components/LpCasader/index";
  export default {
    name: "LpForm",
    components:{LPup,LPups,Tinymce,LpCasader},
    computed: {
      formItem: {
        get() {
          return this.$parent.$store.getters["formItem"];
        }
      },
      formRules: {
        get() {
          return this.$parent.$store.getters["formRules"];
        }
      }
    },
    mixins: [LpBase],
    methods:
    {
      validate(val)
      {
        this.$refs.form.validate(val);
      }
    }
  }
</script>

<style scoped>

</style>