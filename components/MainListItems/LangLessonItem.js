import Box from "../others/Box"
import { useRouter } from 'next/router'
import { deleteDb, updateDb } from "../../appApi/dbApi";
import { arrayRemove } from "firebase/firestore";
import { AdderLesson } from "../MainLanguagePage";
import { useState } from 'react'

export default function LangLessonItem({ lesson, level }) {
    const router = useRouter()
    const [option, setOption] = useState(false)

    function play() {
        router.push(`/${router?.query?.languageId}/${lesson?.level}/${lesson?.name}`)
    }

    function remove() {
        deleteDb(lesson?.id, 'lessons')
    }

    return (
        <Box show='true' className='m-5  cursor-pointer w-full p-5 max-w-[230px] h-[210px] overflow-hidden p-0 self-center  flex flex-col rounded-xl'>
            {/* <header className='bg-[#946598]f ring-1 text-center text-whited p-3'> */}
            <h2 onClick={play} className='text-center p-3 ring-1d text-[#606968] font-semibold '>
                LESSON {lesson?.number}
            </h2>
            {/* </header> */}
            <div className="flex-1 flex flex-col items-center justify-start p-3 ">
                <img className="ring-1d" src={`/image/lesson${lesson?.number}.png`} width='60' alt="" />
                <div className="text-center p-1">
                    <h2 className="text-xl text-slate-600 font-semibold">{lesson?.name}</h2>
                </div>
                {/* <div className=' overflow-hidden px-3 text-center flex flex-wrap justify-center items-center '>
                    {
                        lesson?.words?.map(
                            word => <p className='p-1 text-sm' key={'lesson_word' + word}>{word}</p>
                        )
                    }
                </div> */}
            </div>
            <footer className='flex px-3 pb-2 items-center'>
                <span className='text-gray-300' onClick={_ => setOption(p => !p)}>...</span>
                {option && <div>
                    <AdderLesson languageId={router?.query?.languageId} editData={lesson} type='editor' />
                    <button onClick={remove}>x</button>
                </div>}
            </footer>
        </Box>
    )
}

