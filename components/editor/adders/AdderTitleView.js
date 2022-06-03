


import { arrayRemove, arrayUnion } from 'firebase/firestore';
import React from 'react'
import { updateDb } from '../../../appApi/dbApi';
import { EditorChatsStore } from '../../../stores/editorStore';
import shallow from 'zustand/shallow'

function AdderTitleView() {

    // const [main, set] = EditorChatsStore(state => [state.main, state.set], shallow)
    const chats = EditorChatsStore()

    async function onSubmitHandler(e) {
        e.preventDefault()
        const title = e.target.title
        if (title.value.trim() == '') return
        console.log(title.value);
        const id = await updateDb('main', 'main', { titles: arrayUnion(title.value) })
        console.log(chats);
        await updateDb(chats?.selectedLang[2], 'languages', {
            levels: arrayUnion(chats?.level),
            stages: arrayUnion(title?.value)
        })
        // title.value = '' 

    }

    function removeTitle(e) {
        e.preventDefault()
        var title = e.target?.title?.value
        updateDb('main', 'main', { titles: arrayRemove(title) })
    }

    return (
        <div className='flex  p-1 rounded-md'>
            <form onSubmit={onSubmitHandler} >
                <span>
                    <button>add title</button>
                    <input name='title' type="text" className='ring-1 ring-violet-900 ml-2 placeholder:text-gray-600' placeholder='add new title...' />
                </span>
            </form>
            <form onSubmit={removeTitle}>
                <button type='submit'>delete</button>
                <select name="title" id="" className='ring-1'>{
                    chats?.main?.titles?.map(title => <option value={title} key={title}>{title}</option>)
                }</select>
            </form>
        </div>
    )
}

export default AdderTitleView