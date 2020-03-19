<template>
  <div class="xx-SettingArea">
    <div class="grid-setting">
      <div class="xx-cell cate-body" @click="handleTrans('ボディ')">
        <item-icon name="body" />
        <div class="xx-parts-name">{{ sBody.key }}</div>
      </div>
      <div class="xx-cell cate-motor" @click="handleTrans('モーター')">
        <item-icon name="motor" />
        <div class="xx-parts-name">{{ sMotor.key }}</div>
      </div>
      <div class="xx-cell cate-gear" @click="handleTrans('ギヤ')">
        <item-icon name="gear" />
        <div class="xx-parts-name">{{ sGear.key }}</div>
      </div>
      <div class="xx-cell cate-chassis" @click="handleTrans('シャーシ')">
        <item-icon name="chassis" />
        <div class="xx-parts-name">{{ sChassis.key }}</div>
      </div>
      <div
        class="xx-cell cate-front-wheel"
        @click="handleTrans('フロント・ホイール')"
      >
        <item-icon name="wheel" />
        <div class="xx-parts-name">{{ sFrontWheel.key }}</div>
      </div>
      <div
        class="xx-cell cate-front-tire"
        @click="handleTrans('フロント・タイヤ')"
      >
        <item-icon name="tire" color="#fd7211" />
        <div class="xx-parts-name">{{ sFrontTire.key }}</div>
      </div>
      <div
        class="xx-cell cate-rear-wheel"
        @click="handleTrans('リヤ・ホイール')"
      >
        <item-icon name="wheel" />
        <div class="xx-parts-name">{{ sRearWheel.key }}</div>
      </div>
      <div class="xx-cell cate-rear-tire" @click="handleTrans('リヤ・タイヤ')">
        <item-icon name="tire" color="#134aef" />
        <div class="xx-parts-name">{{ sRearTire.key }}</div>
      </div>

      <div
        class="xx-cell cate-front-stay"
        @click="handleTrans('フロントステー')"
      >
        <item-icon name="frontstay" />
        <div class="xx-parts-name">{{ sFrontStay.key }}</div>
      </div>
      <div class="xx-cell cate-side-stay" @click="handleTrans('サイドステー')">
        <item-icon name="sidestay" />
        <div class="xx-parts-name">{{ sSideStay.key }}</div>
      </div>
      <div class="xx-cell cate-rear-stay" @click="handleTrans('リヤステー')">
        <item-icon name="rearstay" />
        <div class="xx-parts-name">{{ sRearStay.key }}</div>
      </div>

      <div
        class="xx-cell cate-front-roller-middle"
        @click="handleTrans('フロント・ローラー中')"
      >
        <item-icon name="roller" />
        <div class="xx-parts-name">{{ sFrontRollerMiddle.key }}</div>
      </div>
      <div
        class="xx-cell cate-side-roller-middle"
        @click="handleTrans('サイド・ローラー中')"
      >
        <item-icon name="roller" />
        <div class="xx-parts-name">{{ sSideRollerMiddle.key }}</div>
      </div>
      <div
        class="xx-cell cate-rear-roller-middle"
        @click="handleTrans('リヤ・ローラー中')"
      >
        <item-icon name="roller" />
        <div class="xx-parts-name">{{ sRearRollerMiddle.key }}</div>
      </div>

      <div
        class="xx-cell cate-bodyoption"
        @click="handleTrans('ボディオプション')"
      >
        <item-icon name="wing" />
        <div class="xx-parts-name">{{ sBodyOption.key }}</div>
      </div>
      <div
        class="xx-cell cate-wing-roller"
        @click="handleTrans('ウイングローラー')"
      >
        <item-icon name="roller" />
        <div class="xx-parts-name">{{ sWingRoller.key }}</div>
      </div>

      <div
        class="xx-cell cate-front-stabilizer"
        @click="handleTrans('フロント・スタビライザー')"
      >
        <item-icon name="stabilizer" />
        <div class="xx-parts-name">{{ sFrontStabilizer.key }}</div>
      </div>
      <div
        class="xx-cell cate-side-stabilizer"
        @click="handleTrans('サイド・スタビライザー')"
      >
        <item-icon name="stabilizer" />
        <div class="xx-parts-name">{{ sSideStabilizer.key }}</div>
      </div>
      <div
        class="xx-cell cate-rear-stabilizer"
        @click="handleTrans('リヤ・スタビライザー')"
      >
        <item-icon name="stabilizer" />
        <div class="xx-parts-name">{{ sRearStabilizer.key }}</div>
      </div>

      <div
        class="xx-cell cate-front-settingweight"
        @click="handleTrans('フロント・セッティングウェイト')"
      >
        <item-icon name="weight" />
        <div class="xx-parts-name">{{ sFrontSettingWeight.key }}</div>
      </div>
      <div
        class="xx-cell cate-rear-settingweight"
        @click="handleTrans('リヤ・セッティングウェイト')"
      >
        <item-icon name="weight" />
        <div class="xx-parts-name">{{ sRearSettingWeight.key }}</div>
      </div>

      <div
        class="xx-cell cate-accessory-1"
        @click="handleTrans('アクセサリー・１')"
      >
        <item-icon name="accessories" />
        <div class="xx-parts-name">{{ sAccessory1.key }}</div>
      </div>
      <div
        class="xx-cell cate-accessory-2"
        @click="handleTrans('アクセサリー・２')"
      >
        <item-icon name="accessories" />
        <div class="xx-parts-name">{{ sAccessory2.key }}</div>
      </div>
      <div
        class="xx-cell cate-accessory-3"
        @click="handleTrans('アクセサリー・３')"
      >
        <item-icon name="accessories" />
        <div class="xx-parts-name">{{ sAccessory3.key }}</div>
      </div>
      <div
        class="xx-cell cate-accessory-4"
        @click="handleTrans('アクセサリー・４')"
      >
        <item-icon name="accessories" />
        <div class="xx-parts-name">{{ sAccessory4.key }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ItemIcon from './ItemIcon'

export default {
  components: {
    ItemIcon
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
    grid-column-gap: 10px;
    grid-row-gap: 10px;
    justify-items: stretch;
    align-items: stretch;

    // > div {
    //   border: 1px solid cyan;
    // }

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

.xx-cell {
  display: flex;
  align-items: center;
  position: relative;
  height: 80px;
  background-color: rgb(83, 91, 96);
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

button {
  color: blue;
  text-decoration: underline;
}
</style>
