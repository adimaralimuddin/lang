

import { useState } from 'react'
import { useRouter } from 'next/router'
import { languagesLists } from '../editor/EditorChatsView'
import { langCodeToLang, toLearnUrl } from '../../appApi/toolApi'


function SelectLanguage({ params }) {
    if (!params?.stageId) {
        return null;
    }

    const [show, setShow] = useState(false)
    const router = useRouter()
    const langText = langCodeToLang(router?.query?.languageId)?.[2]

    function select(lang) {
        setShow(false)
        const { levelId, stageId } = router.query
        const url = toLearnUrl(lang[0], levelId, stageId)
        router.push(url)
    }

    return (
        <div className='flex items-center'>
            <span className='relative'>
                {show && <ul
                    className='top-10 left-0  max-h-[400px] w-[200px]  overflow-y-scroll p-2 ring-1  ring-green-200 absolute overflow-hidden bg-white shadow-md rounded-md'
                >
                    {
                        languagesLists?.map(
                            (lang, ind) => (
                                <LangItem
                                    select={select}
                                    lang={lang}
                                    ind={ind}
                                    key={lang[0]}
                                />

                            )
                        )
                    }
                </ul>}
            </span>
            <div className={`ring-1  bg-no-repeat bg-center bg-fill rounded-full bg-white shadow-md ring-green-100 `}>
                <img
                    className=' rounded-xl h-[35px] w-[50px] shadow-mds ring-1 ring-gray-300'
                    src={`/flags/${langText}.png`} />
            </div>
            <div onClick={() => setShow(p => !p)}
                className='flex flex-col items-center'>
                <span className='flex rounded-md p-2 cursor-pointer items-center'   >
                    <p className='  text-[16px]s text-xl font-semibold'>{langText}</p>
                    <span className='material-icons'> expand_more</span>
                </span>

            </div>

        </div >
    )
}

export default SelectLanguage

function LangItem({ lang, ind, select }) {
    return (
        <li
            onClick={() => select(lang)}
            className='flex hover:bg-gray-100 cursor-pointer rounded-md whitespace-nowrap py-2 px-2'>
            <small className='pr-2 text-gray-400'>{ind + 1}</small>
            <img src={`/flags/${lang[2]}.png`} alt="" className='w-[40px] h-[25px] rounded-md shadow-md mr-2' />
            < p > {lang[2]}</p >
        </li >
    )
}