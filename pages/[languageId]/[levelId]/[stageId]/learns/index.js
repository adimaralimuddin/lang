import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import ChatsView from '../../../../../components/editor/ChatsView'
import { languagesLists } from '../../../../../components/editor/EditorChatsView'

function learn() {
    const router = useRouter()
    const params = router.query

    if (params?.languageId && params?.levelId && params?.stageId) {
        const learnData = {
            langCode: params?.languageId,
            selectedLang: languagesLists?.find(p => p[0] == params?.languageId),
            level: params?.levelId,
            stage: params?.stageId,
        }
        return <ChatsView learnData={learnData} />
    }

    return (
        <p>Loading...</p>
    )
}

export default learn