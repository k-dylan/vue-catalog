<template>
  <div>
    <ul>
      <catalogItem
        v-for="(item, key) in list"
        :curCatalog="curCatalog"
        :class="catalogItemClassName"
        :curItemClassName="curItemClassName"
        :key="key"
        :item="item"
        :showTitle="showTitle"
      ></catalogItem>
    </ul>
  </div>
</template>

<script>
import catalogItem from "./catalogItem";

export default {
  name: "catalog",
  data() {
    return {
      curCatalog: null // 当前正在浏览的目录节点ID
    };
  },

  props: {
    /**
     * 目录结构列表(带层级)
     */
    list: {
      type: Array,
      default() {
        return [];
      }
    },
    /**
     * 目录结构列表（无层级）
     */
    sequence: {
      type: Array,
      default() {
        return [];
      }
    },
    /**
     * 目录结构列表项class样式
     */
    catalogItemClassName: {
      type: String,
      default: "catalog-item"
    },
    /**
     * 是否高亮显示当前浏览的目录
     */
    isShowCur: {
      type: Boolean,
      default: true
    },
    /**
     * 当前正在浏览的目录标题样式
     */
    curItemClassName: {
      type: String,
      default: "catalog-item-cur"
    },
    /**
     * 点击目录显示标题方法
     */
    showTitle: {
      type: Function,
      default: null
    }
  },

  computed: {
    /**
     * 无层级目录结构列表
     */
    sequenceList() {
      if (this.list.length === 0) return [];
      if (this.sequence.length > 0) return this.sequence;
      return this.getSequenceList(this.list);
    },
    throttleScrollHandle () {
      return this.throttle(this.onScrollHandle, 50)
    }
  },

  watch: {
    sequenceList() {
      this.$nextTick(this.onScrollHandle);
    }
  },

  mounted() {
    if (this.isShowCur) {
      window.addEventListener("scroll", this.throttleScrollHandle, false);
    }
  },

  destroyed() {
    if (this.isShowCur) {
      window.removeEventListener("scroll", this.throttleScrollHandle);
    }
  },

  methods: {
    /**
     * 页面滚动监听事件
     */
    onScrollHandle() {
      let cur = null;
      let i = this.sequenceList.length - 1;
      for (; i > 0; i--) {
        cur = this.sequenceList[i].el;
        let top = cur.getBoundingClientRect().top;
        if (top < 5) {
          break;
        }
      }
      this.curCatalog = i === 0 ? this.sequenceList[0].el : cur;
    },
    /**
     * 将带层级的目录结构转换成不带层级的
     * 如果未传出sequence数组可以调用此方法生成
     */
    getSequenceList(list) {
      let result = [];
      list.forEach(function each(item) {
        result.push(item);
        if (item.subs.length > 0) item.subs.forEach(each);
      });
      return result;
    },
    /**
     * 节流函数
     */
    throttle (fn, wait) {
      let timeId = null;
      let lastTime = 0;

      return (...args) => {
        let currentTime = Date.now();
        if (currentTime >= lastTime + wait) {
          fn(...args)
          lastTime = currentTime
        } else {
          if (timeId) clearTimeout(timeId)
          timeId = setTimeout(() => {
            fn(...args)
          }, wait);
        }
      }
    }
  },

  components: {
    catalogItem
  }
};
</script>

<style lang="less" scoped>
ul {
  list-style: none;
  padding-left: 0;
}
.catalog-item {
  padding-left: 1em;
  line-height: 2;
  /deep/ &-title {
    cursor: pointer;
  }
  /deep/ ul {
    list-style: none;
    padding-left: 1em;
  }
  /deep/ .catalog-item-cur {
    font-weight: bold;
  }
}
</style>
