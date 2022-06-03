
import { useState, useRef, useEffect } from "react"
import { deleteDb } from "../../appApi/dbApi"
import { focusDiv, playAudio } from "../../appApi/toolApi"
import LineItem from "./ChatLineItemView"

export function ChatItem({ data,index, store, hooks }) {

    // console.log(data);
    const audioRef = useRef()
    const [showOptions, setShowOptions] = useState(false)
    const [au, setAu] = useState(data?.lines?.[0]?.audio)
    const [playInd, setPlayInd] = useState(0)
    const [isPlaying, setIsplaying] = useState(false)
    const [playState, setPlayState] = useState(false)
    const [isRestart, setIsRestart] = useState(false)
    const divRef = useRef()



    function reset() {
        stop()
        divRef?.current?.style?.display = 'none'
    }

    function stop() {
        setPlayState(false)
        setIsplaying(false)
        audioRef.current.pause()
        audioRef?.current?.currentTime = 0
    }

    function pause() {
        hooks[hooks?.current]?.stop()
        hooks?.current = index
        if (playState) {
            setPlayState(false)
            return audioRef.current.pause()
        }
        audioRef.current.play()
        setPlayState(true)
        audioRef.current?.autoplay = true
    }

    function playParag(audio, ind) {
        setAu(audio)
        setPlayInd(ind)
        setPlayState(true)
        audioRef.current?.play()
        audioRef?.current?.currentTime = 0
    }


    function play() {
        setAu(data?.lines?.[0]?.audio)
        store.play(index, hooks, divRef)
        setPlayInd(0)
        setPlayState(true)
        audioRef.current?.play()
        audioRef?.current?.currentTime = 0
        audioRef.current?.autoplay = true
        hooks.current = index
    }


    function onPlayDone() {
        if (data?.lines[playInd]?.textAudio) {
            playAudio(data?.lines[playInd]?.textAudio, _ => {
                playNext()
            })
        } else {
            playNext()
        }
    }

    function playNext() {
        if (playInd >= data?.lines?.length - 1) {
            if (store.isPlayAll) {
                hooks[index + 1]?.play()
            }
            setPlayState(false)
            setIsplaying(false)
            store.done()
            console.log('done');
            return
        }
        setAu(data?.lines[playInd + 1]?.audio)
        setPlayInd(p => p + 1)
    }

    function onDeleteHandler() {
        deleteDb(data.id, 'chats')
    }

    const style = () => data?.align == 'end' ? ' justify-end ' : ' '
    const stylePlaying = () => isPlaying ? ' bg-white shadow-lg dark:bg-gray-800 dark:ring-1' : 'bg-white dark:bg-gray-800 '

    function myLogics() { return ({ play, stop, pause, reset, index, finish: true }) }

    hooks[index] = myLogics()
    // console.log(data);

    const imageStyle = () => data?.align == 'end' ? ' ml-0 -mr-5 ' : ''

    const endStyle = () => data?.align == 'end' ? {
        flexDirection: 'row-reverse',
        justifyContents: 'end'
    } : {}

    return (
        <div ref={divRef} className={' flex pb-5 ' + style()}  >
            <audio
                ref={audioRef}
                onEnded={onPlayDone}
                src={au}
                onPlay={() => setIsplaying(true)}
            />
            <div className=" max-w-[80%] min-w-[40%] ">

                <div
                    className={stylePlaying() + `
                     items-centerd  ring-1 ring-[#C7DDD8] dark:ring-0
                     shadow-[0px_4px_10px_rgba(0,0,0,0.08)] 
                     p-5  min-w-[150px]  hover:ring-1 
                     rounded-2xl flex flex-col`}>
                    {
                        data.lines?.sort((a, b) => a.ind - b.ind)?.map(
                            line => <LineItem
                                data={line}
                                playInd={playInd}
                                isPlaying={isPlaying}
                                lang={data.lang}
                                playParag={playParag}
                                langCode={data?.langCode}
                                showScript={store.showScript}
                                showTrans={data?.showTrans}
                                align={data?.align}
                                // langText={data?.langText}
                                key={line.ind}
                            />)
                    }
                </div>
                <div className={data.align == 'start' ? "p-2 flex items-center justify-between " : ''}>
                    <div style={endStyle()} className="flex items-center">
                        <button onClick={onDeleteHandler}>x</button>
                        <img className={" w-20 aspect-square -mt-5 -ml-5 r rounded-full  " + imageStyle()}
                            src={data?.align == 'start' ? '/woman1.png' : '/man1.png'}
                            alt={data?.align == 'start' ? 'woman' : 'male'} />
                        <span onClick={play} className="material-icons cursor-pointer">
                            replay
                        </span>
                        <span onClick={stop} className="material-icons cursor-pointer">
                            {playState && 'stop'}
                        </span>
                    </div>
                    <div className="float-right">
                        {/* {chats?.isEditing && <span onClick={() => setShowOptions(p => !p)} className="material-icons cursor-pointer">
                            more_horiz
                        </span>} */}
                        {showOptions && <span className='relative'>
                            <div className='absolute top-8 ring-1 right-0 p-2 rounded-md flex flex-col bg-gray-800'>
                                <button>edit</button>
                                <button onClick={onDeleteHandler}>delete</button>
                            </div>
                        </span>}
                    </div>
                </div>

            </div>

        </div>
    )
}