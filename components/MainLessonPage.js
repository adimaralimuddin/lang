

import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { testData_ } from './MainLanguagePage'
import LangLearnItem from './MainListItems/LangLearnItem'
import { addDb, getDb, listenWhere, updateDb } from '../appApi/dbApi'
import { db } from '../firebaseConfig'
import { collection, getDocs, onSnapshot, orderBy, query, where } from 'firebase/firestore'
import { snapToObject } from '../appApi/toolApi'
import Box from './others/Box'
import Icon from './others/Icon'
import IconLabel from './others/IconLabel'


export default function MainLessonPage() {
    const router = useRouter()
    const { languageId, levelId, stageId } = router.query
    const [contents, setContents] = useState()
    const [ind, setInd] = useState(0)

    useEffect(() => {
        if (languageId) {
            return getData()
        }
    }, [languageId])

    async function getData() {
        const q = query(collection(db, 'contents'),
            where('languageId', '==', languageId),
            where('level', '==', levelId),
            where('lesson', '==', stageId),
            orderBy('index', 'asc')
        )
        onSnapshot(q, snap => setContents(snapToObject(snap)))
    }

    function prev() {
        router.push(`/${languageId}`)
    }

    return (
        <div className=' flex flex-col items-center p-5 max-w-2xl mx-auto'>
            <header className='flex flex-wrap w-full p-2 px-3 items-center'>
                <button onClick={prev} className='material-icons font-semibold '>arrow_back_ios_new</button>
                <AdderContent length={contents?.length} languageId={languageId} level={levelId} lesson={stageId} />
                {/* <p className='px-2 text-green-700 text-xl font-semibold'>{languageId} /</p>
                <p className='px-2'>{levelId} /</p>
                <p className='px-2'>{stageId}</p> */}
            </header>
            <div className='bg-gradient-to-r from-violet-600 to-pink-400 dark:from-purple-900 dark:text-gray-300 text-white dark:to-gray-900 bg-pink-400  p-6 px-10 rounded-3xl w-full '>
                <span className='flex'>
                    <h1 className=' font-semibold '>{languageId} /</h1>
                    <h1 className=' pl-3  '>{levelId}</h1>
                </span>
                <h1 className=' font-bold text-3xl'>{stageId}</h1>
                <section className=' flex items-center flex-wrap mt-5'>
                    <IconLabel icon='play_arrow'>play</IconLabel>
                    <IconLabel icon='favorite'>play</IconLabel>
                </section>
            </div>
            <h1 className='mt-5 font-bold text-xl text-gray-500 mr-auto px-2'>Learn</h1>
            <div className='m-3d justify-center flex-cold flex-wrap flex items-center flex-1 w-full max-w-2xl ring-1d'>
                {
                    contents?.map(
                        content => {
                            switch (content?.type) {
                                case 'learn':
                                    return <LangLearnItem data={content} key={stageId + content?.name} />
                                case 'review':
                                    return <LangLearnItem data={content} key={stageId + content?.name} />
                                case 'practice':
                                    return <LangLearnItem data={content} key={stageId + content?.name} />
                                case 'quiz':
                                    return <LangLearnItem data={content} key={stageId + content?.name} />

                                default:
                                    return <p>other</p>
                            }
                        }
                    )
                }
            </div>
        </div>
    )
}

export function AdderContent({ languageId, length, lesson, level, editData, type_ = 'adder' }) {
    const [show, setShow] = useState(false)
    const [name, setName] = useState(editData?.name)
    const [number, setNumber] = useState(editData?.number || 1)
    const [type, setType] = useState(editData?.type || 'learn')
    const [index, setIndex] = useState(checkType(length, editData?.index))

    useEffect(() => {
        setIndex(length + 1)
    }, [length])


    function checkType(a, b) {
        return type_ == 'adder' ? a : b
    }

    function onAddContent() {
        const data = {
            languageId, lesson, level,
            name, number, type, index
        }
        console.log(data);
        if (!name) return alert('no name')
        if (!index) return alert('no index')
        if (!number) return alert('no number')
        if (type_ == 'adder') {
            addDb('contents', data)
        } else {
            updateDb(editData?.id, 'contents', data)
        }
        setShow(false)
    }

    return (
        <div>
            <button className='bg-green-500 text-white px-2 p-1 ' onClick={() => setShow(p => !p)}>{type_ == 'adder' ? 'Add Content' : 'Edit'}</button>
            {show && <Box show='true' className='fixed top-10 left-10 p-6'>
                <header className='flex items-center'>
                    <h1 className='text-green-600 font-semibold mr-2'>Add New Content</h1>
                    <small onClick={_ => setShow(false)} className='ring-1 rounded-md px-1 cursor-pointer'>close</small>
                </header>
                <span>
                    <p>name</p>
                    <input value={name} onChange={e => setName(e.target.value)} className='ring-1' type="text" />
                </span>
                <div className='flex items-center '>
                    <span className=''>
                        <p>index</p>
                        <input value={index} onChange={e => setIndex(e.target.value)} className='ring-1 w-[50px]' type="number" min='1' max='10' />
                    </span>
                    <span className=''>
                        <p>num</p>
                        <input value={number} onChange={e => setNumber(e.target.value)} className='ring-1 w-[50px] ' type="number" max='10' min='1' />
                    </span>
                    <span className='flex-1 flex flex-col'>
                        <p>type</p>
                        <select value={type} onChange={e => setType(e.target.value)} className='ring-1 flex-1 py-1'>
                            <option value="learn">learn</option>
                            <option value="review">review</option>
                            <option value="practice">practice</option>
                            <option value="quiz">quiz</option>
                        </select>
                    </span>
                </div>
                <button onClick={onAddContent} className='mt-2 bg-green-600 text-white text-2xl p-1'>save</button>
            </Box>}
        </div>
    )
}