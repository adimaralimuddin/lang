

import { useState } from 'react'
import { createChat } from '../editorApi'


function AdderEditor({ router, length }) {
    const [words, setWords] = useState()
    const [align, setAlign] = useState('start')
    const [hasError, setHassError] = useState(false)
    const [index, setIndex] = useState(length || 0)


    function chatAdder(line) {
        line = line?.split('/')?.map(w => w?.trim())
        const type = line[0]?.replace('.', '')?.trim()
        // console.log(type);
        line?.filter((x, ind) => ind != 0)?.map(word => {
            word = word?.trim()
            if (word == '') return
            let libs

            let al = ''
            const words_ = word?.split('.')?.map((line, ind) => {
                let text = line?.trim()
                if (ind == 0) {
                    console.log(line);
                    if (text?.includes('A:') || text?.includes('B:') || text?.includes('C:') || text?.includes('D:')) {
                        line = text?.substring(2)?.trim()
                        al = text?.substring(0, 2)?.trim()
                    }
                }
                if (text?.includes('#')) {
                    const flibs = word?.split(' ')?.filter(i => i.includes('#'))
                    libs = ([...new Set([...flibs?.map(i => i?.trim()?.replace('#', '')?.replace('.', ''))])])
                }
                line = line?.replace('^', '')?.replace('>', '')?.replace('#', '')
                return line
            })


            const data = {
                type,
                libs: libs || [],
                align: al,
                index,
                words: words_?.filter(w => w?.trim() !== '')
            }

            console.log(data);
            createChat(data, router.query)
        })
    }


    function onSubmitHandler(e) {
        if (hasError) return alert('type error')
        e.preventDefault()
        const text = e.target?.text?.value?.trim()
        if (text.trim() == '') return;
        checkType(e.target)
    }

    function onEnterHandler(e) {
        const text = e.target.value.trim()
        setWords([...new Set([...text.split('@')])]?.filter(p => p != '' && p != '@'))
    }

    function checkType(form) {
        const text = form?.text?.value?.trim()
        const lines = text?.split('@')
        lines?.map(line => {
            // const split = line?.trim()?.split('.')
            // console.log(split);
            // const type = split?.[0]?.trim()
            // if (type == '') return
            // if (type == 'chat' || type == 'tprs') {
            chatAdder(line)
            clear(form)
            //     return
            // }
            // const filt = split?.filter((a, ind) => ind != 0)
            // const words = filt?.filter(w => (w?.trim() != ''))?.map(w => w.trim())
            // const data = {
            //     type, align, words, index
            // }

            // createChat(data, router.query)
            // clear(form)
        })
    }

    function clear(form) {
        setAlign(align == '-1' ? '-2' : '-1')
        form.text?.value = ''
        setWords(null)
    }

    function typeChecker(type) {
        const t = type?.trim()
        if (t == 'ask' || t == 'pair' || t == 'word' || t == 'chat' || t == 'image' || t == 'tprs') {
            return ' text-green-700 font-semibold '
        } else {
            return ' text-red-600 '
        }
    }

    return (
        <div>
            <div className='flex flex-wrapd overflow-x-autod pb-1 pl-1'>
                {
                    words?.map((word, ind) => {
                        const line = word?.split('.')
                        return <div className='m-1 p-1 ring-1 rounded-md'>
                            <small className={' leading-3 ' + typeChecker(line[0])}>{line[0]}</small>
                            <div className='flex flex-wrap items-center justify-start'>
                                {
                                    line?.filter((l, ind) => ind !== 0 && l.trim() != '')?.map(
                                        w => (
                                            <small className=' text-gray-500 leading-3 p-1 rounded-md dark:ring-slate-800 ring-[1px] m-[2px] bg-gray-900 '>
                                                {w}
                                            </small>
                                        )
                                    )
                                }
                            </div>
                        </div>
                    }
                    )
                }
            </div>
            <form onSubmit={onSubmitHandler}
                className='flex'>
                <small>{align}</small>
                <input name='text' type="text"
                    autoComplete='off'
                    className={(align == 'start' ? 'ring-2 ring-green-900' : '') + ' text-gray-500 ml-1 ring-1 rounded-md w-full text-[16px]'}
                    onInput={onEnterHandler}
                />
            </form>
        </div>
    )
}

export default AdderEditor