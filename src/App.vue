<template>
  <div id="app">
    <div class="content" v-html="content" ref="content"></div>
    <catalog class="catalog" :list="catalog.levels" :sequence="catalog.noLevels" :showTitle="showTitle"></catalog>
  </div>
</template>

<script>
import {catalog, getCatalog} from './components/index.js';


import content from '!raw-loader!./content.html';
export default {
  name: 'app',
  data () {
    return {
      content: content,
      catalog: {
        levels: [], // 有层级关系的目录结构数组
        noLevels: [], // 没有层级关系的目录结构数组
      }
    }
  },
  mounted () {
    let {levels, noLevels} = getCatalog(this.$refs.content)
    this.catalog = {
      levels,
      noLevels
    }
  },
  methods: {
    showTitle (el) {
      el.scrollIntoView({
        behavior: 'smooth' 
      });
    }
  },
  components: {
    catalog
  }
}
</script>

<style lang="less">
body {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-color: #f9f9f9; 
  margin: 0;
}
#app {
  width: 960px;
  margin: 0 auto;
  position: relative;
  padding: 10px 0;
  display: flex;
}
.content {
  width: 700px;
  background-color: #fff;
  border: 1px solid #e8e8e8;
  box-shadow: 0 2px 8px hsla(0,0% 56.1%.08);
  box-sizing: border-box;
  padding: 48px 60px;
  pre {
    border: 1px solid #ddd;
    padding: 15px 20px;
    background-color: #f9f9f9;
    border-radius: 6px;
    color: #595959;
    overflow-x: auto;
  }
  img {
    max-width: 100%;
  }
}
.catalog {
  border: 1px solid #e8e8e8;
  margin-left: 10px;
  background-color: #fff;
  width: 250px;
  align-self: flex-start;
  position: sticky;
  top: 10px;
}
</style>
