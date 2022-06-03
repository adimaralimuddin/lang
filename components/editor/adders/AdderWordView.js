

import { info } from 'autoprefixer';
import { useState } from 'react'
import { getChatsData, getLang } from '../../../appApi/toolApi';
import { EditorChatsStore } from '../../../stores/editorStore';
import { createChat, createCustumeChat } from '../editorApi';

function AdderWordView() {
    const chats = EditorChatsStore()
    const [extras, setExtras] = useState([])
    const [word, setWord] = useState()

    function onSubmitHandler(e) {
        e.preventDefault()
        if (word == '') return console.log('no word');

        const data = {
            type: 'word',
            align: 'center',
            level: chats.level,
            stage: chats.stage,
            showTrans: true,
            withTextAudio: true,
            word: word,
            ...getLang(chats.selectedLang),
            words: [...new Set([...extras, word])],
            extras: extras.filter(ex => ex != word),
        }
        createCustumeChat(data, chats)
        reset(e)
    }

    function reset(e) {
        if (e) {
            const form = e.target
            form?.word?.value = ''
            form?.words?.value = ''
            form?.word?.focus()
        }
        setExtras([])
        setWord('')
    }

    function addWord({ target }) {
        const word_ = target?.value?.trim()
        setWord(word_)
    }

    function addExtras({ target }) {
        const words = target.value?.trim()
        const extras_ = [... new Set(words.split('.'))].filter(ex => ex.trim() != '')
        setExtras(extras_)
    }

    function removeExtra(word) {
        setExtras(p => p.filter(w => w != word))
    }

    return (
        <div className='rounded-md p-1 bg-gray-900'>
            <span>
                <small>word</small>
                <small onClick={reset} className='mx-2 cursor-pointer hover:font-semibold ring-1 px-1 rounded-md'>reset</small>
            </span>
            <div className='flex flex-wrap items-center'>
                <p className='px-2 rounded-md bg-green-800 text-gray-300'>{word}</p>

                {
                    extras.map(extra => (
                        <ExtraItem word={extra} removeExtra={removeExtra} key={extra} />
                    ))
                }
            </div>
            <div className='flex'>
                <form onSubmit={onSubmitHandler} >

                    <input onInput={addWord} autoComplete='off' name='word' type="text"
                        className=' bg-gray-800 text-[17px]  rounded-full mx-2 placeholder:text-gray-500 px-2'
                    />
                    <input onInput={addExtras} autoComplete='off' name='words' type="text"
                        className=' bg-gray-800 text-[16px] flex-1  rounded-md px-2'
                        placeholder='' />
                    <button type='submit'></button>
                </form>
            </div>
        </div>
    )
}

export default AdderWordView


function ExtraItem({ word, removeExtra }) {
    return (
        <p onClick={() => removeExtra(word)}
            className='cursor-pointer m-1 px-2 rounded-md text-[16px] bg-gray-300 hover:bg-gray-400 text-gray-800  ring-1 dark:hover:bg-gray-700 dark:bg-gray-800 dark:text-gray-400'>
            {word}
        </p>
    )
}