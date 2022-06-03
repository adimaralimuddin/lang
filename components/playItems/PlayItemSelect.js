

import { useState, useEffect } from 'react'
import { deleteDb } from '../../appApi/dbApi';
import { playAudio } from '../../appApi/toolApi';
import Box from '../others/Box'
import Word from '../others/Word';

function PlayItemSelect({ data, done, isEdit }) {
    const [finish, setFinish] = useState(false)

    useEffect(() => {
        return () => {
            setFinish(false)
        }
    }, [data])

    function check(selected) {
        playAudio(selected?.audio)
        if (selected.text == word()?.text) {
            playAudio('/audio/correct1.mp3')
            done()
            setFinish(true)
        } else {
            playAudio('/audio/wrong1.mp3')
        }
    }

    const word = () => data?.lines?.find(l => l.ind == 0)

    return (
        <div className='flex flex-col max-w-md items-center p-5 mx-auto'>
            <header className='flex items-center '>
                <p className='mr-2'>Select</p>
                <Word word={word()} />
            </header>
            <section className='flex flex-wrap items-center justify-center py-2 '>
                {
                    data?.lines?.map(
                        (line, ind) =>
                            <LineItem
                                check={check}
                                data={line}
                                word={word()?.text}
                                finish={finish}
                                key={data?.text + 'playitemselect' + ind}
                            />
                    )
                }
            </section>
            {isEdit && <button onClick={_ => deleteDb(data?.id, 'chats')}>x</button>}
        </div>
    )
}

export default PlayItemSelect

function LineItem({ data, check, finish, word }) {
    // console.log(data);
    function styleFinish(a, b) { return (word == data?.text && finish) ? a : b }
    return (
        <div onClick={() => check(data)}
            className={' dark:bg-[#161F2E] cursor-pointer hover:shadow-xl hover:scale-[1.02] transition-all text-center  rounded-md m-2 p-3 h-[150px]d w-[130px] '
                + styleFinish('ring-1 ring-green-500')
            }>
            <img className='ring-1d dark:brightness-[40%] contrast-[130%]  saturate-[35%] ' src={`/image/${data?.text}.png`} alt="" />
            <p className='pt-1'>{data?.text}</p>
        </div>
    )
}