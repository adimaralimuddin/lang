import { EditorChatsStore } from "../../stores/editorStore"
import { ChatItem } from "./ChatItem"
import { useState, useEffect, useRef } from 'react'
import { deleteDb, getDb, listenChats } from "../../appApi/dbApi"
import ChatWordsItemView from "./ChatWordsItemView"
import ChatCheckPointView from "./ChatCheckPointView"
import ChatQuestionItemView from "./ChatQuestionItemView"
import { focusDiv, playAudio } from "../../appApi/toolApi"
import create from 'zustand'
import { RoundButtonLg } from "../others/ChatsNextButton"
import ChatLastItem from "./ChatLastItemView"
import ChatLastItemView from "./ChatLastItemView"
import ChatWordView from "./ChatWordView"
import ChatStepStartView from "./ChatStepStartView"
import FloatingChatTool from "../others/FloatingChatTool"
import ChatHeaderView from "./ChatHeaderView"
import { useRouter } from 'next/router'

export const ChatViewStore = create(set => ({
    proceed: false,
    setProceed: (boolean) => set({ proceed: boolean }),
    playChatInd: 0,
    // setPlayChatInd: number => set(p => ({ playChatInd: number })),
    isPlayAll: false,
    // setIsPlayAll: _ => set(p => ({ isPlayAll: !p.isPlayAll })),
    showScript: true,
    // setShowScript: _ => set(p => ({ showScript: !p.showScript })),
    isFinish: false,
    // setIsfinish: (boolean) => set({ isFinish: boolean }),
    isRestarted: false,
    // setRestarted: boolean => set({ isRestarted: boolean }),
    set: data => set(data),
    play: (index, hooks, div) => set(p => {
        hooks?.[p.playChatInd]?.stop?.()
        hooks.current = index
        focusDiv(div?.current)
        return { playChatInd: index, isRestarted: false }
    }),
    next: (hooks) => set(p => {
        hooks?.[p.playChatInd + 1]?.play()
        return { isRestarted: true, proceed: false }
    }),
    done: () => set(p => {
        return { proceed: true }
    }),
    restart: () => set({
        playChatInd: 0,
        isRestarted: true,
        isFinish: false,
        proceed: false,
    }),
    finish: () => set(p => {
        return { isFinish: true }
    })
}))

function ChatsView({ learnData }) {

    const chats = EditorChatsStore()
    const store = ChatViewStore()
    const hooks = {}
    const router = useRouter()

    useEffect(() => {
        if (learnData) {
            chats.set(learnData)
        }
        const query = {
            langCode: chats.selectedLang?.[0],
            level: chats.level,
            stage: chats.stage,
        }
        const ret = listenChats(query, data => {
            store.set({ lists: data })
        })

    }, [learnData, chats?.selectedLang, chats?.level, chats?.stage])

    function next() {
        store.next(hooks)
    }

    function play() {
        hooks?.[store.playChatInd]?.play()
    }

    function replay() {
        hooks?.[store.playChatInd]?.stop()
        playAudio('/audio/restart1.mp3', () => {
            hooks?.[0]?.play()
        })
        store.restart()
        for (const key in hooks) {
            if (hooks[key]?.reset) {
                hooks[key]?.reset()
            }
        }
    }

    function removeUnidentified(id) {
        deleteDb(id, 'chats')
    }


    return (
        <div className={`
            flex-1 flex flex-col max-w-2xl h-full w-full
             mx-auto
              `}
        >
            <div className="items-center justify-center px-5 pb-5 flex-1 overflow-y-auto max-h-[80%] pt-5">
                <ChatHeaderView learnData={learnData} />
                {
                    store?.lists?.map(
                        (chat, index) => {
                            // return 'item'
                            const props = { data: chat, store, index, hooks, key: chat?.id }

                            switch (chat?.type) {
                                case 'conver':
                                    return <ChatItem {...props} />
                                case 'words':
                                    return <ChatWordsItemView {...props} />
                                case 'checkpoint':
                                    return <ChatCheckPointView {...props} />
                                case 'question':
                                    return <ChatQuestionItemView {...props} />
                                case 'word':
                                    return <ChatWordView {...props} />
                                case 'stepStart':
                                    return <ChatStepStartView {...props} />
                                default:
                                    return <p key='whateverthisis' onClick={() => removeUnidentified(chat?.id)}>unidentified {chat.type}</p>
                            }
                        }
                    )
                }
                <ChatLastItemView
                    store={store}
                    hooks={hooks}
                    index={store?.lists?.length}
                    router={router}
                    learnData={learnData}
                    key={store?.lists?.length}
                />
                {store.proceed && <NextButton next={next} store={store} />}

            </div>
            <FloatingChatTool
                play={play}
                replay={replay}
            />
        </div >
    )
}

export default ChatsView


function NextButton({ next, store }) {
    const divRef = useRef()

    useEffect(() => {
        focusDiv(divRef?.current)
    }, [])

    return (
        <div ref={divRef} className="flex py-3">
            <button onClick={next}
                className=" text-2xl mx-auto p-3 w-full sm:max-w-[300px] rounded-md hover:bg-green-400 hover:shadow-md hover:scale-105 transition-all bg-[#26CCA4] text-white">NEXT</button>
        </div>
    )
}
