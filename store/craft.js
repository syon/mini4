import craft from './craft.json'
import craftPreset from './craft-preset.json'

export const state = () => ({
  craft,
  craftPreset,
})

export const getters = {
  getPresetByCraftCategory: (state) => (craftCategory) => {
    return state.craftPreset[craftCategory]
  },
}

export const mutations = {}

export const actions = {}
