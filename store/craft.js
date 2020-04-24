import craft from './craft.json'
import craftPreset from './craft-preset.json'
import Mini4 from '@/models/Mini4'

export const state = () => ({
  craft,
  craftPreset,
})

export const getters = {
  getPresetByPart: (state) => (part) => {
    const category = Mini4.resolveCategoryByPart(part)
    return state.craftPreset[category]
  },
}

export const mutations = {}

export const actions = {}
