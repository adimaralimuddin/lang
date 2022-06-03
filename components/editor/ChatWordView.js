

import { useEffect, useRef, useState } from 'react';
import { deleteDb } from '../../appApi/dbApi';
import { focusDiv, getWord, playAudio } from '../../appApi/toolApi';
import Box from '../others/Box';
import Word from '../others/Word';
import Icon from '../others/Icon'

function ChatWordView({ data, store, hooks, index }) {
    const divRef = useRef()
    const buttonRef = useRef()
    const [playInd, setPlayInd] = useState(1)
    const [finish, setFinish] = useState(false)
    const [showButtons, setShowButtons] = useState(false)


    function play() {
        replay()
        store.play(index, hooks, divRef)
    }

    function reset() {
        divRef?.current?.style.display = 'none'
    }

    hooks[index] = { play, reset, finish, stop: () => { }, pause: () => { } }

    const word = () => getWord(data.word, data.lines)

    function remove() {
        deleteDb(data.id, 'chats')
    }

    function proceed(boolean) {
        if (boolean) {
            focusDiv(buttonRef?.current)
        } else {
            buttonRef?.current?.style.display = 'none'
        }
    }

    function replay() {
        proceed(false)
        setPlayInd(1)
        setFinish(false)
        setShowButtons(false)
        playFirst(_ => {
            proceed(true)
            // store.done()
        })
    }


    function playFirst(caller) {
        playAudio(word().audio, _ => {
            playAudio(word()?.textAudio, caller)
        })
    }

    function Next1() {
        setPlayInd(2)
        proceed(false)
        playAudio('/audio/correct1.mp3')
            setShowButtons(true)
            // store.done()

    }


    function checkTrans(word) {
        if (word.text.trim() == data.word) {
            setFinish(true)
            playAudio('/audio/correct1.mp3')
            setPlayInd(3)
            playAudio(word?.audio, _ => {
                playAudio(word?.textAudio)
                store.done()
            })
        } else {
            playAudio(word.audio)
            playAudio('/audio/wrong1.mp3')
        }
    }


    return (
        <div ref={divRef}
            className='flex flex-col items-center justify-center  ring-1d'
        >
            <Box show={(playInd == 1)} className=' min-w-[300px] min-h-[200px] justify-center items-center px-10 py-5'>
                {/* <p>New Word</p> */}
                <Word word={word()} />
                <p>{word()?.text}</p>
            </Box>

            <Box show={(playInd == 2)} className='items-center px-10 py-5 min-w-[300px] min-h-[200px]'>

                <p className='mb-3'>translate</p>
                <p>{word()?.text}</p>
                <hr />
                {showButtons && <div className='flex flex-wrap items-center justify-center'>
                    {
                        data?.lines?.map(word => (
                            <ChooseItem word={word} check={checkTrans} key={word?.ind} />
                        ))
                    }
                </div>}
            </Box>

            <Box show={(playInd == 3)} className='items-center px-10 py-5 min-w-[300px] min-h-[200px]'>
                <p className='text-green-600'>Done!</p>
                <Word word={word()} />
                <p>{word()?.text}</p>
            </Box>

            <div ref={buttonRef}
                onClick={Next1}
                className={
                    ` pb-10 pt-5 hidden  w-full max-w-xs text-2xl
                    flex-col
                    `}>
                <button className='p-3 text-white bg-green-500'>Next</button>
            </div>

            <div className='flex ml-auto'>
                <Icon onClick={replay}>replay</Icon>
                <button onClick={remove}>x</button>
            </div>
        </div >
    )
}

export default ChatWordView

function ChooseItem({ check, word, reverse }) {
    return (
        <span onClick={() => check(word)}
            className='text-center px-3 py-1 rounded-md bg-gray-200 text-gray-600 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-400 hover:shadow-md m-2 cursor-pointer'>
            {!reverse && <p className='text-xl'>{word?.trans}</p>}
            {!reverse && <p>{word?.latin}</p>}
            {reverse && <p>{word?.text}</p>}
        </span>
    )
}

function NextButton() {
    useEffect(() => {

    }, [])
    return (
        <button
            onClick={Next1}
            className={
                `p-3 bg-green-500 text-white w-full max-w-xs text-2xl
                    `}
        >Next</button>
    )
}


