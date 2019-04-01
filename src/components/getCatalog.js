/*
 * 获取对应节点的目录结构
 * @Author: kdylan
 * @Date: 2019-03-30 14:44:23
 * @Last Modified by: kdylan
 * @Last Modified time: 2019-04-01 15:29:28
 */

/**
 * 获取指定节点的目录结构
 * @param {String|Object} el 解析目录结构的节点对象或ID
 */
const getCatalog = (el) => {
  if (typeof el === 'string') {
    el = document.getElementById(el)
  }

  let titleNodes = el.querySelectorAll('h1,h2,h3,h4,h5,h6');

  let levels = [];
  let noLevels = [];
  for (let el of titleNodes) {
    let obj = {
      title: el.innerText,
      level: parseInt(el.nodeName.substring(1)), // 取出标题级别
      subs: [],
      el
    }
    addTitle(levels, obj);
    noLevels.push(obj);
  }
  return {
    levels,
    noLevels
  };
}


/**
 * 添加标题到结果
 * @param arr 结果数组
 * @param title 标题对象
 */
const addTitle = (arr, title) => {
  if (arr.length === 0) {
    return arr.push(title)
  }
  let last = arr[arr.length - 1]
  if (last.level >= title.level) {
    return arr.push(title)
  }
  // 如果层级比最新插入的标题低
  addTitle(last.subs, title)
}


export default getCatalog