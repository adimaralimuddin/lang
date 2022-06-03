







function Icon(props) {
    return (
        <span {...props}
            className={'material-icons cursor-pointer m-1 p-2 ring-1d rounded-full hover:text-green-500 ' + props?.className} >
            {props?.children}
        </span >
    )
}

export default Icon

