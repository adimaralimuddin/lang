


import { useState } from 'react'

function FloatingChatTool({ replay, play }) {
    const [show, setShow] = useState(true)

    function toggle() {
        setShow(p => !p)
    }

    return (
        <div className="fixed top-[85px] right-3 ">
                <span onClick={toggle}
                    className="mb-2  material-icons p-1 px-4 text-md dark:bg-gray-600 dark:text-gray-200 dark:ring-0 bg-[#26CCA4] shadow-lg ring-1 cursor-pointer hover:scale-105 ring-gray-300 text-white rounded-full h-[40px] w-[40px] flex items-center justify-center">
                    widgets
                </span>
            {show && <div className="flex flex-col items-center ">
                <span onClick={play}
                    className="mb-2  material-icons p-1 px-4 text-md dark:bg-gray-600 dark:text-gray-200 dark:ring-0 bg-white shadow-lg ring-1 cursor-pointer hover:scale-105 ring-gray-300 text-gray-500 rounded-full h-[40px] w-[40px] flex items-center justify-center">
                    play_arrow
                </span>
                <span
                    //  onClick={() => store.setShowScript(p => !p)}
                    className="mb-2  material-icons p-1 px-4 text-md dark:bg-gray-600 dark:text-gray-200 dark:ring-0 bg-white shadow-lg ring-1 cursor-pointer hover:scale-105 ring-gray-300 text-gray-500 rounded-full h-[40px] w-[40px] flex items-center justify-center">
                    translate
                </span>
                <span onClick={replay}
                    className="mb-2  material-icons p-1 px-4 text-md dark:bg-gray-600 dark:text-gray-200 dark:ring-0 bg-white shadow-lg ring-1 cursor-pointer hover:scale-105 ring-gray-300 text-gray-500 rounded-full h-[40px] w-[40px] flex items-center justify-center">
                    replay
                </span>
            </div>}
        </div>
    )
}

export default FloatingChatTool