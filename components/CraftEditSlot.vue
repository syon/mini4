<template>
  <div class="xx-RemodelSlot w-full flex flex-col text-sm">
    <div class="xx-titlebar flex justify-between">
      <div>{{ x.action }}</div>
      <div>詳細</div>
    </div>
    <div class="flex flex-col flex-1 text-black p-1">
      <div class="flex">
        <div class="xx-craftinfo flex-auto flex items-center">
          <span class="xx-limittip zzBg-gray1">
            済み: {{ x.craftedCount }}
          </span>
          <template v-if="x.回数制限">
            <span class="xx-limittip zzBg-gray1">
              残り: {{ x.回数制限 - x.craftedCount }}
            </span>
          </template>
          <div v-if="x.回数制限 - x.craftedCount <= 0" class="xx-nomorecraft">
            これ以上改造できません。
          </div>
        </div>
      </div>

      <div class="flex-1 flex flex-col">
        <template v-for="(e, idx) in x.effects">
          <div
            :key="idx"
            :class="{ isDemerit: e.メリデメ === 'デメリット' }"
            class="xx-merideme flex"
          >
            <div class="xx-merideme-label flex items-center justify-center">
              {{ e.メリデメ }}
            </div>
            <div class="xx-merideme-topic flex-1 flex justify-between">
              <div>{{ e.影響 }}</div>
              <div class="xx-merideme-marks">{{ e.表示 }}</div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: { arg: { type: Object, default: () => {} } },
  computed: {
    x() {
      return this.arg || {}
    }
  }
}
</script>

<style lang="less" scoped>
.xx-RemodelSlot {
  background-color: #f0f4f4;
}
.xx-titlebar {
  padding: 2px 4px;
  color: #fff;
  background-color: #20272a;
}
.xx-craftinfo {
  .xx-limittip {
    font-size: 0.6em;
    border-radius: 0.15rem;
    padding: 0.2em 0.4em;
    margin-right: 0.5em;
  }

  .xx-nomorecraft {
    font-size: 0.6em;
    border-radius: 0.15rem;
    padding: 0.2em 0.4em;
    color: #fff;
    background-color: rgb(220, 47, 33);
  }
}

.xx-merideme {
  margin: 4px 0 0;
  &:last-child {
    margin-bottom: 0;
  }
  .xx-merideme-label {
    width: 50px;
    margin-right: 5px;
    font-size: 0.6rem;
    text-align: center;
  }
  .xx-merideme-topic {
    font-size: 0.75rem;
    padding-left: 5px;
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
      color: #0d7827;
      font-weight: bold;
    }
  }
}
</style>
