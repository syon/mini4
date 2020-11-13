import debug from 'debug'
import Mini4 from '@/models/Mini4'

const dg = debug('@:recipe')

const initialMachineState = {
  bodyFeature: { key: '' },
  bodyAssist1: { key: '' },
  bodyAssist2: { key: '' },
  body: { key: '', crafts: [] },
  motor: { key: '', crafts: [] },
  gear: { key: '', crafts: [] },
  chassis: { key: '', crafts: [] },
  frontWheel: { key: '', crafts: [] },
  frontTire: { key: '', crafts: [] },
  rearWheel: { key: '', crafts: [] },
  rearTire: { key: '', crafts: [] },
  frontStay: { key: '', crafts: [] },
  sideStay: { key: '', crafts: [] },
  rearStay: { key: '', crafts: [] },
  frontRollerHigh: { key: '', crafts: [] },
  sideRollerHigh: { key: '', crafts: [] },
  rearRollerHigh: { key: '', crafts: [] },
  frontRollerMiddle: { key: '', crafts: [] },
  sideRollerMiddle: { key: '', crafts: [] },
  rearRollerMiddle: { key: '', crafts: [] },
  rearRollerLow: { key: '', crafts: [] },
  bodyOption: { key: '', crafts: [] },
  wingRoller: { key: '', crafts: [] },
  frontStabilizer: { key: '', crafts: [] },
  sideStabilizer: { key: '', crafts: [] },
  rearStabilizer: { key: '', crafts: [] },
  frontSettingWeight: { key: '', crafts: [] },
  rearSettingWeight: { key: '', crafts: [] },
  accessory1: { key: '', crafts: [] },
  accessory2: { key: '', crafts: [] },
  accessory3: { key: '', crafts: [] },
  accessory4: { key: '', crafts: [] },
}

export const state = () => ({
  M1: JSON.parse(JSON.stringify(initialMachineState)),
  M2: JSON.parse(JSON.stringify(initialMachineState)),
  M3: JSON.parse(JSON.stringify(initialMachineState)),
  M4: JSON.parse(JSON.stringify(initialMachineState)),
  M5: JSON.parse(JSON.stringify(initialMachineState)),
})

function resolvePartKey(partJapanese) {
  switch (partJapanese) {
    case 'ボディ特性':
      return 'bodyFeature'
    case 'ボディアシスト・１':
      return 'bodyAssist1'
    case 'ボディアシスト・２':
      return 'bodyAssist2'
    case 'ボディ':
      return 'body'
    case 'モーター':
      return 'motor'
    case 'ギヤ':
      return 'gear'
    case 'シャーシ':
      return 'chassis'
    case 'フロント・ホイール':
      return 'frontWheel'
    case 'フロント・タイヤ':
      return 'frontTire'
    case 'リヤ・ホイール':
      return 'rearWheel'
    case 'リヤ・タイヤ':
      return 'rearTire'
    case 'フロントステー':
      return 'frontStay'
    case 'サイドステー':
      return 'sideStay'
    case 'リヤステー':
      return 'rearStay'
    case 'フロント・ローラー上':
      return 'frontRollerHigh'
    case 'サイド・ローラー上':
      return 'sideRollerHigh'
    case 'リヤ・ローラー上':
      return 'rearRollerHigh'
    case 'フロント・ローラー中':
      return 'frontRollerMiddle'
    case 'サイド・ローラー中':
      return 'sideRollerMiddle'
    case 'リヤ・ローラー中':
      return 'rearRollerMiddle'
    case 'リヤ・ローラー下':
      return 'rearRollerLow'
    case 'ボディオプション':
      return 'bodyOption'
    case 'ウイングローラー':
      return 'wingRoller'
    case 'フロント・スタビライザー':
      return 'frontStabilizer'
    case 'サイド・スタビライザー':
      return 'sideStabilizer'
    case 'リヤ・スタビライザー':
      return 'rearStabilizer'
    case 'フロント・セッティングウェイト':
      return 'frontSettingWeight'
    case 'リヤ・セッティングウェイト':
      return 'rearSettingWeight'
    case 'アクセサリー・１':
      return 'accessory1'
    case 'アクセサリー・２':
      return 'accessory2'
    case 'アクセサリー・３':
      return 'accessory3'
    case 'アクセサリー・４':
      return 'accessory4'
  }
}

export const getters = {
  getRecipeByPart: (state) => (tab, partJp) => {
    const partKey = resolvePartKey(partJp)
    return state[tab][partKey]
  },
  getEquipByPart: (state, getters, rootState, rootGetters) => (tab, partJp) => {
    const recipe = getters.getRecipeByPart(tab, partJp)
    if (!recipe) return { key: '', partJp, score: {}, recipe }
    const key = recipe.key
    const item = rootGetters['catalog/getItemInfo'](partJp, key) || {}
    const score = Mini4.getPartScore({
      part: partJp,
      item,
      partRecipe: recipe,
    })
    return { key, partJp, score, recipe, ...item }
  },
  gAllEquips(state, getters, rootState, rootGetters) {
    if (rootState.ing.ping);
    const parts = Mini4.getAllPartNames()
    const allEquips = parts.map((part) => {
      const partCatalog = rootGetters['catalog/getCatalogByPart'](part) || {}
      const partRecipe = getters.getRecipeByPart(rootState.ing.tab, part) || {}
      const item = partCatalog[partRecipe.key] || {}
      const score = Mini4.getPartScore({ part, item, partRecipe })
      return { part, item, partRecipe, score }
    })
    const accessories = allEquips.filter((e) => {
      return Mini4.isAccessory(e.part)
    })
    const funcGetItem = rootGetters['catalog/getItemInfo']
    const normalEquips = Mini4.resolveNormalEquips(accessories, funcGetItem)
    const baseEquips = Object.entries(rootGetters['catalog/getBaseItems']).map(
      ([k, v]) => {
        return { part: 'ベース', item: v, partRecipe: {} }
      }
    )
    return allEquips.concat(normalEquips).concat(baseEquips)
  },
  gAllPartScores(state, getters) {
    return getters.gAllEquips.map((x) => Mini4.getPartScore(x))
  },
  gAllPartScoresSum(state, getters) {
    const sums = {}
    for (const b of getters.gAllPartScores) {
      for (const key of Object.keys(b)) {
        sums[key] = (sums[key] || 0) + Number(b[key] || 0)
      }
    }
    const result = {}
    for (const label of Mini4.getAllAffects()) {
      result[label] = sums[label] || 0
    }
    return result
  },
  getRollerFriction: (state, getters) => (tab) => {
    const scores = getters.gAllPartScoresSum
    if (scores && scores.スラスト角 <= 0) {
      return { score: {} }
    }
    const rollers = [
      'ウイングローラー',
      'リヤ・ローラー下',
      'リヤ・ローラー中',
      'リヤ・ローラー上',
      'サイド・ローラー中',
      'サイド・ローラー上',
    ]
    const partJp = rollers.find((x) => {
      const r = getters.getRecipeByPart(tab, x)
      return r && r.key
    })
    if (partJp) {
      return getters.getEquipByPart(tab, partJp)
    }
    return { score: {} }
  },
  getRollerRegist: (state, getters, rootState, rootGetters) => (tab) => {
    const rollers = [
      'フロント・ローラー上',
      'フロント・ローラー中',
      'リヤ・ローラー上',
      'リヤ・ローラー中',
      'リヤ・ローラー下',
      'ウイングローラー',
    ]
    const equips = rollers.map((partJp) => {
      return getters.getEquipByPart(tab, partJp)
    })
    const tgt = equips.reduce(
      (acc, crr) => {
        if (!crr.key) return acc
        const obj =
          acc.score['ローラー抵抗'] > crr.score['ローラー抵抗'] ? acc : crr
        return obj
      },
      { score: {} }
    )
    return tgt
  },
}

export const mutations = {
  setPartItem(state, { tab, part, name }) {
    const partKey = resolvePartKey(part)
    const machine = state[tab]
    machine[partKey] = { ...machine[partKey], key: name }
  },
  setFeature(state, { tab, feature, name }) {
    const machine = state[tab]
    machine[feature] = { key: name }
  },
  clearPartItem(state, { tab, part }) {
    const partKey = resolvePartKey(part)
    const machine = state[tab]
    machine[partKey] = { key: '', crafts: [] }
  },
  clearFeature(state, { tab, feature }) {
    const machine = state[tab]
    machine[feature] = { key: '' }
  },
  clearMachine(state, { tab }) {
    state[tab] = JSON.parse(JSON.stringify(initialMachineState))
  },
  setPartCraft(state, { tab, part, craftIndex, action, quality, level }) {
    const partKey = resolvePartKey(part)
    state[tab][partKey].crafts[craftIndex] = { action, quality, level }
  },
  setPartCraftSet(state, { tab, part, crafts }) {
    const partKey = resolvePartKey(part)
    state[tab][partKey].crafts = crafts
  },
  setPartCraftQuality(state, { tab, part, craftIndex, quality }) {
    dg('[#setPartCraftQuality]', { tab, part, craftIndex, quality })
    const partKey = resolvePartKey(part)
    const machine = state[tab]
    const ingPart = machine[partKey]
    if (!ingPart.crafts) ingPart.crafts = []
    const c = ingPart.crafts[craftIndex] || {}
    ingPart.crafts[craftIndex] = { ...c, quality }
  },
  setPartCraftLevel(state, { tab, part, craftIndex, level }) {
    dg('[#setPartCraftLevel]', { tab, part, craftIndex, level })
    const partKey = resolvePartKey(part)
    const machine = state[tab]
    const ingPart = machine[partKey]
    if (!ingPart.crafts) ingPart.crafts = []
    const c = ingPart.crafts[craftIndex] || {}
    ingPart.crafts[craftIndex] = { ...c, level }
  },
  clearAllPartCrafts(state, { tab, part }) {
    dg('[#clearAllPartCrafts]', { tab, part })
    const partKey = resolvePartKey(part)
    const machine = state[tab]
    const partRecipe = machine[partKey]
    machine[partKey] = { ...partRecipe, crafts: [] }
  },
  setDrill(state, { tab, bool }) {
    const machine = state[tab]
    machine.body = { ...machine.body, 肉抜き: bool }
  },
  copyMachineTab(state, { tabFrom, tabTo }) {
    state[tabTo] = JSON.parse(JSON.stringify(state[tabFrom]))
  },
}

export const actions = {
  change({ commit, rootState, dispatch }, { part, name }) {
    const { tab } = rootState.ing
    commit('setPartItem', { tab, part, name })
    dispatch('reviewCrafts', part)
    dispatch('ing/refresh', null, { root: true })
  },
  changeFeature({ commit, rootState, dispatch }, { feature, name }) {
    const { tab } = rootState.ing
    commit('setFeature', { tab, feature, name })
    dispatch('ing/refresh', null, { root: true })
  },
  reviewCrafts({ dispatch, getters, rootState, rootGetters }, part) {
    const { key, crafts } = getters.getRecipeByPart(rootState.ing.tab, part)
    const item = rootGetters['catalog/getItemInfo'](part, key)
    const craftMaster = rootState.craft.craft
    const craftables = craftMaster[item.改造カテゴリ] || []
    const craftableActions = craftables.map((x) => x.action)
    for (let i = 0; i < crafts.length; i++) {
      const { action } = crafts[i] || {}
      if (!craftableActions.includes(action)) {
        dispatch('clearCraft', { part, craftIndex: i })
      }
    }
  },
  detach({ commit }, arg) {
    commit('clearPartItem', arg)
  },
  detachFeature({ commit, rootState }, feature) {
    const { tab } = rootState.ing
    commit('clearFeature', { tab, feature })
  },
  detachAll({ commit, rootState, dispatch }) {
    const { tab } = rootState.ing
    commit('clearMachine', { tab })
    dispatch('ing/refresh', null, { root: true })
  },
  changeCraft({ commit, rootState, dispatch }, arg) {
    dg('<#changeCraft>', arg)
    const { tab } = rootState.ing
    commit('setPartCraft', { ...arg, tab })
    dispatch('ing/refresh', null, { root: true })
  },
  changeCraftSet({ commit, rootState, dispatch }, arg) {
    dg('<#changeCraftSet>', arg)
    const { tab } = rootState.ing
    commit('setPartCraftSet', { ...arg, tab })
    dispatch('ing/refresh', null, { root: true })
  },
  clearCraft({ dispatch }, { part, craftIndex }) {
    const arg = { part, craftIndex, action: '', quality: 0, level: 0 }
    dispatch('changeCraft', arg)
  },
  changeCraftQuality({ commit, rootState, dispatch }, arg) {
    const { tab } = rootState.ing
    commit('setPartCraftQuality', { ...arg, tab })
    dispatch('ing/refresh', null, { root: true })
  },
  changeCraftLevel({ commit, dispatch }, arg) {
    commit('setPartCraftLevel', arg)
    dispatch('ing/refresh', null, { root: true })
  },
  changeDrill({ commit, dispatch }, { tab, bool }) {
    commit('setDrill', { tab, bool })
    dispatch('ing/refresh', null, { root: true })
  },
  cleanupCrafts({ commit, rootState, state }, part) {
    const tab = rootState.ing.tab
    const partKey = resolvePartKey(part)
    const machine = state[tab]
    const partCrafts = machine[partKey].crafts || []
    for (let i = 0; i < partCrafts.length; i++) {
      const c = partCrafts[i] || {}
      if (!c.action && (c.quality || c.level)) {
        dg('<#cleanupCrafts>', { tab, part, i })
        const payload = {
          tab,
          part,
          craftIndex: i,
          action: '',
          quality: '',
          level: 0,
        }
        commit('setPartCraft', payload)
      }
    }
  },
  removeAllCrafts({ commit }, arg) {
    commit('clearAllPartCrafts', arg)
  },
  dump({ state }, partJapanese) {
    const part = resolvePartKey(partJapanese)
    // eslint-disable-next-line no-console
    console.log(JSON.stringify(state[part]))
  },
  copyMachineTab({ commit, dispatch }, { tabFrom, tabTo }) {
    commit('copyMachineTab', { tabFrom, tabTo })
    dispatch('ing/refresh', null, { root: true })
  },
}
