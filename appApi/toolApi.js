import { languagesLists } from "../components/editor/EditorChatsView"
import { Languages } from "../stores/editorStore"


export function snapToObject(snap) {
    return snap?.docs?.map(doc => ({ id: doc.id, ...doc.data() }))
}

export function docToObject(doc) {
    return { id: doc.id, ...doc.data() }
}

export function playAudio(audio, caller, started = () => { }) {
    const au = new Audio(audio)
    au.play()
    started(au)
    au.onended = caller
    return au
}

export function focusDiv(div) {
    div?.style.display = 'flex'
    div?.scrollIntoView({ behavior: "smooth", block: 'end' })

}

export function getLang(lang) {
    return {
        langText: lang[2],
        langCode: lang[0],
        langAudioCode: lang[1]
    }
}

export function getWord(word, words) {
    if (!word || !words) return
    return words?.find(w => w?.text?.trim() == word?.trim())
}

export function getChatsData(chats) {
    return {
        level: chats?.level,
        lesson: chats?.lesson,
        content: chats?.content,
        showTrans: chats?.showTrans,
        withTextAudio: chats?.withTextAudio,
        // ...getLang(chats.selectedLang),
    }
}

export function getParsData(pars) {
    // const lang = Languages?.find(l => l[2] == pars?.languageId)
    return {
        languageId: pars?.languageId,
        level: pars?.levelId,
        lesson: pars?.stageId,
        contentId: pars?.contentId,
        // lang,
        // langText: lang[2],
        // langCode: lang[0],
        // langAudioCode: lang[1]
        // showTrans: pars?.showTrans,
        // withTextAudio: pars?.withTextAudio,
        // ...getLang(pars.selectedLang),
    }
}

export function langCodeToLang(langCode) {
    return languagesLists?.find(l => l[0] == langCode)
}

export function langIdToLang(langId) {
    // console.log(languagesLists);
    return languagesLists?.find(l => l[2] == langId)
}

export function toLearnUrl(langCode, level, stage, endpoint = 'learn') {
    return `/${langCode}/${level}/${stage}/${endpoint}`
}
