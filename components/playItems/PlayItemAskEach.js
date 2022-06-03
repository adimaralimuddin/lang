
import { useState, useEffect } from 'react'
import { deleteDb } from '../../appApi/dbApi';
import { playAudio } from '../../appApi/toolApi';
import Box from '../others/Box';
import Icon from '../others/Icon';
import Word from '../others/Word';

export default function PlayItemAskEach({ data, isEdit, done, next }) {
    const [ind, setInd] = useState(0)
    const [lines, setLines] = useState()
    const [finish, setFinish] = useState(false)

    useEffect(() => {
        setLines(randomize())
        if (isEdit) return
        restart()
    }, [data])

    function select(line) {
        if (line?.trans == data?.lines[ind]?.trans) {
            const res = ind + 1
            playAudio('/audio/correct1.mp3')
            if (res >= data?.words?.length) {
                done()
                setFinish(true)
            } else {
                playAudio(data?.lines[ind + 1]?.audio)
                setInd(res)
                setLines(randomize())
            }
        } else {
            playAudio('/audio/wrong1.mp3')
        }
    }

    function randomize() {
        return data?.lines?.map(line => ({ ...line, done: false, sort1: Math.floor((Math.random() * 3) + 1), sort2: Math.floor((Math.random() * 3) + 1) }))
    }

    function styleCorrect(line, a, b) { data?.lines[ind]?.ind == line?.ind ? a : b }

    function restart() {
        setFinish(false)
        setInd(0)
        playAudio(data?.lines?.[0]?.audio)
    }
    return (
        <div className='flex items-center justify-center'>
            <Box show='true' className='min-w-[200px] min-h-[200px] p-0'>
                <header className='flex items-center ring-1d justify-between'>
                    <p className='px-5'>what is</p>
                    <span>
                        <Icon onClick={restart}>refresh</Icon>
                    </span>
                </header>
                <div className='flex justify-center items-center pt-3 px-5'>
                    <Word
                        // showtrans={finish}
                        word={data?.lines?.[ind]} />
                    {/* <h3>{data?.lines?.[ind]?.text}</h3> */}
                </div>
                {!finish && <div className='flex flex-wrap p-5 items-center justify-center'>
                    {
                        lines?.sort((a, b) => a?.sort1 - b?.sort1)?.map(line => (
                            <div onClick={_ => select(line)}
                                className={styleCorrect(line, 'bg-red-400 ') + ' dark:hover:bg-gray-700 p-1 px-2 m-1  dark:bg-[#1E2B44] dark:text-[#718B9A] cursor-pointer rounded-md min-w-[40px] text-center'} key={data?.text}>
                                <p>{line?.text}</p>
                            </div>
                        ))
                    }
                </div>}
            </Box>
            {isEdit && <button onClick={_ => deleteDb(data?.id, 'chats')}>x</button>}
        </div>
    )
}

