import debug from 'debug'
import Mini4 from '~/models/Mini4'

const dg = debug('@:owns')

export const state = () => ({
  ボディ: [],
  モーター: [],
  ギヤ: [],
  シャーシ: [],
  ホイール: [],
  タイヤ: [],
  フロントステー: [],
  サイドステー: [],
  リヤステー: [],
  ローラー: [],
  ボディオプション: [],
  スタビライザー: [],
  セッティングウェイト: [],
  アクセサリー: [],
})

export const getters = {
  gPartOwns: (state) => (part) => {
    const cat = Mini4.resolveCategoryByPart(part)
    return state[cat]
  },
}

export const mutations = {
  ADD_Element(state, { part, recipe }) {
    const { key } = recipe
    const crafts = JSON.parse(JSON.stringify(recipe.crafts))
    const newElement = { key, crafts }
    const cat = Mini4.resolveCategoryByPart(part)
    state[cat].push(newElement)
  },
  REMOVE_Element(state, { part, index }) {
    const cat = Mini4.resolveCategoryByPart(part)
    state[cat].splice(index, 1)
  },
}

export const actions = {
  add({ commit }, payload) {
    dg('<#add>', payload)
    commit('ADD_Element', payload)
  },
  remove({ commit }, payload) {
    dg('<#remove>', payload)
    commit('REMOVE_Element', payload)
  },
}
