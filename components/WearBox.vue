<template>
  <div
    :class="{ isEmpty: !item.key, active }"
    class="WearBox"
    @click="handleClick"
  >
    <div class="WearBox-inner">
      <div class="zabuton">
        <item-icon v-if="icon" :name="icon" :color1="color1" :color2="color2" />
      </div>
      <div class="xx-parts-name">{{ item.key }}</div>
      <div class="xx-aptihex">
        <apti-hex :type="x.コース適性" />
      </div>
      <div class="xx-levelsum">
        <span>{{ levelSum }}</span>
      </div>
    </div>
    <div v-if="active" class="xx-check">
      <the-check class="the-check" />
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import ItemIcon from './ItemIcon'
import Mini4 from '@/models/Mini4'
import AptiHex from '@/components/AptiHex'
import TheCheck from '@/assets/check.svg'

export default {
  components: {
    ItemIcon,
    AptiHex,
    TheCheck,
  },
  props: {
    item: { type: Object, default: () => {} },
    part: { type: String, default: null },
  },
  computed: {
    ...mapState('ing', {
      tab: (state) => state.tab,
      ingPart: (state) => state.part,
    }),
    ...mapState('catalog', {
      catalog: (state) => state.dataset,
    }),
    ...mapGetters({
      getItemInfo: 'catalog/getItemInfo',
      getRecipeByPart: 'recipe/getRecipeByPart',
    }),
    x() {
      if (!this.part) return { crafts: [] }
      const item = this.getItemInfo(this.part, this.item.key) || {}
      const recipe = this.getRecipeByPart(this.tab, this.part)
      return { ...item, ...recipe }
    },
    active() {
      return this.part === this.ingPart
    },
    color1() {
      return this.x.色
    },
    color2() {
      return this.x.色2
    },
    icon() {
      const category = Mini4.resolveCategoryByPart(this.part)
      const code = Mini4.resolveCodeByCategory(category)
      return code
    },
    levelSum() {
      return this.x.crafts
        .map((x) => x.level)
        .reduce((acc, crr) => acc + crr, 0)
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
  cursor: pointer;

  &.active .WearBox-inner {
    box-shadow: 0 1px 4px 3px rgba(255, 242, 127, 0.6),
      0 1px 9px 4px rgba(255, 235, 59, 0.4);
  }

  .WearBox-inner {
    display: flex;
    align-items: flex-start;
    width: 49px;
    height: 49px;
    background-clip: padding-box;
    border: solid 2px transparent;
    border-radius: 0.25rem;
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
    .xx-parts-name {
      display: none;
    }
    .xx-levelsum {
      display: none;
    }
  }
  .ItemIcon {
    position: absolute;
  }
  .xx-parts-name {
    display: flex;
    align-items: center;
    padding: 2px;
    line-height: 1;
    font-size: 0.6rem;
    letter-spacing: -0.1em;
    color: white;
    background-color: rgba(0, 0, 0, 0.5);
    position: relative;
    z-index: 1;
    border-radius: 1px;
  }
  .xx-aptihex {
    position: absolute;
    bottom: -3px;
    left: -3px;
  }
  .xx-levelsum {
    position: absolute;
    bottom: -3px;
    right: -3px;
    font-size: 0.55em;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 1px;
    padding: 1.5px;
    line-height: 1;
  }
}

.xx-check {
  position: absolute;
  top: -14px;
  right: -11px;
  z-index: 9;

  .the-check {
    position: relative;
    width: 38px;
    height: 38px;
  }
}
</style>
