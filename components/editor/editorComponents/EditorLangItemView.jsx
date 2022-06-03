

import { } from 'react'
import { deleteDb } from '../../../appApi/dbApi'
import { EditorStore } from '../../../stores/editorStore'

function EditorLangItemView({ data }) {
    const { select } = EditorStore()

    const onDeleteHandler = () => {
        deleteDb(data.id, 'lang')
    }

    const onSelectHandler = () => {
        select(data?.id)
    }

    return (
        <div onClick={onSelectHandler} className='flex p-1 bg-gray-300 m-1 rounded-md cursor-pointer'>
            <p>{data?.title}</p>
            {/* <button onClick={onDeleteHandler}>x</button> */}
        </div>
    )
}

export default EditorLangItemView