


// import { useState } from 'react'
// import { EditorChatsStore } from '../../stores/editorStore'
// import Box from '../others/Box'
// import TextH2 from '../others/TextH2'
// import { languagesLists } from './EditorChatsView'

// function MenuLarge() {
//     const [show, setShow] = useState(true)
//     const chats = EditorChatsStore()

//     const toggle = () => setShow(p => !p)

//     return (
//         <div>
//             <button onClick={toggle}>
//                 Menu
//             </button>
//             {show && <div
//                 className={`
//                 w-full left-0 h-full 
//                 fixed ring-1d p-2 bg-gray-100 top-0 flex items-center justify-center 
//                 overflow-y-auto
//                 `}
//             >
//                 <Box show='true'
//                     className={`
//                 p-5 max-w-3xl w-full
//                 `}
//                 >
//                     <div>
//                         <h1>current Language</h1>
//                         <p>{chats?.selectedLang[2]}</p>
//                         <button onClick={toggle}>x</button>
//                     </div>
//                     {/* <hr /> */}
//                     <List
//                         lists={chats?.currentLang?.levels}
//                         title='Level'
//                     />
//                     {/* <hr /> */}
//                     <List
//                         lists={chats?.currentLang?.stages}
//                         field='name'
//                         title='Stage'
//                     />
//                     {/* <hr /> */}
//                     <List
//                         lists={languagesLists}
//                         field='2'
//                         title='Languages'
//                     />
//                 </Box>
//             </div>}
//         </div>
//     )
// }

// export default MenuLarge

// function List({ title, lists, field, onClick }) {

//     const [show, setShow] = useState(false)
//     const toggle = () => setShow(p => !p)
//     return (
//         <div className=' py-2 text-center flex flex-col justify-center items-center'>
//             <TextH2>{title}</TextH2>
//             <p onClick={toggle}
//                 className='ring-1 mx-auto w-full max-w-[400px] py-2 rounded-md'
//             >
//                 {lists?.[0]?.[field] || lists?.[0]}
//             </p>
//             <div className='relative '>
//                 {show && <ul
//                     className='flex flex-col top-5 py-2 w-full  sabsolute fp-2 ring-1 ring-gray-300 bg-white rounded-md shadow-md overflow-y-auto max-h-[300px]d'>
//                     {lists?.map((list, ind) => (
//                         <li
//                             onClick={() => onClick(list, lists, ind)}
//                             className={`
//                         p-2 m-1 cursor-pointer rounded-md ring-1s
//                         hover:bg-gray-100 
//                         `}
//                         >
//                             {list?.[field] || list}</li>
//                     ))}
//                 </ul>}
//             </div>
//         </div>
//     )
// }