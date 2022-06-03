
import { useState, useEffect, useRef } from 'react'
import { playAudio } from '../../appApi/toolApi'
import { wordColor } from './PlayItemTools'
import { LineItem } from './PlayItemLineItem'

export default function PlayItemTprs({ data, done, isEdit, ind, img, set }) {
    // console.log(data);
    useEffect(() => {
        if (isEdit) return
        // done()
        if (!data?.audio) return done()
        playAudio(data?.audio, _ => {
            done()
        })

    }, [data])

    return (
        <div onClick={() => playAudio(data?.audio)} className='flex ring-1d flex-col ring-1d items-center justify-center '>
            <img className='ring-1d' src={`/image/story/${data?.storyImage}.png`} width='70%' alt="" />

            <div>
                {
                    data?.lines?.sort((a, b) => a?.ind - b?.ind)?.map(line => (
                        <LineItem
                            data={line}
                            text={data?.textLines?.filter(l => l?.lineInd == line?.ind)?.sort((a, b) => a?.ind - b?.ind)}
                            trans={data?.transLines?.filter(l => l?.lineInd == line?.ind)?.sort((a, b) => a?.ind - b?.ind)}
                            languageId={data?.languageId}
                            key={line?.text}
                        />
                    ))
                }
            </div>


        </div>
    )
}

function WordItem({ trans }) {
    const [showTrans, setShowTrans] = useState(false)

    function onClickHandler(e) {
        e?.stopPropagation()
        // console.log(trans);
        playAudio(trans?.audio)
    }
    // console.log(trans);

    return (
        <div
            onClick={onClickHandler}
            onMouseLeave={_ => setShowTrans(false)}
            onMouseEnter={_ => setShowTrans(true)}
            className=' ring-1d '
        >
            {showTrans && <span className=' relative'>
                <div className='text-center  whitespace-nowrap  font-normal absolute p-2 bottom-2 bg-green-900 rounded-md '>
                    <p className=' leading-7 text-[17px] text-gray-300 '> {trans?.trans}</p>
                    <p className=' leading-4 text-[14px] text-gray-400 '> {trans?.latin}</p>
                    <p className=' leading-4 text-[14px] text-gray-400 '> {trans?.text}</p>
                    <span className='bg-green-900 p-[7px] rotate-45 ring-1d absolute -bottom-[7px] left-[30%] '></span>
                </div>
            </span>}


            <div className={wordColor(trans?.type) + ' px-[4px]   hover:ring-1 rounded-md font-semibold '}>
                <span className='flex'>
                    <p className=" text-2xl ">{trans?.trans?.replace('?', '')}</p>
                    {trans?.trans?.includes('?') && <p className='text-yellow-400 font-xl'>?</p>}
                </span>
                {/* <small className=' text-sm overflow-auto leading-3d -mt-5d font-normal'>{trans?.text}</small> */}
            </div>
        </div >
    )
}

export function TransItem({ text }) {
    const [showTrans, setShowTrans] = useState(false)

    return <div
        onMouseEnter={_ => setShowTrans(true)}
        onMouseLeave={_ => setShowTrans(false)}
        className={'p-[3px] hover:ring-1 rounded-md flex flex-col leading-5 '}>
        {showTrans && <div className='relative'>
            <div className='absolute ring-1d bottom-3 bg-violet-900 text-gray-400 p-2 rounded-md -left-1'>
                <p className=' whitespace-nowrap '>
                    {text?.trans}
                </p>
                <small>{text?.text}</small>
            </div>
        </div>}
        <p className={'font-semibold text-lg ' + wordColor(text?.type)}>{text?.text}</p>
    </div>
}