export default {
  watch: {
    "$parent.isRefresh": function () {
      console.log("pppp")
      this.reFresh && this.reFresh();
    },
    "$parent.isshow": function () {
      if (this.$parent.isshow && this.ismodal && this.$parent.config && this.$parent.config.params) {
        this.params = this.$parent.config.params
        this.reFresh();
      }

    },
  },
  props: {
    isshow: {
      type: Boolean,
      default: true,
    },
    ismodal: {
      type: Boolean,
      default: false,
    },
    params: {
      type: Object,
      default: null,
    },
    isRefresh: {
      type: Number,
      default: 0
    },
    isReset: {
      type: Number,
      default: 0
    },
    storePath: {
      type: String,
      default: null
    },
  },
  data: function () {
    return {}
  },
  created() {
    if (this.$options.ismodal) {
      this.ismodal = this.$options.ismodal
    }
  },

  mounted() {
    if (this.ismodal) {
      this.$nextTick(() => {
        let el = $(this.$el).children();
        if (el.length == 2) {
          $(el.get(0)).addClass("modalBody");
          $(el.get(1)).addClass("modalBottom");
        }
      })
    }

  },
  methods: {
    setStore(store) {
      if (!this.storePath) {
        if (!this.$parent.storePath) {
          this.storePath = "top" + "/" + this.$options.name;
        } else {
          this.storePath = this.$parent.storePath + "/" + this.$options.name;
        }
      }
      if (store) {
        //注册store
        var patharr = this.storePath.split("/");
        lp.$util.registerStore(this.$store, patharr, store);
        this.storeData = lp.$util.getobjforpath(this.$store.state, this.storePath);
      }
    },
    extendStore() {
      if (this.$parent && this.$parent.storePath) {
        this.storePath = this.$parent.storePath;
        this.storeData = this.$parent.storeData;
      }
    },
    LpAlert(config = null) {
      var popComponent = _.cloneDeep(LpAlert);

      popComponent.parent = this;
      let pop = Vue.extend(popComponent);
      let node = document.createElement("div");
      var rootNode=$(this.$el).parents(".pageBox");
      rootNode.append(node)
    //  this.$el.appendChild(node)
      let cc = new pop().$mount(node);
      cc.loadConfig(config);
      cc.hide();
      this.$nextTick(() => {
        cc.show()
      })
    },
    showModal(component, config = null) {
      let model_id = component.name + "-" + this._uid;
      if (lp && lp.modalList && lp.modalList[model_id]) {
        lp.modalList[model_id].config = config
        lp.modalList[model_id].show();
        return;
      }
      var popComponent = _.cloneDeep(LpPopPage);
      component.ismodal = true;

      popComponent.parent = this;
      // component.params=params;
      Vue.component(model_id, component)
      popComponent.bodyComponent = model_id;
      let pop = Vue.extend(popComponent);

      let node = document.createElement("div");
      var rootNode=$(this.$el).parents(".pageBox");
      rootNode.append(node)
      let cc = new pop().$mount(node);
      cc.loadConfig(config);
      cc.loadComponent(model_id);

      if (!lp.modalList) {
        lp.modalList = {};
      }
      lp.modalList[model_id] = cc;
      cc.hide();
      this.$nextTick(() => {
        cc.show()
      })
    },
    hideModal(component) {
      let model_id = component.name + "-" + this._uid;
      if (lp.modalList && lp.modalList[model_id]) {
        lp.modalList[model_id].hide()
      }
    },

    hide() {
      this.isshow = false;
      this.$emit('hide')
    },
    show() {
      this.isshow = true;
      this.$emit('show')
    },
    reFresh() {

      this.isRefresh++;
      this.$emit("refresh")
    }

  }


}
