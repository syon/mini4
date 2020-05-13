import catalog from './catalog.json'
import Mini4 from '@/models/Mini4'

export const state = () => ({
  dataset: catalog,
})

export const getters = {
  getCatalogByPart: (state) => (partJp) => {
    const category = Mini4.resolveCategoryByPart(partJp)
    return state.dataset[category]
  },
  getItemInfo: (state, getters) => (partJp, key) => {
    if (!key) return { 性能: {} }
    const c = getters.getCatalogByPart(partJp)
    if (!c) return { 性能: {} }
    return c[key]
  },
  getBaseItems(state) {
    const baseSet = state.dataset.ベース
    return baseSet
  },
}

export const mutations = {}

export const actions = {}
