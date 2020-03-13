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
    const payload = {
      body: 'BeakSpider',
      motor: 'TorqueTune',
      gear: 'SuperCounter'
    }
    commit('setAll', payload)
  },
  async change({ commit }, { part, item }) {
    await 0
    commit('setPartItem', { part, item })
  }
}
