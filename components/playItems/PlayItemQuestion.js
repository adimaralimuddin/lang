

import { useState, useEffect } from 'react'
import { deleteDb } from '../../appApi/dbApi';
import { playAudio } from '../../appApi/toolApi';
import Box from '../others/Box';
import Icon from '../others/Icon';
import Word from '../others/Word';

export default function PlayItemQuestion({ data, isEdit, done, next }) {
    const [selected, setSelected] = useState()
    const [finish, setFinish] = useState(false)
    const [lifes, setLifes] = useState(data?.words?.length - 1)


    useEffect(() => {
        if (isEdit) return
        setFinish(false)
        // setLifes(data?.words?.length)
        // play()
    }, [data])


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


    // function play() {
    //     playAudio('/audio/what_is.mp3', _ => playAudio(word()?.audio))
    // }

    function word() { return data?.lines?.find(l => l?.ind == 0) }

    function check(line) {
        setSelected(line)
        if (line?.text == word()?.text) {
            done()
            setFinish(true)
            setSelected(null)
            playAudio('/audio/correct1.mp3')
            playAudio(line?.audio)
        } else {
            playAudio('/audio/wrong1.mp3')
            checkLife()
        }
    }

    return (
        <div className='flex flex-col items-center justify-center'>
            {!finish && <Box show='true' className='p-5 px-5 min-w-[200px]'>
                <header className='flex items-center justify-between mb-5'>
                    <h3>Qestion</h3>
                    <span className='flex items-center'>
                        <small> {lifes}</small>
                        <Icon className='m-0'>favorite</Icon>
                    </span>
                </header>
                <span className='items-center flex justify-center'>
                    <Word oposite='false' word={word()} />
                </span>
                <div className='flex  py-3 flex-wrap items-center justify-center'>
                    {data?.lines?.map(
                        line => <SelectItem selected={selected} check={check} line={line} />
                    )}
                </div>
                {isEdit && <div className='relative'>
                    <button onClick={_ => deleteDb(data?.id, 'chats')} className='absolute'>x</button>
                </div>}
            </Box>}
            {finish && <Box show='true' className='p-6 min-w-[200px] min-h-[200px] items-center justify-center'>
                <Word word={word()} />
                <p className='mt-5'>{word()?.text}</p>
                {isEdit && <p onClick={_ => setFinish(false)}>restart</p>}

            </Box>}

        </div>
    )
}

function SelectItem({ line, check, selected }) {
    // console.log(line);

    function check_() {
        check(line)
    }

    function styleSelected(a, b) { return selected?.text == line?.text ? a : b }

    return (
        <div onClick={check_}
            className={styleSelected(' flex-1 bg-sky-700 text-white dark:bg-sky-900 dark:text-gray-200') + ' min-w-[40px] text-center ring-1d ring-gray-200 p-2 rounded-md m-1 bg-gray-100 dark:bg-[#1E2B44] hover:shadow-md cursor-pointer '}>
            <p>{line?.text}</p>
        </div >
    )
}