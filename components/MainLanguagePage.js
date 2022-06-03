
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import LangLevelItem from './MainListItems/LangLevel_Item';
import { addDb, updateDb } from '../appApi/dbApi';
import Box from './others/Box';
import { levels } from '../stores/editorStore';
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { snapToObject } from '../appApi/toolApi';
import Link from 'next/link'
import Icon from './others/Icon';


function MainLanguagePage() {

    const router = useRouter()
    const { languageId } = router?.query
    const [data, setData] = useState()

    useEffect(async () => {
        const ret = getData()
        return ret
    }, [languageId])

    async function getData() {
        if (languageId && languageId != '') {

            const q = query(collection(db, 'lessons'),
                where('languageId', '==', languageId),
                orderBy('number', 'asc'))
            return onSnapshot(q, snap => setData(snapToObject(snap)))

        }
    }

    return (
        <div className=' max-w-4xl ring-1d content-center items-center justify-center mx-auto'>
            <header className='p-2 text-cente flex flex-wrap items-center'>
                <Link href={`/`}>
                    <Icon>arrow_back_ios</Icon>
                </Link>
                <h1 className='text-green-600 text-4xl font-semibold'>{languageId}</h1>
                <AdderLesson languageId={languageId} />
            </header>
            <div className='ring-1d  max-w-2xl mx-auto '>
                <LangLevelItem lessons={data?.filter?.(p => p?.level == 'Beginner_A1')} level='Beginner_A1' />
                <LangLevelItem lessons={data?.filter?.(p => p?.level == 'Elementary_A2')} level='Elementary_A2' />
                <LangLevelItem lessons={data?.filter?.(p => p?.level == 'Entermediate_B1')} level='Entermediate_B1' />
                <LangLevelItem lessons={data?.filter?.(p => p?.level == 'Upper_Entermediate_B2')} level='Upper_Entermediate_B2' />
                <LangLevelItem lessons={data?.filter?.(p => p?.level == 'Advance_C1')} level='Advance_C1' />
                <LangLevelItem lessons={data?.filter?.(p => p?.level == 'Fluency_C2')} level='Fluency_C2' />
            </div>

        </div>
    )
}

export default MainLanguagePage

export function AdderLesson({ languageId, type = 'adder', editData }) {
    const [show, setShow] = useState(false)
    const [name, setName] = useState(editData?.name)
    const [level, setLevel] = useState(editData?.level || levels[0])
    const [number, setNumber] = useState(parseInt(editData?.number))
    const [words, setWords] = useState(editData?.words || [])


    async function addLesson() {
        if (!number || !name || !level) return;

        const data = {
            languageId,
            level, name, number, words,
        }

        console.log(data);
        if (type == 'editor') {
            updateDb(editData?.id, 'lessons', data)
        } else {
            addDb('lessons', data)
        }
        setShow(false)
    }

    return (
        <div className='px-2'>
            {type == 'adder' ? <button onClick={e => setShow(p => !p)} className='bg-green-600 text-white'>Add Lesson</button> :
                <button onClick={e => setShow(p => !p)} className='text-sm ring-1'>edit</button>
            }
            {show && <Box show='true' className='fixed top-10 left-5 p-7'>
                <header className='flex'>
                    <h2 className='font-semibold text-indigo-600'>{type == 'adder' ? 'Add' : 'Edit'} Lesson</h2>
                    <p onClick={_ => setShow(false)} className='float-right ring-1 rounded-md px-2 mx-2 cursor-pointer'>close</p>
                </header>
                <span className='flex flex-col'>
                    <label htmlFor="">name</label>
                    <span>
                        <input value={number} onChange={e => setNumber(e.target.value)} type="number" className='ring-1 max-w-[50px]' min='1' max='100' />
                        <input value={name} onChange={(e) => setName(e.target?.value)} type="text" className='ring-1' />
                    </span>
                </span>
                <span className='flex flex-col'>
                    <label htmlFor="">level</label>
                    <select value={level} onChange={e => setLevel(e.target.value)} name="level" className='ring-1'>
                        {levels?.map(level => <option value={level} key={'addLessonForm' + level}>{level}</option>)}
                    </select>
                </span>
                <span className='flex flex-col'>
                    <label htmlFor="">words</label>
                    <div className='flex flex-wrap'>
                        {words?.map(word => <p onClick={e => setWords(p => p.filter(p_ => p_ != word))} className='cursor-pointer ring-1 p-1 m-1 rounded-md text-sm'>{word}</p>)}
                    </div>
                    <input defaultValue={words?.join('.')} onChange={e => setWords([... new Set(e.target.value?.split('.'))].filter(p => p != ''))} type="text" className='ring-1' />
                </span>
                <button onClick={addLesson} className='bg-green-500 text-white mt-3'>save</button>
            </Box>}
        </div>
    )
}

