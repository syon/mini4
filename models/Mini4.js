import CraftMaster from '../store/craft.json'
import RankMaster from './rank.json'

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
      'フロント・ローラー上',
      'サイド・ローラー上',
      'リヤ・ローラー上',
      'フロント・ローラー中',
      'サイド・ローラー中',
      'リヤ・ローラー中',
      'リヤ・ローラー下',
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
      'アクセサリー・４',
      '電池',
    ]
  }

  static isAccessory(part) {
    return part.startsWith('アクセサリー')
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

  static getAllAffects() {
    return [
      'スピード',
      'パワー',
      'コーナー安定',
      'スタミナ耐久',
      '重さ',
      'ギヤ負荷',
      'パワーロス',
      'スピードロス',
      'エアロダウンフォース',
      '節電',
      '制振',
      'スラスト角',
      'タイヤ摩擦',
      'タイヤ旋回',
      'タイヤ反発',
      'タイヤ径',
      'ローラー摩擦',
      'ローラー抵抗',
      'ウェーブ',
      'オフロード',
      'ギヤ比',
      '消費電流',
      'ブレーキ減速',
      'スタビ減速',
    ]
  }

  static resolveNormalEquips(accessories, funcGetItem) {
    return [
      'ターミナル',
      'ピニオンギヤ',
      'プロペラシャフト',
      '軸受け',
      'シャフト',
    ]
      .map((cat) => {
        const equip = accessories.find((a) => {
          return a.item.改造カテゴリ === cat
        })
        if (!equip) {
          const part = 'アクセサリー'
          const key = `(ノーマル${cat})`
          const item = funcGetItem(part, key)
          const partRecipe = { key, crafts: [] }
          return { part, item, partRecipe }
        }
      })
      .filter((x) => !!x)
  }

  static getCraftLineup(craftCategory) {
    return CraftMaster[craftCategory]
  }

  static getPartScore({ part, item, partRecipe }) {
    const defaultItem = item || {}
    const partCrafts = Mini4.getCraftLineup(item.改造カテゴリ)
    const r = Mini4.calcCraftResult(part, defaultItem, partRecipe, partCrafts)
    return r
  }

  static calcCraftResult(part, defaultItem, partRecipe, partCrafts) {
    const crafts = (partRecipe.crafts || []).filter(Boolean)
    const args = crafts.map((x) => Mini4.getCalcArgs(partCrafts, x)).flat()
    const defaultSpecs = defaultItem.性能 || {}
    const resultSpecs = Object.assign({}, defaultSpecs)
    for (const { affect, benefit, grow, fix } of args) {
      let kaizouVal = 0
      if (fix) {
        kaizouVal = benefit
      } else {
        kaizouVal = (defaultSpecs[affect] || 0) * benefit
      }
      const para = resultSpecs[affect] || 0
      const growVal = (para + kaizouVal) * grow
      // 増分 == kaizouVal + growVal
      const raw = para + kaizouVal + growVal
      resultSpecs[affect] = Math.round(raw * 1000000) / 1000000
    }
    if (part === 'ボディ') {
      if (partRecipe.肉抜き && defaultItem.肉抜き) {
        const drilledWeight = defaultItem.肉抜き * 0.32
        resultSpecs.重さ = resultSpecs.重さ - drilledWeight
      }
    }
    if (part === '電池') {
      resultSpecs.重さ = 36.8
    }
    return resultSpecs
  }

  static getCalcArgs(partCrafts, { action, quality, level }) {
    if (!partCrafts) return []
    const c = partCrafts.find((x) => x.action === action)
    if (!c) return []
    return c.effects.map((e) => {
      return {
        affect: e.影響,
        benefit: e[quality],
        grow: e.強化 * level,
        fix: e.固定,
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
          category: '小径ローハイトホイール',
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

  static resolveRank({ mode, affect, score }) {
    if (mode === 'TOTAL') {
      const ranks = RankMaster.TOTAL[affect]
      ranks.sort((a, b) => {
        return b.score - a.score
      })
      for (const r of ranks) {
        if (score >= r.score) {
          return r.label
        }
      }
    }
    return '!?'
  }

  static controlLevel(theCase, crrLevel) {
    const lv = Number(crrLevel)
    switch (theCase) {
      case 'Minus10':
        if (lv - 10 <= 1) {
          return 1
        }
        return lv - 10
      case 'Minus1':
        if (lv <= 1) {
          return 1
        }
        return lv - 1
      case 'Plus1':
        if (lv >= 50) {
          return 50
        }
        return lv + 1
      case 'Plus10':
        if (lv + 10 >= 50) {
          return 50
        }
        return lv + 10
      case 'Max':
        return 50
    }
  }
}
