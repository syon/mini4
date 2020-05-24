<template>
  <div class="DiagnosisArea">
    <div class="flex mt-4">
      <div class="flex-1 mx-2">
        <div class="DiagLine flex justify-between">
          <div class="DiagLine-Label">最高速度(時速)</div>
          <div class="DiagLine-Value zzAnton">
            {{ fixedNum(diag.最高速度_時速, 2) }} km/h
          </div>
        </div>
        <div class="DiagLine flex justify-between">
          <div class="DiagLine-Label">最高速度(秒速)</div>
          <div class="DiagLine-Value zzAnton">
            {{ fixedNum(diag.最高速度_秒速, 2) }} m/s
          </div>
        </div>
        <div class="DiagLine flex justify-between">
          <div class="DiagLine-Label">バッテリー消費量</div>
          <div class="DiagLine-Value zzAnton">
            {{ fixedNum(diag.バッテリー消費量, 2) }} mA/h
          </div>
        </div>
        <div class="DiagLine flex justify-between">
          <div class="DiagLine-Label">加速度(毎秒)</div>
          <div class="DiagLine-Value zzAnton">
            {{ fixedNum(diag.加速度, 0) }} m/s&sup2;
          </div>
        </div>
        <div class="DiagLine flex justify-between">
          <div class="DiagLine-Label">最高速到達時間(秒)</div>
          <div class="DiagLine-Value zzAnton">
            {{ fixedNum(diag.最高速到達時間, 3) }} 秒
          </div>
        </div>
        <div class="DiagLine flex justify-between">
          <div class="DiagLine-Label">タイヤグリップ</div>
          <div class="DiagLine-Value zzAnton">
            {{ fixedNum(diag.タイヤグリップ, 3) }}
          </div>
        </div>
      </div>
      <div class="flex-1 mx-2">
        <div class="DiagLine flex justify-between">
          <div class="DiagLine-Label">コーナー減速率</div>
          <div class="DiagLine-Value zzAnton">
            {{ fixedNum(diag.コーナー減速率, 3) }}
          </div>
        </div>
        <div class="DiagLine flex justify-between">
          <div class="DiagLine-Label">ジャンプ飛距離</div>
          <div class="DiagLine-Value zzAnton">
            {{ fixedNum(diag.ジャンプ飛距離, 3) }} m
          </div>
        </div>
        <div class="DiagLine flex justify-between">
          <div class="DiagLine-Label">バウンド時間</div>
          <div class="DiagLine-Value zzAnton">
            {{ fixedNum(diag.バウンド時間, 3) }} 秒
          </div>
        </div>
        <div class="DiagLine flex justify-between">
          <div class="DiagLine-Label">前後の重心</div>
          <div class="DiagLine-Value zzAnton">{{ diag.前後の重心 }} mm</div>
        </div>
        <div class="DiagLine flex justify-between">
          <div class="DiagLine-Label">ローラースラスト角</div>
          <div class="DiagLine-Value zzAnton">
            {{ fixedNum(diag.ローラースラスト角, 3) }}
          </div>
        </div>
        <div class="DiagLine flex justify-between">
          <div class="DiagLine-Label">重さ</div>
          <div class="DiagLine-Value zzAnton">{{ fixedNum(diag.重さ, 3) }}</div>
        </div>
        <div class="DiagLine flex justify-between">
          <div class="DiagLine-Label">ブレーキ性能</div>
          <div class="DiagLine-Value zzAnton">
            {{ fixedNum(diag.ブレーキ性能, 3) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Mini4 from '@/models/Mini4'
import Util from '@/models/Util'

export default {
  computed: {
    ...mapGetters({
      gAllEquips: 'recipe/gAllEquips',
      scores: 'recipe/gAllPartScoresSum',
    }),
    diag() {
      return Mini4.getDiagnosis(this.gAllEquips, this.scores)
    },
  },
  methods: {
    fixedNum(x, n) {
      return Util.fixedNum(x, n)
    },
  },
}
</script>

<style lang="less" scoped>
.DiagLine {
}
</style>
