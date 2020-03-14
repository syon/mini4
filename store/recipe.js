const initialState = {
  body: { key: 'BeakSpider' },
  motor: {
    key: 'TorqueTune',
    crafts: [
      {
        action: 'ピニオンギヤの固定',
        quarity: '職人',
        level: 37
      },
      {
        action: 'ピニオンギヤの固定',
        quarity: '至高',
        level: 22
      },
      {
        action: '慣らし走行',
        quarity: 'イイ',
        level: 5
      }
    ]
  },
  gear: { key: 'SuperCounter' }
}

export const state = () => ({
  body: '',
  motor: '',
  gear: ''
})

export const getters = {}

export const mutations = {
  setAll(state, payload) {
    state.body = payload.body
    for (const [k, v] of Object.entries(payload)) {
      state[k] = v
    }
  },
  setPartItem(state, { part, item }) {
    state[part] = item
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
  }
}
