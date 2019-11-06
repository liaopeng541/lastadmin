const parentSize = {
  data: function () {
    return {
      observer: null,
      parentSize: {
        width: 0,
        height: 0,
      }
    }
  },
  mounted: function () {
    this.$nextTick(() => {
      this.observer_fun()
    })
  },
  methods: {
    observer_fun() {
      let this_el = $(this.$el)
      let element = this_el.parent().get(0);
      let MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver
      let width;
      let height;
      this.observer = new MutationObserver((mutationList) => {
        width = this_el.parent().width();
        height = this_el.parent().height();
        if (this.parentSize.height != height || this.parentSize.width != width) {
          this.parentSize = {
            width: this_el.parent().width(),
            height: this_el.parent().height(),
          }
        }
      })
      this.observer.observe(element, {attributes: true, subtree: true})
    },
  },
  beforeDestroy: function () {
    if (this.observer) {
      this.observer.disconnect()
      this.observer.takeRecords()
      this.observer = null
    }
  },
}
export default parentSize
