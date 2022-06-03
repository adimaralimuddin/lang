

import { useEffect, useState } from 'react'
import { addDb, deleteDb, listenDb } from '../../appApi/dbApi'
import { EditorStore } from '../../stores/editorStore'
import LangItemView from './editorComponents/EditorLangItemView'



function EditorLangView() {
    const { lists } = EditorStore()

    const onAddHandler = () => {
        addDb('lang', { title: 'new' })
    }



    return (
        <div>
            <header>
                <button onClick={onAddHandler}>Add New</button>
            </header>
            <div className='flex '> {
                lists?.map(list => <LangItemView data={list} key={list?.id} />)
            } </div>
        </div>
    )
}

export default EditorLangView