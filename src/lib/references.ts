export type CategoryType = 'volume' | 'length' | 'weight' | 'area' | 'speed';

export interface UnitInfo {
  value: string;
  label: string;
  toBaseMultiplier: number; // Multiplier to convert to base unit (mL, mm, g, m2, km/h)
}

export const CATEGORIES: {
  id: CategoryType;
  label: string;
  emoji: string;
  description: string;
  units: UnitInfo[];
}[] = [
  {
    id: 'volume',
    label: 'かさ（<ruby>体積<rt>たいせき</rt></ruby>）',
    emoji: '🥛',
    description: '<ruby>水<rt>みず</rt></ruby>や<ruby>牛乳<rt>ぎゅうにゅう</rt></ruby>などの<ruby>量<rt>りょう</rt></ruby>だよ',
    units: [
      { value: 'mL', label: 'mL (ミリリットル)', toBaseMultiplier: 1 },
      { value: 'dL', label: 'dL (デシリットル)', toBaseMultiplier: 100 },
      { value: 'L', label: 'L (リットル)', toBaseMultiplier: 1000 },
    ],
  },
  {
    id: 'length',
    label: '<ruby>長さ<rt>ながさ</rt></ruby>',
    emoji: '📏',
    description: 'ものの<ruby>長さ<rt>ながさ</rt></ruby>や<ruby>距離<rt>きょり</rt></ruby>だよ',
    units: [
      { value: 'mm', label: 'mm (ミリメートル)', toBaseMultiplier: 1 },
      { value: 'cm', label: 'cm (センチメートル)', toBaseMultiplier: 10 },
      { value: 'm', label: 'm (メートル)', toBaseMultiplier: 1000 },
      { value: 'km', label: 'km (キロメートル)', toBaseMultiplier: 1000000 },
    ],
  },
  {
    id: 'weight',
    label: '<ruby>重さ<rt>おもさ</rt></ruby>',
    emoji: '⚖️',
    description: 'ものの<ruby>重さ<rt>おもさ</rt></ruby>や<ruby>体重<rt>たいじゅう</rt></ruby>だよ',
    units: [
      { value: 'mg', label: 'mg (ミリグラム)', toBaseMultiplier: 0.001 },
      { value: 'g', label: 'g (グラム)', toBaseMultiplier: 1 },
      { value: 'kg', label: 'kg (キログラム)', toBaseMultiplier: 1000 },
    ],
  },
  {
    id: 'area',
    label: '<ruby>面積<rt>めんせき</rt></ruby>（<ruby>広さ<rt>ひろさ</rt></ruby>）',
    emoji: '🗺️',
    description: '<ruby>土地<rt>とち</rt></ruby>や<ruby>部屋<rt>へや</rt></ruby>の<ruby>広さ<rt>ひろさ</rt></ruby>だよ',
    // Options are plain text format to avoid breaking select menus on mobile
    units: [
      { value: 'cm2', label: '㎠ (平方センチ - へいほうせんち)', toBaseMultiplier: 0.0001 },
      { value: 'm2', label: '㎡ (平方メートル - へいほうめーとる)', toBaseMultiplier: 1 },
      { value: '畳', label: '畳 (じょう - 畳1枚分)', toBaseMultiplier: 1.62 },
      { value: '坪', label: '坪 (つぼ - 駐車場1台分)', toBaseMultiplier: 3.3 },
      { value: 'ドーム', label: '東京ドーム (こぶん - 野球場)', toBaseMultiplier: 46755 },
    ],
  },
  {
    id: 'speed',
    label: '<ruby>速さ<rt>はやさ</rt></ruby>',
    emoji: '⚡',
    description: '<ruby>走<rt>はし</rt></ruby>る<ruby>速さ<rt>はやさ</rt></ruby>や<ruby>乗り物<rt>のりもの</rt></ruby>のスピードだよ',
    // Options are plain text format
    units: [
      { value: 'm/s', label: '秒速 m/s (びょうそくめーとる)', toBaseMultiplier: 3.6 },
      { value: 'km/h', label: '時速 km/h (じそくきろ)', toBaseMultiplier: 1 },
    ],
  },
];

export interface ReferenceItem {
  id: string;
  name: string;
  emoji: string;
  value: number; // in base unit (mL, mm, g, m2, km/h)
  unitName: string; // Counter word, e.g. "本", "個", "台", "枚", "杯", "畳", "つぼ", "個分"
  description: string;
  svgType:
    | 'water-drop'
    | 'teaspoon'
    | 'paper-cup'
    | 'pet-bottle'
    | 'milk-carton'
    | 'large-pet-bottle'
    | 'bucket'
    | 'bathtub'
    | 'pool'
    | 'coin-1yen'
    | 'dice'
    | 'toilet-paper'
    | 'smartphone'
    | 'ruler-30'
    | 'umbrella'
    | 'door'
    | 'bus'
    | 'school-ground'
    | 'mount-fuji'
    | 'salt-grain'
    | 'mosquito'
    | 'apple'
    | 'school-bag'
    | 'desk'
    | 'dog'
    | 'car'
    // Area
    | 'stamp'
    | 'notebook-open'
    | 'tatami-mat'
    | 'parking-spot'
    | 'tennis-court'
    | 'tokyo-dome'
    // Speed
    | 'walking'
    | 'bicycle'
    | 'car-speed'
    | 'cheetah'
    | 'shinkansen'
    | 'sound-speed';
}

export const VOLUME_REFERENCES: ReferenceItem[] = [
  {
    id: 'water-drop',
    name: '<ruby>水滴<rt>すいてき</rt></ruby>',
    emoji: '💧',
    value: 0.05,
    unitName: '<ruby>滴<rt>てき</rt></ruby>',
    description: 'ぽたっと<ruby>落<rt>お</rt></ruby>ちる<ruby>水<rt>みず</rt></ruby>1<ruby>滴<rt>てき</rt></ruby>の<ruby>量<rt>りょう</rt></ruby>だよ。',
    svgType: 'water-drop',
  },
  {
    id: 'teaspoon',
    name: '<ruby>小さじ<rt>こさじ</rt></ruby>',
    emoji: '🥄',
    value: 5,
    unitName: '<ruby>杯<rt>はい</rt></ruby>',
    description: 'お<ruby>料理<rt>りょうり</rt></ruby>で<ruby>使<rt>つか</rt></ruby>う<ruby>小<rt>ちい</rt></ruby>さなスプーン1<ruby>杯<rt>はい</rt></ruby>だよ。',
    svgType: 'teaspoon',
  },
  {
    id: 'paper-cup',
    name: '<ruby>紙<rt>かみ</rt></ruby>コップ',
    emoji: '🥛',
    value: 200,
    unitName: '<ruby>杯<rt>はい</rt></ruby>',
    description: 'うがいやジュースを<ruby>飲<rt>の</rt></ruby>むときのふつうのコップだよ。',
    svgType: 'paper-cup',
  },
  {
    id: 'pet-bottle',
    name: 'ペットボトル',
    emoji: '🧴',
    value: 500,
    unitName: '<ruby>本<rt>ほん</rt></ruby>',
    description: '<ruby>自販機<rt>じはんき</rt></ruby>でよく<ruby>買<rt>か</rt></ruby>うお<ruby>茶<rt>ちゃ</rt></ruby>やジュースのボトルだよ。',
    svgType: 'pet-bottle',
  },
  {
    id: 'milk-carton',
    name: '<ruby>牛乳<rt>ぎゅうにゅう</rt></ruby>パック',
    emoji: '🥛',
    value: 1000,
    unitName: '<ruby>本<rt>ほん</rt></ruby>',
    description: 'お店で<ruby>売<rt>う</rt></ruby>っている<ruby>大<rt>おお</rt></ruby>きい<ruby>方<rt>ほう</rt></ruby>の<ruby>牛乳<rt>ぎゅうにゅう</rt></ruby>パック1<ruby>本<rt>ほん</rt></ruby>だよ。',
    svgType: 'milk-carton',
  },
  {
    id: 'large-pet-bottle',
    name: '<ruby>大<rt>おお</rt></ruby>きいペットボトル',
    emoji: '🧴',
    value: 2000,
    unitName: '<ruby>本<rt>ほん</rt></ruby>',
    description: 'おうちの<ruby>冷蔵庫<rt>れいぞうこ</rt></ruby>に<ruby>入<rt>はい</rt></ruby>っている<ruby>大<rt>おお</rt></ruby>きな2Lボトルだよ。',
    svgType: 'large-pet-bottle',
  },
  {
    id: 'bucket',
    name: 'バケツ',
    emoji: '🪣',
    value: 10000,
    unitName: '<ruby>杯<rt>はい</rt></ruby>',
    description: 'お<ruby>掃除<rt>そうじ</rt></ruby>や<ruby>水遊び<rt>みずあそび</rt></ruby>で<ruby>使<rt>つか</rt></ruby>う、たっぷり<ruby>入<rt>はい</rt></ruby>るバケツだよ。',
    svgType: 'bucket',
  },
  {
    id: 'bathtub',
    name: 'お<ruby>風呂<rt>ふろ</rt></ruby>',
    emoji: '🛁',
    value: 200000,
    unitName: '<ruby>杯<rt>はい</rt></ruby>',
    description: '<ruby>浴槽<rt>よくそう</rt></ruby>にたっぷりためたお<ruby>湯<rt>ゆ</rt></ruby>の<ruby>量<rt>りょう</rt></ruby>だよ。',
    svgType: 'bathtub',
  },
  {
    id: 'pool',
    name: '<ruby>小学校<rt>しょうがっこう</rt></ruby>のプール',
    emoji: '🏊',
    value: 360000000,
    unitName: '<ruby>杯<rt>はい</rt></ruby>',
    description: '25メートルプールにいっぱいにためた<ruby>水<rt>みず</rt></ruby>の<ruby>量<rt>りょう</rt></ruby>だよ。',
    svgType: 'pool',
  },
];

export const LENGTH_REFERENCES: ReferenceItem[] = [
  {
    id: 'coin-1yen-thick',
    name: '1<ruby>円玉<rt>えんだま</rt></ruby>の<ruby>厚み<rt>あつみ</rt></ruby>',
    emoji: '🪙',
    value: 1.5,
    unitName: '<ruby>枚分<rt>まいぶん</rt></ruby>',
    description: '1<ruby>円玉<rt>えんだま</rt></ruby>を<ruby>横<rt>よこ</rt></ruby>から<ruby>見<rt>み</rt></ruby>たときのうすい<ruby>厚み<rt>あつみ</rt></ruby>だよ。',
    svgType: 'coin-1yen',
  },
  {
    id: 'dice',
    name: 'サイコロの<ruby>幅<rt>はば</rt></ruby>',
    emoji: '🎲',
    value: 10,
    unitName: '<ruby>個分<rt>こぶん</rt></ruby>',
    description: 'すごろくで<ruby>使<rt>つか</rt></ruby>うふつうのサイコロの1<ruby>辺<rt>ぺん</rt></ruby>の<ruby>長さ<rt>ながさ</rt></ruby>だよ。',
    svgType: 'dice',
  },
  {
    id: 'toilet-paper',
    name: 'トイレットペーパーの<ruby>高さ<rt>たかさ</rt></ruby>',
    emoji: '🧻',
    value: 110,
    unitName: '<ruby>個分<rt>こぶん</rt></ruby>',
    description: 'トイレットペーパーのロールの<ruby>高さ<rt>たかさ</rt></ruby>だよ。',
    svgType: 'toilet-paper',
  },
  {
    id: 'smartphone-len',
    name: 'スマホの<ruby>長さ<rt>ながさ</rt></ruby>',
    emoji: '📱',
    value: 150,
    unitName: '<ruby>台分<rt>だいぶん</rt></ruby>',
    description: 'お<ruby>父<rt>とう</rt></ruby>さんやお<ruby>母<rt>かあ</rt></ruby>さんが<ruby>持<rt>も</rt></ruby>っているスマホのたての<ruby>長さ<rt>ながさ</rt></ruby>だよ。',
    svgType: 'smartphone',
  },
  {
    id: 'ruler-30',
    name: '30cmものさし',
    emoji: '📏',
    value: 300,
    unitName: '<ruby>本分<rt>ほんぶん</rt></ruby>',
    description: '<ruby>小学校<rt>しょうがっこう</rt></ruby>の<ruby>授業<rt>じゅぎょう</rt></ruby>で<ruby>使<rt>つか</rt></ruby>う<ruby>長い<rt>ながい</rt></ruby>ものさしの<ruby>長さ<rt>ながさ</rt></ruby>だよ。',
    svgType: 'ruler-30',
  },
  {
    id: 'umbrella',
    name: '<ruby>傘<rt>かさ</rt></ruby>をひらいた<ruby>幅<rt>はば</rt></ruby>',
    emoji: '🌂',
    value: 1000,
    unitName: '<ruby>本分<rt>ほんぶん</rt></ruby>',
    description: '<ruby>雨<rt>あめ</rt></ruby>の<ruby>日<rt>ひ</rt></ruby>にさす<ruby>傘<rt>かさ</rt></ruby>を<ruby>広<rt>ひろ</rt></ruby>げたときの<ruby>直径<rt>ちょっけい</rt></ruby>だよ。',
    svgType: 'umbrella',
  },
  {
    id: 'door',
    name: "ドアの<ruby>高さ<rt>たかさ</rt></ruby>",
    emoji: '🚪',
    value: 2000,
    unitName: '<ruby>枚分<rt>まいぶん</rt></ruby>',
    description: 'おうちの<ruby>部屋<rt>へや</rt></ruby>の<ruby>入り口<rt>いりぐち</rt></ruby>にあるドアの<ruby>高さ<rt>たかさ</rt></ruby>だよ。',
    svgType: 'door',
  },
  {
    id: 'bus',
    name: '<ruby>大型<rt>おおがた</rt></ruby>バス',
    emoji: '🚌',
    value: 10000,
    unitName: '<ruby>台分<rt>だいぶん</rt></ruby>',
    description: '<ruby>観光<rt>かんこう</rt></ruby>バスや<ruby>路線<rt>ろせん</rt></ruby>バスの<ruby>車体<rt>しゃたい</rt></ruby>の<ruby>長さ<rt>ながさ</rt></ruby>だよ。',
    svgType: 'bus',
  },
  {
    id: 'school-ground',
    name: '<ruby>校庭<rt>こうてい</rt></ruby>1<ruby>周<rt>しゅう</rt></ruby>',
    emoji: '🏫',
    value: 200000,
    unitName: '<ruby>周分<rt>しゅうぶん</rt></ruby>',
    description: '<ruby>小学校<rt>しょうがっこう</rt></ruby>のグラウンドのトラックをぐるっと1<ruby>周<rt>しゅう</rt></ruby>した<ruby>距離<rt>きょり</rt></ruby>だよ。',
    svgType: 'school-ground',
  },
  {
    id: 'mount-fuji',
    name: '<ruby>富士山<rt>ふじさん</rt></ruby>の<ruby>高さ<rt>たかさ</rt></ruby>',
    emoji: '🗻',
    value: 3776000,
    unitName: '<ruby>個分<rt>こぶん</rt></ruby>',
    description: '<ruby>日本<rt>にほん</rt></ruby>で<ruby>一番<rt>いちばん</rt></ruby><ruby>高い<rt>たかい</rt></ruby><ruby>山<rt>やま</rt></ruby>、<ruby>富士山<rt>ふじさん</rt></ruby>の<ruby>高さ<rt>たかさ</rt></ruby>（3,776m）だよ。',
    svgType: 'mount-fuji',
  },
];

export const WEIGHT_REFERENCES: ReferenceItem[] = [
  {
    id: 'salt-grain',
    name: '<ruby>塩<rt>しお</rt></ruby>1つぶ',
    emoji: '🧂',
    value: 0.0001,
    unitName: 'つぶ',
    description: 'クッキングで<ruby>使<rt>つか</rt></ruby>うサラサラした<ruby>塩<rt>しお</rt></ruby>の、たったの1<ruby>粒<rt>つぶ</rt></ruby>の<ruby>重さ<rt>おもさ</rt></ruby>だよ。',
    svgType: 'salt-grain',
  },
  {
    id: 'mosquito',
    name: '<ruby>蚊<rt>か</rt></ruby>1<ruby>匹<rt>ひき</rt></ruby>',
    emoji: '🦟',
    value: 0.002,
    unitName: '<ruby>匹<rt>ひき</rt></ruby>',
    description: 'ぷーんと<ruby>飛<rt>と</rt></ruby>んでくる<ruby>小<rt>ちい</rt></ruby>さな<ruby>蚊<rt>か</rt></ruby>の<ruby>重さ<rt>おもさ</rt></ruby>だよ。しんじられないくらい<ruby>軽い<rt>かるい</rt></ruby>ね。',
    svgType: 'mosquito',
  },
  {
    id: 'coin-1yen-weight',
    name: '1<ruby>円玉<rt>えんだま</rt></ruby>',
    emoji: '🪙',
    value: 1,
    unitName: '<ruby>枚分<rt>まいぶん</rt></ruby>',
    description: 'アルミニウムでできた1<ruby>円玉<rt>えんだま</rt></ruby>1<ruby>枚<rt>まい</rt></ruby>の<ruby>重さ<rt>おもさ</rt></ruby>だよ。ちょうど1グラム！',
    svgType: 'coin-1yen',
  },
  {
    id: 'apple',
    name: 'りんご',
    emoji: '🍎',
    value: 300,
    unitName: '<ruby>個分<rt>こぶん</rt></ruby>',
    description: 'おいしそうな<ruby>中<rt>なか</rt></ruby>くらいの<ruby>大<rt>おお</rt></ruby>きさのりんご1<ruby>個<rt>こ</rt></ruby>の<ruby>重さ<rt>おもさ</rt></ruby>だよ。',
    svgType: 'apple',
  },
  {
    id: 'school-bag',
    name: '<ruby>教科書<rt>きょうかしょ</rt></ruby><ruby>入<rt>い</rt></ruby>りのランドセル',
    emoji: '🎒',
    value: 4000,
    unitName: '<ruby>個分<rt>こぶん</rt></ruby>',
    description: '<ruby>教科書<rt>きょうかしょ</rt></ruby>やノートをたくさんつめた、<ruby>毎朝<rt>まいあさ</rt></ruby><ruby>背負<rt>せお</rt></ruby>うランドセルの<ruby>重さ<rt>おもさ</rt></ruby>だよ。',
    svgType: 'school-bag',
  },
  {
    id: 'dog',
    name: '<ruby>柴犬<rt>しばいぬ</rt></ruby>',
    emoji: '🐕',
    value: 10000,
    unitName: '<ruby>匹分<rt>ひきぶん</rt></ruby>',
    description: '<ruby>中型犬<rt>ちゅうがたけん</rt></ruby>の<ruby>代表<rt>だいひょう</rt></ruby>、<ruby>柴犬<rt>しばいぬ</rt></ruby>のおとなの<ruby>重さ<rt>おもさ</rt></ruby>だよ。',
    svgType: 'dog',
  },
  {
    id: 'desk',
    name: '<ruby>学校<rt>がっこう</rt></ruby>の<ruby>学習机<rt>がくしゅうづくえ</rt></ruby>とイス',
    emoji: '🏫',
    value: 15000,
    unitName: '<ruby>台分<rt>だいぶん</rt></ruby>',
    description: '<ruby>学校<rt>がっこう</rt></ruby>の<ruby>教室<rt>きょうしつ</rt></ruby>にある、きみ<ruby>専用<rt>せんよう</rt></ruby>の<ruby>机<rt>つくえ</rt></ruby>とイスを<ruby>合<rt>あ</rt></ruby>わせた<ruby>重さ<rt>おもさ</rt></ruby>だよ。',
    svgType: 'desk',
  },
  {
    id: 'car',
    name: '<ruby>軽自動車<rt>けいじどうしゃ</rt></ruby>',
    emoji: '🚗',
    value: 800000,
    unitName: '<ruby>台分<rt>だいぶん</rt></ruby>',
    description: '<ruby>街<rt>まち</rt></ruby>を<ruby>走<rt>はし</rt></ruby>るコンパクトな<ruby>車<rt>くるま</rt></ruby>1<ruby>台分<rt>だいぶん</rt></ruby>の<ruby>重さ<rt>おもさ</rt></ruby>だよ。',
    svgType: 'car',
  },
];

export const AREA_REFERENCES: ReferenceItem[] = [
  {
    id: 'stamp',
    name: '<ruby>郵便切手<rt>ゆうびんきって</rt></ruby>',
    emoji: '✉️',
    value: 0.0004,
    unitName: '<ruby>枚分<rt>まいぶん</rt></ruby>',
    description: '<ruby>手紙<rt>てがみ</rt></ruby>にはる<ruby>小<rt>ちい</rt></ruby>さな<ruby>切手<rt>きって</rt></ruby>1<ruby>枚<rt>まい</rt></ruby>の<ruby>広さ<rt>ひろさ</rt></ruby>だよ。だいたい 4 ㎠。',
    svgType: 'stamp',
  },
  {
    id: 'notebook-open',
    name: 'ノート<ruby>見開<rt>みひら</rt></ruby>き',
    emoji: '📓',
    value: 0.08,
    unitName: '<ruby>冊分<rt>さつぶん</rt></ruby>',
    description: '<ruby>学校<rt>がっこう</rt></ruby>でつかうB5ノートをパッと<ruby>開<rt>ひら</rt></ruby>いた<ruby>広さ<rt>ひろさ</rt></ruby>だよ。',
    svgType: 'notebook-open',
  },
  {
    id: 'tatami-mat',
    name: '<ruby>畳<rt>たたみ</rt></ruby>1<ruby>枚<rt>まい</rt></ruby>',
    emoji: '🧹',
    value: 1.62,
    unitName: '<ruby>畳分<rt>じょうぶん</rt></ruby>',
    description: '<ruby>和室<rt>わしつ</rt></ruby>にある、<ruby>大人<rt>おとな</rt></ruby>がゴロンとお<ruby>昼寝<rt>ひるね</rt></ruby>できる<ruby>畳<rt>たたみ</rt></ruby>の<ruby>広さ<rt>ひろさ</rt></ruby>だよ。',
    svgType: 'tatami-mat',
  },
  {
    id: 'parking-spot',
    name: '<ruby>駐車場<rt>ちゅうしゃじょう</rt></ruby>1<ruby>台分<rt>だいぶん</rt></ruby>',
    emoji: '🚗',
    value: 3.3,
    unitName: '<ruby>台分<rt>だいぶん</rt></ruby>',
    description: 'おうちやお店の<ruby>駐車場<rt>ちゅうしゃじょう</rt></ruby>に、<ruby>車<rt>くるま</rt></ruby>を1<ruby>台<rt>だい</rt></ruby>とめるスペースの<ruby>広さ<rt>ひろさ</rt></ruby>だよ。これがちょうど「1<ruby>坪<rt>つぼ</rt></ruby>」！',
    svgType: 'parking-spot',
  },
  {
    id: 'tennis-court',
    name: 'テニスコート1<ruby>面<rt>めん</rt></ruby>',
    emoji: '🎾',
    value: 200,
    unitName: '<ruby>面分<rt>めんぶん</rt></ruby>',
    description: 'テニスをするコート1つ<ruby>分<rt>ぶん</rt></ruby>の<ruby>広さ<rt>ひろさ</rt></ruby>だよ。',
    svgType: 'tennis-court',
  },
  {
    id: 'tokyo-dome',
    name: '<ruby>東京<rt>とうきょう</rt></ruby>ドーム',
    emoji: '⚾',
    value: 46755,
    unitName: '<ruby>個分<rt>こぶん</rt></ruby>',
    description: 'とっても<ruby>大<rt>おお</rt></ruby>きな<ruby>野球場<rt>やきゅうじょう</rt></ruby>、<ruby>東京<rt>とうきょう</rt></ruby>ドーム1<ruby>個分<rt>こぶん</rt></ruby>の<ruby>広さ<rt>ひろさ</rt></ruby>だよ！',
    svgType: 'tokyo-dome',
  },
];

export const SPEED_REFERENCES: ReferenceItem[] = [
  {
    id: 'walking',
    name: '<ruby>歩<rt>ある</rt></ruby>く<ruby>速さ<rt>はやさ</rt></ruby>',
    emoji: '🚶',
    value: 4,
    unitName: '<ruby>倍<rt>ばい</rt></ruby>の<ruby>速さ<rt>はやさ</rt></ruby>',
    description: '<ruby>大人<rt>おとな</rt></ruby>がお<ruby>散歩<rt>さんぽ</rt></ruby>したり<ruby>歩<rt>ある</rt></ruby>いたりするいつもの<ruby>速さ<rt>はやさ</rt></ruby>だよ（<ruby>時速<rt>じそく</rt></ruby>4キロ）。',
    svgType: 'walking',
  },
  {
    id: 'bicycle',
    name: '<ruby>自転車<rt>じてんしゃ</rt></ruby>をこぐ<ruby>速さ<rt>はやさ</rt></ruby>',
    emoji: '🚲',
    value: 15,
    unitName: '<ruby>倍<rt>ばい</rt></ruby>の<ruby>速さ<rt>はやさ</rt></ruby>',
    description: '<ruby>自転車<rt>じてんしゃ</rt></ruby>をシャカシャカこいだ時のすずしい<ruby>速さ<rt>はやさ</rt></ruby>だよ（<ruby>時速<rt>じそく</rt></ruby>15キロ）。',
    svgType: 'bicycle',
  },
  {
    id: 'car-speed',
    name: '<ruby>自動車<rt>じどうしゃ</rt></ruby>の<ruby>速さ<rt>はやさ</rt></ruby>',
    emoji: '🚗',
    value: 60,
    unitName: '<ruby>倍<rt>ばい</rt></ruby> of <ruby>速さ<rt>はやさ</rt></ruby>',
    description: '<ruby>街<rt>まち</rt></ruby>の<ruby>道路<rt>どうろ</rt></ruby>をブブーンと<ruby>走<rt>はし</rt></ruby>る<ruby>自動車<rt>じどうしゃ</rt></ruby>の<ruby>速さ<rt>はやさ</rt></ruby>だよ（<ruby>時速<rt>じそく</rt></ruby>60キロ）。',
    svgType: 'car-speed',
  },
  {
    id: 'cheetah',
    name: 'チーターの<ruby>走<rt>はし</rt></ruby>る<ruby>速さ<rt>はやさ</rt></ruby>',
    emoji: '🐆',
    value: 100,
    unitName: '<ruby>倍<rt>ばい</rt></ruby>の<ruby>速さ<rt>はやさ</rt></ruby>',
    description: '<ruby>動物<rt>どうぶつ</rt></ruby>の<ruby>中<rt>なか</rt></ruby>でいちばん<ruby>走<rt>はし</rt></ruby>るのが<ruby>速い<rt>はやい</rt></ruby>、チーターの<ruby>全力<rt>ぜんりょく</rt></ruby>ダッシュだよ（<ruby>時速<rt>じそく</rt></ruby>100キロ）！',
    svgType: 'cheetah',
  },
  {
    id: 'shinkansen',
    name: '<ruby>新幹線<rt>しんかんせん</rt></ruby>',
    emoji: '🚄',
    value: 300,
    unitName: '<ruby>倍<rt>ばい</rt></ruby>の<ruby>速さ<rt>はやさ</rt></ruby>',
    description: '<ruby>日本<rt>にほん</rt></ruby>の<ruby>誇<rt>ほこ</rt></ruby>る<ruby>超特急<rt>ちょうとっきゅう</rt></ruby>、<ruby>新幹線<rt>しんかんせん</rt></ruby>が<ruby>風<rt>かぜ</rt></ruby>のように走りぬける<ruby>速さ<rt>はやさ</rt></ruby>だよ（<ruby>時速<rt>じそく</rt></ruby>300キロ）！',
    svgType: 'shinkansen',
  },
  {
    id: 'sound-speed',
    name: '<ruby>音<rt>おと</rt></ruby>の<ruby>速さ<rt>はやさ</rt></ruby> (<ruby>音速<rt>おんそく</rt></ruby>)',
    emoji: '🔊',
    value: 1225,
    unitName: '<ruby>倍<rt>ばい</rt></ruby>の<ruby>速さ<rt>はやさ</rt></ruby>',
    description: '<ruby>音<rt>おと</rt></ruby>が<ruby>空気<rt>くうき</rt></ruby>の<ruby>中<rt>なか</rt></ruby>を<ruby>伝<rt>つた</rt></ruby>わっていく、すさまじいスピードだよ（<ruby>時速<rt>じそく</rt></ruby>やく1225キロ）。',
    svgType: 'sound-speed',
  },
];

export function getReferencesByCategory(category: CategoryType): ReferenceItem[] {
  switch (category) {
    case 'volume':
      return VOLUME_REFERENCES;
    case 'length':
      return LENGTH_REFERENCES;
    case 'weight':
      return WEIGHT_REFERENCES;
    case 'area':
      return AREA_REFERENCES;
    case 'speed':
      return SPEED_REFERENCES;
  }
}

export function formatValue(val: number): string {
  if (val === 0) return '0';
  if (val < 0.01) return val.toString();
  if (val < 1) return val.toFixed(2).replace(/\.?0+$/, '');
  if (val < 10) return val.toFixed(1).replace(/\.?0+$/, '');
  return Math.round(val).toLocaleString('ja-JP');
}

export interface EducationalGuide {
  title: string;
  description: string;
  tipsTitle: string;
  tips: { emoji: string; unit: string; desc: string }[];
}

export const EDUCATIONAL_GUIDES: Record<CategoryType, EducationalGuide> = {
  volume: {
    title: '🧐 なんで「dL (<ruby>デシリットル<rt>でしりっとる</rt></ruby>)」って<ruby>学校<rt>がっこう</rt></ruby>でならうの？',
    description: '「dL」は、<ruby>牛乳<rt>ぎゅうにゅう</rt></ruby>パック1<ruby>本<rt>ほん</rt></ruby>(1L)の10<ruby>分<rt>ぶん</rt></ruby>の1（100mL）の<ruby>大<rt>おお</rt></ruby>きさだよ。ふだんの<ruby>生活<rt>せいかつ</rt></ruby>ではあまり<ruby>見かけ<rt>みかけ</rt></ruby>ないけれど、<ruby>学校<rt>がっこう</rt></ruby>の<ruby>算数<rt>さんすう</rt></ruby>では「mL」と「L」のあいだをつなぐとっても<ruby>大事<rt>だいじ</rt></ruby>な<ruby>単位<rt>たんい</rt></ruby>なんだ。「10 dL ＝ 1 L」「1 dL ＝ 100 mL」だよ。',
    tipsTitle: '💡 かさを<ruby>覚<rt>おぼ</rt></ruby>えるコツ',
    tips: [
      { emoji: '💧', unit: 'mL (ミリリットル)', desc: '<ruby>水<rt>みず</rt></ruby>のしずくやスプーンに<ruby>入<rt>はい</rt></ruby>る、ちっちゃな<ruby>量<rt>りょう</rt></ruby>！' },
      { emoji: '🥛', unit: 'dL (デシリットル)', desc: 'ジュースの<ruby>紙<rt>かみ</rt></ruby>コップに<ruby>入<rt>はい</rt></ruby>るくらいの<ruby>量<rt>りょう</rt></ruby>！' },
      { emoji: '🥛', unit: 'L (リットル)', desc: '<ruby>大<rt>おお</rt></ruby>きな<ruby>牛乳<rt>ぎゅうにゅう</rt></ruby>パックやペットボトルに<ruby>入<rt>はい</rt></ruby>る<ruby>量<rt>りょう</rt></ruby>！' }
    ]
  },
  length: {
    title: '🧐 「m」と「cm」と「mm」のヒミツ',
    description: '「m (メートル)」の<ruby>前<rt>まえ</rt></ruby>に「c (センチ)」や「m (ミリ)」がついているね。「m (ミリ)」は1000<ruby>分<rt>ぶん</rt></ruby>の1、「c (センチ)」は100<ruby>分<rt>ぶん</rt></ruby>の1という<ruby>意味<rt>いみ</rt></ruby>なんだ。だから、1mを100に<ruby>分<rt>わ</rt></ruby>けると1cm、1000に<ruby>分<rt>わ</rt></ruby>けると1mmになるんだよ！',
    tipsTitle: '💡 <ruby>長さ<rt>ながさ</rt></ruby>を<ruby>覚<rt>おぼ</rt></ruby>えるコツ',
    tips: [
      { emoji: '🪙', unit: 'mm (ミリメートル)', desc: '1<ruby>円玉<rt>えんだま</rt></ruby>の<ruby>厚み<rt>あつみ</rt></ruby>（1.5mm）や、シャーペンの<ruby>芯<rt>しん</rt></ruby>の<ruby>太さ<rt>ふとさ</rt></ruby>！' },
      { emoji: '🎲', unit: 'cm (センチメートル)', desc: 'サイコロの<ruby>幅<rt>はば</rt></ruby>（1cm）や、ノートの<ruby>マス目<rt>ますめ</rt></ruby>！' },
      { emoji: '🚶', unit: 'm (メートル)', desc: 'ドアの<ruby>高さ<rt>たかさ</rt></ruby>（<ruby>約<rt>やく</rt></ruby>2m）や、みんなの<ruby>大<rt>おお</rt></ruby>また1<ruby>歩<rt>ぽ</rt></ruby>（<ruby>約<rt>やく</rt></ruby>1m）！' },
      { emoji: '🗻', unit: 'km (キロメートル)', desc: '<ruby>大人<rt>おとな</rt></ruby>の<ruby>足<rt>あし</rt></ruby>で<ruby>歩<rt>ある</rt></ruby>いて15<ruby>分<rt>ふん</rt></ruby>くらいの<ruby>距離<rt>きょり</rt></ruby>（<ruby>約<rt>やく</rt></ruby>1km）！' }
    ]
  },
  weight: {
    title: '🧐 「g (グラム)」と「t (トン)」のヒミツ',
    description: '「k (キロ)」は1000<ruby>倍<rt>ばい</rt></ruby>という<ruby>意味<rt>いみ</rt></ruby>だよ。だから 1 kg は 1 g が1000<ruby>個<rt>こ</rt></ruby><ruby>集<rt>あつ</rt></ruby>まった<ruby>重<rt>おも</rt></ruby>さなんだ。さらに、1 kg が1000<ruby>個<rt>こ</rt></ruby><ruby>集<rt>あつ</rt></ruby>まると「1 t (トン)」という、ゾウやクジラをはかる<ruby>大<rt>おお</rt></ruby>きな<ruby>単位<rt>たんい</rt></ruby>になるんだよ！',
    tipsTitle: '💡 <ruby>重さ<rt>おもさ</rt></ruby>を<ruby>覚<rt>おぼ</rt></ruby>えるコツ',
    tips: [
      { emoji: '🧂', unit: 'mg (ミリグラム)', desc: '<ruby>塩<rt>しお</rt></ruby>1つぶや、ぷーんと<ruby>飛<rt>と</rt></ruby>んでくる<ruby>蚊<rt>か</rt></ruby>のスーパー<ruby>軽い<rt>かるい</rt></ruby><ruby>重さ<rt>おもさ</rt></ruby>！' },
      { emoji: '🪙', unit: 'g (グラム)', desc: 'アルミニウムでできた1<ruby>円玉<rt>えんだま</rt></ruby>1<ruby>枚<rt>まい</rt></ruby>（ちょうど1g）！' },
      { emoji: '🎒', unit: 'kg (キログラム)', desc: '<ruby>教科書<rt>きょうかしょ</rt></ruby>をつめたランドセル（<ruby>約<rt>やく</rt></ruby>4kg）や、みんなの<ruby>体重<rt>たいじゅう</rt></ruby>！' }
    ]
  },
  area: {
    title: '🧐 「坪 (つぼ)」や「畳 (じょう)」ってなに？',
    description: '<ruby>日本<rt>にほん</rt></ruby>では<ruby>昔<rt>むかし</rt></ruby>から、<ruby>部屋<rt>へや</rt></ruby>の<ruby>広さ<rt>ひろさ</rt></ruby>を「畳何枚分（畳）」、<ruby>土地<rt>とち</rt></ruby>の<ruby>広さ<rt>ひろさ</rt></ruby>を「駐車場何台分（坪）」で表してきたよ。1坪は畳2枚分の広さで、ちょうど車1台分の駐車場と同じ広さなんだ！おうちの人に聞いてみよう！',
    tipsTitle: '💡 <ruby>面積<rt>めんせき</rt></ruby>を<ruby>覚<rt>おぼ</rt></ruby>えるコツ',
    tips: [
      { emoji: '✉️', unit: '㎠ (平方センチ)', desc: '<ruby>郵便切手<rt>ゆうびんきって</rt></ruby>1<ruby>枚<rt>まい</rt></ruby>の<ruby>広さ<rt>ひろさ</rt></ruby>（<ruby>約<rt>やく</rt></ruby>4㎠）や、キーボードのキー！' },
      { emoji: '📓', unit: '㎡ (平方メートル)', desc: '<ruby>畳<rt>たたみ</rt></ruby>1<ruby>枚<rt>まい</rt></ruby>（<ruby>約<rt>やく</rt></ruby>1.6㎡）や、<ruby>遠足<rt>えんそく</rt></ruby>でつかうレジャーシートの<ruby>広さ<rt>ひろさ</rt></ruby>！' },
      { emoji: '🚗', unit: '坪 (つぼ)', desc: '<ruby>車<rt>くるま</rt></ruby>を1<ruby>台<rt>だい</rt></ruby>とめる<ruby>駐車場<rt>ちゅうしゃじょう</rt></ruby>（<ruby>約<rt>やく</rt></ruby>3.3㎡）！<ruby>畳<rt>たたみ</rt></ruby>なら2<ruby>枚分<rt>まいぶん</rt></ruby>だよ！' },
      { emoji: '⚾', unit: 'ドーム (個分)', desc: '<ruby>東京<rt>とうきょう</rt></ruby>ドーム（<ruby>約<rt>やく</rt></ruby>4.7万㎡）。<ruby>大<rt>おお</rt></ruby>きな<ruby>公園<rt>こうえん</rt></ruby>やスタジアムのたとえに<ruby>使<rt>つか</rt></ruby>われるよ！' }
    ]
  },
  speed: {
    title: '🧐 「時速 (じそく)」と「秒速 (びょうそく)」のちがい',
    description: '<ruby>時速<rt>じそく</rt></ruby>は「1<ruby>時間<rt>じかん</rt></ruby>で<ruby>進<rt>すす</rt></ruby>める<ruby>距離<rt>きょり</rt></ruby>」、<ruby>秒速<rt>びょうそく</rt></ruby>は「たった1<ruby>秒間<rt>びょうかん</rt></ruby>で<ruby>進<rt>すす</rt></ruby>める<ruby>距離<rt>きょり</rt></ruby>」のことだよ。<ruby>歩<rt>ある</rt></ruby>く<ruby>速さ<rt>はやさ</rt></ruby>は「<ruby>時速<rt>じそく</rt></ruby>4km」だけど、<ruby>風<rt>かぜ</rt></ruby>や<ruby>音<rt>おと</rt></ruby>、<ruby>宇宙<rt>うちゅう</rt></ruby>にいくロケットなどのすごく<ruby>速い<rt>はやい</rt></ruby>ものは「<ruby>秒速<rt>びょうそく</rt></ruby>」で<ruby>表<rt>あらわ</rt></ruby>されることが多いんだ。',
    tipsTitle: '💡 <ruby>速さ<rt>はやさ</rt></ruby>を<ruby>覚<rt>おぼ</rt></ruby>えるコツ',
    tips: [
      { emoji: '🚶', unit: '<ruby>歩<rt>ある</rt></ruby>く<ruby>速さ<rt>はやさ</rt></ruby>', desc: '<ruby>時速<rt>じそく</rt></ruby>やく 4 km。1<ruby>時間<rt>じかん</rt></ruby><ruby>歩<rt>ある</rt></ruby>くとお<ruby>隣<rt>となり</rt></ruby>の<ruby>駅<rt>えき</rt></ruby>までいけるよ！' },
      { emoji: '🚲', unit: '<ruby>自転車<rt>じてんしゃ</rt></ruby>の<ruby>速さ<rt>はやさ</rt></ruby>', desc: '<ruby>時速<rt>じそく</rt></ruby>やく 15 km。<ruby>風<rt>かぜ</rt></ruby>をきってスイスイ<ruby>進む<rt>すすむ</rt></ruby><ruby>速さ<rt>はやさ</rt></ruby>！' },
      { emoji: '🚗', unit: '<ruby>自動車<rt>じどうしゃ</rt></ruby>の<ruby>速さ<rt>はやさ</rt></ruby>', desc: '<ruby>時速<rt>じそく</rt></ruby>やく 60 km。<ruby>道路<rt>どうろ</rt></ruby>をブブーンと<ruby>走<rt>はし</rt></ruby>る<ruby>自動車<rt>じどうしゃ</rt></ruby>のスピード！' },
      { emoji: '🚄', unit: '<ruby>新幹線<rt>しんかんせん</rt></ruby>の<ruby>速さ<rt>はやさ</rt></ruby>', desc: '<ruby>時速<rt>じそく</rt></ruby>やく 300 km。<ruby>東京<rt>とうきょう</rt></ruby>から<ruby>大阪<rt>おおさか</rt></ruby>まであっというまの<ruby>超特急<rt>ちょうとっきゅう</rt></ruby>！' }
    ]
  }
};
