
import { useState, useEffect, useRef } from 'react'
import { deleteDb } from '../../appApi/dbApi'
import { playAudio } from '../../appApi/toolApi'

const state = { text: '', latin: '' }
export default function ChatCheckPointView({ data, hooks, index, store }) {
    const [lists, setLists] = useState(data?.lines)
    const [sLatin, setSLatin] = useState()
    const [sText, setSText] = useState()
    const [showTrans, setShowTrans] = useState(false)
    const [finish, setFinish] = useState(false)
    const divRef = useRef()

    useEffect(() => {
        setLists(randomize())
    }, [])


    function createSorter() { return Math.floor((Math.random() * 3) + 1); }

    function check() {
        const result = lists?.map(list => {
            if (list.text == state.text && list.latin == state.latin) {
                new Audio('/audio/word_pick_correct.wav').play()
                list.done = true
                return list
            }
            return list
        })
        setLists(result)
        if (!result?.find(p => p.done == false)) {
            setFinish(true)
            const na = new Audio()
            na.src = '/audio/success2.mp3'
            na.play()
            store.done()
        } else {
            // playAudio('/audio/text_drop.mp3')
        }
    }

    function randomize() {
        return [... new Set(data?.lines)].map(line => ({
            ...line, done: false,
            sorter1: createSorter(),
            sorter2: createSorter(),
        }))
    }

    function restart() {
        setLists(randomize())
        state.text = ''
        state.latin = ''
        setSLatin(null)
        setSText(null)
    }

    function remove() {
        deleteDb(data?.id, 'chats')
    }

    function play() {
        store.play(index, hooks, divRef)
    }

    function reset() {
        restart()
        divRef.current.style.display = 'none'
    }

    function myLogics() { return ({ play, index, finish, reset, stop: () => { } }) }

    hooks[index] = myLogics()

    return (
        <div ref={divRef} className="flex items-center justify-center pb-10">
            <div className=" bg-white p-5  shadow-md dark:bg-gray-800 rounded-xl flex flex-col">
                <p className='text-center'>Pair Each Word</p>
                <header className="">
                    <span className=" material-icons cursor-pointer hover:text-gray-500  " onClick={restart}>replay</span>
                    {/* <span className=" ml-2 material-icons cursor-pointer hover:text-gray-500  " onClick={() => setShowTrans(p => !p)}>translate</span> */}
                    <button onClick={remove} className='float-right'>x</button>
                </header>
                <div className="text-center flex flex-wrap  items-center justify-center content-center">
                    {
                        lists && [...lists]?.sort((a, b) => a.sorter1 - b.sorter1)?.map(
                            (line, ind) => <LatinItem
                                data={line?.latin}
                                trans={line?.trans}
                                audio={line.audio}
                                showTrans={showTrans}
                                done={line?.done}
                                setSLatin={setSLatin}
                                sLatin={sLatin}
                                check={check}
                                state={state}
                                key={line?.latin + ind}
                            />
                        )
                    }
                </div>
                <hr />
                <div className="flex flex-wrap  rounded-md items-center justify-center content-center">
                    {
                        lists && [...lists]?.sort((a, b) => a.sorter2 - b.sorter2)?.map(
                            (line, ind) => <TextItem
                                data={line?.text}
                                audio={line.audio}
                                done={line?.done}
                                key={line?.text + ind}
                                setSText={setSText}
                                sText={sText}
                                check={check}
                                state={state}
                            />
                        )
                    }
                </div>
            </div>
        </div>
    )
}

function TextItem({ data, sText, setSText, check, state, done, audio }) {

    function select() {
        if (done) return
        state.text = data
        check(undefined, sText)
        setSText(data)

    }

    const style = () => (sText == data && !done) ? ' bg-gray-200  dark:bg-[#006981] text-gray-700' : 'bg-gray-100'
    const difStyle = () => done ?
        'cursor-pointer py-1 px-2 rounded-md m-2 bg-gray-200 shadow-inner dark:bg-gray-900 text-gray-400 dark:text-gray-400'
        : 'cursor-pointer dark:bg-gray-700 dark:text-gray-400 py-2 px-3 rounded-md m-1  '
    // const style = () => (sText == data && !done) ? ' bg-gray-200 ring-1 ring-gray-300 dark:bg-gray-700 ' : ' bg-gray-100 text-gray-400 '
    // const difStyle = () => done ?
    // ' px-3 py-2 rounded-md m-1 shadow-inner bg-gray-200 '
    //     // " shadow-inner cursor-pointer px-3 py-2 bg-gray-600 dark:bg-gray-900 rounded-md m-2 text-gray-400 "
    //     : " cursor-pointer px-3 py-2 rounded-md m-2 "
    return (
        <p
            onClick={select}
            className={difStyle() + style()}>

            {data}
        </p>
    )
}

function LatinItem({ data, setSLatin, sLatin, showTrans, check, state, done, audio, trans }) {

    function select() {
        new Audio(audio).play()

        if (done) return
        state.latin = data
        check(sLatin, undefined)
        setSLatin(data)
    }

    const style = () => (sLatin == data && !done) ? ' bg-[#26CCA4]  dark:bg-[#006981] text-white' : 'bg-gray-100'
    const difStyle = () => done ?
        'cursor-pointer py-1 px-2 rounded-md m-2 bg-gray-200 shadow-inner dark:bg-gray-900 text-gray-400 dark:text-gray-400'
        : 'cursor-pointer dark:bg-gray-700 dark:text-gray-400 py-2 px-3 rounded-md m-1  '
    return (
        <p
            onClick={select}
            className={difStyle() + style()}
        >
            <p>{trans}</p>
            <p className='text-[16px]'>{data}</p>
        </p>
    )
}


