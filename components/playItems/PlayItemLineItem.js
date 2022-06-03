
import { useEffect, useState } from "react"
import { playAudio } from "../../appApi/toolApi"
import { wordColor } from "./PlayItemTools"

export function LineItem({ data, playInd, text, trans, setPlayInd = () => { }, languageId, }) {
    // const [done, setDone] = useState()
    // const [curTime, setCurTime] = useState(null)

    useEffect(() => {
        if (playInd == data?.ind) {
            // setDone(true)
        }

    }, [playInd])

    function playStyle(a, b) { return playInd == data?.ind ? a : b }

    function play(e) {
        e.stopPropagation()
        setPlayInd(data?.ind)
        const au = new Audio(data?.audio)
        au.play()

        const uns = setInterval(() => {
            const x = Math.round((au?.currentTime / au?.duration) * 100)
            // setCurTime(x)
        }, 100)

        au.onended = () => {
            clearInterval(uns)
            setPlayInd(null)
            // setCurTime(null)
        }
    }


    return (
        <div onClick={play}
            className={' cursor-pointer text-center hover:text-gray-100 dark:hover:text-gray-400  px-8 py-1  ' + playStyle('')}>
            <div className=' flex flex-wrap font-semiboldd text-xld items-center justify-center '>
                {
                    trans?.map(trans => (
                        <WordItem
                            trans={trans}
                            key={trans?.text + Math?.random()} />
                    ))
                }
            </div>
            <p className={'text-gray-500 text-[15px] ' + playStyle('blur-sm')}>{data?.latin}</p>
            <span className={'flex-wrap text-green-700 text-[16px] blur-smd flex items-center justify-center ' + playStyle('blur-sm', '')}>
                {
                    text?.map(t => <TransItem text={t} key={t} />)
                }
            </span>
        </div >
    )
}


function WordItem({ trans }) {
    const [showTrans, setShowTrans] = useState(false)

    function onClickHandler(e) {
        e?.stopPropagation()
        console.log(trans);
        playAudio(trans?.audio)
    }


    return (
        <div
            onClick={onClickHandler}
            onMouseLeave={_ => setShowTrans(false)}
            onMouseEnter={_ => setShowTrans(true)}
            className=' ring-1d '
        >
            {showTrans && <span className=' relative'>
                <div className='text-center whitespace-nowrap  font-normal absolute p-2 bottom-2 bg-green-900 rounded-md '>
                    <p className=' leading-7 text-[17px] text-gray-300 '> {trans?.trans}</p>
                    <p className=' leading-4 text-[14px] text-gray-400 '> {trans?.latin}</p>
                    <p className=' leading-4 text-[14px] text-gray-400 '> {trans?.text}</p>
                    <p className=' leading-4 text-[10px] text-gray-400 '> {trans?.type}</p>
                    <span className='bg-green-900 p-[7px] rotate-45 ring-1d absolute -bottom-[7px] left-[30%] '></span>
                </div>
            </span>}


            <div className={wordColor(trans?.type) + ' px-[4px]  leading-3  hover:ring-1 rounded-md font-semibold '}>
                <span className='flex'>
                    <p className=" text-xl ">{trans?.trans?.replace('?', '')}</p>
                    {trans?.trans?.includes('?') && <p className='text-yellow-400 font-xl'>?</p>}
                </span>
                <small className=' text-sm overflow-auto font-normal'>{trans?.latin}</small>
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
                <p>
                    <small>{text?.latin}</small>
                </p>
                <small>{text?.text}</small>
            </div>
        </div>}
        <p className={'font-semibold text-lg ' + wordColor(text?.type)}>{text?.text}</p>
    </div>
}