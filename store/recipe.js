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
  frontRollerMiddle: { key: '', crafts: [] },
  sideRollerMiddle: { key: '', crafts: [] },
  rearRollerMiddle: { key: '', crafts: [] }
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
    case 'フロント・ローラー中':
      return 'frontRollerMiddle'
    case 'サイド・ローラー中':
      return 'sideRollerMiddle'
    case 'リヤ・ローラー中':
      return 'rearRollerMiddle'
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
    state[partKey] = { key: ingPart.key, crafts: ingPart.crafts }
  }
}

export const actions = {
  async load({ commit }) {
    await 0
    const payload = initialState
    commit('setAll', payload)
  },
  change({ commit }, { part, item }) {
    commit('setPartItem', { part, item })
  },
  changeCraft({ commit }, arg) {
    commit('setPartCraft', arg)
  }
}
