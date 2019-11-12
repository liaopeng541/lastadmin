/**
* @Author: jianglei
* @Date:   2017-10-12 12:06:49
*/
'use strict'
import Vue from 'vue'
export default function treeToArray(data, expandAll, parent = null, level = null) {
  let tmp = []
  Array.from(data).forEach(function(record) {
    if (record._expanded === undefined) {
      Vue.set(record, '_expanded', expandAll)
    }
    let _level = 1
    if (level !== undefined && level !== null) {
      _level = level + 1
    }
    Vue.set(record, '_level', _level)
    // 如果有父元素
    if (parent) {
      Vue.set(record, 'parents', parent)
    }
    tmp.push(record)
    if (record.childrens && record.childrens.length > 0 && record._expanded) {
      const childrens = treeToArray(record.childrens, expandAll, record, _level)
      tmp = tmp.concat(childrens)
    }
  })
  return tmp
}
