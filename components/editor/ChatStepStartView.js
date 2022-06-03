


import { useRef } from 'react'
import { deleteDb } from '../../appApi/dbApi';
import { focusDiv } from '../../appApi/toolApi';
import Box from '../others/Box'
import TextH2 from '../others/TextH2'
import Word from '../others/Word';
function ChatStepStartView({ data, store, index, hooks, }) {

    // console.log(data);
    const divRef = useRef()

    function remove() {
        deleteDb(data.id, 'chats')
    }

    function play() {
        console.log('start');
        store.play(index, hooks)
        focusDiv(divRef?.current)
        store.setProceed(true)
    }

    hooks[index] = { play, finish: true, stop: () => { }, pause: () => { } }

    return (
        <div ref={divRef} className='flex-col'>
            <Box show='true' className=' items-center flex-row justify-center bg-gray-100 p-5'>
                <TextH2>Step {data?.step}</TextH2>
                <p>words to learn</p>
                <div className='flex flex-wrap items-center'>{
                    data?.lines?.map(word => (
                        <Word
                            showtrans='true'
                            className='m-1 bg-white ring-1 ring-gray-200 dark:ring-0 shadow-md'
                            word={word}
                            key={word.text + data?.id}
                        />
                    ))
                }</div>
            </Box>
            <button onClick={remove}>x</button>
        </div>
    )
}

export default ChatStepStartView


function WordItem({ word }) {
    return (
        <p
            className={`
        p-1 m-1 rounded-md bg-gray-100
        
        `}
        >{word?.trans}</p>
    )
}