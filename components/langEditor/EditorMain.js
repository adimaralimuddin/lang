

import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { deleteDb, updateDb } from '../../appApi/dbApi'
import { Item } from '../MainLearnPage'
import { arrayRemove, arrayUnion, collection, onSnapshot, orderBy, query, where } from 'firebase/firestore'
import { db } from '../../firebaseConfig'
import { playAudio, snapToObject } from '../../appApi/toolApi'
import Link from 'next/link'
import AdderEditor from '../editor/adders/AdderEditor'
import { speakHd } from '../editor/editorApi'
import { Languages } from '../../stores/editorStore'


function EditorMain() {
    const router = useRouter()
    const { languageId, levelId, stageId, contentId } = router.query
    const [data, setData] = useState()
    // const api = EditorStore()

    // console.log(data);

    useEffect(() => {
        if (contentId) {
            const q = query(
                collection(db, 'chats'),
                where('contentId', '==', contentId),
                orderBy('timeStamp', 'desc')
            )
            onSnapshot(q, snap => setData(snapToObject(snap)))
        }
    }, [contentId])

    function remove(id) {
        deleteDb(id, 'chats')
    }
    return (
        <div className='flex flex-col max-h-screen min-h-screen'>
            <header className='flex items-center p-2'>
                <small className='text-green-600'>{languageId} / </small>
                <small className='text-smallurple-500'> {levelId} /</small>
                <small className='text-blue-600'> {stageId} /</small>
                <Link href={`/${languageId}/${levelId}/${stageId}/learn?contentId=${contentId}`}>play </Link>
                <span className='float-right'>
                    <small>/ items: {data?.length}</small>
                    <button onClick={e => rebuild(data)}>rebuild</button>
                </span>
            </header>
            {/* <section className=''>
                <p>items: {data?.length}</p>
                <div className='flex flex-wrap'>
                    {data?.map((item, ind) => (
                        <div
                            onClick={e => rebuild(item, e)}
                            className={(item?.hasError ? ' ring-1 ring-red-900 hover:bg-red-700 ' : ' hover:bg-gray-900  ') + ' ring-1 p-2 m-1 rounded-md flex flex-col cursor-pointer min-w-[50px]'}>
                            <small>{ind + 1}</small>
                            <span>{
                                item?.lines?.map(line => (
                                    <small className={(!line?.audio ? 'bg-red-900' : '') + ''} >{line?.ind}</small>
                                ))
                            }</span>
                            <span>{
                                item?.transLines?.map(line => (
                                    <small className={(!line?.audio ? 'bg-red-900' : '') + ''} >{line?.ind}</small>
                                ))
                            }</span>
                        </div>
                    ))}
                </div>
            </section> */}

            <hr />
            <section className='flex-1 overflow-y-auto flex-col items-center mx-auto w-full max-w-xl '>
                {
                    data?.map(
                        (item, ind) => {
                            // console.log(item);
                            return (
                                <div onClick={(e) => {
                                    if (item?.hasError) {
                                        rebuild(item, e)
                                    } else {
                                        console.log(item)
                                    }
                                }} className={' bg-gray-900 ' + (item?.hasError && ' bg-red-900d ') + (item?.type == 'word' && ' bg-green-900d ring-1 ring-green-700 ') + ' rounded-xl  m-3 my-5 p-3 flex items-center justify-center '
                                }>
                                    <div className='flex-1'>
                                        <small className='mb-5'>{ind}</small>
                                        {
                                            item?.lines?.map(line => {
                                                return (
                                                    <div className='leading-5' onClick={e => {
                                                        if (!line?.audio) {
                                                            rebuild(item, e)
                                                        }
                                                    }}>
                                                        <span className={(!line?.audio && ' bg-red-600 ') + ' flex flex-col cursor-pointer rounded-md px-1'}
                                                            onClick={e => {
                                                                if (!line?.audio) return rebuild(item, e)
                                                                playAudio(line?.audio)
                                                            }}
                                                        >
                                                            <small>{line?.text}</small>
                                                            <small>{line?.trans}</small>
                                                        </span>
                                                        <div className='flex flex-wrap my-1'>
                                                            {
                                                                item?.textLines?.filter(txtLine => txtLine?.lineInd == line?.ind)
                                                                    ?.sort((a, b) => a?.ind - b?.ind)
                                                                    ?.map(txt => <p className={' cursor-pointer px-1 mr-1 ring-1 rounded-md flex-col flex '}
                                                                    >
                                                                        <small>{txt?.text}</small>
                                                                        <small>{txt?.trans}</small>
                                                                    </p>)
                                                            }
                                                        </div>
                                                        <div className='flex flex-wrap my-1'>
                                                            {
                                                                item?.transLines?.filter(txtLine => txtLine?.lineInd == line?.ind)
                                                                    ?.sort((a, b) => a?.ind - b?.ind)
                                                                    ?.map(txt => <p className={(!txt?.audio && ' bg-red-800 ') + ' px-1 ring-1 ring-gray-800 mr-1 rounded-md flex-col flex cursor-pointer '}
                                                                        onClick={e => {
                                                                            if (!txt?.audio) return rebuild(item, e)
                                                                            playAudio(txt?.audio)
                                                                        }}
                                                                    >
                                                                        <small>{txt?.trans}</small>
                                                                        <small>{txt?.text}</small>
                                                                    </p>)
                                                            }
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                    {
                                        item?.type == 'chat' && <div className='ring-1d'>
                                            <img src={`/image/story/${item?.storyImage}.png`} width='200' alt="" />
                                            <form onSubmit={e => {
                                                e.preventDefault()
                                                const img = e.target.image.value
                                                console.log(img)
                                                updateDb(item?.id, 'chats', { storyImage: img })
                                            }}>
                                                <input defaultValue={item?.storyImage} name='image' type="text" className='ring-1 text-sm w-full ' autoComplete='off' />
                                            </form>
                                        </div>
                                    }
                                    <button className=' float-rightd ring-1 bg-gray-900 ring-red-500 m-5 p-0 px-3 rounded-full hover:bg-red-500 hover:text-white' onClick={_ => deleteDb(item?.id, 'chats')}>x</button>
                                </div>
                            )
                        }
                    )
                }
            </section >
            <footer className='flex flex-col flex-wrap px-2 ring-1'>
                <AdderEditor index={data?.length} router={router} />
            </footer>
        </div >
    )
}

export default EditorMain

function rebuild(newChat, e) {
    e.stopPropagation()
    console.log(newChat);

    const lang = Languages?.find(l => l[2] == newChat?.languageId)

    // console.log(lang);

    updateDb(newChat?.id, 'chats', { hasError: false })

    newChat?.transLines?.map(async line => {
        if (line?.audio) return;
        const audio = await speakHd({ lang, text: line?.trans, align: newChat?.align, chatId: newChat?.id })
        await updateDb(newChat?.id, 'chats', { transLines: arrayRemove(line) })
        line?.audio = audio
        await updateDb(newChat?.id, 'chats', { transLines: arrayUnion(line) })
    })

    newChat?.lines?.map(async ({ text, trans, latin, ind, audio }) => {
        if (audio) return;

        const audio_ = await speakHd({ lang, text: trans, align: newChat?.align, chatId: newChat?.id })

        await updateDb(newChat?.id, 'chats', {
            lines: arrayRemove({ audio, text, trans, latin, ind })
        })

        await updateDb(newChat?.id, 'chats', {
            lines: arrayUnion({ audio: audio_, text, trans, latin, ind }),
        })

        console.log('done rebuilding');
    })



}