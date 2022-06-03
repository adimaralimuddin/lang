
import { useState } from 'react'
import { createChat } from '../editorApi'
import { useRouter } from 'next/router'

export default function () {

    const [words, setWords] = useState([])
    const [word, setWord] = useState()
    const [type, setType] = useState('question')
    const router = useRouter()

    function onAddWords({ target }) {
        const word = target.value?.trim()
        const words = [... new Set(word.split('.'))].filter(ex => ex.trim() != '')
        setWords(words)
    }

    async function submit(e) {
        e.preventDefault()
        if (!word || word?.trim() == '') return
        const data = {
            type,
            word,
            words: [...new Set([...words, word])],
        }
        createChat(data, router?.query)
        setWords([])
        setWord('')
        e.target?.word?.value = ''
        e.target?.words?.value = ''
        e.target?.word?.focus()
    }

    function removeWords(selectedWord) {
        setWords(words => words.filter(word => word != selectedWord))
    }

    return (
        <div className='flex flex-col bg-gray-900 rounded-md p-1 '>
            <div className='flex flex-wrap p-0'>
                <small className='cursor-pointer hover:ring-1 px-1' onClick={_ => setType(p => p == 'question' ? 'imageSelect' : 'question')}>{type}</small>
                <p className='bg-indigo-800 px-2 rounded-md text-white'>{word}</p>
                {words?.map(word => (
                    <span
                        onClick={() => removeWords(word)}
                        className='px-2 py- ml-1 cursor-pointer hover:bg-green-800 bg-green-900 rounded-md text-gray-200'
                        key={word + 'adderQuestion'}
                    >{word}</span>
                ))}
            </div>
            <form onSubmit={submit} className='flex-1 flex' >
                <input
                    onInput={e => setWord(e.target.value)}
                    autoComplete='off'
                    name='word'
                    className=" bg-gray-800 w-[100px]"
                    type="text"
                />
                <input className=" bg-gray-800 w-full"
                    onInput={onAddWords}
                    autoComplete='off'
                    name='words'
                    type="text"
                />
                <button type='submit'></button>
            </form>
        </div>
    )
}
