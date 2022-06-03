import LangLessonItem from "./LangLessonItem";




export default function LangLevelItem({ level, lessons }) {

    if (!lessons || lessons?.length == 0) return null;

    return (
        <div className='pb-10'>
            <header className='px-5 p-3 text-center items-center flex justify-center flex-col'>
                <img src={`/image/${level}.png`} width='90' alt="" />
                <h1 className='text-xl py-3 font-bold text-[#786686] '>{level?.toUpperCase()}</h1>
            </header>
            <div className='flex flex-wrap justify-center items-center'>
                {
                    lessons?.map(
                        lesson => <LangLessonItem lesson={lesson} level={level?.name} key={level?.name + lesson?.name} />
                    )
                }
            </div>
            <div className="h-1 bg-[#D7CBDC] dark:bg-gray-800 w-full max-w-sm mt-10 mx-auto"></div>
        </div>
    )
}