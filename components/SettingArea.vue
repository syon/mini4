<template>
  <div class="xx-SettingArea">
    <div class="garage">
      <div class="garage--row">
        <div class="garage--cell"></div>
        <div class="garage--cell">
          <wear-box
            :item="sBody"
            part="ボディ"
            class="cate-body"
            @click="handleTrans('ボディ')"
          />
        </div>
        <div class="garage--cell">
          <wear-box
            :item="sMotor"
            part="モーター"
            class="cate-motor"
            @click="handleTrans('モーター')"
          />
        </div>
        <div class="garage--cell">
          <wear-box
            :item="sGear"
            part="ギヤ"
            class="cate-gear"
            @click="handleTrans('ギヤ')"
          />
        </div>
      </div>
      <div class="garage--row">
        <div class="garage--cell"></div>
        <div class="garage--cell"></div>
        <div class="garage--cell">
          <wear-box
            :item="sChassis"
            part="シャーシ"
            class="cate-chassis"
            @click="handleTrans('シャーシ')"
          />
        </div>
        <div class="garage--cell"></div>
      </div>
      <div class="garage--row">
        <div class="garage--cell">
          <wear-box
            :item="sFrontWheel"
            part="フロント・ホイール"
            class="cate-front-wheel"
            @click="handleTrans('フロント・ホイール')"
          />
        </div>
        <div class="garage--cell">
          <wear-box
            :item="sFrontTire"
            part="フロント・タイヤ"
            class="cate-front-tire"
            @click="handleTrans('フロント・タイヤ')"
          />
        </div>
        <div class="garage--cell">
          <wear-box
            :item="sRearWheel"
            part="リヤ・ホイール"
            class="cate-rear-wheel"
            @click="handleTrans('リヤ・ホイール')"
          />
        </div>
        <div class="garage--cell">
          <wear-box
            :item="sRearTire"
            part="リヤ・タイヤ"
            class="cate-rear-tire"
            @click="handleTrans('リヤ・タイヤ')"
          />
        </div>
      </div>
      <div class="garage--row">
        <div class="garage--cell"></div>
        <div class="garage--cell">
          <wear-box
            :item="sFrontStay"
            part="フロントステー"
            class="cate-front-stay"
            @click="handleTrans('フロントステー')"
          />
        </div>
        <div class="garage--cell">
          <wear-box
            :item="sSideStay"
            part="サイドステー"
            class="cate-side-stay"
            @click="handleTrans('サイドステー')"
          />
        </div>
        <div class="garage--cell">
          <wear-box
            :item="sRearStay"
            part="リヤステー"
            class="cate-rear-stay"
            @click="handleTrans('リヤステー')"
          />
        </div>
      </div>
      <div class="garage--row">
        <div class="garage--cell"></div>
        <div class="garage--cell">
          <wear-box
            :item="sFrontRollerHigh"
            part="フロント・ローラー上"
            class="cate-front-roller-high"
            @click="handleTrans('フロント・ローラー上')"
          />
        </div>
        <div class="garage--cell">
          <wear-box
            :item="sSideRollerHigh"
            part="サイド・ローラー上"
            class="cate-side-roller-high"
            @click="handleTrans('サイド・ローラー上')"
          />
        </div>
        <div class="garage--cell">
          <wear-box
            :item="sRearRollerHigh"
            part="リヤ・ローラー上"
            class="cate-rear-roller-high"
            @click="handleTrans('リヤ・ローラー上')"
          />
        </div>
      </div>
      <div class="garage--row">
        <div class="garage--cell"></div>
        <div class="garage--cell">
          <wear-box
            :item="sFrontRollerMiddle"
            part="フロント・ローラー中"
            class="cate-front-roller-middle"
            @click="handleTrans('フロント・ローラー中')"
          />
        </div>
        <div class="garage--cell">
          <wear-box
            :item="sSideRollerMiddle"
            part="サイド・ローラー中"
            class="cate-side-roller-middle"
            @click="handleTrans('サイド・ローラー中')"
          />
        </div>
        <div class="garage--cell">
          <wear-box
            :item="sRearRollerMiddle"
            part="リヤ・ローラー中"
            class="cate-rear-roller-middle"
            @click="handleTrans('リヤ・ローラー中')"
          />
        </div>
      </div>
      <div class="garage--row">
        <div class="garage--cell"></div>
        <div class="garage--cell"></div>
        <div class="garage--cell"></div>
        <div class="garage--cell">
          <wear-box
            :item="sRearRollerLow"
            part="リヤ・ローラー下"
            class="cate-rear-roller-low"
            @click="handleTrans('リヤ・ローラー下')"
          />
        </div>
      </div>
      <div class="garage--row">
        <div class="garage--cell"></div>
        <div class="garage--cell"></div>
        <div class="garage--cell">
          <wear-box
            :item="sBodyOption"
            part="ボディオプション"
            class="cate-bodyoption"
            @click="handleTrans('ボディオプション')"
          />
        </div>
        <div class="garage--cell">
          <wear-box
            :item="sWingRoller"
            part="ウイングローラー"
            class="cate-wing-roller"
            @click="handleTrans('ウイングローラー')"
          />
        </div>
      </div>
      <div class="garage--row">
        <div class="garage--cell"></div>
        <div class="garage--cell">
          <wear-box
            :item="sFrontStabilizer"
            part="フロント・スタビライザー"
            class="cate-front-stabilizer"
            @click="handleTrans('フロント・スタビライザー')"
          />
        </div>
        <div class="garage--cell">
          <wear-box
            :item="sSideStabilizer"
            part="サイド・スタビライザー"
            class="cate-side-stabilizer"
            @click="handleTrans('サイド・スタビライザー')"
          />
        </div>
        <div class="garage--cell">
          <wear-box
            :item="sRearStabilizer"
            part="リヤ・スタビライザー"
            class="cate-rear-stabilizer"
            @click="handleTrans('リヤ・スタビライザー')"
          />
        </div>
      </div>
      <div class="garage--row">
        <div class="garage--cell"></div>
        <div class="garage--cell">
          <wear-box
            :item="sFrontSettingWeight"
            part="フロント・セッティングウェイト"
            class="cate-front-settingweight"
            @click="handleTrans('フロント・セッティングウェイト')"
          />
        </div>
        <div class="garage--cell"></div>
        <div class="garage--cell">
          <wear-box
            :item="sRearSettingWeight"
            part="リヤ・セッティングウェイト"
            class="cate-rear-settingweight"
            @click="handleTrans('リヤ・セッティングウェイト')"
          />
        </div>
      </div>
      <div class="garage--row">
        <div class="garage--cell">
          <wear-box
            :item="sAccessory1"
            part="アクセサリー・１"
            class="cate-accessory-1"
            @click="handleTrans('アクセサリー・１')"
          />
        </div>
        <div class="garage--cell">
          <wear-box
            :item="sAccessory2"
            part="アクセサリー・２"
            class="cate-accessory-2"
            @click="handleTrans('アクセサリー・２')"
          />
        </div>
        <div class="garage--cell">
          <wear-box
            :item="sAccessory3"
            part="アクセサリー・３"
            class="cate-accessory-3"
            @click="handleTrans('アクセサリー・３')"
          />
        </div>
        <div class="garage--cell">
          <wear-box
            :item="sAccessory4"
            part="アクセサリー・４"
            class="cate-accessory-4"
            @click="handleTrans('アクセサリー・４')"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import WearBox from './WearBox'

export default {
  components: {
    WearBox,
  },
  computed: {
    ...mapState('ing', {
      ingPart: (state) => state.part,
    }),
    ...mapState('recipe', {
      sBody: (state) => state.body,
      sMotor: (state) => state.motor,
      sGear: (state) => state.gear,
      sChassis: (state) => state.chassis,
      sFrontWheel: (state) => state.frontWheel,
      sFrontTire: (state) => state.frontTire,
      sRearWheel: (state) => state.rearWheel,
      sRearTire: (state) => state.rearTire,
      sFrontStay: (state) => state.frontStay,
      sSideStay: (state) => state.sideStay,
      sRearStay: (state) => state.rearStay,
      sFrontRollerHigh: (state) => state.frontRollerHigh,
      sSideRollerHigh: (state) => state.sideRollerHigh,
      sRearRollerHigh: (state) => state.rearRollerHigh,
      sFrontRollerMiddle: (state) => state.frontRollerMiddle,
      sSideRollerMiddle: (state) => state.sideRollerMiddle,
      sRearRollerMiddle: (state) => state.rearRollerMiddle,
      sRearRollerLow: (state) => state.rearRollerLow,
      sBodyOption: (state) => state.bodyOption,
      sWingRoller: (state) => state.wingRoller,
      sFrontStabilizer: (state) => state.frontStabilizer,
      sSideStabilizer: (state) => state.sideStabilizer,
      sRearStabilizer: (state) => state.rearStabilizer,
      sFrontSettingWeight: (state) => state.frontSettingWeight,
      sRearSettingWeight: (state) => state.rearSettingWeight,
      sAccessory1: (state) => state.accessory1,
      sAccessory2: (state) => state.accessory2,
      sAccessory3: (state) => state.accessory3,
      sAccessory4: (state) => state.accessory4,
    }),
  },
  mounted() {
    this.$store.dispatch('recipe/load')
  },
  methods: {
    handleTrans(part) {
      this.$store.dispatch('ing/transIngPart', part)
      this.$ga.event('Trans', 'Part', part)
    },
  },
}
</script>

<style lang="less" scoped>
.xx-SettingArea {
  .garage {
    .garage--row {
      display: flex;
      justify-content: space-between;
      padding: 0 0.25rem;
      margin-bottom: 0.25rem;
    }
    .garage--cell {
      width: 13.4vw;
      height: 13.4vw;
    }
  }
}
</style>
