export default class Mini4 {
  static resolveCategoryByPart(part) {
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
      case /スタビライザー/.test(part):
        category = 'スタビライザー'
        break
      case /セッティングウェイト/.test(part):
        category = 'セッティングウェイト'
        break
      case /アクセサリー/.test(part):
        category = 'アクセサリー'
        break
      default:
        break
    }
    return category
  }

  static calcCraftResult(defaultItemSpec, partRecipe, partCrafts) {
    const crafts = partRecipe.crafts || []
    const args = crafts.map((x) => Mini4.getCalcArgs(partCrafts, x)).flat()
    const resultSpecs = Object.assign({}, defaultItemSpec)
    for (const { affect, benefit, grow, fix } of args) {
      let kaizouVal = 0
      if (fix) {
        kaizouVal = benefit
      } else {
        kaizouVal = (defaultItemSpec[affect] || 0) * benefit
      }
      const para = resultSpecs[affect] || 0
      const growVal = (para + kaizouVal) * grow
      // 増分 == kaizouVal + growVal
      resultSpecs[affect] = para + kaizouVal + growVal
    }
    return resultSpecs
  }

  static getCalcArgs(partCrafts, { action, quarity, level }) {
    const c = partCrafts.find((x) => x.action === action)
    if (!c) return []
    return c.effects.map((e) => {
      return {
        affect: e.影響,
        benefit: e[quarity],
        grow: e.強化 * level,
        fix: e.固定
      }
    })
  }
}
