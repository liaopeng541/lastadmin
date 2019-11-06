export default {
  computed: {
    formBody: {
      get() {
        return lp.$util.getFormBody(this.storeData.form.items);
      }
    },
    formItem: {
      get() {
        return lp.$util.getFormItem(this.storeData.form.items);
      }
    },
    formRules:{
      get() {
        return this.storeData.form.rules
      }
    }
  },
  props: {


  },
  created() {


  },
  mounted() {




  },
  data: function () {
    return {}

  },
  methods: {



  }


}
