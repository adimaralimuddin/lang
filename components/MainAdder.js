
import { arrayUnion, collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { addDb, deleteDb, updateDb } from '../appApi/dbApi';
import { playAudio, snapToObject } from '../appApi/toolApi';
import { db } from '../firebaseConfig';
import { Languages } from '../stores/editorStore';
import { getWordType, translate } from './editor/editorApi';
import Link from 'next/link'

function getBase64(file) {
    if (!file) return null
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

function MainAdder() {

    const router = useRouter()
    const { languageId, levelId, stageId, contentId } = router.query
    const [data, setData] = useState()

    useEffect(() => {
        if (contentId) {
            const q = query(
                collection(db, 'chats'),
                where('contentId', '==', contentId),
                orderBy('timeStamp', 'desc')
            )
            onSnapshot(q, snap => setData(snapToObject(snap)))
        }
    }, [contentId])

    async function addHandler(e) {
        e.preventDefault()
        let text = e.target?.text?.value
        let trans = e.target?.trans?.value
        let type = e.target?.type?.value
        let latin = e.target?.latin?.value
        let audios = e.target?.audios?.files
        // const x = await getBase64(audios[0])

        // console.log(x);

        if (!text || !trans) return;
        text = text?.trim()?.split('/')
        latin = latin?.trim()?.split('/')
        trans = trans?.trim()?.split('/')
        const lang = Languages?.find(x => x[2] == languageId)

        trans?.map(async (x, ind) => {
            let trans = x?.trim()

            const audio = await getBase64(audios[ind])
            const data = { text: text[ind]?.trim(), latin: latin?.[ind] || '', trans, audio, ind, type, contentId }
            const item = await addDb('chats', data)
            // console.log(latin?.[ind]);

            text?.[ind]?.trim()?.split(' ')?.map(async (txt, ind) => {
                if (txt?.trim() == '') return null;
                const res = await translate({ text: txt?.trim(), to: lang[0] })
                const data = { trans: txt, text: res?.trans, type: getWordType(txt), ind }
                // console.log(data);
                updateDb(item?.id, 'chats', { textLines: arrayUnion(data) })

            })


            trans?.split(' ')?.map(async (trans, ind) => {

                const res = await translate({ text: trans?.trim(), to: 'en-us', from: lang[0] })
                // console.log(res);
                const audio = null
                // const audio = await speakHd({ lang, text: trans, align, chatId })
                const type = getWordType(res?.trans)
                const data = { trans: trans?.trim(), text: res?.trans, latin: res?.latin, audio, ind, type }
                updateDb(item?.id, 'chats', { transLines: arrayUnion(data) })
            })

            // if (languageId == 'chinese') {
            //     trans?.split(' ')?.map(async (lat, ind) => {
            //         const res = await translate({ text: lat?.trim(), to: lang[0] })
            //         console.log(res);
            //     })
            // }



        })
    }

    // console.log(data);

    function del(id) { deleteDb(id, 'chats') }

    function copyAudioText(e) {

    }

    return (
        <div>
            <header>
                <small>{languageId}</small>/
                <small>{levelId}</small>/
                <small>{stageId}</small>/
                <Link href={`/${languageId}/${levelId}/${stageId}/learn?contentId=${contentId}`}>play </Link>
            </header>
            <section>
                <form onSubmit={addHandler}>
                    <select name="type" id="">
                        <option value="tprs">tprs</option>
                        <option value="chat">chat</option>
                        <option value="ask">ask</option>
                    </select>
                    <div>
                        <input name="text" className='ring-1' id="" cols="30" rows="10" defaultValue='i am eating an apple '></input>
                        <input name="trans" className='ring-1' id="" cols="30" rows="10" defaultValue='Wǒ zhèngzài chī píngguǒ'></input>
                        <input name="latin" className='ring-1' id="" cols="30" rows="10" defaultValue='我正在吃蘋果'></input>
                        <button onClick={copyAudioText}>Copy</button>
                    </div>
                    <input name='audios' type="file" multiple="multiple" />
                    <button type='submit'>add</button>
                </form>
            </section>
            <section>{
                data?.sort((a, b) => a?.ind - b?.ind)?.map(item => (
                    <Item item={item} key={item?.id} />
                ))
            }</section>
        </div>
    )
}

export default MainAdder


function Item({ item }) {
    console.log(item);

    async function addAudio(e) {
        const audio = await getBase64(e?.target?.files[0])
        await updateDb(item?.id, 'chats', { audio })
        playAudio(audio)
    }

    function onClickHandler() {
        playAudio(item?.audio)
        navigator.clipboard.writeText(item?.trans)
    }

    return (
        <div onClick={onClickHandler} className={(!item?.audio ? ' text-orange-900 ' : '') + ' ring-1 p-2 '}>
            <small>{item?.ind + 1} {item?.type}</small>
            <input onInput={addAudio} type="file" />
            <div className='flex flex-wrap'>
                {
                    item?.transLines?.sort((a, b) => a?.ind - b?.ind)?.map(line => (
                        <div className='flex flex-col ring-1d p-1 rounded-md'>
                            <small>{line?.trans}</small>
                            {/* <small>{line?.text}</small> */}
                        </div>
                    ))
                }
            </div>
            <div className='flex flex-col leading-4'>
                <small>{item?.latin}</small>
                <small>{item?.text}</small>
            </div>
            <button onClick={_ => deleteDb(item?.id, 'chats')}>delete</button>
        </div>
    )
}


function splitTrans(trans) {
    let split = trans?.split(' ')
    console.log(split);
}