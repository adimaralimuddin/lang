import Icon from "./Icon"


import React from 'react'

function IconLabel(props) {
    return (
        <span {...props} className='flex items-center text-center cursor-pointer'>
            <Icon className=''>{props?.icon || props?.children?.toLowerCase()}</Icon>
            <p className="">{props.children}</p>
        </span>
    )
}

export default IconLabel