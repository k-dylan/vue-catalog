<template>
  <li>
    <div class="catalog-item-title" :class="curClass" @click="showTitle">{{item.title}}</div>
    <ul v-if="item.subs.length > 0">
      <catalogItem v-for="(val, key) in item.subs" :key="key" :item="val" :curCatalog="curCatalog"></catalogItem>
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
    }
  },

  computed: {
    curClass () {
      return this.item.el === this.curCatalog ? this.curItemClassName : ''
    }
  },

  methods: {
    showTitle() {
      this.item.el.scrollIntoView();
    }
  }
};
</script>
