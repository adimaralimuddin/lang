



import React from 'react'

function TextH2(props) {
    return (
        <h2
            {...props}
            className={`
            text-2xl
            font-semibold
            text-[#28b997]
            ` + props?.className}
        >
            {props.children}
        </h2>
    )
}

export default TextH2