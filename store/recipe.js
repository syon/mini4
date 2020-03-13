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
  }
}
