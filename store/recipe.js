import initialState from './recipe.json'

export const state = () => ({
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
  frontRollerMiddle: { key: '', crafts: [] },
  sideRollerMiddle: { key: '', crafts: [] },
  rearRollerMiddle: { key: '', crafts: [] },
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
  accessory4: { key: '', crafts: [] }
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
    case 'フロント・ローラー中':
      return 'frontRollerMiddle'
    case 'サイド・ローラー中':
      return 'sideRollerMiddle'
    case 'リヤ・ローラー中':
      return 'rearRollerMiddle'
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
  getRecipeByPart: (state) => (part) => {
    const partKey = resolvePartKey(part)
    return state[partKey]
  }
}

export const mutations = {
  setAll(state, payload) {
    for (const [k, v] of Object.entries(payload)) {
      const partKey = resolvePartKey(k)
      state[partKey] = v
    }
  },
  setPartItem(state, { part, item }) {
    const partKey = resolvePartKey(part)
    state[partKey] = { ...state[partKey], key: item }
  },
  setPartCraft(state, { part, craftIndex, action, quarity, level }) {
    const partKey = resolvePartKey(part)
    const ingPart = state[partKey]
    ingPart.crafts[craftIndex] = { action, quarity, level }
    state[partKey] = { ...ingPart, crafts: ingPart.crafts }
  },
  setPartCraftquarity(state, { part, craftIndex, quarity }) {
    const partKey = resolvePartKey(part)
    const ingPart = state[partKey]
    const c = ingPart.crafts[craftIndex]
    ingPart.crafts[craftIndex] = { ...c, quarity }
    state[partKey] = { ...ingPart, crafts: ingPart.crafts }
  },
  setPartCraftLevel(state, { part, craftIndex, level }) {
    const partKey = resolvePartKey(part)
    const ingPart = state[partKey]
    const c = ingPart.crafts[craftIndex]
    ingPart.crafts[craftIndex] = { ...c, level }
    state[partKey] = { ...ingPart, crafts: ingPart.crafts }
  },
  setDrill(state, arg) {
    state.body = { ...state.body, 肉抜き: arg }
  }
}

export const actions = {
  async load({ commit }) {
    await 0
    const payload = initialState
    commit('setAll', payload)
  },
  change({ commit, dispatch }, { part, item }) {
    commit('setPartItem', { part, item })
    dispatch('ing/refresh', null, { root: true })
  },
  changeCraft({ commit, dispatch }, arg) {
    commit('setPartCraft', arg)
    dispatch('ing/refresh', null, { root: true })
  },
  changeCraftquarity({ commit, dispatch }, arg) {
    commit('setPartCraftquarity', arg)
    dispatch('ing/refresh', null, { root: true })
  },
  changeCraftLevel({ commit, dispatch }, arg) {
    commit('setPartCraftLevel', arg)
    dispatch('ing/refresh', null, { root: true })
  },
  changeDrill({ commit, dispatch }, arg) {
    commit('setDrill', arg)
    dispatch('ing/refresh', null, { root: true })
  },
  dump({ state }, partJapanese) {
    const part = resolvePartKey(partJapanese)
    console.log(JSON.stringify(state[part]))
  }
}
