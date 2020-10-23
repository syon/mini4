import CraftMaster from '../store/craft.json'
import RankMaster from './rank.json'
// import Util from '@/models/Util'

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

  static resolvePartJp(partEn) {
    switch (partEn) {
      case 'body':
        return 'ボディ'
      case 'motor':
        return 'モーター'
      case 'gear':
        return 'ギヤ'
      case 'chassis':
        return 'シャーシ'
      case 'frontWheel':
        return 'フロント・ホイール'
      case 'frontTire':
        return 'フロント・タイヤ'
      case 'rearWheel':
        return 'リヤ・ホイール'
      case 'rearTire':
        return 'リヤ・タイヤ'
      case 'frontStay':
        return 'フロントステー'
      case 'sideStay':
        return 'サイドステー'
      case 'rearStay':
        return 'リヤステー'
      case 'frontRollerHigh':
        return 'フロント・ローラー上'
      case 'sideRollerHigh':
        return 'サイド・ローラー上'
      case 'rearRollerHigh':
        return 'リヤ・ローラー上'
      case 'frontRollerMiddle':
        return 'フロント・ローラー中'
      case 'sideRollerMiddle':
        return 'サイド・ローラー中'
      case 'rearRollerMiddle':
        return 'リヤ・ローラー中'
      case 'rearRollerLow':
        return 'リヤ・ローラー下'
      case 'bodyOption':
        return 'ボディオプション'
      case 'wingRoller':
        return 'ウイングローラー'
      case 'frontStabilizer':
        return 'フロント・スタビライザー'
      case 'sideStabilizer':
        return 'サイド・スタビライザー'
      case 'rearStabilizer':
        return 'リヤ・スタビライザー'
      case 'frontSettingWeight':
        return 'フロント・セッティングウェイト'
      case 'rearSettingWeight':
        return 'リヤ・セッティングウェイト'
      case 'accessory1':
        return 'アクセサリー・１'
      case 'accessory2':
        return 'アクセサリー・２'
      case 'accessory3':
        return 'アクセサリー・３'
      case 'accessory4':
        return 'アクセサリー・４'
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
      'デジタル',
      '耐風',
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
      'ギヤシャフト',
      'プロペラシャフト',
      'クラウンギヤ',
      '軸受け',
      'シャフト',
    ]
      .map((cat) => {
        const equip = accessories.find((a) => {
          return a.item.表示カテゴリ === cat
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
      let slotPlus = 0
      if (fix) {
        // 2020/04/22まで
        // slotPlus = kaizou + (score + kaizou) * grow
        // 2020/04/22から
        slotPlus = benefit + grow
      } else {
        const base = defaultSpecs[affect] || 0
        slotPlus = Math.abs(base) * benefit + Math.abs(base) * grow
      }
      const score = resultSpecs[affect] || 0
      const raw = score + slotPlus
      resultSpecs[affect] = Math.round(raw * 1000000) / 1000000
    }
    if (part === 'ボディ') {
      if (partRecipe.肉抜き && defaultItem.肉抜き箇所) {
        const drilledWeight = defaultItem.肉抜き箇所 * defaultItem.肉抜きg
        resultSpecs.重さ = resultSpecs.重さ - drilledWeight
      }
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
      case 'Min':
        return 1
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

  static isPositiveParameter(type) {
    const params = {
      スピード: true,
      パワー: true,
      コーナー安定: true,
      スタミナ耐久: true,
      重さ: false,
      ギヤ負荷: false,
      パワーロス: false,
      スピードロス: false,
      エアロダウンフォース: true,
      節電: true,
      制振: true,
      スラスト角: true,
      タイヤ摩擦: true,
      タイヤ旋回: true,
      タイヤ反発: false,
      タイヤ径: true,
      ローラー摩擦: true,
      ローラー抵抗: false,
      ウェーブ: true,
      オフロード: true,
      ギヤ比: false,
      消費電流: false,
      ブレーキ減速: true,
      スタビ減速: true,
    }
    return params[type]
  }

  static getDiagnosis(allEquips, totalScores) {
    const PI = 3.14159265359
    const GG = 9.80665
    const {
      スピード,
      パワー,
      重さ,
      ギヤ比,
      ギヤ負荷,
      パワーロス,
      スピードロス,
      消費電流,
      節電,
      エアロダウンフォース,
      スラスト角,
      ブレーキ減速,
      タイヤ反発,
      制振,
      有効ローラー摩擦,
      有効ローラー抵抗,
    } = totalScores
    const bodyInfo = allEquips.find((x) => x.part === 'ボディ') || {}
    const motorInfo = allEquips.find((x) => x.part === 'モーター') || {}
    const gearInfo = allEquips.find((x) => x.part === 'ギヤ') || {}
    const chassisInfo = allEquips.find((x) => x.part === 'シャーシ') || {}
    const fWheelInfo =
      allEquips.find((x) => x.part === 'フロント・ホイール') || {}
    const fTireInfo = allEquips.find((x) => x.part === 'フロント・タイヤ') || {}
    const rWheelInfo = allEquips.find((x) => x.part === 'リヤ・ホイール') || {}
    const rTireInfo = allEquips.find((x) => x.part === 'リヤ・タイヤ') || {}
    const fStayInfo = allEquips.find((x) => x.part === 'フロントステー') || {}
    const sStayInfo = allEquips.find((x) => x.part === 'サイドステー') || {}
    const rStayInfo = allEquips.find((x) => x.part === 'リヤステー') || {}
    const fRollerTopInfo =
      allEquips.find((x) => x.part === 'フロント・ローラー上') || {}
    const sRollerTopInfo =
      allEquips.find((x) => x.part === 'サイド・ローラー上') || {}
    const rRollerTopInfo =
      allEquips.find((x) => x.part === 'リヤ・ローラー上') || {}
    const fRollerMidInfo =
      allEquips.find((x) => x.part === 'フロント・ローラー中') || {}
    const sRollerMidInfo =
      allEquips.find((x) => x.part === 'サイド・ローラー中') || {}
    const rRollerMidInfo =
      allEquips.find((x) => x.part === 'リヤ・ローラー中') || {}
    const rRollerBottomInfo =
      allEquips.find((x) => x.part === 'リヤ・ローラー下') || {}
    const bodyoptionInfo =
      allEquips.find((x) => x.part === 'ボディオプション') || {}
    const wRollerInfo =
      allEquips.find((x) => x.part === 'ウイングローラー') || {}
    const fStabilizerInfo =
      allEquips.find((x) => x.part === 'フロント・スタビライザー') || {}
    const sStabilizerInfo =
      allEquips.find((x) => x.part === 'サイド・スタビライザー') || {}
    const rStabilizerInfo =
      allEquips.find((x) => x.part === 'リヤ・スタビライザー') || {}
    const fSettingweightInfo =
      allEquips.find((x) => x.part === 'フロント・セッティングウェイト') || {}
    const rSettingweightInfo =
      allEquips.find((x) => x.part === 'リヤ・セッティングウェイト') || {}
    const accessory1Info =
      allEquips.find((x) => x.part === 'アクセサリー・１') || {}
    const accessory2Info =
      allEquips.find((x) => x.part === 'アクセサリー・２') || {}
    const accessory3Info =
      allEquips.find((x) => x.part === 'アクセサリー・３') || {}
    const accessory4Info =
      allEquips.find((x) => x.part === 'アクセサリー・４') || {}
    const ボディ特性 = (bodyInfo.item || {}).ボディ特性
    const フロントタイヤスピロス = (fTireInfo.score || {}).スピードロス
    const フロントタイヤ摩擦 = (fTireInfo.score || {}).タイヤ摩擦
    const フロントタイヤ旋回 = (fTireInfo.score || {}).タイヤ旋回
    const フロントタイヤ径 = (fTireInfo.score || {}).タイヤ径
    const リヤタイヤスピロス = (rTireInfo.score || {}).スピードロス
    const リヤタイヤ摩擦 = (rTireInfo.score || {}).タイヤ摩擦
    const リヤタイヤ旋回 = (rTireInfo.score || {}).タイヤ旋回
    const リヤタイヤ径 = (rTireInfo.score || {}).タイヤ径
    const ホイールベース = (chassisInfo.item || {}).ホイールベース
    const シャーシ比重 = (chassisInfo.item || {}).シャーシ比重
    const 重心の総重量 =
      +0.0 * ホイールベース * (bodyInfo.score.重さ || 0) +
      +0.0 * ホイールベース * (motorInfo.score.重さ || 0) +
      +0.0 * ホイールベース * (gearInfo.score.重さ || 0) +
      +0.0 * ホイールベース * (chassisInfo.score.重さ || 0) * シャーシ比重 +
      +0.5 * ホイールベース * (fWheelInfo.score.重さ || 0) +
      +0.5 * ホイールベース * (fTireInfo.score.重さ || 0) +
      -0.5 * ホイールベース * (rWheelInfo.score.重さ || 0) +
      -0.5 * ホイールベース * (rTireInfo.score.重さ || 0) +
      +1.0 * ホイールベース * (fStayInfo.score.重さ || 0) +
      +0.0 * ホイールベース * (sStayInfo.score.重さ || 0) +
      -0.5 * ホイールベース * (rStayInfo.score.重さ || 0) +
      +1.0 * ホイールベース * (fRollerTopInfo.score.重さ || 0) +
      +0.0 * ホイールベース * (sRollerTopInfo.score.重さ || 0) +
      -1.0 * ホイールベース * (rRollerTopInfo.score.重さ || 0) +
      +1.0 * ホイールベース * (fRollerMidInfo.score.重さ || 0) +
      +0.0 * ホイールベース * (sRollerMidInfo.score.重さ || 0) +
      -1.0 * ホイールベース * (rRollerMidInfo.score.重さ || 0) +
      -1.0 * ホイールベース * (rRollerBottomInfo.score.重さ || 0) +
      +0.0 * ホイールベース * (bodyoptionInfo.score.重さ || 0) +
      -1.0 * ホイールベース * (wRollerInfo.score.重さ || 0) +
      +1.0 * ホイールベース * (fStabilizerInfo.score.重さ || 0) +
      +0.0 * ホイールベース * (sStabilizerInfo.score.重さ || 0) +
      -1.0 * ホイールベース * (rStabilizerInfo.score.重さ || 0) +
      +0.5 * ホイールベース * (fSettingweightInfo.score.重さ || 0) +
      -1.0 * ホイールベース * (rSettingweightInfo.score.重さ || 0) +
      +0.0 * ホイールベース * (accessory1Info.score.重さ || 0) +
      +0.0 * ホイールベース * (accessory2Info.score.重さ || 0) +
      +0.0 * ホイールベース * (accessory3Info.score.重さ || 0) +
      +0.0 * ホイールベース * (accessory4Info.score.重さ || 0)
    const 前後の重心 = 重心の総重量 / 重さ
    let スピード特性 = 1.0
    if (ボディ特性 === 'スピードUP') {
      スピード特性 = 1.02
    } else if (ボディ特性 === 'スピードUP+') {
      スピード特性 = 1.03
    } else if (ボディ特性 === 'かっとびマシン') {
      スピード特性 = 1.04
    } else if (ボディ特性 === 'ワイルドラン') {
      スピード特性 = 1.03
    }
    let パワー特性 = 1.0
    if (ボディ特性 === 'パワーUP') {
      パワー特性 = 1.02
    } else if (ボディ特性 === 'パワーUP+') {
      パワー特性 = 1.03
    } else if (ボディ特性 === 'パワーブースト') {
      パワー特性 = 1.05
    }
    let パワーロス特性 = 1.0
    if (ボディ特性 === 'パワーブースト') {
      パワーロス特性 = 0.9
    }
    let グリップ特性 = 1.0
    if (ボディ特性 === 'パワードリフト') {
      グリップ特性 = 1.15
    } else if (ボディ特性 === 'パワーブースト') {
      グリップ特性 = 1.015
    } else if (ボディ特性 === 'ワイルドラン') {
      グリップ特性 = 1.015
    }
    let 節電特性 = 1.0
    if (節電 > 0) {
      if (ボディ特性 === '節電UP') {
        節電特性 = 1.4
      } else if (ボディ特性 === '節電UP+') {
        節電特性 = 1.5
      }
    }
    let ブレーキ特性 = 0
    if (ブレーキ減速 > 0) {
      if (ボディ特性 === 'ブレーキ効果UP') {
        ブレーキ特性 = 0.05
      }
    }
    const フロントリヤタイヤ摩擦 =
      (フロントタイヤ摩擦 * (ホイールベース / 2 + 前後の重心) +
        リヤタイヤ摩擦 * (ホイールベース / 2 - 前後の重心)) /
      ホイールベース
    const タイヤグリップ = (フロントリヤタイヤ摩擦 / 100.0) * グリップ特性
    const バッテリー消費量 = 消費電流 * (1 - (節電 * 節電特性) / 10000)
    const ブレーキ性能 = ブレーキ減速 / 2000 + ブレーキ特性
    // const Pパワロス = (パワーロス特性 * パワーロス) / 10000
    // const Pスピロス =
    //   Math.max(
    //     スピードロス - 5000 * Math.abs(フロントタイヤ径 - リヤタイヤ径),
    //     0
    //   ) / 10000
    // const モータートルク = パワー特性 * パワー * 10
    // const 加速度 =
    //   1000 *
    //   ((モータートルク * ギヤ比 * (1 - Pパワロス) - ギヤ負荷) /
    //     (リヤタイヤ径 * 2000 * 重さ) -
    //     Pスピロス / 4000)
    // const モーター回転数 = (スピード特性 * スピード * 10) / 60
    // const リヤタイヤ周 = (リヤタイヤ径 / 1000) * PI
    // const 無負荷速度 = (リヤタイヤ周 * モーター回転数) / ギヤ比
    // const 負荷 =
    //   1 -
    //   (((重さ * リヤタイヤ径) / 2) * Pスピロス + ギヤ負荷) /
    //     (モータートルク * ギヤ比) -
    //   Pパワロス
    // const 空気抵抗 = エアロダウンフォース / 1000
    let 有効タイヤ旋回 = 0
    let 有効タイヤスピードロス = 0
    if (フロントタイヤ径 <= リヤタイヤ径) {
      有効タイヤ旋回 = フロントタイヤ旋回
      有効タイヤスピードロス = フロントタイヤスピロス
    } else {
      有効タイヤ旋回 = リヤタイヤ旋回
      有効タイヤスピードロス = リヤタイヤスピロス
    }
    const タイヤ径差 = Math.abs(フロントタイヤ径 - リヤタイヤ径)
    const 総合スピードロス項 =
      (28.0 * タイヤ径差 * 有効タイヤ旋回 * 1000.0) / 有効タイヤスピードロス
    const 加速度 =
      ((10.0 *
        パワー特性 *
        パワー *
        (1.0 - (パワーロス特性 * パワーロス) / 10000.0) *
        ギヤ比 -
        ギヤ負荷) /
        ((リヤタイヤ径 / 2000.0) * 重さ) -
        (スピードロス + 総合スピードロス項) / 10.0) /
      4000.0
    const 総合パワー項 =
      1.0 -
      ((((重さ * リヤタイヤ径) / 2000.0) *
        (スピードロス + 総合スピードロス項)) /
        10.0 +
        ギヤ負荷) /
        (10.0 * パワー特性 * パワー * ギヤ比) -
      (パワーロス特性 * パワーロス) / 10000.0
    const 最高速度ms =
      ((((2.0 * PI * リヤタイヤ径) / 2000.0) *
        ((10.0 * スピード特性 * スピード) / 60.0)) /
        ギヤ比) *
        総合パワー項 -
      エアロダウンフォース / 1000.0
    const 最高速度kmh = 最高速度ms * 3.6
    const 最高速到達時間 = Math.log(100 * 最高速度ms) / (4 * 加速度)
    const ジャンプ加速度 = Math.sin(2 * 20 * (PI / 180)) / GG
    const ジャンプ飛距離 = 最高速度ms * 最高速度ms * ジャンプ加速度
    const バウンド時間 =
      ((最高速度ms * (1 - ブレーキ性能) * Math.sin((10 * PI) / 180)) / GG) *
      2 *
      (タイヤ反発 / 1000 - 制振 / 100000)
    // const ローラースラスト角 = Math.max(Math.min(スラスト角, 10), 0)
    const ローラースラスト角 = Math.max(スラスト角, 0)
    const ローラー減速参考値 =
      有効ローラー摩擦 * スラスト角 + 有効ローラー抵抗 / 20.8
    return {
      最高速度kmh,
      最高速度ms,
      バッテリー消費量,
      加速度,
      最高速到達時間,
      タイヤグリップ,
      コーナー減速率: null,
      ジャンプ飛距離,
      バウンド時間,
      前後の重心,
      ローラースラスト角,
      重さ,
      ブレーキ性能,
      ローラー減速参考値,
    }
  }
}
