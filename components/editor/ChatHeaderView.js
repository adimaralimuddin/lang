

import TextH2 from '../others/TextH2'

function ChatHeaderView({learnData }) {
    return (
        <div className='text-center flex items-center flex-wrap'>
            <TextH2 className='mx-2'>{learnData?.selectedLang?.[2]} </TextH2> /
            <p className='mx-2'>{learnData?.level?.replace('_', ' ')} </p> /
            <p className='mx-2'>{learnData?.stage?.replace('_', ' ')}</p>
        </div>
    )
}

export default ChatHeaderView