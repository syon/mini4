import debug from 'debug'
import Vue from 'vue'
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
  CHANGE_Element(state, { part, index, recipe }) {
    const cat = Mini4.resolveCategoryByPart(part)
    const crafts = JSON.parse(JSON.stringify(recipe.crafts))
    Vue.set(state[cat], index, { key: recipe.key, crafts })
  },
  CHANGE_ElementCraft(
    state,
    { part, index, craftIndex, action, quality, level }
  ) {
    const cat = Mini4.resolveCategoryByPart(part)
    const c = state[cat][index].crafts[craftIndex]
    const craft = {
      action: action || c.action,
      quality: quality || c.quality,
      level: level || c.level,
    }
    Vue.set(state[cat][index].crafts, craftIndex, craft)
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
  changeItem({ commit }, payload) {
    commit('CHANGE_Element', payload)
  },
  changeCraft({ commit }, payload) {
    commit('CHANGE_ElementCraft', payload)
  },
  remove({ commit }, payload) {
    dg('<#remove>', payload)
    commit('REMOVE_Element', payload)
  },
}
