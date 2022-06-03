import { apiGetAllLanguages } from "../../../appApi/restApi"
import { EditorChatsStore } from "../../../stores/editorStore"




export default function GetLanguage() {
    // const chats = EditorChatsStore()

    async function get() {
        const languages = await apiGetAllLanguages()

    }
    return (
        <div>

        </div>
    )
}
