export const state = () => ({
  part: 'body',
  isCrafting: true,
  craftIndex: 0
})

export const getters = {}

export const mutations = {
  setPart(state, part) {
    state.part = part
  },
  setCraftIndex(state, craftIndex) {
    state.craftIndex = craftIndex
  }
}

export const actions = {
  trans({ commit }, part) {
    commit('setPart', part)
  },
  changeCraftIndex({ commit }, craftIndex) {
    commit('setCraftIndex', craftIndex)
  }
}
