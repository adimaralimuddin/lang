import Box from "../others/Box"
import { useEffect } from 'react'
import { playAudio } from "../../appApi/toolApi"
import { updateDb } from "../../appApi/dbApi"


export default function PlayItemFinish({ restart, next, router }) {

    const { contentId, languageId, levelId, stageId } = router.query

    useEffect(() => {
        playAudio('/audio/success.mp3')
        setDone()
    }, [])

    function setDone() {
        updateDb(contentId, 'contents', { finish: true })
    }

    function getNext() {
        router.push(`/${languageId}/${levelId}/${stageId}`)
    }

    return (
        <Box show='true' className='mx-auto py-10 w-full max-w-sm items-center justify-center min-h-[250px] flex flex-col'>
            <h2 className='text-green-500 text-3xl font-semibold'>finished</h2>
            <button onClick={restart}>Restart</button>
            <button onClick={getNext}>Next</button>
            <footer className='ring-1d'>
                <img src="/image/medal.png" width='130' alt="" />
            </footer>
        </Box>
    )
}