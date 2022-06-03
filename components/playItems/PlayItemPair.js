

import { useState, useEffect } from 'react'
import { deleteDb } from '../../appApi/dbApi';
import { playAudio } from '../../appApi/toolApi';
import Box from '../others/Box'
import Icon from '../others/Icon';

function PlayItemPair({ data, isEdit, done, next }) {
    // console.log(data);
    const [lines, setLines] = useState(randomize())
    const [trans, setTrans] = useState()
    const [text, setText] = useState()
    const [lifes, setLifes] = useState(data?.words?.length - 1)

    useEffect(() => {
        restart()
    }, [data])

    function randomize() {
        return data?.lines?.map(line => ({ ...line, done: false, sort1: Math.floor((Math.random() * 3) + 1), sort2: Math.floor((Math.random() * 3) + 1) }))
    }

    function restart() {
        clearSelect()
        setLifes(data?.words?.length - 1)
        setLines(randomize())
    }

    function clearSelect() {
        setTrans(null)
        setText(null)
    }

    function checkLife(num = -1) {
        let res = lifes + num

        if (res >= data?.words?.length - 1) {
            res = data?.words?.length - 1
        }
        if (res < 0) {
            res = 0
        }
        setLifes(res)
        if (res == 0) {
            playAudio('/audio/wrong1.mp3', _ => {
                next?.(-1)
            })
        }

    }

    function check(selected, pair) {
        if (selected?.text == pair?.text) {
            playAudio('/audio/correct1.mp3')
            checkLife(1)
            clearSelect()
        } else {
            if (pair) {
                checkLife()
                clearSelect()
                playAudio('/audio/wrong1.mp3')
            }
        }
        const res = lines?.map(line => {
            if (line?.ind == pair?.ind && selected?.ind == pair?.ind) {
                line.done = true
            }
            return line
        })
        setLines(res)

        if (!res?.find(p => p.done == false)) {
            done()
        }
    }



    return (
        <div>
            <Box show='true' className=' text-center'>
                <header className='pb-2 ring-1d flex justify-between'>
                    <h2 className='px-5'>Pair each words</h2>
                    <span className='flex'>
                        <span className='flex items-center'>
                            <small> {lifes}</small>
                            <Icon className='m-0'>favorite</Icon>
                        </span>
                        <Icon className='m-0' onClick={restart} >refresh</Icon>
                    </span>

                </header>
                <div className='flex flex-wrap items-center justify-center'>
                    {
                        lines?.sort((a, b) => a.sort2 - b.sort2)?.map(line => <TransItem check={check} setLines={setLines} data={line} text={text} selected={trans} set={setTrans} key={'playItemPair' + line?.text} />)
                    }
                </div>
                <div className='h-1 dark:bg-gray-700 max-w-xs w-full mx-auto my-1 mb-2'></div>
                <div className='flex flex-wrap items-center justify-center'>
                    {
                        lines?.sort((a, b) => a.sort1 - b.sort1)?.map(line => <TextItem check={check} setLines={setLines} data={line} trans={trans} selected={text} set={setText} key={'playItemPair' + line?.text} />)
                    }
                </div>
                {isEdit && <button onClick={_ => deleteDb(data?.id, 'chats')}>x</button>}
            </Box>
        </div>
    )
}

export default PlayItemPair

function TransItem({ data, set, selected, text, setLines, check }) {

    if (data?.done) {
        return <div className={' min-w-[35px] ring-1 ring-gray-200 dark:bg-gray-900 dark:ring-0 rounded-md px-2 m-1 py-1 cursor-pointer bg-gray-200 '
        }>
            <p className=' text-xl text-gray-600 dark:text-gray-500'>{data?.trans}</p>
            <p className=' dark:text-gray-600 text-gray-400 text-[16px]'>{data?.latin}</p>
        </div >
    }

    function onClick() {
        playAudio(data?.audio)
        set(data)
        check(data, text)
    }

    function styleSelect(a, b) { return selected?.text == data?.text ? a : b }
    return (
        <div onClick={onClick}
            className={'dark:bg-[#1E2B44] ring-1 min-w-[35px] dark:ring-0 ring-gray-200d rounded-md px-2 m-1 py-1 cursor-pointer ' + styleSelect(' bg-sky-500 text-white dark:bg-sky-900 dark:text-gray-300')
            }>
            <p className='text-xl'>{data?.trans}</p>
            {/* <p className={styleSelect('text-gray-200 ') + '  text-gray-500'}>{data?.latin}</p> */}
        </div >
    )
}

function TextItem({ data, set, selected, trans, setLines, check }) {

    if (data?.done) {
        return <div className={'ring-1 min-w-[35px] ring-gray-200 dark:ring-0 dark:bg-gray-900 dark:shadow-lg rounded-md px-2 m-1 py-1  cursor-pointer bg-gray-200 text-gray-400'}>
            <p>{data?.text}</p>
        </div>
    }

    function onClick() {
        set(data)
        check(data, trans)
    }

    function styleSelect(a, b) { return selected?.text == data?.text ? a : b }

    return (
        <div onClick={onClick} className={' dark:bg-[#1E2B44] min-w-[35px] ring-1 dark:ring-0 ring-gray-200 rounded-md px-2 m-1 py-1 text-[16px]  cursor-pointer ' + styleSelect(' bg-sky-500 text-white dark:bg-sky-900 dark:text-gray-300 ')}>
            <p>{data?.text}</p>
        </div>
    )

}
