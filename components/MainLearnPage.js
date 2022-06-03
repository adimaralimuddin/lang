

import { useEffect } from 'react'
import create from 'zustand'
import Link from 'next/link'
import { snapToObject, toLearnUrl } from '../appApi/toolApi'
import { useRouter } from 'next/router'
import PlayItemWord from './playItems/PlayItemWord'
import PlayItemFinish from './playItems/PlayItemFinish'
import PlayItemChat from './playItems/PlayItemChat'
import PlayItemSelect from './playItems/PlayItemSelect'
import PlayItemMatch from './playItems/PlayItemMatch'
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore'
import { db } from '../firebaseConfig'
import PlayItemQuestion from './playItems/PlayItemQuestion'
import PlayItemPair from './playItems/PlayItemPair'
import Icon from './others/Icon'
import PlayItemAskEach from './playItems/PlayItemAskEach'
import PlayItemTprs from './playItems/PlayItemTprs'


const store_ = create(set => ({
    // data:[],
    playInd: 0,
    ind: 0,
    start: false,
    // current: sampData?.[0],
    img: '',
    showNext: true,
    set: data => set(data),
    done: () => set(p => {
        return { showNext: true }
    }),
    next: (num = 1) => set(p => {
        const nextItem = p.data[p.ind + num]
        if (!nextItem) {
            if ((p.ind + num) == p.data?.length) {
                return { isFinished: true, showNext: false }
            } else {
                return { isFinished: false, current: p?.data?.[0], ind: 0, showNext: false }
            }
        }
        return { current: nextItem, ind: p.ind + num, showNext: false }
    }),
    wrong: () => set(p => {

    }),
    restart: () => set(p => ({ isFinished: false, current: p?.data?.[0], ind: 0, showNext: false })),
    clear: () => set({ data: [], current: null, start: false, playInd: 0, isFinished: false, showNext: false, ind: 0 })
}))

export default function MainLearnPage() {
    const store = store_()
    const router = useRouter()
    const { languageId, levelId, stageId, contentId } = router.query

    useEffect(() => {
        store.clear()
        const ret = listenData()
        // store.restart()
        return () => {
            store.clear()
            ret()
        }
    }, [contentId])


    function listenData() {
        if (!contentId) return () => { }
        const q = query(
            collection(db, 'chats'),
            where('contentId', '==', contentId),
            orderBy('timeStamp', 'asc')
        )
        return onSnapshot(q, snap => {
            const data = snapToObject(snap).map((d, ind) => ({ ...d, ind }))
            store.set({ data, current: data[0] })
        })
    }


    function toNextContent() {
        router.push(toLearnUrl(languageId, levelId, stageId, 'review'))
    }


    function progress() {
        const total = store?.data?.length - 1
        const portion = store?.current?.ind
        return {
            total,
            portion,
            over: total - portion,
            ave: Math.floor((portion / total) * 100) || 0,
        }
    }

    return (
        <div className='flex flex-col items-center p-5 min-h-screen'>
            <div className='flex ring-1d w-full items-center'>
                <Link href='/'>
                    <Icon>home</Icon>
                </Link>
                <Link href={`/${languageId}/${levelId}/${stageId}`}>
                    <Icon>arrow_back_ios_new</Icon>
                </Link>
                <Link href={`/${languageId}/${levelId}/${stageId}/editor/?contentId=${contentId}`}>
                    <Icon>edit</Icon>
                </Link>
            </div>
            <div className='flex flex-1 flex-col w-full max-w-2xl ring-1d'>
                <div className='min-h-[20px] ring-1f'>
                    {store?.showNext && <ProgressBar progress={progress} />}
                </div>
                <div className='flex-1 flex flex-col items-centerd justify-center bg-green-300d rounded-xl'>
                    {!store?.start && <button className=' max-w-md mx-auto w-full text-4xl shadow-xl rounded-3xl bg-green-500 hover:scale-[1.03] p-3 font-semibold text-white' onClick={_ => store.set({ start: true })}>PLAY</button>}
                    {(!store?.isFinished && store?.start) && < Item item={store?.current} done={store.done} next={store.next} ind={store?.ind} set={store?.set} img={store?.img} />}
                    {store?.isFinished && <PlayItemFinish router={router} restart={store.restart} next={toNextContent} />}
                </div>


                <footer className='ring-1d flex flex-col h-[80px] items-center justify-center'>
                    {store?.showNext && <button onClick={_ => store.next(1)} className='max-w-sm w-full text-2xl font-semibold bg-green-400 p-2 text-white rounded-3xl'>
                        NEXT
                    </button>}
                </footer>
            </div>
        </div>
    )
}



export function Item({ item, isEdit, next, remove, ind, done = () => { }, set }, img) {
    switch (item?.type) {
        case 'word':
            return <PlayItemWord data={item} next={next} isEdit={isEdit} done={done} ind={ind} />
        case 'chat':
            return <PlayItemChat data={item} isEdit={isEdit} done={done} ind={ind} set={set} img={img} />
        case 'tprs':
            return <PlayItemTprs data={item} isEdit={isEdit} done={done} ind={ind} set={set} img={img} />
        case 'image':
            return <PlayItemSelect data={item} isEdit={isEdit} done={done} ind={ind} />
        // case 'match':
        //     return <PlayItemMatch data={item} isEdit={isEdit} done={done} />
        case 'question':
            return <PlayItemQuestion data={item} next={next} isEdit={isEdit} done={done} ind={ind} />
        case 'pair':
            return <PlayItemPair data={item} next={next} isEdit={isEdit} done={done} ind={ind} />
        case 'ask':
            return <PlayItemAskEach data={item} next={next} isEdit={isEdit} done={done} ind={ind} />
        default:
            return <p onClick={_ => remove(item?.id)} >{item?.type} unknown</p>;
    }
}


function ProgressBar({ progress }) {
    return (<div className='flex items-center h-[20px] '>
        <p className='mx-1 text-gray-400 dark:text-gray-500 '>{progress()?.portion}/{progress()?.total}</p>
        <div className='p-1d flex-1 ring-1d bg-gray-200 dark:bg-gray-800 ring-gray-200 dark:ring-gray-800 mx-1 rounded-lg'>
            <div style={{ width: progress()?.ave + '%' }}
                className={`h-3 items-center rounded-md bg-green-300 dark:bg-green-700 w-[60%] border-b-[3px] border-b-green-200 dark:border-b-green-500  `}>
                {/* <p className='h-[3px] bg-white '></p> */}
            </div>
        </div>
        <p className=' text-green-400 dark:text-green-600 mx-2 font-semibold text-xl'>{progress()?.ave} % </p>
    </div>)
}
