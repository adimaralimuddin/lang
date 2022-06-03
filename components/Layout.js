


import React from 'react'
import LearnHeaderView from './LearnHeaderView'

function Layout({ children }) {
    return (
        <div
            className='bg-[#ECF6F6]d bg-[#F7F3FB] text-lg
        text-gray-700 
        dark:bg-[#0C0A0E] dark:text-gray-400 min-h-screen '
        >
            {/* <LearnHeaderView /> */}
            {children}
        </div>
    )
}

export default Layout