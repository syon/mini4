export const state = () => ({
  isMobile: true,
  ping: '',
  tab: 'M1',
  part: 'ボディ',
  partCatalog: {},
  partRecipe: {},
  partCraftPreset: [],
  item: {},
  crafts: [],
  isCrafting: false,
  craftIndex: null,
  craftAction: '',
  craftQuality: null,
  craftLevel: null,
  isShowcase: false,
  isBarrier: false,
  isTune: false,
  isAbout: false,
  isSupport: false,
})

export const getters = {}

export const mutations = {
  setMobile(state, bool) {
    state.isMobile = bool
  },
  setPing(state) {
    state.ping = new Date().getTime()
  },
  setTab(state, tab) {
    state.tab = tab
  },
  setPart(state, part) {
    state.part = part
  },
  setPartCatalog(state, partCatalog) {
    state.partCatalog = partCatalog
  },
  setPartRecipe(state, partRecipe) {
    state.partRecipe = partRecipe
  },
  setPartCraftPreset(state, partCraftPreset) {
    state.partCraftPreset = partCraftPreset
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
  resetCraft(state) {
    state.craftIndex = null
    state.craftAction = ''
    state.craftQuality = null
    state.craftLevel = null
  },
  setShowcase(state, isShowcase) {
    state.isShowcase = isShowcase
  },
  setBarrier(state, isBarrier) {
    state.isBarrier = isBarrier
  },
  setTune(state, isTune) {
    state.isTune = isTune
  },
  setAbout(state, isAbout) {
    state.isAbout = isAbout
  },
  setSupport(state, isSupport) {
    state.isSupport = isSupport
  },
}

export const actions = {
  transIngPart({ commit, state, rootState, rootGetters }, { tab, part }) {
    const partCatalog = rootGetters['catalog/getCatalogByPart'](part) || {}
    const partRecipe =
      rootGetters['recipe/getRecipeByPart'](state.tab, part) || {}
    const item = partCatalog[partRecipe.key] || {}
    const crafts = rootState.craft.craft[item.改造カテゴリ] || []
    const partCraftPreset =
      rootGetters['craft/getPresetByCraftCategory'](item.改造カテゴリ) || {}
    commit('setTab', tab)
    commit('setPart', part)
    commit('setPartCatalog', partCatalog)
    commit('setPartRecipe', partRecipe)
    commit('setPartCraftPreset', partCraftPreset)
    commit('setItem', { key: partRecipe.key, ...item })
    commit('setCrafts', crafts)
    commit('setPing')
  },
  refresh({ dispatch, state }) {
    const { tab, part } = state
    dispatch('transIngPart', { tab, part })
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
  updateCraft({ commit }, payload) {
    const { craftIndex, craftAction, craftQuality, craftLevel } = payload
    commit('setCraftIndex', craftIndex)
    commit('setCraftAction', craftAction)
    commit('setCraftQuality', craftQuality)
    commit('setCraftLevel', craftLevel)
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
  hideBarrier({ commit, state, dispatch }) {
    commit('setBarrier', false)
    commit('resetCraft', false)
    commit('setCrafting', false)
    commit('setShowcase', false)
    commit('setTune', false)
    const { part } = state
    dispatch('recipe/cleanupCrafts', part, { root: true })
  },
  toggleCraftTune({ commit, state, dispatch }) {
    const nextBool = !state.isTune
    commit('setTune', nextBool)
    if (nextBool) {
      commit('setBarrier', true)
    } else {
      dispatch('hideBarrier')
    }
  },
}
