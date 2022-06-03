
// import { deleteDB } from '@firebase/util'
// import { useState, useRef, useEffect } from 'react'
// import { listenChats, listenWhere } from '../../../appApi/dbApi'
// import { EditorChatsStore, EditorConversStore } from '../../../stores/editorStore'
// import { buildChat, createChat, translateFromLatin } from '../editorApi'



// export default function EditorCreateChatsLists() {
//     const chats = EditorChatsStore()
//     const convers = EditorConversStore()
//     const divRef = useRef()
//     const [playChatInd, setPlayChatInd] = useState(0)
//     const hooks = {}

//     useEffect(() => {
//         // divRef.current.scrollIntoView({ behavior: "smooth" });
//         // divRef.current.scrollTop = divRef.current.scrollHeight
//     }, [chats?.lists])

//     useEffect(() => {
//         console.log('changeing');
//         if (!chats?.selectedLang) {
//             console.log('no selected lang');
//         }
//         const ret = listenChats({
//             lang: chats.selectedLang[0],
//             level: chats.level,
//             title: chats.title,
//         }, data => chats.set({ lists: data }))
//     }, [chats?.selectedLang, chats?.level, chats?.title])


//     return (
//         <div className=''>
//             {/* <div ref={divRef} className=' max-h-[430px] overflow-y-scroll '>
//                 {
//                     chats?.lists?.map(
//                         (chat, ind) => <ChatItem
//                             data={chat}
//                             chats={chats}
//                             index={ind}
//                             playChatInd={playChatInd}
//                             setPlayChatInd={setPlayChatInd}
//                             hooks={hooks}
//                             key={ind}
//                         />)
//                 }
//             </div> */}
//             {/* <Adder chats={chats} convers={convers} /> */}
//         </div>
//     )
// }


// function Adder({ chats }) {
//     const [translated, setTranslated] = useState('')

//     const inputARef = useRef()
//     const inputBRef = useRef()
//     // console.log(chats.selectedLang);




//     function onAddHandler(e, align) {
//         e.preventDefault()
//         const text = e.target?.english?.value
//         const textArr = text?.split('.')
//         if (!text) return
//         createChat({
//             textArr, align,
//             level: chats.level,
//             title: chats.title,
//             langText: chats.langText,
//             lang: chats?.selectedLang,
//         })
//         e.target?.english?.value = ''
//         align == 'end' ? inputARef?.current?.focus() : inputBRef?.current?.focus()
//     }

//     return (
//         <div className='p-1 rounded-md my-2 '>
//             <div className='flex'>
//                 <form onSubmit={e => onAddHandler(e, 'start')}
//                     className='m-1 flex-1 p-2 bg-gray-800 ring-1 ring-gray-700 rounded-2xl flex'>
//                     <input
//                         className='flex-1'
//                         ref={inputARef} name='english' type="text" autoComplete='off' />
//                 </form>
//                 <form onSubmit={e => onAddHandler(e, 'end')}
//                     className='m-1 flex-1 p-2 bg-gray-800 ring-1 ring-gray-700 rounded-2xl flex'>
//                     <input
//                         className='flex-1'
//                         ref={inputBRef} name='english' type="text" autoComplete='off' />
//                 </form>

//             </div>
//         </div>
//     )
// }


// export function ChatItem({ data, chats, index, setPlayChatInd, playChatInd, hooks }) {

//     const audioRef = useRef()
//     const [showOptions, setShowOptions] = useState(false)
//     const [au, setAu] = useState(data?.lines?.[0]?.audio)
//     const [playInd, setPlayInd] = useState(0)
//     const [isPlaying, setIsplaying] = useState(false)
//     const [playState, setPlayState] = useState(false)
//     const divRef = useRef()
//     const [showScript, setShowSript] = useState(false)

//     // console.log(data);

//     function stop() {
//         setPlayState(false)
//         setIsplaying(false)
//         audioRef.current.pause()
//         audioRef?.current?.currentTime = 0
//     }

//     function pause() {
//         if (playState) {
//             setPlayState(false)
//             return audioRef.current.pause()
//         }
//         audioRef.current.play()
//         setPlayState(true)
//         audioRef.current?.autoplay = true
//     }

//     function playParag(audio, ind) {
//         setAu(audio)
//         setPlayInd(ind)
//         setPlayState(true)
//         audioRef.current?.play()
//         audioRef?.current?.currentTime = 0
//     }

//     function play() {
//         setAu(data?.lines[0]?.audio)
//         hooks?.current?.stop()
//         setPlayInd(0)
//         setPlayState(true)
//         audioRef.current?.play()
//         audioRef?.current?.currentTime = 0
//         audioRef.current?.autoplay = true
//         hooks.current = myLogics()
//     }

//     function playNext() {
//         if (playInd >= data?.length - 1) {
//             console.log(`done ${playInd} ${data?.length - 1}`);
//             hooks[index + 1]?.play()
//             setPlayState(false)
//             setIsplaying(false)
//             chats.set({ chatInd: index + 1 })
//             return
//         }
//         setAu(data?.lines[playInd + 1]?.audio)
//         setPlayInd(p => p + 1)
//     }

//     function onDeleteHandler() {
//         console.log(data.id);
//         deleteDB(data.id, 'chats')
//     }

//     const style = () => data?.align == 'end' ? 'justify-end' : ''
//     const stylePlaying = () => isPlaying ? ' bg-gray-800 ring-2 ring-violet-900 ' : ''

//     function myLogics() { return ({ play, stop, pause, index }) }

//     hooks[index] = myLogics()
//     // console.log(data);

//     return (
//         <div ref={divRef} className={' my-4 mx-1 flex ' + style()}  >
//             <audio
//                 ref={audioRef}
//                 onEnded={playNext}
//                 src={au}
//                 onPlay={() => setIsplaying(true)}
//             />
//             <div className={stylePlaying() + `p-2 max-w-[80%] ring-1 ring-gray-700 min-w-[150px] hover:bg-gray-800 rounded-2xl flex flex-col`}>
//                 <div className='z-30 flex justify-between'>
//                     <div className='flex'>
//                         <p>{data.length}</p>
//                         <button onClick={play} className=''>start</button>
//                         <button onClick={pause} className=''>{playState ? 'pause' : 'play'}</button>
//                         <button onClick={stop} className=''>stop</button>
//                         <button onClick={() => setShowSript(p => !p)} className=''>script</button>

//                     </div>
//                     <div>
//                         <button onClick={() => setShowOptions(p => !p)}>opt</button>
//                         {showOptions && <span className='relative'>
//                             <div className='absolute top-8 ring-1 right-0 p-2 rounded-md flex flex-col bg-gray-800'>
//                                 <button>edit</button>
//                                 <button onClick={onDeleteHandler}>delete</button>
//                             </div>
//                         </span>}
//                     </div>
//                 </div>
//                 {
//                     data.lines?.sort((a, b) => a.ind - b.ind)?.map(
//                         line => <LineItem
//                             data={line}
//                             playInd={playInd}
//                             isPlaying={isPlaying}
//                             lang={data.lang}
//                             showTrans={chats.showTrans}
//                             playParag={playParag}
//                             langCode={data?.langCode}
//                             showScript={showScript}
//                             // langText={data?.langText}
//                             key={line.ind}
//                         />)
//                 }
//             </div>
//         </div>
//     )
// }

// function LineItem({ data, playInd, isPlaying, showTrans, lang, playParag, langCode, showScript }) {
//     const audioRef = useRef()

//     function onPlay() {
//         playParag(data.audio, data.ind)
//     }

//     const stylePlaying = (cStyle = ' text-purple-400') => (playInd == data?.ind && isPlaying) ? cStyle : ''

//     return (
//         <span className={stylePlaying() + ' my-2'}  >
//             <Parag data={data?.latin || data?.trans} lang={lang} langCode={langCode} />
//             {showScript && <p>{data?.trans || 'no script for this language'}</p>}
//             {showTrans && <p
//                 onClick={onPlay}
//                 className={'text-gray-500 cursor-pointer ' + stylePlaying(' text-sky-700 ')}>{data?.text}</p>}

//         </span>
//     )
// }

// function Parag({ data, lang, langCode }) {
//     const split = data.split(' ')

//     return (
//         <div className='flex flex-wrap'> {
//             split.map((word, ind) => <Word word={word} lang={lang} langCode={langCode} key={word + ind} />)
//         } </div>
//     )
// }

// function Word({ word, lang, langCode }) {
//     const [trans, setTrans] = useState()
//     const [openTrans, setOpenTrans] = useState(false)

//     async function onClickHandler(text) {
//         if (!trans) {
//             const res = await translateFromLatin({ text, lang, langCode })
//             setTrans(res)
//         }
//         setOpenTrans(p => !p)
//     }
//     // console.log(openTrans);
//     const wordStyle = () => openTrans ? 'text-violet-400' : ''
//     return <span
//         onClick={() => onClickHandler(word)}

//         className={'hover:bg-sky-800 cursor-pointer hover:text-gray-300 flex flex-col p-[2px] rounded-sm ' + wordStyle()}
//     >
//         {openTrans && <span className='relative'>
//             <span className='cursor-pointer absolute p-2 whitespace-nowrap text-gray-400 bottom-5 bg-violet-900 rounded-md'
//             >
//                 {trans?.english} {trans?.trans}
//             </span>
//         </span>}
//         {word}
//     </ span>
// }

