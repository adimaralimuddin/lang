

import Link from 'next/link'
import React from 'react'
import MenuLarge from './editor/MenuLarge'
import SelectLanguage from './others/SelectLanguage'
import SelectLevel from './others/SelectLevel'
import ThemToggle from './others/ThemToggle'
import { useRouter } from 'next/router'

function LearnHeaderView() {
    const router = useRouter()
    return (
        <div className=' justify-around flex-wrap flex px-10 sticky top-0 bg-white dark:bg-gray-800 p-2 sjustify-around items-center'>
            <Logo />
            <SelectLanguage params={router.query} />
            <SelectLevel params={router.query} />
            <section className='flex'>
                <ThemToggle />
                <Link href={'/editor'}>edit</Link>
            </section>
        </div>
    )
}

export default LearnHeaderView

export function Logo() {
    return (
        <Link href='/'>
            <section className='flex flex-col px-5'>
                <h1 className='text-3xl font-semibold text-[#26CCA4] dark:text-violet-200 '>
                    QLang
                </h1>
                <small className='-mt-2 text-gray-500'>By Adimar</small>
            </section>
        </Link>
    )
}

export function MenuLink({ href, children }) {
    return (
        <Link href={href || '/'}>
            <p>{children}</p>
        </Link>
    )
}

