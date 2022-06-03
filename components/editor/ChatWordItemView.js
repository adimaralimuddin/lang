import { useState } from 'react'

export default function Word({ word, lang, langCode }) {
    const [trans, setTrans] = useState()
    const [openTrans, setOpenTrans] = useState(false)

    async function onClickHandler(text) {
        if (!trans) {
            const res = await translateFromLatin({ text, lang, langCode })
            setTrans(res)
        }
        setOpenTrans(p => !p)
    }
    const wordStyle = () => openTrans ? 'text-violet-400' : ''
    return <span
        onClick={() => onClickHandler(word)}

        className={' hover:bg-[#26CCA4] cursor-pointer hover:text-white flex flex-col p-[4px] rounded-md ' + wordStyle()}
    >
        {openTrans && <span className='relative'>
            <span className='cursor-pointer absolute p-2 whitespace-nowrap text-gray-400 bottom-5 bg-violet-900 rounded-lg'
            >
                {trans?.english} {trans?.trans}
            </span>
        </span>}
        {word}
    </ span>
}


// console.log(openTrans);


