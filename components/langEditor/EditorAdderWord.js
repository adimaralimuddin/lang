import { createCustumeChat } from "../editor/editorApi";



export default function EditorAdderWord({ level, lesson, content, contentId }) {

    function onSubmitHandler(e) {
        e.preventDefault()
        const form = e.target
        console.log({ level, lesson, content, contentId });
        
        const data = {
            type: 'word',
            align: 'center',
            level: chats.level,
            stage: chats.stage,
            showTrans: true,
            withTextAudio: true,
            word: word,
            ...getLang(chats.selectedLang),
            words: [...new Set([...extras, word])],
            extras: extras.filter(ex => ex != word),
        }
        createCustumeChat(data, chats)
        // reset(e)

    }


    return (
        <form onSubmit={onSubmitHandler} className='ring-1 rounded-md p-2 m-1 flex flex-col' >
            <span className="flex flex-col">
                <label htmlFor="">word</label>
                <input className="ring-1 w-[200px]" name='word' type="text" />
            </span>
        </form>
    )
}