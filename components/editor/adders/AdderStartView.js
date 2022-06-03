import { useState } from "react"
import { EditorChatsStore } from "../../../stores/editorStore"
import { createChat } from "../editorApi"
import { useRouter } from 'next/router'




function AdderStartView() {
    const [words, setWords] = useState([])
    const router = useRouter()
    const [type, setType] = useState('askEach')

    function addWords({ target }) {
        const word = target?.value?.trim()
        const words = [... new Set(word.split('.'))].filter(ex => ex.trim() != '')
        setWords(words)
    }

    function remove(word) {
        setWords(p => p.filter(p_ => p_ != word))
    }

    async function onSubmitHandler(e) {
        e.preventDefault()
        const data = {
            type,
            align: 'start',
            words,
        }

        createChat(data, router?.query)
        e.target?.words?.value = ''
        e.target?.words?.focus()
        setWords([])
    }



    return (
        <div className="my-1 p-1 flex items-center rounded-md bg-gray-900 ">
            <small className="hover:ring-1 px-2 cursor-pointer rounded-md" onClick={_ => setType(p => p == 'pair' ? 'askEach' : 'pair')}>{type}</small>
            <div className="flex flex-wrap max-h-40 overflow-y-scroll">{
                words?.map(word => (
                    <p
                        onClick={() => remove(word)}
                        className="bg-violet-900 text-gray-400 p-1 px-2 hover:bg-violet-800 cursor-pointer rounded-md m-1"
                        key={word + 'adderStart'}
                    >{word}</p>
                ))
            }</div>
            <div className="flex items-center">
                <form onSubmit={onSubmitHandler} className='flex-1 flex'>
                    <input
                        onInput={addWords}
                        autoComplete='off'
                        placeholder="press enter to add..."
                        className='bg-gray-800 placeholder:text-gray-600  ml-1 flex-1'
                        name='words'
                        type="text"
                    />
                    <button type="submit"></button>
                </form>
            </div>
        </div >
    )
}

export default AdderStartView