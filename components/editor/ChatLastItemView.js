
import { useEffect, useRef } from 'react'
import { langCodeToLang, playAudio, toLearnUrl } from '../../appApi/toolApi'
import Box from '../others/Box'
import IconLabel from '../others/IconLabel'
import TextH1 from '../others/TextH1'
import TextH2 from '../others/TextH2'
import { stages } from './EditorChatsView'

export default function ChatLastItemView({
    hooks,
    index,
    store,
    router,
    learnData
}) {
    const divRef = useRef()
    const { languageId, levelId, stageId } = router?.query

    useEffect(() => {
        if (store.playChatInd == index) {
            divRef?.current?.style?.display = 'flex'
        } else {
            divRef?.current?.style?.display = 'none'
        }
    }, [store.playChatInd])

    function play() {
        store.play(index, hooks, divRef)
        if (!store.isFinish) {
            playAudio('/audio/success.mp3')
            store.finish(learnData)
        }
    }

    function reset() {
        divRef?.current?.style.display = 'none'
    }

    function nextStage() {
        stages?.map((stage, ind) => {
            if (stage == stageId) {
                if (ind == stages?.length - 1) {
                    console.log('last level');
                } else {
                    const url = toLearnUrl(languageId, levelId, stages[ind + 1])
                    router.push(url)
                }
            }
        })
    }

    hooks[index] = { play, reset, stop: () => { } }

    return <div
        ref={divRef}
        className='hidden'
    >
        <Box
            show='true'
            className='min-h-[200px] items-center justify-center w-full'
        >
            <TextH1>Finnish</TextH1>
            <TextH2>{learnData?.selectedLang?.[2]} / {levelId} / {stageId}</TextH2>
            <IconLabel>Replay</IconLabel>
            <IconLabel onClick={nextStage} icon='arrow_forward_ios'>Next Stage</IconLabel>
        </Box>
    </div>
}