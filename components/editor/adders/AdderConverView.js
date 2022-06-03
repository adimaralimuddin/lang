


import { useState, useRef } from 'react'
import { getChatsData } from '../../../appApi/toolApi'
import { EditorChatsStore } from '../../../stores/editorStore'
import { createChat } from '../editorApi'

export default function AdderConverView({ router }) {
    // const [showTrans, setShowTrans] = useState(true)

    const inputARef = useRef()
    const inputBRef = useRef()

    function onAddHandler(e, align) {
        e.preventDefault()
        var text = e.target?.english?.value
        var type = 'chat'

        if (!text) return
        if (text[0] == '@') {
            type = 'word'; text[0]
            text = text.substring(1)
        }

        const words = text?.split('.')

        const data = {
            type,
            words,
            align,
            // showTrans
        }
        createChat(data, router.query)
        e.target?.english?.value = ''
        align == 'end' ? inputARef?.current?.focus() : inputBRef?.current?.focus()
    }

    // function toggleWithTextAudio() {
    //     chats.toggle('withTextAudio')
    // }

    function toggleShowTrans() {
        // setShowTrans(p => !p)
    }

    return (
        <div className=' rounded-md mb-1 flex bg-gray-900 items-center'>

            {/* <div className='flex ring-1 ring-red-600 items-center'> */}
            <form onSubmit={e => onAddHandler(e, 'start')}
                className='m-0 p-0 flex-1 bg-gray-800 ring-1 ring-gray-700 rounded-2xl flex'>
                <input
                    className='flex-1  text-[16px]'
                    ref={inputARef} name='english' type="text" autoComplete='off' />
            </form>
            <form onSubmit={e => onAddHandler(e, 'end')}
                className='m-1 flex-1 bg-gray-800 ring-1 ring-gray-700 rounded-2xl flex'>
                <input
                    className='flex-1 text-[16px]'
                    ref={inputBRef} name='english' type="text" autoComplete='off' />
            </form>
            {/* </div> */}
            <div>
                {/* <button onClick={toggleWithTextAudio}>
                    <small>
                        With_Text_Audio
                        {chats?.withTextAudio
                            ? <span className='text-green-500 font-semibold'> ON</span>
                            : <span className='font-semibold'> OFF</span>}
                    </small>
                </button> */}
                {/* <button onClick={toggleShowTrans}>
                    <small>
                        Show_trans
                        {showTrans
                            ? <span className='text-green-500 font-semibold'> ON</span>
                            : <span className='font-semibold'> OFF</span>}
                    </small>
                </button> */}

            </div>
        </div>
    )
}