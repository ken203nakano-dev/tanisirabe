import { CategoryType } from './references';

export interface QuizQuestion {
  id: string;
  category: CategoryType;
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
  // Visual context to show after answering
  visualValue: string; // value to set on input, e.g. "5"
  visualUnit: string;  // unit to set, e.g. "dL"
  visualItemId: string; // The reference item ID to highlight/show
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // Volume (かさ)
  {
    id: 'vol-1',
    category: 'volume',
    question: '🥛 <ruby>給食<rt>きゅうしょく</rt></ruby>に出る<ruby>大<rt>おお</rt></ruby>きい<ruby>牛乳<rt>ぎゅうにゅう</rt></ruby>パック（1 L）は、いつもの<ruby>紙<rt>かみ</rt></ruby>コップ（200 mL）<ruby>何杯分<rt>なんはいぶん</rt></ruby>かな？',
    options: ['2<ruby>杯分<rt>はいぶん</rt></ruby>', '5<ruby>杯分<rt>はいぶん</rt></ruby>', '10<ruby>杯分<rt>はいぶん</rt></ruby>'],
    answerIndex: 1,
    explanation: '<ruby>正解<rt>せいかい</rt></ruby>は 5<ruby>杯分<rt>はいぶん</rt></ruby>！ 1 L は 1000 mL だよ。200 mL の<ruby>紙<rt>かみ</rt></ruby>コップ 5<ruby>杯<rt>はい</rt></ruby>で、ちょうど 1000 mL になるんだね。',
    visualValue: '1',
    visualUnit: 'L',
    visualItemId: 'paper-cup',
  },
  {
    id: 'vol-2',
    category: 'volume',
    question: '💧 お<ruby>料理<rt>りょうり</rt></ruby>で<ruby>使<rt>つか</rt></ruby>う「小さじ」は 5 mL だよ。では「大さじ」は小さじ<ruby>何杯分<rt>なんはいぶん</rt></ruby>かな？',
    options: ['3<ruby>杯分<rt>はいぶん</rt></ruby> (15mL)', '5<ruby>杯分<rt>はいぶん</rt></ruby> (25mL)', '10<ruby>杯分<rt>はいぶん</rt></ruby> (50mL)'],
    answerIndex: 0,
    explanation: '<ruby>正解<rt>せいかい</rt></ruby>は 3<ruby>杯分<rt>はいぶん</rt></ruby>！ 大さじは 15 mL なので、5 mL の小さじ 3<ruby>杯分<rt>はいぶん</rt></ruby>とまったく同じなんだよ。',
    visualValue: '15',
    visualUnit: 'mL',
    visualItemId: 'teaspoon',
  },
  {
    id: 'vol-3',
    category: 'volume',
    question: '🥤 500 mL ペットボトルのお<ruby>茶<rt>ちゃ</rt></ruby>の<ruby>量<rt>りょう</rt></ruby>は、何 dL（デシリットル）かな？',
    options: ['5 dL', '50 dL', '500 dL'],
    answerIndex: 0,
    explanation: '<ruby>正解<rt>せいかい</rt></ruby>は 5 dL！ 1 dL は 100 mL だから、500 mL はちょうど 5 dL になるんだ。dLは<ruby>学校<rt>がっこう</rt></ruby>の<ruby>算数<rt>さんすう</rt></ruby>で<ruby>大活躍<rt>だいかつやく</rt></ruby>するよ！',
    visualValue: '5',
    visualUnit: 'dL',
    visualItemId: 'pet-bottle',
  },
  {
    id: 'vol-4',
    category: 'volume',
    question: '🛁 おうちのお<ruby>風呂<rt>ふろ</rt></ruby>にためるお<ruby>湯<rt>ゆ</rt></ruby>（<ruby>約<rt>やく</rt></ruby> 200 L）は、1 Lの<ruby>牛乳<rt>ぎゅうにゅう</rt></ruby>パック<ruby>何本分<rt>なんぼんぶん</rt></ruby>かな？',
    options: ['20<ruby>本分<rt>ほんぶん</rt></ruby>', '200<ruby>本分<rt>ほんぶん</rt></ruby>', '2000<ruby>本分<rt>ほんぶん</rt></ruby>'],
    answerIndex: 1,
    explanation: '<ruby>正解<rt>せいかい</rt></ruby>は 200<ruby>本分<rt>ほんぶん</rt></ruby>！ 1 L の<ruby>牛乳<rt>ぎゅうにゅう</rt></ruby>パックをお<ruby>風呂<rt>ふろ</rt></ruby>に200<ruby>回<rt>かい</rt></ruby>ドボドボ注ぐと、ちょうどお<ruby>風呂<rt>ふろ</rt></ruby>がいっぱいになるよ。すごい<ruby>量<rt>りょう</rt></ruby>だね！',
    visualValue: '200',
    visualUnit: 'L',
    visualItemId: 'milk-carton',
  },
  
  // Length (長さ)
  {
    id: 'len-1',
    category: 'length',
    question: '🎲 サイコロの1つの<ruby>幅<rt>はば</rt></ruby>（1 cm）は、1<ruby>円玉<rt>えんだま</rt></ruby>の<ruby>厚み<rt>あつみ</rt></ruby>（1.5 mm）<ruby>何枚分<rt>なんまいぶん</rt></ruby>くらいかな？',
    options: ['<ruby>約<rt>やく</rt></ruby> 2<ruby>枚分<rt>まいぶん</rt></ruby>', '<ruby>約<rt>やく</rt></ruby> 7<ruby>枚分<rt>まいぶん</rt></ruby>', '<ruby>約<rt>やく</rt></ruby> 15<ruby>枚分<rt>まいぶん</rt></ruby>'],
    answerIndex: 1,
    explanation: '<ruby>正解<rt>せいかい</rt></ruby>は <ruby>約<rt>やく</rt></ruby> 7<ruby>枚分<rt>まいぶん</rt></ruby>！ 1 cm は 10 mm だよ。1.5 mm の1<ruby>円玉<rt>えんだま</rt></ruby>を 7<ruby>枚<rt>まい</rt></ruby><ruby>重<rt>かさ</rt></ruby>ねると 10.5 mm（<ruby>約<rt>やく</rt></ruby> 1 cm）になるんだ。',
    visualValue: '10',
    visualUnit: 'mm',
    visualItemId: 'coin-1yen-thick',
  },
  {
    id: 'len-2',
    category: 'length',
    question: '📱 みんなの<ruby>家<rt>いえ</rt></ruby>にあるスマホのたての<ruby>長さ<rt>ながさ</rt></ruby>（<ruby>約<rt>やく</rt></ruby> 15 cm）は、サイコロ（1 cm）<ruby>何個分<rt>なんこぶん</rt></ruby>かな？',
    options: ['15<ruby>個分<rt>こぶん</rt></ruby>', '30<ruby>個分<rt>こぶん</rt></ruby>', '150<ruby>個分<rt>こぶん</rt></ruby>'],
    answerIndex: 0,
    explanation: '<ruby>正解<rt>せいかい</rt></ruby>は 15<ruby>個分<rt>こぶん</rt></ruby>！ 1 cm のサイコロを<ruby>横<rt>よこ</rt></ruby>に 15<ruby>個<rt>こ</rt></ruby>ずらっと<ruby>並<rt>なら</rt></ruby>べると、ちょうどスマホと<ruby>同<rt>おな</rt></ruby>じくらいの<ruby>長さ<rt>ながさ</rt></ruby>になるよ。',
    visualValue: '15',
    visualUnit: 'cm',
    visualItemId: 'dice',
  },
  {
    id: 'len-3',
    category: 'length',
    question: '🚪 <ruby>部屋<rt>へや</rt></ruby>の<ruby>出入り口<rt>いりぐち</rt></ruby>のドアの<ruby>高さ<rt>たかさ</rt></ruby>（<ruby>約<rt>やく</rt></ruby> 2 m）は、30cmものさし<ruby>何本分<rt>なんぼんぶん</rt></ruby>くらいかな？',
    options: ['<ruby>約<rt>やく</rt></ruby> 7<ruby>本分<rt>ほんぶん</rt></ruby>', '<ruby>約<rt>やく</rt></ruby> 15<ruby>本分<rt>ほんぶん</rt></ruby>', '<ruby>約<rt>やく</rt></ruby> 30<ruby>本分<rt>ほんぶん</rt></ruby>'],
    answerIndex: 0,
    explanation: '<ruby>正解<rt>せいかい</rt></ruby>は <ruby>約<rt>やく</rt></ruby> 7<ruby>本分<rt>ほんぶん</rt></ruby>！ 2 m は 200 cm だよ。30 cm のものさしが 7<ruby>本<rt>ほん</rt></ruby>（210 cm）でドアと<ruby>同<rt>おな</rt></ruby>じくらいの<ruby>高さ<rt>たかさ</rt></ruby>になるんだ。',
    visualValue: '2',
    visualUnit: 'm',
    visualItemId: 'ruler-30',
  },
  {
    id: 'len-4',
    category: 'length',
    question: '🚌 <ruby>小学校<rt>しょうがっこう</rt></ruby>のプールの<ruby>長さ<rt>ながさ</rt></ruby>（25 m）は、<ruby>大<rt>おお</rt></ruby>きな<ruby>観光<rt>かんこう</rt></ruby>バス（10 m）<ruby>何台分<rt>なんだいぶん</rt></ruby>くらいかな？',
    options: ['1.5<ruby>台分<rt>だいぶん</rt></ruby>', '2.5<ruby>台分<rt>だいぶん</rt></ruby>', '5<ruby>台分<rt>だいぶん</rt></ruby>'],
    answerIndex: 1,
    explanation: '<ruby>正解<rt>せいかい</rt></ruby>は 2.5<ruby>台分<rt>だいぶん</rt></ruby>！ バス2<ruby>台<rt>だい</rt></ruby>で 20 m、もう<ruby>半分<rt>はんぶん</rt></ruby>（0.5<ruby>台分<rt>だいぶん</rt></ruby> = 5m）を<ruby>足<rt>た</rt></ruby>して 25 m になるよ。プールってけっこう<ruby>長<rt>なが</rt></ruby>いんだね！',
    visualValue: '25',
    visualUnit: 'm',
    visualItemId: 'bus',
  },

  // Weight (重さ)
  {
    id: 'wei-1',
    category: 'weight',
    question: '🪙 アルミでできた1<ruby>円玉<rt>えんだま</rt></ruby>1<ruby>枚<rt>まい</rt></ruby>の<ruby>重さ<rt>おもさ</rt></ruby>は 1 g だよ。じゃあ<ruby>赤<rt>あか</rt></ruby>い「りんご」1<ruby>個<rt>こ</rt></ruby>は1<ruby>円玉<rt>えんだま</rt></ruby><ruby>何枚分<rt>なんまいぶん</rt></ruby>かな？',
    options: ['30<ruby>枚分<rt>まいぶん</rt></ruby>', '300<ruby>枚分<rt>まいぶん</rt></ruby>', '3000<ruby>枚分<rt>まいぶん</rt></ruby>'],
    answerIndex: 1,
    explanation: '<ruby>正解<rt>せいかい</rt></ruby>は 300<ruby>枚分<rt>まいぶん</rt></ruby>！ りんご1<ruby>個<rt>こ</rt></ruby>の<ruby>重さ<rt>おもさ</rt></ruby>は<ruby>約<rt>やく</rt></ruby> 300 g だから、1<ruby>円玉<rt>えんだま</rt></ruby> 300<ruby>枚<rt>まい</rt></ruby>と<ruby>同<rt>おな</rt></ruby>じ<ruby>重さ<rt>おもさ</rt></ruby>なんだ。1<ruby>円玉<rt>えんだま</rt></ruby>がたくさん<ruby>必要<rt>ひつよう</rt></ruby>だね！',
    visualValue: '300',
    visualUnit: 'g',
    visualItemId: 'coin-1yen-weight',
  },
  {
    id: 'wei-2',
    category: 'weight',
    question: '🎒 <ruby>教科書<rt>きょうかしょ</rt></ruby>やノートがたくさん<ruby>入<rt>はい</rt></ruby>った<ruby>重い<rt>おもい</rt></ruby>ランドセル（<ruby>約<rt>やく</rt></ruby> 4 kg）は、りんご（300 g）<ruby>何個分<rt>なんこぶん</rt></ruby>かな？',
    options: ['<ruby>約<rt>やく</rt></ruby> 13<ruby>個分<rt>こぶん</rt></ruby>', '<ruby>約<rt>やく</rt></ruby> 30<ruby>個分<rt>こぶん</rt></ruby>', '<ruby>約<rt>やく</rt></ruby> 100<ruby>個分<rt>こぶん</rt></ruby>'],
    answerIndex: 0,
    explanation: '<ruby>正解<rt>せいかい</rt></ruby>は <ruby>約<rt>やく</rt></ruby> 13<ruby>個分<rt>こぶん</rt></ruby>！ 4 kg は 4000 g だよ。300 g のりんごが 13<ruby>個分<rt>こぶん</rt></ruby><ruby>集<rt>あつ</rt></ruby>まると、<ruby>毎日<rt>まいにち</rt></ruby><ruby>背負<rt>せお</rt></ruby>うランドセルと<ruby>同<rt>おな</rt></ruby>じ<ruby>重さ<rt>おもさ</rt></ruby>になるんだ。',
    visualValue: '4',
    visualUnit: 'kg',
    visualItemId: 'apple',
  },
  {
    id: 'wei-3',
    category: 'weight',
    question: '🐕 かわいい<ruby>柴犬<rt>しばいぬ</rt></ruby>1<ruby>匹<rt>ひき</rt></ruby>の<ruby>体重<rt>たいじゅう</rt></ruby>（<ruby>約<rt>やく</rt></ruby> 10 kg）は、ランドセル（4 kg）<ruby>何個分<rt>なんこぶん</rt></ruby>かな？',
    options: ['2.5<ruby>個分<rt>こぶん</rt></ruby>', '5<ruby>個分<rt>こぶん</rt></ruby>', '10<ruby>個分<rt>こぶん</rt></ruby>'],
    answerIndex: 0,
    explanation: '<ruby>正解<rt>せいかい</rt></ruby>は 2.5<ruby>個分<rt>こぶん</rt></ruby>！ ランドセル2つで 8 kg、あと<ruby>半分<rt>はんぶん</rt></ruby>（2 kg）を<ruby>合<rt>あ</rt></ruby>わせて 10 kg だよ。<ruby>柴犬<rt>しばいぬ</rt></ruby>を<ruby>持<rt>も</rt></ruby>ち<ruby>上<rt>あ</rt></ruby>げるのはけっこう<ruby>大変<rt>たいへん</rt></ruby>！',
    visualValue: '10',
    visualUnit: 'kg',
    visualItemId: 'school-bag',
  },
  
  // Area (面積)
  {
    id: 'are-1',
    category: 'area',
    question: '🧹 お<ruby>部屋<rt>へや</rt></ruby>の「<ruby>畳<rt>たたみ</rt></ruby>1<ruby>枚<rt>まい</rt></ruby>」の<ruby>広さ<rt>ひろさ</rt></ruby>は、<ruby>駐車場<rt>ちゅうしゃじょう</rt></ruby>1<ruby>台分<rt>だいぶん</rt></ruby>（<ruby>約<rt>やく</rt></ruby> 1 <ruby>坪<rt>つぼ</rt></ruby>）とくらべてどれくらいかな？',
    options: ['<ruby>駐車場<rt>ちゅうしゃじょう</rt></ruby> <ruby>約<rt>やく</rt></ruby> <ruby>半分<rt>はんぶん</rt></ruby> (1/2<ruby>台分<rt>だいぶん</rt></ruby>)', '<ruby>駐車場<rt>ちゅうしゃじょう</rt></ruby> <ruby>約<rt>やく</rt></ruby> 2<ruby>台分<rt>だいぶん</rt></ruby>', '<ruby>駐車場<rt>ちゅうしゃじょう</rt></ruby> <ruby>約<rt>やく</rt></ruby> 10<ruby>台分<rt>だいぶん</rt></ruby>'],
    answerIndex: 0,
    explanation: '<ruby>正解<rt>せいかい</rt></ruby>は <ruby>駐車場<rt>ちゅうしゃじょう</rt></ruby> <ruby>約<rt>やく</rt></ruby> <ruby>半分<rt>はんぶん</rt></ruby>！ <ruby>駐車場<rt>ちゅうしゃじょう</rt></ruby>1<ruby>台分<rt>だいぶん</rt></ruby>の<ruby>広さ<rt>ひろさ</rt></ruby>（<ruby>約<rt>やく</rt></ruby>3.3㎡ ＝ 1<ruby>坪<rt>つぼ</rt></ruby>）は、<ruby>畳<rt>たたみ</rt></ruby>がちょうど 2<ruby>枚分<rt>まいぶん</rt></ruby>になるよ。だから<ruby>畳<rt>たたみ</rt></ruby>1<ruby>枚<rt>まい</rt></ruby>は<ruby>駐車場<rt>ちゅうしゃじょう</rt></ruby><ruby>約<rt>やく</rt></ruby><ruby>半分<rt>はんぶん</rt></ruby>なんだね。',
    visualValue: '1',
    visualUnit: '畳',
    visualItemId: 'parking-spot',
  },
  {
    id: 'are-2',
    category: 'area',
    question: '🚗 <ruby>駐車場<rt>ちゅうしゃじょう</rt></ruby>1<ruby>台分<rt>だいぶん</rt></ruby>の<ruby>広さ<rt>ひろさ</rt></ruby>（<ruby>約<rt>やく</rt></ruby> 3.3 ㎡ = 1<ruby>坪<rt>つぼ</rt></ruby>）は、ノート<ruby>見開<rt>みひら</rt></ruby>き<ruby>何冊分<rt>なんさつぶん</rt></ruby>くらいかな？',
    options: ['<ruby>約<rt>やく</rt></ruby> 4<ruby>冊分<rt>さつぶん</rt></ruby>', '<ruby>約<rt>やく</rt></ruby> 40<ruby>冊分<rt>さつぶん</rt></ruby>', '<ruby>約<rt>やく</rt></ruby> 400<ruby>冊分<rt>さつぶん</rt></ruby>'],
    answerIndex: 1,
    explanation: '<ruby>正解<rt>せいかい</rt></ruby>は <ruby>約<rt>やく</rt></ruby> 40<ruby>冊分<rt>さつぶん</rt></ruby>！ ノート<ruby>見開<rt>みひら</rt></ruby>きの<ruby>広さ<rt>ひろさ</rt></ruby>は<ruby>約<rt>やく</rt></ruby> 0.08 ㎡ だよ。ノートを<ruby>床<rt>ゆか</rt></ruby>に 40<ruby>冊<rt>さつ</rt></ruby><ruby>敷<rt>し</rt></ruby>きつめると、ちょうど<ruby>駐車場<rt>ちゅうしゃじょう</rt></ruby>1<ruby>台分<rt>だいぶん</rt></ruby>の<ruby>広さ<rt>ひろさ</rt></ruby>になります。',
    visualValue: '1',
    visualUnit: '坪',
    visualItemId: 'notebook-open',
  },
  
  // Speed (速さ)
  {
    id: 'spe-1',
    category: 'speed',
    question: '🚄 <ruby>風<rt>かぜ</rt></ruby>のように<ruby>走<rt>はし</rt></ruby>る「<ruby>新幹線<rt>しんかんせん</rt></ruby>（<ruby>時速<rt>じそく</rt></ruby> 300 km/h）」は、<ruby>大人<rt>おとな</rt></ruby>が<ruby>歩<rt>ある</rt></ruby>く<ruby>速さ<rt>はやさ</rt></ruby>（<ruby>時速<rt>じそく</rt></ruby> 4 km/h）の<ruby>何倍<rt>なんばい</rt></ruby>のスピードかな？',
    options: ['25<ruby>倍<rt>ばい</rt></ruby>の<ruby>速さ<rt>はやさ</rt></ruby>', '75<ruby>倍<rt>ばい</rt></ruby>の<ruby>速さ<rt>はやさ</rt></ruby>', '150<ruby>倍<rt>ばい</rt></ruby>の<ruby>速さ<rt>はやさ</rt></ruby>'],
    answerIndex: 1,
    explanation: '<ruby>正解<rt>せいかい</rt></ruby>は 75<ruby>倍<rt>ばい</rt></ruby>の<ruby>速さ<rt>はやさ</rt></ruby>！ <ruby>新幹線<rt>しんかんせん</rt></ruby>は<ruby>歩<rt>ある</rt></ruby>くスピードの 75<ruby>倍<rt>ばい</rt></ruby>も<ruby>速い<rt>はやい</rt></ruby>んだ。一<ruby>瞬<rt>しゅん</rt></ruby>で<ruby>通<rt>とお</rt></ruby>り<ruby>過<rt>す</rt></ruby>ぎちゃうわけだね！',
    visualValue: '300',
    visualUnit: 'km/h',
    visualItemId: 'walking',
  },
  {
    id: 'spe-2',
    category: 'speed',
    question: '🐆 <ruby>陸<rt>りく</rt></ruby>の<ruby>上<rt>うえ</rt></ruby>でいちばん<ruby>速<rt>はや</rt></ruby>く<ruby>走<rt>はし</rt></ruby>れる「チーター（<ruby>時速<rt>じそく</rt></ruby> 100 km/h）」は、<ruby>自転車<rt>じてんしゃ</rt></ruby>（<ruby>時速<rt>じそく</rt></ruby> 15 km/h）の<ruby>何倍<rt>なんばい</rt></ruby>くらい<ruby>速<rt>はや</rt></ruby>いかな？',
    options: ['<ruby>約<rt>やく</rt></ruby> 2.5<ruby>倍<rt>ばい</rt></ruby>', '<ruby>約<rt>やく</rt></ruby> 6.7<ruby>倍<rt>ばい</rt></ruby>', '<ruby>約<rt>やく</rt></ruby> 20<ruby>倍<rt>ばい</rt></ruby>'],
    answerIndex: 1,
    explanation: '<ruby>正解<rt>せいかい</rt></ruby>は <ruby>約<rt>やく</rt></ruby> 6.7<ruby>倍<rt>ばい</rt></ruby>！ チーターは<ruby>自転車<rt>じてんしゃ</rt></ruby>の6<ruby>倍以上<rt>ばいいじょう</rt></ruby>のスピードで<ruby>全力疾走<rt>ぜんりょくしっそう</rt></ruby>できるんだよ。<ruby>並<rt>なら</rt></ruby>んで<ruby>走<rt>はし</rt></ruby>ったらあっという<ruby>間<rt>ま</rt></ruby>に<ruby>追<rt>お</rt></ruby>い<ruby>抜<rt>ぬ</rt></ruby>かれちゃうね！',
    visualValue: '100',
    visualUnit: 'km/h',
    visualItemId: 'bicycle',
  },
];
