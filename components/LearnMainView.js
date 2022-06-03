




// import ChatsView from './editor/ChatsView'
// import { languagesLists } from './editor/EditorChatsView'
// import LearnHeaderView from './LearnHeaderView'
import Link from 'next/link'
import Box from './others/Box'
// import Icon from './others/Icon'
import ThemToggle from './others/ThemToggle'
import { Languages } from '../stores/editorStore'

function LearnMainView() {

    return (
        <div className={` 
         flex flex-col max-w-4xl mx-auto
         p-5
          `}>
            <header className='flex'>
                <div>
                    <h1>Learn Language for Free</h1>
                    <p>Developed By Adimar</p>
                </div>
                <ThemToggle />
            </header>
            <hr />
            <p>Select Language</p> {Languages?.length - 1}
            <ul className='flex flex-wrap items-center justify-center'>
                {
                    Languages?.map(lang => (
                        <LangItem lang={lang} key={lang[0] + 'main'} />
                    ))
                }
            </ul>
        </div>
    )
}

export default LearnMainView

function LangItem({ lang }) {
    return (
        <Link href={`/${lang[2]}`}>
            <Box show='true' className='h-[100px] flex-1  w-fulldd max-w-[120px] hover:scale-[1.01] cursor-pointer items-center justify-center p-2 rounded-xl ring-1 m-1 '>

                <img className='saturate-[2] contrast-[.8] shadow-md ring-1d ring-gray-200 rounded-xl mx-2' src={`/flags/${lang[2]}.png`} alt="" width='70' />
                <p className='text-xld my-2 font-semibold text-green-500 px-2'>{lang[2]}</p>
            </Box>
        </Link>
    )
}