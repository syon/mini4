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
      <div v-if="label.main" class="xx-parts-label">
        <span>
          {{ label.main }}
          <template v-if="label.rate > 0"
            ><br />{{ label.rate }}<span class="ampersand">%</span></template
          >
        </span>
      </div>
      <div class="xx-aptihex">
        <apti-hex :type="x.コース適性" />
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
import Util from '@/models/Util'
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
      wearLabelMode: (state) => state.wearLabelMode,
    }),
    ...mapState('catalog', {
      catalog: (state) => state.dataset,
    }),
    ...mapGetters({
      getItemInfo: 'catalog/getItemInfo',
      getRecipeByPart: 'recipe/getRecipeByPart',
      getEquipByPart: 'recipe/getEquipByPart',
      totalScores: 'recipe/gAllPartScoresSum',
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
    label() {
      const equip = this.getEquipByPart(this.tab, this.part)
      switch (this.wearLabelMode) {
        case 'オフ':
          return {}
        case 'パーツ名':
          return { main: this.item.key }
        case '強化レベル合計':
          return { main: this.levelSum }
        default: {
          const totalScore = this.totalScores[this.wearLabelMode]
          const score = Util.fixedNum(equip.score[this.wearLabelMode], 3)
          const rate = Util.fixedNum((score / totalScore) * 100, 1)
          return { main: score, rate }
        }
      }
    },
    levelSum() {
      return this.x.crafts
        .filter(Boolean)
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
    .xx-parts-label {
      display: none;
    }
  }
  .ItemIcon {
    position: absolute;
  }
  .xx-parts-label {
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

    .ampersand {
      font-size: 0.5rem;
      margin-left: 1px;
    }
  }
  .xx-aptihex {
    position: absolute;
    bottom: -3px;
    left: -3px;
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
