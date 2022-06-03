
import { useRef, useEffect } from 'react'
import Parag from './ChatParagItemView'
export default function LineItem({ data, playInd, isPlaying, showTrans, lang, playParag, langCode, showScript }) {
    const divRef = useRef()


    function onPlay() {
        playParag(data.audio, data.ind)
    }
    const stylePlaying = (cStyle = ' text-[#26CCA4]', offStyle) => (playInd == data?.ind && isPlaying) ? cStyle : offStyle
    const textStyle = (a, b) => (playInd != data?.ind || !isPlaying && showScript) ? a : b

    return (
        <span ref={divRef} className={stylePlaying() + ' my-1'}  >
            <Parag
                data={data?.trans || data?.latin}
                isPlaying={isPlaying}
                lang={lang}
                langCode={langCode}
                stylePlaying={stylePlaying}
            />
            {data?.align}
            {showScript && <p
                className={stylePlaying('text-gray-600', 'text-gray-500')}>
                {data?.latin}</p>}
            {/* {(playInd != data?.ind || !isPlaying && showScript) &&  */}
            <p
                onClick={onPlay}
                className={' cursor-pointer mx-1 ' +
                    stylePlaying(' text-gray-500 ', 'text-gray-400 dark:text-gray-500') +
                    textStyle('',' blur-[3px]')
                }>{data?.text}</p>
            {/* // } */}

        </span >
    )
}


