

import { useState, useRef, useEffect } from 'react'
import { deleteDb } from '../../appApi/dbApi'
import { playAudio } from '../../appApi/toolApi'
import Box from '../others/Box'
import Icon from '../others/Icon'
import Word from '../others/Word'

function ChatQuestionItemView({ data, index, hooks,store }) {
    const [finish, setFinish] = useState(false)
    const divRef = useRef()

    useEffect(() => {
        if (store.isRestarted) {
            setFinish(false)
            divRef?.current?.style.display = 'none'
        }
    }, [store.isRestarted])

    function play() {
        store.play(index, hooks, divRef)
        playAudio('/audio/what_is.mp3', _ => {
            playAudio(word().audio)
        })
    }

    function focus() {
        divRef.current?.style.display = 'flex'
        divRef?.current?.scrollIntoView({ behavior: "smooth", block: 'end' })
    }

    function word() {
        return data?.lines?.find(p => p?.text == data?.word)
    }

    function check(line) {
        playAudio(line.audio)
        if (line.text == data.word) {
            setFinish(true)
            playAudio('/audio/success2.mp3')
            store.done()
        } else {
            playAudio('/audio/wrong1.mp3')
        }
    }

    function remove() {
        deleteDb(data.id, 'chats')
    }
    function shake() {
        playAudio('/audio/shake.mp3')
    }
    function reset() {
        divRef.current.style.display = 'none'
    }

    hooks[index] = { finish, play, reset, stop: () => { }, pause: () => { }, index, shake, focus }

    return (
        <div ref={divRef} className='flex overflow-hidden flex-col items-center  '>
            <Box show={finish} className='p-5 min-h-[200px] w-fulls max-w-xs justify-center items-center'>
                <Word word={word()} active={index == store.playChatInd} />
                <p className=' text-gray-600 dark:text-gray-400 text-xl underline-offset-2'>{word()?.text}</p>
                <Icon onClick={() => setFinish(false)}>replay</Icon>
            </Box>
            <Box show={!finish} className={`min-h-[200px] items-center overflow-hidden min-w-[200px] p-5`}>

                <p>What is </p>
                <header className='pt-5 px-5 flex  justify-center '>
                    <Word word={word()} active={index == store.playChatInd} />
                </header>
                <ul className='flex items-center justify-center flex-wrap w-full mt-2 p-1 ring-1j'>
                    {
                        data?.lines?.map(
                            line => <ChooseItem
                                line={line}
                                check={check}
                                key={line.text}
                            />
                        )
                    }
                </ul>
            </Box>
            <div className='flex p-2'>
                <button onClick={remove}>x</button>
            </div>
        </div>
    )
}

export default ChatQuestionItemView


function ChooseItem({ line, check }) {
    return (
        <li
            onClick={() => check(line)}
            className={` 

            text-xl px-3 p-1   m-1 cursor-pointer
            active:bg-gray-300
            bg-[#F3F3F3] rounded-md 
            dark:ring-gray-600 dark:hover:bg-gray-600
            dark:bg-gray-700
             hover:bg-gray-200`}>
            {line.text}
        </li>
    )
}

