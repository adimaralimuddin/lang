





export function RoundButtonLg(props) {

    function onClickHandler() {
        if (props.allow) {
            props?.onClick()
        }
    }

    function style() {
        return props?.allow ?
            `
            ring-gray-300 text-white bg-white shadow-lg 
            hover:bg-white hover:scale-105
            dark:bg-gray-600 ring-1
            dark:text-gray-200
            `
            :
            `bg-gray-300
            hover:bg-gray-300
            text-gray-600
            dark:bg-gray-700
            `
    }

    return (
        <button {...props}
            onClick={onClickHandler}
            className={`
                    mr-2 material-icons p-1 px-4 text-md  dark:ring-0 
                     cursor-pointer  
                    rounded-full h-[50px] w-[50px]
                    flex items-center justify-center ` + style()
            }>
            {props?.children}
        </button >

    )
}

export function RoundButtonMd(props) {
    return (
        <button {...props}
            className=" disabled:bg-gray-200 disabled:text-gray-400 disabled:ring-0 mr-2 material-icons p-1 px-4 text-md dark:bg-gray-600 dark:text-gray-200 dark:ring-0 bg-white shadow-lg ring-1 cursor-pointer hover:scale-105 ring-gray-300 text-white rounded-full h-[50px] w-[50px] flex items-center justify-center">
            {props?.children}
        </button>

    )
}
