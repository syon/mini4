<template>
  <div class="xx-SettingArea">
    <div class="garage">
      <div class="garage--row">
        <div class="garage--cell items-center flex">
          <button class="zzBtnRect1 zz-text06 z-10 leading-tight">
            表示<br />切り替え
          </button>
        </div>
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
  props: {
    tab: { type: String, required: true },
  },
  computed: {
    ...mapState('ing', {
      ingPart: (state) => state.part,
    }),
    ...mapState('recipe', {
      sBody(state) {
        return state[this.tab].body
      },
      sMotor(state) {
        return state[this.tab].motor
      },
      sGear(state) {
        return state[this.tab].gear
      },
      sChassis(state) {
        return state[this.tab].chassis
      },
      sFrontWheel(state) {
        return state[this.tab].frontWheel
      },
      sFrontTire(state) {
        return state[this.tab].frontTire
      },
      sRearWheel(state) {
        return state[this.tab].rearWheel
      },
      sRearTire(state) {
        return state[this.tab].rearTire
      },
      sFrontStay(state) {
        return state[this.tab].frontStay
      },
      sSideStay(state) {
        return state[this.tab].sideStay
      },
      sRearStay(state) {
        return state[this.tab].rearStay
      },
      sFrontRollerHigh(state) {
        return state[this.tab].frontRollerHigh
      },
      sSideRollerHigh(state) {
        return state[this.tab].sideRollerHigh
      },
      sRearRollerHigh(state) {
        return state[this.tab].rearRollerHigh
      },
      sFrontRollerMiddle(state) {
        return state[this.tab].frontRollerMiddle
      },
      sSideRollerMiddle(state) {
        return state[this.tab].sideRollerMiddle
      },
      sRearRollerMiddle(state) {
        return state[this.tab].rearRollerMiddle
      },
      sRearRollerLow(state) {
        return state[this.tab].rearRollerLow
      },
      sBodyOption(state) {
        return state[this.tab].bodyOption
      },
      sWingRoller(state) {
        return state[this.tab].wingRoller
      },
      sFrontStabilizer(state) {
        return state[this.tab].frontStabilizer
      },
      sSideStabilizer(state) {
        return state[this.tab].sideStabilizer
      },
      sRearStabilizer(state) {
        return state[this.tab].rearStabilizer
      },
      sFrontSettingWeight(state) {
        return state[this.tab].frontSettingWeight
      },
      sRearSettingWeight(state) {
        return state[this.tab].rearSettingWeight
      },
      sAccessory1(state) {
        return state[this.tab].accessory1
      },
      sAccessory2(state) {
        return state[this.tab].accessory2
      },
      sAccessory3(state) {
        return state[this.tab].accessory3
      },
      sAccessory4(state) {
        return state[this.tab].accessory4
      },
    }),
  },
  methods: {
    handleTrans(part) {
      const tab = this.tab
      this.$store.dispatch('ing/transIngPart', { tab, part })
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
      margin: 0.25rem;
    }
    .garage--cell {
      width: 49px;
      height: 49px;
    }
  }
}
</style>
