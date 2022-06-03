// import create from 'zustand'

export const voiceApiKey = 'Bearer fabc3fe0-c876-11ec-9d5f-bf4a7e979c99'

// Bearer 5b7d9ec0-c7da-11ec-bc99-718919c5be97


// export const EditorStore = create(set => ({
//     currApi: 'Bearer 6c791560-c7b7-11ec-bc99-718919c5be97',
//     apiKeys: ['Bearer 0b06dd50-c7b5-11ec-bc99-718919c5be97', 'Bearer 6c791560-c7b7-11ec-bc99-718919c5be97'],
//     changeApi: (call = () => { }) => set(p => {
//         console.log('changing api');
//         const apiKeys = p?.apiKeys?.filter(a => a != p?.currApi)
//         const currApi = apiKeys?.[0]
//         console.log({ currApi: p?.currApi, apiKeys: p?.apiKeys });
//         console.log('changed', { currApi, apiKeys });
//         call(currApi)
//         return { apiKeys, currApi }
//     }),
//     addApi: (newApi) => set(p => ({ apiKeys: [...p?.apikeys, newApi] })),
//     set: data => set(data),
// }))

// export const EditorChatsStore = create((set, get) => ({
//     lists: [],
//     withTextAudio: false,
//     showTrans: true,
//     selected: '',
//     level: 'Beginner_A1',
//     lesson: 'lesson_1',
//     type: 'learn',
//     lang: 'ja-jp',
//     langCode: 'jpan',
//     langText: 'japanese',
//     selectedLang: ['ja-JP', 'ja-JP', 'japanese', 'ai3-ja-JP-Nanami', 'ai3-ja-JP-Keita',],
//     showAdder: false,
//     set: data => set(data),
//     setLang: data => set({
//         lang: data[0], langCode: data[5], langText: data[2], selectedLang: data
//     }),
//     toggle: (field) => set(p => ({ [field]: !p[field] })),
//     setTrue: (field) => set(p => ({ [field]: true })),
//     setFalse: (field) => set(p => ({ [field]: false }))
// }))

// export const EditorConversStore = create(set => ({
//     set: data => set(data)
// }))


// export const ConverPlayerStore = create((set, get) => ({
//     setSrc: (chats, chatInd, parInd) => set({
//         src: chats?.[chatInd]?.lines?.[parInd]?.audio,
//         chatInd, parInd,
//     }),
//     set: data => set(data)
// }))


export const levels = [
    'Beginner_A1',
    'Elementary_A2',
    'Entermediate_B1',
    'Upper_Entermediate_B2',
    'Advance_C1',
    'Fluency_C2',
]

export const noScripts = ['lo', 'yue']

export const Languages = [
    ['zh-cn', 'cmn-TW', 'chinese', 'ai3-cmn-TW-HsiaoChen', 'ai2-cmn-TW-Qiang', 'zh-Hans'],
    ['ja-JP', 'ja-JP', 'japanese', 'ai3-ja-JP-Nanami', 'ai3-ja-JP-Keita', 'jpan'],
    ['ko-KR', 'ko_KR', 'korean', 'ai2-ko-KR-JiYeon', 'ai3-ko-KR-InJoon', 'ko'],
    ['hi-IN', 'hi-IN', 'hindi', 'ai3-hi-IN-Swara', 'ai2-hi-IN-Nikhil', 'hi'],
    ['ar', 'arb', 'Arabic', 'ai3-ar-XA-Salma', 'ai3-ar-XA-Shakir'],
    ['he', 'he-IL', 'Hebrew', 'ai3-he-IL-Shira', 'ai3-he-IL-Guy'],
    ['bn', 'bn-BD', 'Bangla', 'ai3-bn-BD-Devyani', 'ai3-bn-BD-Omar'],
    ['fr-FR', 'fr-FR', 'french', 'ai3-fr-FR-Victoire', 'ai3-fr-FR-Tyssen', 'fr-FR'],
    ['es-ES', 'es-ES', 'spanish', 'ai3-es-ES-Elvira', 'ai3-es-ES-Alvaro', 'es-ES'],
    ['de-DE', 'de-DE', 'german', 'ai3-de-DE-Galliena', 'ai3-de-DE-Ermanno', 'de-DE'],
    ['ru', 'ru-RU', 'Russian', 'ai3-ru-RU-Yelena', 'ai3-ru-RU-Dmitry'],
    ['it', 'it-IT', 'Italian', 'ai3-it-IT-Elsa', 'ai3-it-IT-Diego'],
    ['pt-PT', 'pt-PT', 'Portuguese', 'ai3-pt-PT-Raquel', 'ai2-pt-PT-Gabriel'],
    ['nl', 'nl-NL', 'Dutch', 'ai3-nl-NL-Fenna', 'ai3-nl-NL-Maarten'],
    ['yue', 'zh-HK', 'Cantonese', 'ai3-zh-HK-HiuGaai', 'ai3-zh-HK-WanLung'],
    ['th', 'th-TH', 'Thai', 'ai3-th-TH-Premwadee', 'ai3-th-TH-Narong'],
    ['vi', 'vi-VN', 'Vietnamese', 'ai2-vi-VN-Thi', 'ai3-vi-VN-Phuong'],
    ['ta', 'ta-IN', 'Tamil', 'ai3-ta-IN-Pallavi', 'ai3-ta-IN-Valluvar'],
    ['tr', 'tr-TR', 'Turkish', 'ai3-tr-TR-Emel', 'ai2-tr-TR-Candana'],
    ['lo', 'lt-LT', 'Lao', 'ai3-lt-LT-Vasara', 'ai3-lt-LT-Jokubas'],
    ['lv', 'lv-LV', 'Latvian', 'ai3-lv-LV-Laura2', 'ai3-lv-LV-Edgar'],
    ['pl', 'pl-PL', 'polish', 'ai3-pl-PL-Lena', 'ai3-pl-PL-Kacper'],
    ['nb', 'nb-NO', 'norwegian', 'ai3-nb-NO-Anita', 'ai3-nb-NO-Iselin'],
    ['lt', 'lt-LT', 'Lithuanian', 'ai3-lt-LT-Vasara', 'ai3-lt-LT-Jokubas'],
    ['lv', 'lv-LV', 'latvian', 'ai3-lv-LV-Laura2', 'ai3-lv-LV-Edgar'],
    ['hu', 'hu-HU', 'Hungarian', 'ai3-hu-HU-Noemi', 'ai3-hu-HU-Tamas'],
    ['el', 'el-GR', 'Greek', 'ai3-el-GR-Athina', 'ai3-el-GR-Topher'],
    // ['km', '', 'Khmer', '', ''],
    ['sv', 'sv-SE', 'Swedish', 'ai3-sv-SE-Sofie', 'ai3-sv-SE-Mattias'],
    ['uk', 'uk-UA', 'Ukrainian', 'ai3-uk-UA-Olena', 'ai3-uk-UA-Pavlo'],
    ['ro', 'ro-RO', 'Romanian', 'ai3-ro-RO-Alina', 'ai3-ro-RO-Alexandru'],
    // ['ka', '', 'Georgian', '', ''],
    // ['hy', '', 'Armenian', '', ''],
    // ['cs', '', 'Czech', '', ''],
    ['da', 'da-DK', 'Danish', 'ai3-da-DK-Christel', 'ai3-da-DK-Jeppe'],
    // ['uz', '', 'Uzbek', '', ''],
    // ['ur', '', 'Urdu', '', ''],
    // ['ug', '', 'Uyghur', '', ''],
    // ['tk', '', 'Turkmen', '', ''],
    // ['ky', '', 'Kyrgyz', '', ''],
    // ['kk', '', 'Kazakh', '', ''],// no voice maker voice
    // ['fa', '', 'Persian', '', ''],// no voice maker voice
    // ['et', '', 'Estonian', '', ''],
    // ['bs', '', 'Bosnian', '', ''],
    // ['bo', '', 'Tibetan', '', ''],
    // ['bg', '', 'Bulgarian', '', ''],
    // ['az', '', 'Azerbaijani', '', ''],

]


export const verbs = [
    'eat', 'know', 'like', 'did', 'love',
    'talk', 'see', 'play', 'call',
    'drink',
    'sleep',
    'run',
    'sit',
    'read', 'wait', 'wish', 'hope', 'think', 'lives',
    'go', 'get',
    'make', 'start', 'ask', 'apear',
    'look', 'come',
    'do', 'explore', 'walk', 'cook', 'watch', 'meet', 'wait', 'follow', 'lift', 'try', 'made'
    , 'understand'
]

export const pronouns = ['i', 'i am', 'you', 'he', 'she', 'they', 'we', 'it', `it's`, 'there', 'my', 'my.', 'your', 'his', 'here', 'the', 'that', 'that?', 'this', 'this?', 'these', 'these?', 'those', 'those?',]
export const linkingVerbs = ['is', 'are', 'Are', 'be', 'am', `i'm`, 'does', 'it is', 'would', 'apear', 'seem']
export const prepositions = ['on', 'in', 'also', 'at', 'for', 'to', 'and', 'by', 'from',
    'with', 'by', 'about', 'after', 'before', 'near', 'inside', 'outside', 'off', 'over',
    'below', 'beside', 'above', 'come', 'into', 'towards', 'infront', 'in front of',
    'middle'
]

export const adverb = ['very', 'a little', 'a few', 'often', 'while',
    'never', 'until', 'sometimes',
    'now', 'soon', 'often', 'a lot', 'frequently'
]
export const article = ['a', 'an', 'one', 'some', 'few', 'something', 'anything', 'each', 'every', 'a little', 'more', 'any', 'only', 'quite', 'pretty much', 'really', 'especially']
export const question = ['what', 'who', 'where', 'why', 'which', 'how', 'when', 'am i', 'what about', 'how many', 'but', 'because', 'if']
export const negative = ['not', 'no', 'no,', 'no.']
export const positive = ['yes', 'yes,', 'yes.']
export const times = ['today', 'now', 'everyday', 'every day', 'tomorrow', 'yesterday']
export const helper = ['can', 'want', 'would', 'will', 'need', 'have', 'has', 'had']
// @chat./this is romio.he is a cat.romio eats an apple on the table.
// @chat./mike runs to school.he and his friends are very late.


