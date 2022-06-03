



import React from 'react'

function Box(props) {

  const show = () => props?.show == 'true' ? '' : ' hidden '
  // if (!props?.show) return null;
  return (
    <div
      {...props}
      className={`
            bg-[#FAFAFF]
            hover:ring-0
            dark:text-[#6F7387]
            hover:bg-white
            shadow-[0px_4px_15px_rgba(0,0,0,0.07)] 
            dark:shadow-none
            p-3 m-3  min-w-[150px]  hover:ring-1 
            rounded-3xl flex flex-col 
          dark:bg-[#161F2E]
            ${show()}
          ` + props?.className}
    >{props?.children}</div>
  )
}

export default Box