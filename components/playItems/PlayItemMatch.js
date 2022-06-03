

import { useEffect, useState } from 'react'
import Box from '../others/Box'

function PlayItemMatch({ data, done }) {
    const [trans, setTrans] = useState()
    const [text, setText] = useState()

    useEffect(() => {
        done()
    }, [])

    return (
        <Box className=' p-6 ' show='true'>
            <header>
                <p>match each word</p>
            </header>
            <div className='flex flex-wrap'>
                {data?.lines?.map(
                    line => <TransItem select={setTrans} trans={trans} line={line} key={'match' + line?.trans} />
                )}
            </div>
            <div className='flex flex-wrap'>
                {data?.lines?.map(
                    line => <TextItem select={setText} text={text} line={line} key={'match' + line?.trans} />
                )}
            </div>
        </Box>
    )
}

export default PlayItemMatch

function TransItem({ line, select }) {
    if (line?.trans == select?.trans) {
        return 'done'
    }

    return (
        <p onClick={() => select(line)}
            className='cursor-pointer p-2 m-1 rounded-md ring-1 bg-gray-100'>{line?.trans}</p>
    )
}

function TextItem({ line, select }) {
    if (line?.text == select?.text) {
        return 'done'
    }
    return (
        <p onClick={() => select(line)}
            className='p-2 m-1 rounded-md ring-1 bg-gray-100'>{line?.trans}</p>
    )
}