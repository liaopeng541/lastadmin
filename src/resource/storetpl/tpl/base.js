const base = {
  namespaced: true,
  state: {
    initData:null
  },
  mutations:
    {
      /**
       * 记录原始值
       */
      recordInitData(state) {
        if (!state.initData) {
          state.initData = _.cloneDeep(state);
        }
      },
      /**
       * 重置某个数据
       */
      reset(state, dataName) {
        if (state.initData && state.initData[dataName]) {
          state[dataName]=_.cloneDeep(state.initData[dataName])
        }
      },
    },

}
export default base