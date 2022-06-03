


import { useTheme } from 'next-themes'
import React from 'react'
import { useEffect, useState } from 'react'

function ThemToggle() {
    const { theme, setTheme, systemTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    function change() {
        if (!mounted) return null;
        const currentTheme = theme == 'system' ? systemTheme : theme
        if (currentTheme == 'dark') {
            return <span className='text-gray-200 material-icons cursor-pointer hover:text-gray-400' onClick={() => setTheme('light')}>
                light_mode
            </span>
        } else {
            return <span className=' material-icons cursor-pointer hover:text-gray-400' onClick={() => setTheme('dark')}>
                nightlight
            </span>
        }
    }

    return (
        <div
        // className='bg-white p-2 ring-1 dark:bg-red-400'
        >
            {change()}
        </div>
    )
}

export default ThemToggle