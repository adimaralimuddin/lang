import axios from "axios";
import { arrayUnion } from "firebase/firestore";
import { addDb, updateDb } from "../../appApi/dbApi";
import { getParsData } from "../../appApi/toolApi";
import { adverb, article, Languages, linkingVerbs, negative, noScripts, positive, prepositions, pronouns, question, verbs, voiceApiKey } from "../../stores/editorStore";

export const translate = async ({ text, to = 'en-us', from = 'en-us' }) => {
    const options = {
        method: 'POST',
        url: 'https://microsoft-translator-text.p.rapidapi.com/translate',
        params: {
            to,
            from,
            'api-version': '3.0',
            toScript: to == 'en-us' ? from : 'latn',
            profanityAction: 'NoAction',
            textType: 'plain'
        },
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Host': 'microsoft-translator-text.p.rapidapi.com',
            'X-RapidAPI-Key': 'aff1177afamsh1fb255402c24c5ap1be9e4jsn4efe400f2d7e'
        },
        data: [{ Text: text }]
    }
    if (!noScripts?.find(s => s == to)) {
        options?.params?.toScript = 'latn'
    }

    const res = await axios.request(options)
    // console.log(res);
    const trans = res?.data[0]?.translations[0]?.text
    const latin = res.data[0]?.translations[0]?.transliteration?.text || ''
    // console.log({ trans, latin });
    return { trans, latin }
}



export async function createChat(data, pars) {

    const filt = data.words.filter(a => a.trim() === '' ? null : a)
    const lines = filt.map((a, ind) => ({ text: a.trim(), ind }))
    const data_ = { ...data, ...getParsData(pars) }
    const newChat = await addDb('chats', data_)

    const linesData = {
        lines,
        chatId: newChat.id,
        lang: Languages?.find(l => l[2] == pars?.languageId),
        align: data_?.align,
        // withTextAudio: data_?.withTextAudio,
        // showTrans: data_?.showTrans,
        // libs: data_?.libs,
        type: data?.type
    }
    createLines(linesData)
}

export async function buildChat(chats) {
    chats.lists?.map(async (list, ind) => {
        const newData = {
            filteredLines: list.filteredLines,
            lang: chats.buildLang,
            align: list.align,
            langText: chats.buildLangText,
            level: list.level,
            length: list.length,
        }
        const newChat = await addDb('chats', newData)

        createLines({
            lines: list.filteredLines,
            chatId: newChat.id,
            lang: chats.buildLang,
            align: list.algin,
        })
    })
}


export async function createLines({ lines, chatId, lang, align }) {
    lines?.map(async ({ text, ind }) => {


        const { trans, latin } = await translate({ text, to: lang[0] })
        const latins = latin?.split(' ')
        // console.log(latins);
        const audio = null
        // const audio = await speakHd({ lang, text: trans, align, chatId })
        const result = { text, trans, audio, latin, ind, align }

        updateDb(chatId, 'chats', {
            lines: arrayUnion(result)
        })

        text?.split(' ')?.map(async (txt, ind_) => {
            // console.log(txt);
            // const { trans, latin } = await translate({ text: txt?.trim(), to: lang[0] })
            const data = { trans: '', text: txt?.trim(), latin: '', ind: ind_, lineInd: ind }
            const word = text?.trim()?.toLowerCase()?.replace('?', '')?.replace('.', '')?.replace(',', '')

            if (question?.find(p => word == p)) { data?.type = 'question' }
            if (negative?.find(p => word == p)) { data?.type = 'negative' }
            if (positive?.find(p => word == p)) { data?.type = 'positive' }
            if (prepositions?.find(p => word == p)) { data?.type = 'preposition' }
            if (pronouns?.find(p => p == word)) { data?.type = 'pronoun' }
            if (linkingVerbs?.find(p => p == word)) { data?.type = 'linkingVerb' }
            if (adverb?.find(p => word == p)) { data?.type = 'adverb' }
            if (article?.find(p => word == p)) { data?.type = 'article' }
            if (verbs?.find(p => word?.includes(p))) { data?.type = 'verb' }

            updateDb(chatId, 'chats', { textLines: arrayUnion(data) })
        })

        trans?.split(' ')?.map(async (txt, ind_) => {
            // console.log(txt);
            const { trans, latin } = await translate({ text: txt?.trim(), from: lang[0] })
            const audio = null
            // const audio = await speakHd({ lang, text: txt, align, chatId })
            const data = { text: trans, trans: txt?.trim(), latin: latins?.[ind_] || '', audio, ind: ind_, lineInd: ind }
            const word = trans?.trim()?.toLowerCase()?.replace('?', '')?.replace('.', '')?.replace(',', '')
            // console.log(data);
            if (negative?.find(p => word?.includes(p))) { data?.type = 'negative' }
            if (positive?.find(p => word == p)) { data?.type = 'positive' }
            if (question?.find(p => word == p)) { data?.type = 'question' }
            if (prepositions?.find(p => word == p)) { data?.type = 'preposition' }
            if (pronouns?.find(p => p == word)) { data?.type = 'pronoun' }
            if (linkingVerbs?.find(p => p == word)) { data?.type = 'linkingVerb' }
            if (adverb?.find(p => word?.includes(p))) { data?.type = 'adverb' }
            if (article?.find(p => word == p)) { data?.type = 'article' }
            if (verbs?.find(p => word?.includes(p))) { data?.type = 'verb' }

            updateDb(chatId, 'chats', { transLines: arrayUnion(data) })
        })
    })
}



export async function speakHd({ lang = ['hi-IN'], chatId, text = 'no text found', align, speed = '-10' }) {
    console.log('converting');
    // console.log(lang);
    console.log(voiceApiKey);
    const d = {
        "Engine": "neural",
        "VoiceId": "ai3-Jony",
        "LanguageCode": "en-US",
        "Text": "Welcome to the Air.",
        "OutputFormat": "mp3",
        "SampleRate": "48000",
        "Effect": "default",
        "MasterSpeed": "0",
        "MasterVolume": "0",
        "MasterPitch": "0"
    }

    const data = {
        "Engine": "neural",
        "VoiceId": align == '-1' ? lang[3] : lang[4],
        "LanguageCode": lang[1],
        "Text": text,
        "OutputFormat": "mp3",
        "SampleRate": "48000",
        "Effect": "default",
        "MasterSpeed": speed,
        "MasterVolume": "0",
        "MasterPitch": "0"
    }
    var options = {
        method: 'POST',
        url: `https://developer.voicemaker.in/voice/api`,
        headers: {
            'Authorization': voiceApiKey,
            'Content-Type': 'application/json'
        },
        body: d
    };


    const res = await axios.post(
        options.url, options.body, { headers: options.headers }
    )

    if (res.data.success) {
        const audioB64 = await convertAudio(res.data.path)
        return audioB64
    }
    if (!res.data.success) {
        updateDb(chatId, 'chats', { hasError: true })
        console.log('api limits');
        console.log(res.data);
        return null
    }

}


function convertAudio(url) {
    return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        xhr.onload = function () {
            var reader = new FileReader();
            reader.onloadend = function () {
                resolve(reader.result)
            }
            reader.readAsDataURL(xhr.response);
        };
        xhr.open('GET', url);
        xhr.responseType = 'blob';
        xhr.send();
    })

}


export function getWordType(word) {
    word = word?.trim()?.toLowerCase()
    let type = ''
    if (question?.find(p => word == p)) { type = 'question' }
    if (negative?.find(p => word?.includes(p))) { type = 'negative' }
    if (positive?.find(p => word == p)) { type = 'positive' }
    if (prepositions?.find(p => word == p)) { type = 'preposition' }
    if (pronouns?.find(p => p == word)) { type = 'pronoun' }
    if (linkingVerbs?.find(p => p == word)) { type = 'linkingVerb' }
    if (verbs?.find(p => word?.includes(p))) { type = 'verb' }
    if (adverb?.find(p => word == p)) { type = 'adverb' }
    if (article?.find(p => word == p)) { type = 'article' }
    return type;
}

// async function translaterate({ lang, text, toScript = 'latn' }) {
//     try {
//         var options = {
//             method: 'POST',
//             url: 'https://microsoft-translator-text.p.rapidapi.com/transliterate',
//             params: { 'api-version': '3.0', toScript, fromScript: lang[5], language: lang[0] },
//             headers: {
//                 'content-type': 'application/json',
//                 'X-RapidAPI-Host': 'microsoft-translator-text.p.rapidapi.com',
//                 'X-RapidAPI-Key': 'aff1177afamsh1fb255402c24c5ap1be9e4jsn4efe400f2d7e'
//             },
//             data: [{ text }]
//         };

//         const res = await axios.request(options)
//         const latin = res.data?.[0]?.text
//         return latin
//     } catch (error) {
//         console.log('latin error ', error);
//         return ''
//     }
// }



// async function createCustumeChat(chatData, chats) {
//     const lines = chatData.words?.filter(a => a.trim() === '' ? null : a).map((text, ind) => ({ text, ind }))
//     const newChat = await addDb('chats', chatData)
//     createLines({
//         lines,
//         chatId: newChat.id,
//         lang: chats.selectedLang,
//         align: chatData?.align || 'start',
//         withTextAudio: chatData?.withTextAudio,
//         showTrans: chatData?.showTrans
//     })
// }
