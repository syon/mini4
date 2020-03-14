import initialState from './recipe.json'

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
    state[part] = { ...state[part], key: item }
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
