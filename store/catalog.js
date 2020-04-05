import catalog from './catalog.json'
import Mini4 from '@/models/Mini4'

export const state = () => ({
  dataset: catalog,
})

export const getters = {
  getCatalogByPart: (state) => (part) => {
    const category = Mini4.resolveCategoryByPart(part)
    return state.dataset[category]
  },
  getItemInfo: (state, getters) => (part, key) => {
    const c = getters.getCatalogByPart(part)
    return c[key]
  },
}

export const mutations = {}

export const actions = {}
