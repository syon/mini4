export const state = () => ({
  part: 'ボディ',
  partCatalog: {},
  partRecipe: {},
  item: {},
  crafts: [],
  isCrafting: false,
  craftIndex: null,
  craftAction: '',
  craftQuality: null,
  craftLevel: null,
  isShowcase: false,
  isBarrier: false
})

export const getters = {}

export const mutations = {
  setPart(state, part) {
    state.part = part
  },
  setPartCatalog(state, partCatalog) {
    state.partCatalog = partCatalog
  },
  setPartRecipe(state, partRecipe) {
    state.partRecipe = partRecipe
  },
  setItem(state, item) {
    state.item = item
  },
  setCrafts(state, crafts) {
    state.crafts = crafts
  },
  setCraftIndex(state, craftIndex) {
    state.craftIndex = craftIndex
  },
  setCraftAction(state, craftAction) {
    state.craftAction = craftAction
  },
  setCraftQuality(state, craftQuality) {
    state.craftQuality = craftQuality
  },
  setCraftLevel(state, craftLevel) {
    state.craftLevel = craftLevel
  },
  setCrafting(state, isCrafting) {
    state.isCrafting = isCrafting
  },
  setShowcase(state, isShowcase) {
    state.isShowcase = isShowcase
  },
  setBarrier(state, isBarrier) {
    state.isBarrier = isBarrier
  }
}

export const actions = {
  transIngPart({ commit, rootState, rootGetters }, part) {
    const partCatalog = rootGetters['catalog/getCatalogByPart'](part) || {}
    const partRecipe = rootGetters['recipe/getRecipeByPart'](part) || {}
    const item = partCatalog[partRecipe.key] || {}
    const crafts = rootState.craft.craft[item.改造カテゴリ] || []
    commit('setPart', part)
    commit('setPartCatalog', partCatalog)
    commit('setPartRecipe', partRecipe)
    commit('setItem', { key: partRecipe.key, ...item })
    commit('setCrafts', crafts)
  },
  refresh({ dispatch, state }) {
    dispatch('transIngPart', state.part)
  },
  changeCraftIndex({ state, commit }, payload) {
    const { craftIndex, craftAction, craftQuality, craftLevel } = payload
    if (craftIndex === state.craftIndex && state.isCrafting) {
      commit('setCrafting', false)
      commit('setBarrier', false)
    } else {
      commit('setCrafting', true)
      commit('setBarrier', true)
      commit('setCraftIndex', craftIndex)
      commit('setCraftAction', craftAction)
      commit('setCraftQuality', craftQuality)
      commit('setCraftLevel', craftLevel)
    }
  },
  toggleShowcase({ commit, state, dispatch }) {
    const nextBool = !state.isShowcase
    commit('setShowcase', nextBool)
    if (nextBool) {
      commit('setBarrier', true)
    } else {
      dispatch('hideBarrier')
    }
  },
  toggleCrafting({ commit, state, dispatch }) {
    const nextBool = !state.isCrafting
    commit('setCrafting', nextBool)
    if (nextBool) {
      commit('setBarrier', true)
    } else {
      dispatch('hideBarrier')
    }
  },
  hideBarrier({ commit }) {
    commit('setCrafting', false)
    commit('setShowcase', false)
    commit('setBarrier', false)
  }
}
