


import { useState } from 'react'
import { EditorChatsStore } from '../../../stores/editorStore'
import { createChat } from '../editorApi'

function AdderStepStartView() {
    const [words, setWords] = useState([])
    const chats = EditorChatsStore()

    function submit(e) {
        e.preventDefault()
        const form = e.target
        const data = {
            type: 'stepStart',
            words,
            step: form?.step?.value?.trim()
        }
        // console.log(data);
        createChat(data, chats)
    }

    function handleWords({ target }) {
        setWords(target.value.split('.').filter(p => p.trim() !== ''))
    }

    function removeWord(word) {
        setWords(p => p.filter(p_ => p_ != word))
    }

    return (
        <div className='bg-gray-900 p-1 m-1'>
            <small>step start</small>
            <form onSubmit={submit} className='flex my-1'>
                <span >
                    <label htmlFor="step">step</label>
                    <input name='step' type="number" max='5' min='1'
                        className='w-[50px] p-1 rounded-md bg-gray-800' />
                </span>
                <span className='flex-1 flex items-center'>
                    <label htmlFor="words">words</label>
                    <input
                        onInput={handleWords}
                        autoComplete='off'
                        name='words' type="text"
                        className='p-1 flex-1 rounded-md bg-gray-800' />
                </span>
                <button type='submit'>submit</button>
            </form>
            <div className='flex flex-wrap'>{
                words?.map(word => (
                    <p
                        onClick={() => removeWord(word)}
                        className='p-1 mx-1 rounded-md cursor-pointer bg-green-900 text-gray-400'
                        key={word + 'adderStep'}
                    >{word}</p>
                ))
            }</div>
        </div>
    )
}

export default AdderStepStartView