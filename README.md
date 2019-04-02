# vue-catalog
从html文章内容中提取目录结构，基于vue开发

## 安装
```sh
npm install --save vue-catalog
# or
yarn add vue-catalog
```

## 使用方法
```js
import {catalog, getCatalog} from 'vue-catalog';
export default {
  name: 'app',
  data () {
    return {
      catalog: {
        levels: [], // 有层级关系的目录结构数组
        noLevels: [], // 没有层级关系的目录结构数组
      }
    }
  },
  mounted () {
    // 获取文章目录结构
    let {levels, noLevels} = getCatalog(this.$refs.content)
    this.catalog = {
      levels,
      noLevels
    }
  },
  components: {
    catalog 
  }
}
```
- getCatalog：获取目录结构方法,有一个参数，要提取目录的dom节点对象或者节点ID；
- catalog： 目录显示插件，主要参数如下：
|参数名|类型|说明|默认|
|--|--|--|--|
|list|Array|要显示的目录结构（带层级），通过getCatalog提取|无|
|sequence|Array|要显示的目录结构（不带层级），如果未定义，则使用list中转换|无|
|catalogItemClassName|String|目录结构列表项class类名|catalog-item|
|curItemClassName|String|当前浏览的目录项class类名|catalog-item-cur|
|isShowCur|Boolean|是否为正在浏览的目录项添加类名|true|
