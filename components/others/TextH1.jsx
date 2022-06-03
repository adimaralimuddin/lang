

import React from 'react'

function TextH1(props) {
    return (
        <h1
            {...props}
            className={`
            text-4xl
            font-bold
            text-[#26CCA4]
            ` + props?.className}
        >
            {props.children}
        </h1>
    )
}

export default TextH1