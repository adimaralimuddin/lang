import { deleteDb } from "../../appApi/dbApi";
import { useState, useRef } from 'react'
import { async } from "@firebase/util";


function ChatWordsItemView({ data, hooks, index, store }) {
    const [isPause, setIsPause] = useState(false)
    const [playInd, setPlayInd] = useState(0)
    const divRef = useRef()

    const itemsHook = {}
    function deleteHandler() {
        deleteDb(data.id, 'chats')
    }

    function play() {
        itemsHook?.current?.pause()
        itemsHook?.[0]?.play()
        store.setPlayChatInd(index)
        divRef?.current?.style.display = 'flex'
        divRef?.current?.scrollIntoView({ behavior: 'smooth' })
    }

    function stop() {
        // itemsHook?.[playInd]?.pause()
        // itemsHook?.current?.pause()
    }

    function myLogics() { return ({ play, stop, finish: true, index, pause: () => { } }) }

    hooks[index] = myLogics()

    return (
        <div ref={divRef} className="p-1 flex justify-center">
            <div className="flex-col p-2 shadow-md rounded-xl mx-auto  bg-white dark:bg-gray-800  m-1 flex flex-wrap">
                <header className="mb-">
                    <span className=" material-icons cursor-pointer hover:text-gray-500  " onClick={play}>play_arrow</span>
                    <span className=" material-icons cursor-pointer hover:text-gray-500  " onClick={stop}>stop</span>
                    <button onClick={deleteHandler} className='float-right'>x</button>
                </header>
                <section className="flex flex-wrap">
                    {data?.lines?.sort((a, b) => a.ind - b.ind)?.map(
                        word => <WordItem
                            itemsHook={itemsHook}
                            data={word}
                            playInd={playInd}
                            setPlayInd={setPlayInd}
                            key={word.text}
                        />)}
                </section>
            </div>
        </div>
    )
}

export default ChatWordsItemView

function WordItem({ data, itemsHook, playInd, setPlayInd }) {
    const [isPlaying, setIsplaying] = useState(false)


    function play() {
        setPlayInd(data.ind)
        var au = new Audio(data?.audio)
        au.play()
        setIsplaying(true)
        au.onended = playNext
        // itemsHook?.current?.pause()
        itemsHook[data?.ind] = {
            pause: () => { au.pause(); setIsplaying(false) },
            play: () => { au.play(); setIsplaying(true) }
        }
    }


    function playNext() {
        setIsplaying(false)
        itemsHook[data?.ind + 1]?.play()
    }

    itemsHook[data?.ind] = { play, isPlaying }

    const actStyle = () => isPlaying ? ' bg-gray-200 text-gray-600 dark:bg-gray-700 dark:ring-1' : ' text-gray-500'

    return (
        <div onClick={play}
            className={actStyle() + " cursor-pointer px-2 py-1 flex flex-col justify-center items-center  dark:text-gray-400 rounded-md hover:ring-1 mx-1"}>
            <p className="">{data?.latin}</p>
            <p>{data?.trans}</p>
            <p>{data?.text}</p>
        </div>
    )
}