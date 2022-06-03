

import Box from '../others/Box'
import { useEffect, useRef, useState } from 'react'
import { playAudio } from '../../appApi/toolApi';
import { deleteDb } from '../../appApi/dbApi';
import Word from '../others/Word';
import PlayItemSentenceTable from './PlayItemSentenceTable';
import Icon from '../others/Icon';
import { wordColor } from './PlayItemTools';
import { LineItem } from './PlayItemLineItem';

export default function PlayItemChat({ data, done, isEdit, ind, img, set }) {
    console.log(data);

    const auRef = useRef()
    const dictRef = useRef()
    const [playInd, setPlayInd] = useState(null)
    const [toLibs, setToLibs] = useState()
    const [cont, setCont] = useState(false)
    const [showTable, setShowTable] = useState(false)
    const au = () => auRef?.current
    const [dictInd, setDictInd] = useState(0)
    const [curDic, setDictImg] = useState()
    const [doneDic, setDoneDic] = useState(false)

    useEffect(() => {
        if (isEdit) return
        setCont(false)
        setShowTable(false)
        setToLibs(false)
        setPlayInd(null)
        setDictInd(0)
        setDictImg(null)
        setDoneDic(true)
        play()

        // prePlay(0)
    }, [data])

    // useEffect(() => {
    //     console.log(data?.storyImage);
    //     if (data?.storyImage) {
    //         console.log('set');
    //         set(({ img: data?.storyImage }))
    //     }
    // }, [data?.storyImage])


    function prePlay(ind) {
        if (!data?.dict || data?.dict?.length == 0) return;
        console.log(data?.dict);
        console.log(dictInd);
        const dic = data?.dict?.find(d => d?.ind == dictInd)
        dictRef?.current?.src = dic?.audio
        setDictImg(dic)
        console.log(dic);
        setDictInd(p => p + 1)
        if (dictInd > data?.dict?.length - 1) {
            play()
            setDoneDic(true)
            setDictInd(0)

        }
    }

    function dictOnEnd() {
        prePlay()
    }

    function play(ind = 0) {
        if (data?.lines?.[ind]?.audio) {
            au().src = data?.lines?.[ind]?.audio
            au().play()
            setPlayInd(ind)
        } else {
            setPlayInd(null)
            done()
        }
    }

    function onPlayEndedHandler() {
        if (playInd + 1 <= data?.lines?.length - 1) {
            play(playInd + 1)
        } else {
            setPlayInd(null)
            if (data?.libsLines) {
                setCont(true)
            } else {
                done()
            }
        }
    }

    const styleAlign = (start = ' mr-auto ', end = ' ml-auto ') => data?.align == '' ? start : end

    function reset() {
        setPlayInd(null)
        setToLibs(false)
    }

    function isQuestion() {
        if (data?.lines?.[0]?.text?.[data?.lines?.[0]?.text?.length - 1] == '?') {
            return true
        }
        return false

    }

    return (
        <div className='flex flex-col ring-1d'>

            <span className=' w-full ring-1d'>
                <div className={styleAlign( ' ml-[10%] skew-y-[30deg] ', ' ml-[80%] skew-y-[-40deg] ') + ' p-6  w-[50px] dark:shadow-0 dark:bg-[#161F2E] rotate-[10deg]  '}></div>
            </span>
            <Box show='true' className={'flex z-10 -mt-8 flex-col items-center justify-center ' + styleAlign()}>
                <audio onEnded={onPlayEndedHandler} ref={auRef} ></audio>
                <audio autoPlay onEnded={dictOnEnd} ref={dictRef} ></audio>
                {showTable && <PlayItemSentenceTable dict={data?.dict} />}
                {/* <Icon onClick={_ => setShowTable(p => !p)}>table_view</Icon> */}
                {/* <p>{ind}</p> */}
                {!toLibs && < div show='true' className={'ring-1d flex flex-col items-center justify-center py-3 min-w-[200px] overflow-hiddend smin-h-[200px] p-0 ring-[2px]d ' + styleAlign()} >
                    <div className='ring-1d p-5 flex justify-center items-center'>
                        <span className='flex flex-col text-center text-green-700'>
                            <img src={`/image/dict/${curDic?.trans?.includes('this') && 'this'}.png`} alt="" />
                            <p className='text-2xl font-semibold'>{curDic?.text}</p>
                            <p className='text-[17px]'>{curDic?.trans}</p>
                        </span>
                        <img className='ring-1d' src={`/image/story/${data?.storyImage}.png`} width='70%' alt="" />
                        {(data?.lines?.[0]?.text?.[data?.lines?.length - 1] == '?' ? ' yes ' : '')}
                        <p>
                            {isQuestion() && '??????????'}
                        </p>
                    </div>
                    {
                        doneDic && data?.lines?.sort((a, b) => a?.ind - b?.ind)?.map(
                            line => (
                                <LineItem
                                    data={line}
                                    text={data?.textLines?.filter(l => l?.lineInd == line?.ind)?.sort((a, b) => a?.ind - b?.ind)}
                                    trans={data?.transLines?.filter(l => l?.lineInd == line?.ind)?.sort((a, b) => a?.ind - b?.ind)}
                                    languageId={data?.languageId}
                                    setPlayInd={setPlayInd}
                                    playInd={playInd}
                                // key={line?.text}
                                />
                            )
                        )
                    }

                    {isEdit && <div className=''>
                        <button onClick={_ => deleteDb(data?.id, 'chats')} className='bsolute dark:text-white '>x</button>
                    </div>}
                    {cont && <button className='dark:bg-[#1E2B44] mx-auto rounded-md px-3' onClick={_ => setToLibs(true)}>continue</button>}
                </div >}
                {toLibs && <LibsView play={play} done={done} reset={reset} libs={data?.libsLines} />}
            </Box>
        </div>

    )
}

// export function LineItem2({ data, playInd, text, trans, setPlayInd = () => { }, languageId, }) {
//     // const [done, setDone] = useState()
//     // const [curTime, setCurTime] = useState(null)\
//     console.log(trans);

//     useEffect(() => {
//         if (playInd == data?.ind) {
//             // setDone(true)
//         }

//     }, [playInd])

//     function playStyle(a, b) { return playInd == data?.ind ? a : b }

//     function play(e) {
//         e.stopPropagation()
//         setPlayInd(data?.ind)
//         const au = new Audio(data?.audio)
//         au.play()

//         const uns = setInterval(() => {
//             const x = Math.round((au?.currentTime / au?.duration) * 100)
//             // setCurTime(x)
//         }, 100)

//         au.onended = () => {
//             clearInterval(uns)
//             setPlayInd(null)
//             // setCurTime(null)
//         }
//     }


//     return (
//         <div onClick={play}
//             className={'ring- cursor-pointer text-center hover:text-gray-100 dark:hover:text-gray-400  px-8 py-1  ' + playStyle('')}>
//             <span className=' flex flex-wrap font-semiboldd text-xld items-center justify-center '>
//                 {
//                     trans?.map(trans => (
//                         <WordItem
//                             trans={trans}
//                             key={trans?.text + Math?.random()} />
//                     ))
//                 }
//             </span>
//             {/* <p className={'text-gray-500 text-[15px] ' + playStyle('blur-sm')}>{data?.latin}</p> */}
//             <span className={'text-green-700 text-[16px] blur-smd flex items-center justify-center ' + playStyle('blur-sm', '')}>
//                 {
//                     text?.map(t => <TransItem text={t} key={t} />)
//                 }
//             </span>
//         </div >
//     )
// }


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
                    <span className='bg-green-900 p-[7px] rotate-45 ring-1d absolute -bottom-[7px] left-[30%] '></span>
                </div>
            </span>}


            <div className={wordColor(trans?.type) + ' px-[4px] mx-[0px] ring-1d text-xl hover:ring-1 rounded-md font-semibold '}>
                <span className='flex'>
                    <p>{trans?.trans?.replace('?', '')}</p>
                    {trans?.trans?.includes('?') && <p className='text-yellow-400 font-xl'>?</p>}
                </span>
                {/* <small className='text-sm leading-3d -mt-2'>{trans?.text}</small> */}
            </div>
            {/* <small>{trans?.trans}</small> */}
        </div >
    )
}

export function LibsView({ libs, done, reset, play }) {
    const [ind, setInd] = useState(0)
    const curr = (ind_ = ind) => libs?.find(l => l?.ind == ind_)

    useEffect(() => {
        setInd(0)
        playAudio(curr()?.audio)
    }, [libs])


    function check(lib) {
        if (lib?.text == curr()?.text) {
            if (ind >= libs?.length - 1) {
                done()
                // play(0)
                setInd(0)
                reset()
            }
            setInd(ind + 1)
            playAudio('/audio/correct1.mp3')
            playAudio(curr(ind + 1)?.audio)
        } else {
            playAudio('/audio/wrong1.mp3')
        }
    }

    return (
        <Box show='true' className='mx-auto text-center'>
            <span>
                <p>Select</p>
                <Word word={curr()} />
            </span>
            <div className='flex flex-wrap p-1 items-center justify-center'>
                {
                    libs?.map(lib => (
                        <p
                            className='rounded-md px-2 cursor-pointer hover:scale-105 ring-1d m-1 dark:bg-[#1E2B44]'
                            onClick={_ => check(lib)}>{lib?.text}</p>
                    ))
                }
            </div>
        </Box>
    )
}
