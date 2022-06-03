

import React from 'react'
import { playAudio } from '../../appApi/toolApi'

function PlayItemSentenceTable({ dict }) {
    return (
        <div className='flex items-center justify-center flex-wrap'>
            {dict?.sort((a, b) => a?.ind - b?.ind)?.map(dict => (
                <div className='m-[3px] dark:text-gray-500 rounded-md cursor-pointer hover:ring-green-700 ring-1 ring-green-900'
                    onClick={() => playAudio(dict?.audio)}>
                    <p className='px-1 text-[14px] '>
                        {dict?.trans}
                    </p>
                    <p className='px-1 border-t-[1px] border-green-900'>
                        {dict?.text}
                    </p>
                    <p className='px-1 text-[14px] border-t-[1px] border-green-900'>
                        {dict?.latin}
                    </p>
                </div>
            ))}
        </div>
    )
}

export default PlayItemSentenceTable