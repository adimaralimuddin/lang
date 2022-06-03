
import { useRouter } from 'next/router'
import { toLearnUrl } from '../../appApi/toolApi';
import { AdderContent } from '../MainLessonPage';
import Box from '../others/Box';
import { useState } from 'react'
import { deleteDb } from '../../appApi/dbApi';
import Icon from '../others/Icon';
import IconLabel from '../others/IconLabel';

export default function LangLearnItem({ data }) {

    console.log(data);
    const router = useRouter()
    const { languageId, levelId, stageId } = router.query

    const headerStyle = () => {
        switch (data?.type) {
            case 'learn':
                return ' bg-[#70D3B6]d bg-gradient-to-rd from-[#70D3B6]d to-green-500 '
            case 'review':
                return ' bg-[#67C8D6]d bg-gradient-to-rd from-[#67C8D6]d to-indigo-500 '
            case 'practice':
                return ' bg-[#905CC3]d bg-gradient-to-rd from-[#905CC3]d to-pink-500'
            case 'quiz':
                return ' bg-[#FF7F57]d bg-gradient-to-rd from-[#FF7F57]d to-pink-500'
            default:
                return ' bg-indigo-500 '
        }
    }
    const divStyle = () => {
        switch (data?.type) {
            case 'learn':
            // return ''
            // return ' bg-gradient-to-ld from-[#DCF5EC] to-blue-100 dark:from-gray-800 dark:to-slate-900 '
            case 'review':
            // return ' bg-gradient-to-l from-[#F8EAF3] to-purple-50  dark:from-gray-800 dark:to-slate-900'
            case 'practice':
            // return ' bg-gradient-to-l from-[#F3EDF9] to-white  dark:from-gray-800 dark:to-slate-900'
            case 'quiz':
            // return ' bg-gradient-to-l from-[#F3E7E3] to-white  dark:from-gray-800 dark:to-slate-900'
            default:
                return ' bg-indigo-500 '
        }
    }

    function onPlayHandler() {
        router.push(`/${languageId}/${levelId}/${stageId}/learn?contentId=${data?.id}`)
    }

    return (
        <Box show='true' className={' hover:ring-1 ring-1 ring-purple-200 dark:ring-0 bg-white  shadow-sm m-5 p-3 overflow-hidden rounded-2xld max-w-[250px] min-w-[250px] min-h-[200px] ' + divStyle()}>
            <div className={'p-3d px-10 flex justify-center ring-1d ' + headerStyle()}>
                <h2 onClick={onPlayHandler} className=' dark:text-gray-400 text-xl text-[#606968] font-semibold '>{data?.type} {data?.number}</h2>
                <Option editData={data} languageId={languageId} level={levelId} lesson={stageId} />
            </div>
            <div className='ring-1d text-center flex-1 p-1 px-6 font-semibold text-[#363E48]d dark:text-gray-300'>
                <h3 className='pb-1 text-[16px] text-[#946598] dark:text-gray-500'>{data?.name}</h3>
                <img className='mx-auto' src={`/image/lesson${data?.number}.png`} width='60' alt="" />
            </div>

            <div className='flex pt-2 dark:text-gray-500'>
                {/* <button onClick={onPlayHandler} className='p-1 dark:bg-gray-700 text-[15px] px-5 font-semibold rounded-2xl bg-violet-300 text-white dark:text-gray-300'> */}
                {/* <small className='px-1 flex items-center'><Icon className='p-0 ring-1d text-[18px]'>play_arrow</Icon> 89%</small> */}
                {/* <small className='px-1 flex items-center'><Icon className='p-0 ring-1d text-[18px]'>quiz</Icon> 45%</small> */}
                {data?.finish && <small className='px-1 cursor-pointer text-green-500 font-semibold hover:bg-gray-700 m-1 rounded-lg'>DONE</small>}
                <small onClick={onPlayHandler} className='px-1 cursor-pointer hover:bg-gray-700 m-1 rounded-lg'>Play 89%</small>
                <small className='px-1 cursor-pointer hover:bg-gray-700 m-1 rounded-lg'>Quiz 89%</small>

                {/* <Icon className='bg-gray-700 text-gray-500 p-[2px] px-3'>play_arrow</Icon> */}
                {/* <Icon className='bg-gray-700 text-gray-500 p-[2px] px-3'>quiz</Icon> */}
                {/* <Icon className='bg-gray-700 text-gray-500 p-[2px] px-3'>rule</Icon> */}
                {/* </button> */}
                {/* <button className='p-1 dark:bg-gray-700 text-[15px] px-5 font-semibold rounded-2xl bg-purple-200 text-whited text-violet-400'>Quiz</button> */}
                {/* <button className='p-1 dark:bg-gray-700 text-[15px] px-5 font-semibold rounded-2xl bg-purple-200 text-whited text-violet-400'>Dialogue</button> */}

            </div>
        </Box >
    )
}

function Option({ editData, languageId, lesson, level }) {
    const [show, setShow] = useState(false)
    function onDeleteHandler() {
        deleteDb(editData?.id, 'contents')
    }
    return (
        <div>
            <span onClick={_ => setShow(p => !p)}>...</span>
            {show && <Box show='true' className='absolute p-3 left-5'>
                <AdderContent type_='editor' languageId={languageId} lesson={lesson} level={level} editData={editData} />
                <button onClick={onDeleteHandler}>delete</button>
            </Box>}
        </div>
    )
}