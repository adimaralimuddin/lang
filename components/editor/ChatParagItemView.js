import Word from "./ChatWordItemView"


export default function Parag({ data, lang, langCode, isPlaying, stylePlaying }) {
    var split;
    if (langCode == 'zh-cn') {
        split = data.split('')
    } else {
        split = data.split(' ')
    }

    // const style = () => isPlaying ? 'text-[#1B9A7C] text-[#26CCA4]s' : 'text-gray-600'

    return (
        <div className={'flex flex-wrap text-2xl ' 
        + stylePlaying(undefined, 'text-gray-600 dark:text-gray-400')}> {
            split.map((word, ind) => <Word
                word={word}
                lang={lang}
                langCode={langCode}
                key={word + ind} />)
        } </div>
    )
}