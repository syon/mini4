export default class Mini4 {
  static getAllPartNames() {
    return [
      'ボディ',
      'モーター',
      'ギヤ',
      'シャーシ',
      'フロント・ホイール',
      'フロント・タイヤ',
      'リヤ・ホイール',
      'リヤ・タイヤ',
      'フロントステー',
      'サイドステー',
      'リヤステー',
      'フロント・ローラー中',
      'サイド・ローラー中',
      'リヤ・ローラー中',
      'ボディオプション',
      'ウイングローラー',
      'フロント・スタビライザー',
      'サイド・スタビライザー',
      'リヤ・スタビライザー',
      'フロント・セッティングウェイト',
      'リヤ・セッティングウェイト',
      'アクセサリー・１',
      'アクセサリー・２',
      'アクセサリー・３',
      'アクセサリー・４'
    ]
  }

  /**
   * 装着箇所を引数に、選択できるパーツの種類を返す。
   */
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

  static resolveCodeByCategory(category) {
    switch (category) {
      case 'ボディ':
        return 'body'
      case 'モーター':
        return 'motor'
      case 'ギヤ':
        return 'gear'
      case 'シャーシ':
        return 'chassis'
      case 'ホイール':
        return 'wheel'
      case 'タイヤ':
        return 'tire'
      case 'フロントステー':
        return 'frontstay'
      case 'サイドステー':
        return 'sidestay'
      case 'リヤステー':
        return 'rearstay'
      case 'ローラー':
        return 'roller'
      case 'ボディオプション':
        return 'bodyoption'
      case 'スタビライザー':
        return 'stabilizer'
      case 'セッティングウェイト':
        return 'settingweight'
      case 'アクセサリー':
        return 'accessory'
    }
  }

  static resolveCamelByPart(part) {
    switch (part) {
      case 'ボディ':
        return 'Body'
      case 'モーター':
        return 'Motor'
      case 'ギヤ':
        return 'Gear'
      case 'シャーシ':
        return 'Chassis'
      case 'フロント・ホイール':
        return 'FrontWheel'
      case 'フロント・タイヤ':
        return 'FrontTire'
      case 'リヤ・ホイール':
        return 'RearWheel'
      case 'リヤ・タイヤ':
        return 'RearTire'
      case 'フロントステー':
        return 'FrontStay'
      case 'サイドステー':
        return 'SideStay'
      case 'リヤステー':
        return 'RearStay'
      case 'フロント・ローラー中':
        return 'FrontRollerMiddle'
      case 'サイド・ローラー中':
        return 'SideRollerMiddle'
      case 'リヤ・ローラー中':
        return 'RearRollerMiddle'
      case 'ボディオプション':
        return 'BodyOption'
      case 'ウイングローラー':
        return 'WingRoller'
      case 'フロント・スタビライザー':
        return 'FrontStabilizer'
      case 'サイド・スタビライザー':
        return 'SideStabilizer'
      case 'リヤ・スタビライザー':
        return 'RearStabilizer'
      case 'フロント・セッティングウェイト':
        return 'FrontSettingWeight'
      case 'リヤ・セッティングウェイト':
        return 'RearSettingWeight'
      case 'アクセサリー・１':
        return 'Accessory1'
      case 'アクセサリー・２':
        return 'Accessory2'
      case 'アクセサリー・３':
        return 'Accessory3'
      case 'アクセサリー・４':
        return 'Accessory4'
    }
  }

  static calcCraftResult(part, defaultItemSpec, partRecipe, partCrafts) {
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
    if (part === 'ボディ') {
      if (partRecipe.肉抜き > 0) {
        resultSpecs.重さ = resultSpecs.重さ - partRecipe.肉抜き * 0.32
      }
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

  static resolvePair(basePart, basePairCategory) {
    const sequence = `${basePart}#${basePairCategory}`
    switch (sequence) {
      case 'ボディ#ボディ':
        return { part: 'シャーシ', category: 'シャーシ' }
      case 'ボディ#FMボディ':
        return { part: 'シャーシ', category: 'FMシャーシ' }
      case 'シャーシ#シャーシ':
        return { part: 'ボディ', category: 'ボディ' }
      case 'シャーシ#FMシャーシ':
        return { part: 'ボディ', category: 'FMボディ' }
      case 'フロント・ホイール#小径ホイール':
        return { part: 'フロント・タイヤ', category: '小径タイヤ' }
      case 'フロント・ホイール#小径ローハイトホイール':
        return { part: 'フロント・タイヤ', category: '小径ローハイトタイヤ' }
      case 'フロント・ホイール#大径ホイール':
        return { part: 'フロント・タイヤ', category: '大径タイヤ' }
      case 'フロント・タイヤ#小径タイヤ':
        return { part: 'フロント・ホイール', category: '小径ホイール' }
      case 'フロント・タイヤ#小径ローハイトタイヤ':
        return {
          part: 'フロント・ホイール',
          category: '小径ローハイトホイール'
        }
      case 'フロント・タイヤ#大径タイヤ':
        return { part: 'フロント・ホイール', category: '大径ホイール' }
      case 'リヤ・ホイール#小径ホイール':
        return { part: 'リヤ・タイヤ', category: '小径タイヤ' }
      case 'リヤ・ホイール#小径ローハイトホイール':
        return { part: 'リヤ・タイヤ', category: '小径ローハイトタイヤ' }
      case 'リヤ・ホイール#大径ホイール':
        return { part: 'リヤ・タイヤ', category: '大径タイヤ' }
      case 'リヤ・タイヤ#小径タイヤ':
        return { part: 'リヤ・ホイール', category: '小径ホイール' }
      case 'リヤ・タイヤ#小径ローハイトタイヤ':
        return { part: 'リヤ・ホイール', category: '小径ローハイトホイール' }
      case 'リヤ・タイヤ#大径タイヤ':
        return { part: 'リヤ・ホイール', category: '大径ホイール' }
      default:
        return { part: null, category: null }
    }
  }
}
