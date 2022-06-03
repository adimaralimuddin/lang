
import { useEffect } from 'react'
import { addDb, deleteDb, listenDb } from '../../../appApi/dbApi'
import { EditorConversStore } from '../../../stores/editorStore'

function EditorConversView() {
    const myStore = EditorConversStore()

    useEffect(() => {
        listenDb('convers', data => myStore.set({ lists: data }))
    }, [])

    return (
        <div className='p-2 m-2 bg-gray-600 rounded-lg max-w-[200px]'>
            <p>conversation</p>
            <section>{
                myStore?.lists?.map(
                    list => <ConverItem
                        myStore={myStore}
                        data={list}
                        key={list?.id}
                    />
                )
            }</section>
            <Adder myStore={myStore} />
        </div>
    )
}

export default EditorConversView

function ConverItem({ data, myStore }) {

    function onDeleteHandler() {
        deleteDb(data?.id, 'convers')
    }

    function onSelectHandler() {
        myStore.set({ selected: data?.id })
    }

    return (
        <div onClick={onSelectHandler} className='p-1 flex hover:ring-1 bg-gray-500 cursor-pointer rounded-md my-2'>
            <p className='flex-1'>{data?.title}</p>
            <button onClick={onDeleteHandler}>x</button>
        </div>
    )
}

function Adder({ myStore }) {

    async function onAddHandler(e) {
        e.preventDefault()
        const title = e.target?.title?.value
        await addDb('convers', { title })
        e.target?.title?.value = ''
    }

    return (
        <div>
            <form onSubmit={onAddHandler} className='flex'>
                <input type="text" name='title' />
                <button type='submit'>add</button>
            </form>
        </div >
    )
}