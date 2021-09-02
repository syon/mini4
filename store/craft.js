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
  getCraftSummary: (state) => (craftCategory, crafts) => {
    if (!crafts || !craftCategory) return ''
    const master = state.craft[craftCategory]
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
