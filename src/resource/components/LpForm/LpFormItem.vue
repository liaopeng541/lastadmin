<template>
    <el-col :span="itemData.span?itemData.span:24">
    <el-form-item :label="itemData.label" v-if="!itemData.tpl||itemData.tpl=='input'" :prop="itemData.field" >
        <el-input v-model="itemData.value"
                  :placeholder="itemData.placeholder||'请输入'+(itemData.label||itemData.field)" v-bind="$attrs" v-on="$listeners"></el-input>
    </el-form-item>
    <el-form-item :label="itemData.label" v-if="itemData.tpl&&itemData.tpl=='select'">
        <el-select v-model="itemData.value" :placeholder="itemData.placeholder||'请选择'+(itemData.label?itemData.label:itemData.field)" v-bind="$attrs" v-on="$listeners">
            <el-option v-for="option in itemData.option" :label="option.label"
                       :value="option.value"></el-option>
        </el-select>
    </el-form-item>
    <el-form-item :label="itemData.label" v-if="itemData.tpl&&itemData.tpl=='date'">
        <el-date-picker type="date" :placeholder="itemData.placeholder||'请选择'+(itemData.label?itemData.label:itemData.field)"
                        v-model="itemData.value" v-bind="$attrs" v-on="$listeners"
        ></el-date-picker>
    </el-form-item>
    <el-form-item :label="itemData.label" v-if="itemData.tpl&&itemData.tpl=='datetime'">
        <el-date-picker type="datetime" :placeholder="itemData.placeholder||'请选择'+(itemData.label?itemData.label:itemData.field)"
                        v-model="itemData.value" v-bind="$attrs" v-on="$listeners"
        ></el-date-picker>
    </el-form-item>
    <el-form-item :label="itemData.label" v-if="itemData.tpl&&itemData.tpl=='time'">
        <el-time-select :placeholder="itemData.placeholder||'请选择'+(itemData.label?itemData.label:itemData.field)" v-model="itemData.value" v-bind="$attrs" v-on="$listeners"
        ></el-time-select>
    </el-form-item>
    <el-form-item :label="itemData.label" v-if="itemData.tpl&&itemData.tpl=='switch'">
        <el-switch v-model="itemData.value" active-text="是" v-bind="$attrs" v-on="$listeners"
                   inactive-text="否" active-value="1" inactive-value="0"></el-switch>
    </el-form-item>

    <el-form-item :label="itemData.label" v-if="itemData.tpl&&itemData.tpl=='checkbox'">
        <el-checkbox-group v-model="itemData.value">
            <el-checkbox v-for="option in itemData.option" :label="option.label" v-bind="$attrs" v-on="$listeners"
                         :name="itemData.field"></el-checkbox>
        </el-checkbox-group>
    </el-form-item>
    <el-form-item :label="itemData.label" v-if="itemData.tpl&&itemData.tpl=='radio'">
        <el-radio-group v-model="itemData.value">
            <el-radio v-for="option in itemData.option" :label="option.label" :value="option.value" v-bind="$attrs" v-on="$listeners"></el-radio>
        </el-radio-group>
    </el-form-item>
    <el-form-item :label="itemData.label" v-if="itemData.tpl&&itemData.tpl=='textarea'" :prop="itemData.field">
        <el-input type="textarea" v-model="itemData.value" v-bind="$attrs" v-on="$listeners"></el-input>
    </el-form-item>
    <el-form-item :label="itemData.label" v-if="itemData.tpl&&itemData.tpl=='upimage'" :prop="itemData.field">
        <LPup action="http://www.yiishop.com/admin/web/index.php?r=admin/upload" v-model="itemData.value" v-bind="$attrs" v-on="$listeners"></LPup>
    </el-form-item>
    <el-form-item :label="itemData.label" v-if="itemData.tpl&&itemData.tpl=='upimages'" :prop="itemData.field">
        <LPups action="http://www.yiishop.com/admin/web/index.php?r=admin/upload" v-model="itemData.value" v-bind="$attrs" v-on="$listeners"></LPups>
    </el-form-item>
    <el-form-item :label="itemData.label" v-if="itemData.tpl&&itemData.tpl=='editor'" :prop="itemData.field">

        <tinymce v-model="itemData.value" height="500px" v-bind="$attrs" v-on="$listeners"></tinymce>

    </el-form-item>
    <el-form-item :label="itemData.label" v-if="itemData.tpl&&itemData.tpl=='casader'" :prop="itemData.field">

        <LpCasader v-model="itemData.value" :url="itemData.option.url"/>

    </el-form-item>
    <el-form-item :label="itemData.label" v-if="itemData.tpl&&itemData.tpl=='number'" :prop="itemData.field">

        <el-input-number v-model="itemData.value" :min="'-Infinity'" :max="'Infinity'"
                         controls-position="right"></el-input-number>

    </el-form-item>
    </el-col>
</template>

<script>
  import LPup from "@resource/components/LPup/LPup"
  import LPups from "@resource/components/LPup/LPups"
  import Tinymce from "@resource/components/Tinymce"
  import LpCasader from "@src/resource/components/LpCasader/index";

  export default {
    name: "LpFormItem",
    components: {LPup, LPups, Tinymce, LpCasader},
    props: {
      itemData: {
        type: Object,
        default: null
      }
    }
  }
</script>

<style scoped>

</style>