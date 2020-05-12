import debug from 'debug'
import initialState from './recipe.json'
import Mini4 from '@/models/Mini4'

const dg = debug('@:recipe')

const obj = {
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
  M1: { ...obj },
  M2: { ...obj },
  M3: { ...obj },
  M4: { ...obj },
  M5: { ...obj },
})

function resolvePartKey(partJapanese) {
  switch (partJapanese) {
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
  getRecipeByPart: (state) => (tab, part) => {
    const partKey = resolvePartKey(part)
    return state[tab][partKey]
  },
  getEquipByPart: (state, getters, rootState, rootGetters) => (tab, part) => {
    const r = getters.getRecipeByPart(tab, part)
    return rootGetters['catalog/getItemInfo'](part, r.key) || {}
  },
  gAllEquips(state, getters, rootState, rootGetters) {
    const parts = Mini4.getAllPartNames()
    const allEquips = parts.map((part) => {
      const partCatalog = rootGetters['catalog/getCatalogByPart'](part) || {}
      const partRecipe = getters.getRecipeByPart(rootState.ing.tab, part) || {}
      const item = partCatalog[partRecipe.key] || {}
      return { part, item, partRecipe }
    })
    const accessories = allEquips.filter((e) => {
      return Mini4.isAccessory(e.part)
    })
    const funcGetItem = rootGetters['catalog/getItemInfo']
    const normalEquips = Mini4.resolveNormalEquips(accessories, funcGetItem)
    return allEquips.concat(normalEquips)
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
}

export const mutations = {
  setAll(state, payload) {
    for (const [k, v] of Object.entries(payload)) {
      const partKey = resolvePartKey(k)
      state[partKey] = v
    }
  },
  setPartItem(state, { tab, part, name }) {
    const partKey = resolvePartKey(part)
    const machine = state[tab]
    machine[partKey] = { ...machine[partKey], key: name }
  },
  clearPartItem(state, { tab, part }) {
    const partKey = resolvePartKey(part)
    const machine = state[tab]
    machine[partKey] = { key: '', crafts: [] }
  },
  setPartCraft(state, { tab, part, craftIndex, action, quality, level }) {
    const partKey = resolvePartKey(part)
    const machine = state[tab]
    const partRecipe = machine[partKey]
    partRecipe.crafts[craftIndex] = { action, quality, level }
    state[partKey] = { ...partRecipe, crafts: partRecipe.crafts }
  },
  setPartCraftQuality(state, { tab, part, craftIndex, quality }) {
    const partKey = resolvePartKey(part)
    const machine = state[tab]
    const ingPart = machine[partKey]
    if (!ingPart.crafts) ingPart.crafts = []
    const c = ingPart.crafts[craftIndex] || {}
    ingPart.crafts[craftIndex] = { ...c, quality }
    state[partKey] = { ...ingPart, crafts: ingPart.crafts }
  },
  setPartCraftLevel(state, { part, craftIndex, level }) {
    const partKey = resolvePartKey(part)
    const ingPart = state[partKey]
    if (!ingPart.crafts) ingPart.crafts = []
    const c = ingPart.crafts[craftIndex] || {}
    ingPart.crafts[craftIndex] = { ...c, level }
    state[partKey] = { ...ingPart, crafts: ingPart.crafts }
  },
  clearAllPartCrafts(state, { part }) {
    const partKey = resolvePartKey(part)
    const partRecipe = state[partKey]
    state[partKey] = { ...partRecipe, crafts: [] }
  },
  setDrill(state, bool) {
    state.body = { ...state.body, 肉抜き: bool }
  },
}

export const actions = {
  load({ commit }) {
    dg('[#load]', initialState)
    commit('setAll', initialState)
  },
  change({ commit, rootState, dispatch }, { part, name }) {
    const { tab } = rootState.ing
    commit('setPartItem', { tab, part, name })
    dispatch('reviewCrafts', part)
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
  changeCraft({ commit, rootState, dispatch }, arg) {
    const { tab } = rootState.ing
    commit('setPartCraft', { ...arg, tab })
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
  changeDrill({ commit, dispatch }, bool) {
    commit('setDrill', bool)
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
  removeAllCrafts({ commit }, part) {
    commit('clearAllPartCrafts', { part })
  },
  dump({ state }, partJapanese) {
    const part = resolvePartKey(partJapanese)
    // eslint-disable-next-line no-console
    console.log(JSON.stringify(state[part]))
  },
}
