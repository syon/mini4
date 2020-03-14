const initialState = {
  body: { key: 'BeakSpider' },
  motor: {
    key: 'RevTune',
    crafts: [
      {
        action: '3Vブレークイン(回転数重視)',
        quarity: '至高',
        level: 35
      },
      {
        action: '3Vブレークイン(回転数重視)',
        quarity: '職人',
        level: 35
      },
      {
        action: '冷却ブレークイン(回転数重視)',
        quarity: '職人',
        level: 35
      },
      {
        action: '冷却ブレークイン(回転数重視)',
        quarity: '職人',
        level: 35
      },
      {
        action: '3Vブレークイン(回転数重視)',
        quarity: '職人',
        level: 35
      },
      {
        action: '3Vブレークイン(回転数重視)',
        quarity: '職人',
        level: 35
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
