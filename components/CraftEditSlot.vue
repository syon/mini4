<template>
  <a
    href="#"
    :class="{ active: x.action === craftAction, isNomoreCraft: nomore }"
    class="xx-CraftEditSlot w-full flex flex-col"
    @click="handleClick"
  >
    <div class="zz-headblack flex justify-between">
      <div class="zz-headblack-name">{{ x.action || '(改造なし)' }}</div>
    </div>
    <div class="flex-1 flex flex-col text-black p-1">
      <div class="flex">
        <div class="flex flex-col">
          <div class="xx-craftinfo flex">
            <div
              v-if="hit > 0 && x.action"
              class="xx-limittip flex zzBg-gray1 text-center zzAnton justify-center"
            >
              <div>済み:&nbsp;</div>
              <div>{{ hit }}</div>
            </div>
            <template v-if="x.回数制限">
              <div
                class="xx-limittip flex zzBg-gray1 text-center zzAnton justify-center"
              >
                <div>残り:&nbsp;</div>
                <div :class="{ isNomore: nomore }">{{ x.回数制限 - hit }}</div>
              </div>
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
                class="xx-merideme-topic flex-1 flex items-center justify-between px-1"
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
    handleClick(e) {
      e.preventDefault()
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
  border-radius: 0.25rem;
  min-height: 40px;

  &.active {
    background-color: #fffca0;
    border: 1px solid #f1f658;
  }
  &.isNomoreCraft {
    background-color: rgb(105, 116, 117);
  }
}

.xx-craftinfo {
  display: flex;
  flex-direction: column;
  width: 40px;
  letter-spacing: -0.05em;

  .xx-limittip {
    &:last-child {
      margin-bottom: 0;
    }
    color: white;
    background-color: #85898a;
    border: 1px solid #85898a;
    line-height: 1;
    margin-bottom: 0.125rem;
    border-radius: 0.25rem;
    font-size: 0.6rem;
    .isNomore {
      color: rgb(220, 47, 33);
    }
  }
}

.xx-merideme {
  margin-bottom: 0.125rem;
  &:last-child {
    margin-bottom: 0;
  }
  .xx-merideme-label {
    width: 50px;
    font-size: 0.6rem;
    text-align: center;
    line-height: 1;
    margin-left: 0.125rem;
  }
  .xx-merideme-topic {
    font-size: 0.6rem;
    line-height: 1;
    margin-left: 0.125rem;
  }
  // Merit
  .xx-merideme-label {
    background-color: #5cfe5a;
    border: 1px solid #28cb25;
  }
  .xx-merideme-topic {
    background-color: #ceeed0;
    border: 1px solid #ceeed0;
  }
  .xx-merideme-marks {
    color: #0d7827;
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
      border: 1px solid rgb(231, 218, 218);
    }
    .xx-merideme-marks {
      color: rgb(122, 39, 4);
    }
  }
}

.xx-merideme-list {
  &.isNomore {
    opacity: 0.3;
  }
}

.xx-limitmessage {
  font-size: 0.6em;
  padding: 0 0.25rem;
  color: white;
  background-color: rgb(220, 47, 33);
  text-align: center;
}
</style>
