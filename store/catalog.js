import catalog from './catalog.json'

export const state = () => ({
  dataset: catalog
})

export const getters = {
  getCatalogByPart: (state) => (part) => {
    // ////////////////////////////////////////////
    // TODO: see resolveCategoryByPart in RemodelArea.vue
    let category = part
    switch (true) {
      case /ホイール/.test(part):
        category = 'ホイール'
        break
      case /タイヤ/.test(part):
        category = 'タイヤ'
        break
      case /ローラー/.test(part):
        category = 'ローラー'
        break
      default:
        break
    }
    // ////////////////////////////////////////////
    return state.dataset[category]
  }
}

export const mutations = {}

export const actions = {}
