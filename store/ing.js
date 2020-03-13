export const state = () => ({
  part: 'body'
})

export const getters = {}

export const mutations = {
  setPart(state, part) {
    state.part = part
  }
}

export const actions = {
  change({ commit }, part) {
    commit('setPart', part)
  }
}
