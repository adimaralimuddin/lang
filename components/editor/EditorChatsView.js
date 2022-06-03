
import { useEffect, useState } from 'react'
import { EditorChatsStore, EditorConversStore } from '../../stores/editorStore'
// import { buildChat, } from './editorApi'
import AdderStartView from './adders/AdderStartView'
import { listenDb } from '../../appApi/dbApi'
// import AdderTitleView from './adders/AdderTitleView'
import ChatsView from './ChatsView'
import AdderConverView from './adders/AdderConverView'
// import AdderApiView from './adders/AdderApiView'
// import { apiGetAllLanguages } from '../../appApi/restApi'
import Link from 'next/link'
// import ThemToggle from '../others/ThemToggle'
import AdderQuestionView from './adders/AdderQuestionView'
import AdderWordView from './adders/AdderWordView'
import AdderStepStartView from './adders/AdderStepStartView'

export const hdLanguages = [
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
    // ['lo', '', 'Lao', '', ''],
    // ['km', '', 'Khmer', '', ''],
    // ['sv', '', 'Swedish', '', ''],
    // ['uk', '', 'Ukrainian', '', ''],
    // ['ro', '', 'Romanian', '', ''],
    // ['ka', '', 'Georgian', '', ''],
    // ['hy', '', 'Armenian', '', ''],
    // ['cs', '', 'Czech', '', ''],
    // ['da', '', 'Danish', '', ''],
    // ['el', '', 'Greek', '', ''],
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

export const basicLanguages = [
    ['hi-in', 'hindi'],
    ['es-es', 'spanish'],
    ['de-de', 'germany'],
    ['fr-fr', 'french'],
    ['zh-cn', 'chinese'],
    ['ja-jp', 'japanese'],
    ['ko-kr', 'korean'],
    ['id-id', 'indonesian'],
    ['it-it', 'italian'],
    ['ru-ru', 'russian'],
    ['ar-sa', 'arabic', 'oda', ''],
    ['th-th', 'thai'],
    ['nl-nl', 'dutch'],
    ['el-gr', 'greek'],
    ['he-il', 'hebrew'],
    ['ms-my', 'malay'],
    ['pt-pt', 'portuguese'],
    ['vi-vn', 'vietnamese'],
    ['tr-tr', 'turkish'],
    ['ta-in', 'tamil'],
    ['sv-se', 'swedish'],
    ['pl-pl', 'polish'],
    ['nb-no', 'norwegian'],
]

export const languagesLists = [...hdLanguages]
export const levels = [
    'Beginner_A1',
    'Elementary_A2',
    'Intermediate_B1',
    'Upper_Intermediate_B2',
    'Advance_C1',
    'Proficiency_C2',
]
export const stages = [
    'lesson_1',
    'lesson_2',
    'lesson_3',
    'lesson_4',
    'lesson_5',
    'lesson_6',
    'lesson_7',
    'lesson_8',
    'lesson_9',
    'lesson_10',
    'lesson_11',
    'lesson_12',
    'lesson_13',
    'lesson_14',
    'lesson_15',
    'lesson_16',
    'lesson_17',
    'lesson_18',
    'lesson_19',
    'lesson_20',
]

function EditorChatsView() {

    const chats = EditorChatsStore()

    useEffect(() => {
        chats.setLang(languagesLists[0])
    }, [])

    function onSelectLangHandler({ target }) {
        const lang = languagesLists.find(p => p[0] == target.value)
        chats.setLang(lang)
    }

    function onSelectLevelHandler({ target }) {
        chats.set({ level: target.value })
    }
    
    function onTitleInput({ target }) {
        if (target.value.trim() == '') return
        chats.set({ stage: target.value })
    }

    // function onTranslationHandler() {
    //     chats.set({ showTrans: chats.showTrans ? false : true })
    // }

    // function build() {
    //     buildChat(chats)
    //     chats.set({ selectedLang: chats.buildLang, langText: chats.buildLangText })
    // }

    // function selectBuildLang({ target }) {
    //     const buildLangText = languagesLists.find(p => p[0] == target.value)[1]
    //     console.log(target.value, buildLangText);
    //     chats.set({ buildLang: target.value, buildLangText })
    // }

 



    return (
        <div className='flex-1   items-center justify-center dark:bg-gray-900 rounded-lg text-gray-500'>
            <header className='flex pb-2 max-w-2xl mx-auto'>
                <span className='flex flex-col w-fit mr-1'>
                    <label htmlFor="speed">language</label>
                    <select onChange={onSelectLangHandler} className='ring-1' name="" id="">{
                        languagesLists?.map(
                            lang => <option
                                value={lang[0]}
                                key={lang[0]}>{lang[2]}</option>)
                    } </select>
                </span>
                <span className='flex flex-col items-center w-fit mr-1'>
                    <label htmlFor="">Level</label>
                    <select onChange={onSelectLevelHandler} className='ring-1 ' name="" id="">
                        {levels.map(val => <option value={val} key={val}>{val}</option>)}
                    </select>
                </span>
                <span className='flex flex-col w-fit mr-1 justify-start'>
                    <label htmlFor="speed">stage</label>
                    <select onInput={onTitleInput} className='ring-1' name="" id="">{
                        stages?.map(stage => (
                            <option value={stage} key={stage}>
                                {stage}
                            </option>
                        ))
                    }</select>
                </span>

                <Link href='/'>main</Link>
            </header>
            <div className='flex flex-wrap p-2'>

                <ChatsView />
                <section className=' bg-slate-900 p-1 '>
                    <AdderConverView />
                    <AdderQuestionView />
                    <AdderStartView />
                    <AdderWordView />
                    <AdderStepStartView />
                    {/* <AdderTitleView /> */}
                    {/* <AdderApiView /> */}
                </section>
            </div>
            <br />
            <br />
            <br />
        </div>
    )
}

export default EditorChatsView

function LanguagesSelectView({ onSelect }) {

    return (
        <div className='ring-1 rounded-md'>
            <select onChange={onSelect} name="" id="">{
                languagesLists?.map(
                    lang => <option
                        value={lang[0]}
                        key={lang[0]}>{lang[2]}</option>)
            } </select>
            <button>build</button>
        </div>
    )
}