

export function wordColor(type, skip) {
    if (skip) return;
    switch (type) {
        case 'pronoun':
            return ' text-[#2da688] '
        case 'linkingVerb':
            return ' text-[#1f6e53] '
        case 'verb':
            return ' text-green-600 font-semibold '
        case 'preposition':
            return ' text-[#3884c7] '
        case 'article':
            return ' text-[#448192] '
        case 'adverb':
            return ' text-[#448192] '
        case 'negative':
            return ' text-[#b43d04] '
        case 'question':
            return ' text-[#ada10d] '
        case 'positive':
            return ' text-[#00d0bf] '
        default:
            return ' dark:text-slate-600 text-slate-500 '

    }
}