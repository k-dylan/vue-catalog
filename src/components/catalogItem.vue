<template>
  <li>
    <div class="catalog-item-title" :class="curClass" @click="showTitleHandler">{{item.title}}</div>
    <ul v-if="item.subs.length > 0">
      <catalogItem v-for="(val, key) in item.subs" :key="key" :item="val" :curCatalog="curCatalog" :showTitle="showTitle"></catalogItem>
    </ul>
  </li>
</template>
<script>
export default {
  name: "catalogItem",
  props: {
    item: {
      type: Object,
      default() {
        return {};
      }
    },
    curCatalog: {
      type: HTMLHeadingElement,
      default() {
        return null;
      }
    },
    curItemClassName: {
      type: String,
      default: 'catalog-item-cur'
    },
    showTitle: {
      type: Function,
      default: null
    }
  },

  computed: {
    curClass () {
      return this.item.el === this.curCatalog ? this.curItemClassName : ''
    }
  },

  methods: {
    showTitleHandler() {
      if(this.showTitle) return this.showTitle(this.item.el);
      this.item.el.scrollIntoView();
    }
  }
};
</script>
