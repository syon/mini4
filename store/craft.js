import craft from './craft.json'
import craft7 from './craft-7.json'
import craftPreset from './craft-preset.json'

for (const [part, craftArr] of Object.entries(craft7)) {
  craft[part] = (craft[part] || []).concat(craftArr)
}

export const state = () => ({
  craft,
  craftPreset,
})

export const getters = {
  getPresetByCraftCategory: (state) => (craftCategory) => {
    return state.craftPreset[craftCategory]
  },
  getCraftSummary: (state) => (item, crafts) => {
    if (
      !crafts ||
      !(item.改造カテゴリ || item.改造カテゴリ2 || item.改造カテゴリ3)
    ) {
      return ''
    }
    const cp1 = state.craft[item.改造カテゴリ] || []
    const cp2 = state.craft[item.改造カテゴリ2] || []
    const cp3 = state.craft[item.改造カテゴリ3] || []
    const master = cp1.concat(cp2).concat(cp3)
    const hash = {}
    for (const c of crafts) {
      if (!c || !c.action) continue
      const m = master.find((x) => x.action === c.action)
      if (!m) continue
      hash[m.別名] = (hash[m.別名] || 0) + 1
    }
    const list = Object.entries(hash).map(([k, v]) => {
      return `${k}${v}`
    })
    return list.join('')
  },
}

export const mutations = {}

export const actions = {}
