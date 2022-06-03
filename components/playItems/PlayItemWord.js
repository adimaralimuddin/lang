import { useEffect, useState, useRef } from 'react'
import { deleteDb } from '../../appApi/dbApi'
import { playAudio } from '../../appApi/toolApi'
import Box from '../others/Box'
import { LineItem } from './PlayItemChat'

export default function PlayItemWord({ data, done, isEdit }) {
    const [finish, setFinish] = useState(true)
    const [ind, setInd] = useState(0)
    const [cont, setCont] = useState(false)
    const au = useRef()

    useEffect(() => {
        if (isEdit) return
        setFinish(false)
        setInd(0)
        play(0)
    }, [data])

    function play(ind_) {
        const current = data?.lines?.find(l => l?.ind == ind_)
        au?.current?.src = current?.audio
        au?.current?.play()
        setCont(false)
        checkFinish(ind_)
    }

    function current() {
        return data?.lines?.find(l => l?.ind == ind)
    }

    function checkFinish(ind_) {
        if (ind_ >= data?.lines?.length) {
            setFinish(true)
            setInd(0)
        }
    }

    function onAudioFinish() {
        if (data?.lines?.length == 1) {
            return done()
        }
        setCont(true)
    }

    function procceed() {
        play(ind + 1)
        setInd(ind + 1)
    }

    function isFinish(a, b) { return finish ? a : b }

    return (
        <div className='flex flex-col items-center justify-center'>
            <audio ref={au} src={data?.lines?.find(p => p?.ind == 0)?.audio} onEnded={onAudioFinish}></audio>
            {!finish && <Box show='true' className=' dark:bg-none  mx-auto min-w-[200px] cursor-pointer py-10 flex-col items-center text-center justify-center min-h-[200px]'>
                <div>
                    <h3 className='mb-10'>Listen!</h3>
                    <LineItem
                        data={current()}
                        dict={data?.dict}
                        languageId={data?.languageId}
                        // setPlayInd={setPlayInd}
                        // playInd={playInd}
                        key={'playItemChat' + current()?.text}
                    />

                    {/* <h2 className='text-[#24966D] text-2xl font-semibold'>{current()?.trans}</h2> */}
                    {/* <p className={isFinish(' blur-0 ', ' blur-smd ') + 'text-gray-500 text-[18px] '}>{current()?.latin}</p> */}
                    {/* <p className={'' + isFinish(' blur-0 ', 'blur-smd')}>{current()?.text}</p> */}
                </div>
                <div className='h-[50px] ring-1d pt-7'>
                    {cont && <button className=' bg-[#0d311a] text-gray-400 text-2xl mt-5d px-5 py-2 rounded-xl ' onClick={procceed}>Continue</button>}
                </div>
                {isEdit && < span >
                    <small onClick={_ => deleteDb(data?.id, 'chats')} className='cursor-poiner hover:ring-1 rounded-md p-2'>x</small>
                </span>}
            </Box >}
            {
                finish && <WordQuiz lines={data?.lines} done={done} play={play} />
            }

            {isEdit && <span>
                <button onClick={_ => deleteDb(data?.id, 'chats')} >x</button>
            </span>}
        </div>
    )
}

function WordQuiz({ lines, done, play }) {
    const [ind, setInd] = useState(0)
    const [au, setAu] = useState(null)
    const [finish, setFinish] = useState(false)
    const current = (ind) => lines?.find(l => l?.ind == ind)

    useEffect(() => {
        setInd(0)
        setFinish(false)
    }, [])

    function check(line) {

        if (line?.text == current(ind)?.text) {
            playAudio('/audio/correct1.mp3')
            playAudio(line?.audio, _ => {
                playAudio('/audio/restart1.mp3')
                setInd(ind + 1)
                checkDone()
            })
        } else {
            if (!finish) {
                playAudio('/audio/wrong1.mp3')
            }
        }
        // setAu(line?.audio)
    }

    function checkDone() {
        if (ind >= lines?.length - 1) {
            done()
            setFinish(true)
            return true
        }
    }


    return (
        <div show='true' className='p-6'>
            <div className='text-center pb-5 dark:text-gray-500 font-bold'>
                {!finish ? <h2>Select</h2> : <h2>New Words</h2>}
                <h3 className='text-xld'>{current(ind)?.text}</h3>
                <audio autoPlay src={au} ></audio>
            </div>
            <div className='flex flex-wrap items-center justify-center'>
                {
                    lines?.map(line => (
                        <span
                            onClick={_ => check(line)}
                            className={'m-[5px] p-3 rounded-md dark:bg-[#161F2E] dark:hover:bg-gray-800 min-w-[30px] text-center cursor-pointer '}
                            key={line?.text}>
                            {finish && <p className='text-[18px]'>{line?.text}</p>}
                            <p className='font-semibold text-xl dark:text-[#6F7387]'>{line?.trans}</p>
                            {<p className='text-[16px] dark:text-gray-500'>{line?.latin}</p>}
                        </span>
                    ))
                }
            </div>
        </div>
    )
}