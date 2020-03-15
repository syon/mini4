import initialState from './recipe.json'

export const state = () => ({
  ボディ: {},
  モーター: {},
  ギヤ: {},
  シャーシ: {},
  ホイール: {},
  タイヤ: {}
})

export const getters = {}

export const mutations = {
  setAll(state, payload) {
    for (const [k, v] of Object.entries(payload)) {
      state[k] = v
    }
  },
  setPartItem(state, { part, item }) {
    state[part] = { ...state[part], key: item }
  },
  setPartCraft(state, { part, craftIndex, action, quarity, level }) {
    const ingPart = state[part]
    ingPart.crafts[craftIndex] = { action, quarity, level }
    state[part] = { key: ingPart.key, crafts: ingPart.crafts }
  }
}

export const actions = {
  async load({ commit }) {
    await 0
    const payload = initialState
    commit('setAll', payload)
  },
  async change({ commit }, { part, item }) {
    await 0
    commit('setPartItem', { part, item })
  },
  changeCraft({ commit }, arg) {
    commit('setPartCraft', arg)
  }
}
