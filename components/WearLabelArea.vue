<template>
  <div v-if="isWearLabel" class="WearLabelArea zz-floatingRight pb-8">
    <div class="zz-floatingArea flex">
      <div class="zz-floatingSubArea flex-1">
        <div class="zzCategoryHeaderLong">表示切り替え</div>
        <div class="xx-group">
          <template v-for="item of basicGroup">
            <button
              :key="item"
              class="zz-selectBox"
              :class="{ active: wearLabelMode === item }"
              @click="handleIt(item)"
            >
              {{ item }}
            </button>
          </template>
        </div>
        <div class="zzCategoryHeaderLong">ステータス</div>
        <div class="xx-group">
          <template v-for="item of statusGroup">
            <button
              :key="item"
              class="zz-selectBox"
              :class="{ active: wearLabelMode === item }"
              @click="handleIt(item)"
            >
              {{ item }}
            </button>
          </template>
        </div>
        <div class="zzCategoryHeaderLong">スキル</div>
        <div class="xx-group">
          <template v-for="item of skillGroup">
            <button
              :key="item"
              class="zz-selectBox"
              :class="{ active: wearLabelMode === item }"
              @click="handleIt(item)"
            >
              {{ item }}
            </button>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('ing', {
      isWearLabel: (state) => state.isWearLabel,
      wearLabelMode: (state) => state.wearLabelMode,
      tab: (state) => state.tab,
    }),
    basicGroup() {
      return ['オフ', 'パーツ名', '強化レベル合計']
    },
    statusGroup() {
      return ['スピード', 'パワー', 'コーナー安定', 'スタミナ耐久', '重さ']
    },
    skillGroup() {
      return [
        'ギヤ比',
        'ギヤ負荷',
        'パワーロス',
        'スピードロス',
        '消費電流',
        '節電',
        '制振',
        'タイヤ摩擦',
        'タイヤ旋回',
        'タイヤ反発',
        'タイヤ径',
        'ローラー摩擦',
        'ローラー抵抗',
        'スラスト角',
        'スタビ減速',
        'ブレーキ減速',
        'エアロダウンフォース',
        'ウェーブ',
        'オフロード',
        'デジタル',
      ]
    },
  },
  methods: {
    handleIt(mode) {
      this.$store.commit('ing/setWearLabelMode', mode)
    },
  },
}
</script>

<style lang="less" scoped>
.WearLabelArea {
  .xx-group {
    margin: 0.25rem;
  }
  .zz-selectBox {
    display: block;
    width: 100%;
    text-align: left;
    padding: 0.25rem;
    margin-bottom: 0.25rem;
  }
}
</style>
