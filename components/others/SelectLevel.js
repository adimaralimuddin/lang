

import { useState } from 'react'
import Box from './Box'
import { useRouter } from 'next/router'
import { levels, stages } from '../editor/EditorChatsView'
import { toLearnUrl } from '../../appApi/toolApi'

function SelectLevel({ params }) {
    if (!params?.stageId) {
        return null;
    }
    const [show, setShow] = useState()
    const router = useRouter()
    const { languageId, levelId, stageId } = router?.query

    const toggle = () => setShow(p => !p)

    const onSelectLevel = (level) => {
        const url = toLearnUrl(languageId, level, stageId)
        router.push(url)
    }
    const onSelectStage = (stage) => {
        const url = toLearnUrl(languageId, levelId, stage)
        router.push(url)
    }

    return (
        <span  >
            <div onClick={toggle} className='flex items-center'>
                <img src="/dialogue.png" alt="" className='mr-2 w-[50px] aspect-square' />
                <p className='font-semibold'>Dialogue</p>
            </div>
            <span className='relative '>
                <Box show={show}
                    className={`absolute top-2 -left-10 p-2 px-4
                    
                    `}
                >
                    <p className='text-[20px] font-semibold pt-1'>
                        Levels
                    </p>
                    <div>
                        {
                            levels?.map(level => (
                                <Item active={router?.query?.levelId}
                                    set={onSelectLevel}
                                    key={level + 'select_level'}
                                >{level}</Item>
                            ))
                        }
                    </div>
                    <hr />
                    <p className='text-[20px] font-semibold pt-1'>
                        Stages
                    </p>
                    <div className='max-h-[200px] overflow-x-auto p-1'>
                        {
                            stages?.map(stage => (
                                <Item active={router?.query?.stageId}
                                    set={onSelectStage}
                                >{stage}</Item>
                            ))
                        }
                    </div>
                </Box>
            </span>
        </span>
    )
}

export default SelectLevel


function Item({ children, active, set }) {

    const onClickHandler = () => set(children)
    const style = (a, b) => children == active ? a : b
    return (
        <p
            onClick={onClickHandler}
            className={style(`bg-green-500 dark:bg-slate-900 `, `
            hover:bg-gray-100 hover:ring-1 dark:hover:ring-0 dark:hover:bg-gray-700
            `) + ` px-2 py-1 rounded-md  cursor-pointer`}
        >
            {children}
        </p>
    )
}
