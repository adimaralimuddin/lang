

import { useState } from 'react'
import { playAudio } from '../../appApi/toolApi'

function Word(props) {
    const style = () => props?.active ? " text-[#26CCA4]d text-green-400 " : ' text-red-500s '
    const [isPlaying, setIsPlaying] = useState(false)

    function play() {
        setIsPlaying(true)
        playAudio(props?.word?.audio, _ => {
            setIsPlaying(false)
        })
    }

    const stylePlaying = (a, b) => isPlaying ? a : b
    const styleOpose = (a, b) => props?.oposite == 'true' ? a : b

    return (
        <div
            onClick={play}
            {...props}
            className={`
            dark:text-[#6780D9]d
            min-w-[70px] min-h-[70px] text-center
            flex flex-col items-center justify-center p-1 px-3 cursor-pointer 
            hover:bg-gray-100 hover:ring-[#26CCA4]d 
            hover:ring-1 hover:shadow-md rounded-md 
            dark:hover:bg-gray-800 dark:bg-[#1A222E]d
            ` + props?.className + stylePlaying(' scale-105 ', '')}>

            {/* <span> */}
            <p className={style() + stylePlaying('text-[#26CCA4]', ' dark:text-[#24966D] ') + ' text-xl font-semibold '} >{styleOpose(props?.word?.text, props?.word?.trans)}</p>
            <p className={'text-[16px]'}>{styleOpose('', props?.word?.latin)}</p>
            {props?.showtrans && <p className='text-[16px]'>{props?.word?.text}</p>}
            {/* </span> */}
        </div >
    )
}

export default Word
