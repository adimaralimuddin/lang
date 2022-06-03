

import { useRef } from 'react'
import { EditorChatsStore } from '../../../stores/editorStore'

function AdderApiView() {
    const apiRef = useRef()
    const { set } = EditorChatsStore(s => ({ set: s.set }))

    function onReplaceHandler() {
        const newApi = apiRef.current?.value
        set({ apiKey: newApi })
    }

    return (
        <div className='p-2 flex'>
            <button onClick={onReplaceHandler}>replace</button>
            <input ref={apiRef} type="text" className='ring-1 flex-1 placeholder:text-gray-600' placeholder='replace api key...' />
        </div>
    )
}

export default AdderApiView


