<template>
  <div v-if="isWearLabel" class="WearLabelArea zz-floatingRight">
    <div class="zz-floatingArea flex">
      <div class="zz-floatingArea-inner flex-1">
        <div class="zzCategoryHeaderLong">表示切り替え</div>
        <template v-for="item of basicGroup">
          <a
            :key="item"
            class="zz-selectBox flex m-1"
            :class="{ active: wearLabelMode === item }"
            @click="handleIt(item)"
          >
            <div class="p-1">{{ item }}</div>
          </a>
        </template>
        <div class="zzCategoryHeaderLong">ステータス</div>
        <template v-for="item of statusGroup">
          <a
            :key="item"
            class="zz-selectBox flex m-1"
            :class="{ active: wearLabelMode === item }"
            @click="handleIt(item)"
          >
            <div class="p-1">{{ item }}</div>
          </a>
        </template>
        <div class="zzCategoryHeaderLong">スキル</div>
        <template v-for="item of skillGroup">
          <a
            :key="item"
            class="zz-selectBox flex m-1"
            :class="{ active: wearLabelMode === item }"
            @click="handleIt(item)"
          >
            <div class="p-1">{{ item }}</div>
          </a>
        </template>
        <div class="h-6 flex m-1"></div>
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
        '前後の重心_',
        'アクセサリー拡張',
        'タイヤ摩擦',
        'タイヤ旋回',
        'タイヤ旋回ダウン',
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

<style lang="less" scoped></style>
