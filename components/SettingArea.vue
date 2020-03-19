<template>
  <div class="xx-SettingArea">
    <div class="grid-setting">
      <wear-box
        :item="sBody"
        icon="body"
        class="cate-body"
        @click="handleTrans('ボディ')"
      />
      <wear-box
        :item="sMotor"
        icon="motor"
        class="cate-motor"
        @click="handleTrans('モーター')"
      />
      <wear-box
        :item="sGear"
        icon="gear"
        class="cate-gear"
        @click="handleTrans('ギヤ')"
      />

      <wear-box
        :item="sChassis"
        icon="chassis"
        class="cate-chassis"
        @click="handleTrans('シャーシ')"
      />

      <wear-box
        :item="sFrontWheel"
        icon="wheel"
        class="cate-front-wheel"
        @click="handleTrans('フロント・ホイール')"
      />
      <wear-box
        :item="sFrontTire"
        icon="tire"
        class="cate-front-tire"
        @click="handleTrans('フロント・タイヤ')"
      />
      <wear-box
        :item="sRearWheel"
        icon="wheel"
        class="cate-rear-wheel"
        @click="handleTrans('リヤ・ホイール')"
      />
      <wear-box
        :item="sRearTire"
        icon="tire"
        class="cate-rear-tire"
        @click="handleTrans('リヤ・タイヤ')"
      />

      <wear-box
        :item="sFrontStay"
        icon="frontstay"
        class="cate-front-stay"
        @click="handleTrans('フロントステー')"
      />
      <wear-box
        :item="sSideStay"
        icon="sidestay"
        class="cate-side-stay"
        @click="handleTrans('サイドステー')"
      />
      <wear-box
        :item="sRearStay"
        icon="rearstay"
        class="cate-rear-stay"
        @click="handleTrans('リヤステー')"
      />

      <wear-box
        :item="sFrontRollerMiddle"
        icon="roller"
        class="cate-front-roller-middle"
        @click="handleTrans('フロント・ローラー中')"
      />
      <wear-box
        :item="sSideRollerMiddle"
        icon="roller"
        class="cate-side-roller-middle"
        @click="handleTrans('サイド・ローラー中')"
      />
      <wear-box
        :item="sRearRollerMiddle"
        icon="roller"
        class="cate-rear-roller-middle"
        @click="handleTrans('リヤ・ローラー中')"
      />

      <wear-box
        :item="sBodyOption"
        icon="wing"
        class="cate-bodyoption"
        @click="handleTrans('ボディオプション')"
      />
      <wear-box
        :item="sWingRoller"
        icon="roller"
        class="cate-wing-roller"
        @click="handleTrans('ウイングローラー')"
      />

      <wear-box
        :item="sFrontStabilizer"
        icon="stabilizer"
        class="cate-front-stabilizer"
        @click="handleTrans('フロント・スタビライザー')"
      />
      <wear-box
        :item="sSideStabilizer"
        icon="stabilizer"
        class="cate-side-stabilizer"
        @click="handleTrans('サイド・スタビライザー')"
      />
      <wear-box
        :item="sRearStabilizer"
        icon="stabilizer"
        class="cate-rear-stabilizer"
        @click="handleTrans('リヤ・スタビライザー')"
      />

      <wear-box
        :item="sFrontSettingWeight"
        icon="weight"
        class="cate-front-settingweight"
        @click="handleTrans('フロント・セッティングウェイト')"
      />
      <wear-box
        :item="sRearSettingWeight"
        icon="weight"
        class="cate-rear-settingweight"
        @click="handleTrans('リヤ・セッティングウェイト')"
      />

      <wear-box
        :item="sAccessory1"
        icon="accessories"
        class="cate-accessory-1"
        @click="handleTrans('アクセサリー・１')"
      />
      <wear-box
        :item="sAccessory2"
        icon="accessories"
        class="cate-accessory-2"
        @click="handleTrans('アクセサリー・２')"
      />
      <wear-box
        :item="sAccessory3"
        icon="accessories"
        class="cate-accessory-3"
        @click="handleTrans('アクセサリー・３')"
      />
      <wear-box
        :item="sAccessory4"
        icon="accessories"
        class="cate-accessory-4"
        @click="handleTrans('アクセサリー・４')"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import WearBox from './WearBox'

export default {
  components: {
    WearBox
  },
  computed: {
    ...mapState('ing', {
      ingPart: (state) => state.part
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
      sFrontRollerMiddle: (state) => state.frontRollerMiddle,
      sSideRollerMiddle: (state) => state.sideRollerMiddle,
      sRearRollerMiddle: (state) => state.rearRollerMiddle,
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
      sAccessory4: (state) => state.accessory4
    })
  },
  async mounted() {
    await this.$store.dispatch('recipe/load')
    this.handleTrans('ボディ')
  },
  methods: {
    handleTrans(part) {
      this.$store.dispatch('ing/trans', part)
    }
  }
}
</script>

<style lang="less" scoped>
.xx-SettingArea {
  padding: 15px;
  background-color: #85898a;

  .grid-setting {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    grid-column-gap: 8px;
    grid-row-gap: 8px;
    justify-items: stretch;
    align-items: stretch;

    .cate-body {
      grid-row: ~'1/2';
      grid-column: ~'2/3';
    }
    .cate-motor {
      grid-row: ~'1/2';
      grid-column: ~'3/4';
    }
    .cate-gear {
      grid-row: ~'1/2';
      grid-column: ~'4/5';
    }
    .cate-chassis {
      grid-row: ~'2/3';
      grid-column: ~'3/4';
    }
    .cate-front-wheel {
      grid-row: ~'3/4';
      grid-column: ~'1/2';
    }
    .cate-front-tire {
      grid-row: ~'3/4';
      grid-column: ~'2/3';
    }
    .cate-rear-wheel {
      grid-row: ~'3/4';
      grid-column: ~'3/4';
    }
    .cate-rear-tire {
      grid-row: ~'3/4';
      grid-column: ~'4/5';
    }
    .cate-front-stay {
      grid-row: ~'4/5';
      grid-column: ~'2/3';
    }
    .cate-side-stay {
      grid-row: ~'4/5';
      grid-column: ~'3/4';
    }
    .cate-rear-stay {
      grid-row: ~'4/5';
      grid-column: ~'4/5';
    }
    .cate-front-roller-middle {
      grid-row: ~'6/7';
      grid-column: ~'2/3';
    }
    .cate-side-roller-middle {
      grid-row: ~'6/7';
      grid-column: ~'3/4';
    }
    .cate-rear-roller-middle {
      grid-row: ~'6/7';
      grid-column: ~'4/5';
    }
    .cate-bodyoption {
      grid-row: ~'8/9';
      grid-column: ~'3/4';
    }
    .cate-wing-roller {
      grid-row: ~'8/9';
      grid-column: ~'4/5';
    }
    .cate-rear-stabilizer {
      grid-row: ~'9/10';
      grid-column: ~'2/3';
    }
    .cate-side-stabilizer {
      grid-row: ~'9/10';
      grid-column: ~'3/4';
    }
    .cate-front-stabilizer {
      grid-row: ~'9/10';
      grid-column: ~'4/5';
    }
    .cate-front-settingweight {
      grid-row: ~'10/11';
      grid-column: ~'2/3';
    }
    .cate-rear-settingweight {
      grid-row: ~'10/11';
      grid-column: ~'4/5';
    }
    .cate-accessory-1 {
      grid-row: ~'11/12';
      grid-column: ~'1/2';
    }
    .cate-accessory-2 {
      grid-row: ~'11/12';
      grid-column: ~'2/3';
    }
    .cate-accessory-3 {
      grid-row: ~'11/12';
      grid-column: ~'3/4';
    }
    .cate-accessory-4 {
      grid-row: ~'11/12';
      grid-column: ~'4/5';
    }
  }
}

button {
  color: blue;
  text-decoration: underline;
}
</style>
