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
  },
  setCrafting(state, isCrafting) {
    state.isCrafting = isCrafting
  }
}

export const actions = {
  trans({ commit }, part) {
    commit('setPart', part)
  },
  changeCraftIndex({ state, commit }, craftIndex) {
    if (craftIndex === state.craftIndex && state.isCrafting) {
      commit('setCrafting', false)
    } else {
      commit('setCrafting', true)
      commit('setCraftIndex', craftIndex)
    }
  }
}
