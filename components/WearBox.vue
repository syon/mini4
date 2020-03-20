<template>
  <div :class="{ isEmpty: !item.key }" class="WearBox" @click="handleClick">
    <div class="WearBox-inner">
      <div class="zabuton">
        <item-icon v-if="icon" :name="icon" :color="color" />
      </div>
      <div class="xx-parts-name">{{ item.key }}</div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ItemIcon from './ItemIcon'
import Mini4 from '@/models/Mini4'

export default {
  components: {
    ItemIcon
  },
  props: {
    item: { type: Object, default: () => {} },
    part: { type: String, required: true }
  },
  computed: {
    ...mapState('catalog', {
      catalog: (state) => state.dataset
    }),
    x() {
      const partCatalog = this.catalog[this.part] || {}
      return partCatalog[this.item.key] || {}
    },
    color() {
      return this.x.色 || '#bbb'
    },
    icon() {
      const category = Mini4.resolveCategoryByPart(this.part)
      const code = Mini4.resolveCodeByCategory(category)
      return code
    }
  },
  methods: {
    handleClick() {
      this.$emit('click')
    }
  }
}
</script>

<style lang="less" scoped>
.WearBox {
  display: flex;
  position: relative;
  height: 90px;
  cursor: pointer;

  .WearBox-inner {
    display: flex;
    align-items: flex-start;
    width: 100%;
    background-clip: padding-box;
    border: solid 3px transparent;
    border-radius: 3px;
    position: relative;
    z-index: 0;

    &:before {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: -1;
      margin: -3px;
      border-radius: inherit;
      background: linear-gradient(to bottom right, #fcfba6, #f7de79, #894f1a);
    }
  }

  .zabuton {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 0;
    background-color: rgb(83, 91, 96);
  }

  &.isEmpty {
    .zabuton {
      background-color: #8f9495;
    }
    .WearBox-inner:before {
      background: #c1c1c1;
    }
    .ItemIcon {
      background-color: #bbb !important;
    }
    .xx-parts-name {
      display: none;
    }
  }
  .ItemIcon {
    position: absolute;
    height: 100%;
  }
  .xx-parts-name {
    display: flex;
    align-items: center;
    // height: 100%;
    padding: 3px;
    line-height: 1.2;
    font-size: 0.75em;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.5);
    position: relative;
    z-index: 1;
  }
}
</style>
