export const state = () => ({
  part: 'ボディ',
  isCrafting: false,
  craftIndex: 0,
  craftAction: ''
})

export const getters = {}

export const mutations = {
  setPart(state, part) {
    state.part = part
  },
  setCraftIndex(state, craftIndex) {
    state.craftIndex = craftIndex
  },
  setCraftAction(state, craftAction) {
    state.craftAction = craftAction
  },
  setCrafting(state, isCrafting) {
    state.isCrafting = isCrafting
  }
}

export const actions = {
  trans({ commit }, part) {
    commit('setPart', part)
  },
  changeCraftIndex({ state, commit }, { craftIndex, craftAction }) {
    if (craftIndex === state.craftIndex && state.isCrafting) {
      commit('setCrafting', false)
    } else {
      commit('setCrafting', true)
      commit('setCraftIndex', craftIndex)
      commit('setCraftAction', craftAction)
    }
  }
}
