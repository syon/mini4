<template>
  <a
    href="#"
    :class="{ active: x.action === craftAction, isNomoreCraft: nomore }"
    class="xx-CraftEditSlot w-full flex flex-col text-sm"
    @click="handleClick"
  >
    <div class="xx-titlebar flex justify-between">
      <div>{{ x.action || '(改造なし)' }}</div>
    </div>
    <div class="flex-1 flex flex-col text-black p-1">
      <div class="flex">
        <div class="flex">
          <div class="xx-craftinfo flex-auto flex items-stretch">
            <span
              v-if="hit > 0 && x.action"
              class="xx-limittip zzBg-gray1 text-center zzAnton"
            >
              済み: {{ hit }}
            </span>
            <template v-if="x.回数制限">
              <span class="xx-limittip zzBg-gray1 text-center zzAnton">
                <span>残り:</span>
                <span :class="{ isNomore: nomore }">{{
                  x.回数制限 - hit
                }}</span>
              </span>
            </template>
          </div>
        </div>

        <div
          :class="{ isNomore: nomore }"
          class="xx-merideme-list flex-1 flex flex-col"
        >
          <template v-for="(e, idx) in x.effects">
            <div
              :key="idx"
              :class="{ isDemerit: e.メリデメ === 'デメリット' }"
              class="xx-merideme flex"
            >
              <div class="xx-merideme-label flex items-center justify-center">
                {{ e.メリデメ }}
              </div>
              <div
                class="xx-merideme-topic flex-1 flex items-center justify-between"
              >
                <div>{{ e.影響 }}</div>
                <div class="xx-merideme-marks">{{ e.表示 }}</div>
              </div>
            </div>
          </template>
        </div>
      </div>
      <div v-if="nomore" class="xx-limitmessage mt-1">
        これ以上改造できません。
      </div>
    </div>
  </a>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    arg: { type: Object, default: () => {} },
    hit: { type: Number, required: true },
  },
  computed: {
    ...mapState('ing', {
      ingPart: (state) => state.part,
      craftAction: (state) => state.craftAction,
    }),
    x() {
      return this.arg || {}
    },
    nomore() {
      return this.x.回数制限 && this.x.回数制限 - this.hit <= 0
    },
  },
  methods: {
    handleClick() {
      if (!this.nomore) {
        this.$emit('go')
      }
    },
  },
}
</script>

<style lang="less" scoped>
.xx-CraftEditSlot {
  background-color: #f0f4f4;
  border: 1px solid rgb(180, 180, 180);
  border-radius: 0.2rem;
  min-height: 40px;

  &.active {
    background-color: #fffca0;
    border: 1px solid #f1f658;
  }
  &.isNomoreCraft {
    background-color: rgb(105, 116, 117);
  }
}
.xx-titlebar {
  padding: 2px 4px;
  color: #fff;
  font-size: 0.75rem;
  background-color: #20272a;
  line-height: 1.2;
  border-radius: 0.15rem 0.15rem 0 0;
}
.xx-craftinfo {
  display: flex;
  flex-direction: column;
  line-height: 1;
  width: 36px;
  letter-spacing: -0.05em;

  .xx-limittip {
    font-size: 0.6em;
    border-radius: 0.15rem;
    padding: 0.2em 0.2em;
    margin: 0.25em 0 0;
    .isNomore {
      color: rgb(220, 47, 33);
    }
  }
}

.xx-limitmessage {
  font-size: 0.6em;
  border-radius: 0.15rem;
  padding: 0.2em 0.4em;
  color: #fff;
  background-color: rgb(220, 47, 33);
  text-align: center;
}

.xx-merideme-list {
  &.isNomore {
    opacity: 0.3;
  }
}

.xx-merideme {
  margin: 2px 0 0;
  &:last-child {
    margin-bottom: 0;
  }
  .xx-merideme-label {
    width: 48px;
    margin: 0 2px;
    font-size: 0.6rem;
    text-align: center;
    line-height: 1.1;
  }
  .xx-merideme-topic {
    padding: 0 5px;
    font-size: 0.6rem;
    line-height: 1;
  }
  // Merit
  .xx-merideme-label {
    background-color: #5cfe5a;
    border: 1px solid #28cb25;
  }
  .xx-merideme-topic {
    background-color: #ceeed0;
  }
  .xx-merideme-marks {
    color: #0d7827;
    font-weight: bold;
  }
  // Demerit
  &.isDemerit {
    .xx-merideme-label {
      color: rgb(159, 88, 58);
      background-color: rgb(245, 187, 166);
      border: 1px solid rgb(226, 132, 93);
    }
    .xx-merideme-topic {
      background-color: rgb(231, 218, 218);
    }
    .xx-merideme-marks {
      color: rgb(122, 39, 4);
      font-weight: bold;
    }
  }
}
</style>
