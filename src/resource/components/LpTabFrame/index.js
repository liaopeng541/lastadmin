import store from "./store";
import tableRoute from "../../../router/tabMap"
// 处理 push 和 replace 2个接口的附带参数
function processData(item, payload) {
  let newItem = {}
  if (typeof item === 'string') {
    // 参数是字符串，并且带查询参数
    if (item.indexOf('?') > -1) {
      let qIndex = item.indexOf('?')
      let componentName = item.substr(0, qIndex)
      let querySring = item.substr(qIndex + 1)
      let queryArray = querySring.split('&')
      let query = Object.create(null)
      queryArray.map(i => {
        let eIndex = i.indexOf('=')
        let qKey = i.substr(0, eIndex)
        let qValue = i.substr(eIndex + 1)
        query[qKey] = qValue
      })
      newItem.path = componentName
      newItem.query = query
    }
    // 参数是字符串，不带查询参数
    else {
      newItem.path = item
    }
  }
  // 参数是 JSON 对象
  else {
    newItem = item
  }
  // 如果有第二个参数，则会覆盖原本的 query
  if (payload) newItem.query = Object.assign(newItem.query, payload)
  return newItem
}

export default {
  install: (Vue) => {
    //注册store
    lp.$store.registerModule("frame", store);
    Vue.use(tableRoute);
    Vue.prototype.$tab = {
      // 设置当前显示的 tab name
      showTab(data) {
        lp.$store.commit('frame/SetCurrentTabIndex', data)
      },
      // 打开新的 tab  项
      open(item) {
        lp.$store.commit('frame/OpenedTabsPush', item)
      },
      // 删除 tab 项
      close(menuId) {
        lp.$store.commit('frame/OpenedTabsRemove', menuId)
      },
      // 跳转
      push(item, payload) {
        let newItem = processData(item, payload)
        lp.$store.commit('frame/OpenedSubTabsPush', newItem)
      },
      // 后退
      back(num) {
        lp.$store.commit('frame/OpenedSubTabsBack', num)
      },
      // 替换
      replace(item, payload) {
        let newItem = processData(item, payload)
        lp.$store.commit('frame/OpenedSubTabsReplace', newItem)
      },
      // 关闭所有 tab
      closeAll() {
        lp.$store.commit('frame/CloseAllTabs')
      },
      // 关闭其他标签
      closeOthers() {
        lp.$store.commit('frame/CloseOthersTabs')
      },
      // 根据浏览器的 url 回显 tab
      reShow() {
        lp.$store.commit('frame/reShowHash')
      },
      // 获取当前组件的查询参数
      query() {
        return lp.$store.getters['frame/GetQuery']
      },
      menu() {
        let url = location.href
        let indexOfSharp = url.indexOf('#')
        if (indexOfSharp > 0) {
          let hash = url.substr(indexOfSharp + 1)
          let tab = JSON.parse(Base64.decode(hash))
          return tab
        }
        return null;
      },
      // 获取当前激活的 tab
      info() {
        return lp.$store.getters['frame/GetCurrentTab']
      },

    }
  }
}
