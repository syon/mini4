import * as viewportUnitsBuggyfill from 'viewport-units-buggyfill'

viewportUnitsBuggyfill.init()
window.addEventListener('resize', viewportUnitsBuggyfill.refresh, true)
