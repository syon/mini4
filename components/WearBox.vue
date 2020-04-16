<template>
  <div :class="{ isEmpty: !item.key }" class="WearBox" @click="handleClick">
    <div class="WearBox-inner">
      <div class="zabuton">
        <item-icon v-if="icon" :name="icon" :color1="color1" :color2="color2" />
      </div>
      <div class="xx-parts-name">{{ item.key }}</div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import ItemIcon from './ItemIcon'
import Mini4 from '@/models/Mini4'

export default {
  components: {
    ItemIcon,
  },
  props: {
    item: { type: Object, default: () => {} },
    part: { type: String, required: true },
  },
  computed: {
    ...mapState('catalog', {
      catalog: (state) => state.dataset,
    }),
    ...mapGetters({
      getItemInfo: 'catalog/getItemInfo',
    }),
    x() {
      return this.getItemInfo(this.part, this.item.key) || {}
    },
    color1() {
      return this.x.色 || '#bbb'
    },
    color2() {
      return this.x.色2 || '#bbb'
    },
    icon() {
      const category = Mini4.resolveCategoryByPart(this.part)
      const code = Mini4.resolveCodeByCategory(category)
      return code
    },
  },
  methods: {
    handleClick() {
      this.$emit('click')
    },
  },
}
</script>

<style lang="less" scoped>
.WearBox {
  display: flex;
  position: relative;
  min-height: 7vmax;
  cursor: pointer;

  .WearBox-inner {
    display: flex;
    align-items: flex-start;
    width: 13vmin;
    height: 13vmin;
    background-clip: padding-box;
    border: solid 2px transparent;
    border-radius: 2px;
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
      margin: -2px;
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
    border-radius: 1px;
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
    padding: 3px;
    line-height: 1;
    font-size: 0.55em;
    letter-spacing: -0.1em;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.5);
    position: relative;
    z-index: 1;
    border-radius: 1px;
  }
}
</style>
