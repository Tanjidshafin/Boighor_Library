import React from 'react'

const Subscribe = () => {
    return (
        <div className='mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8'>
            <div className='rounded-lg h-[30rem] p-5 lg:p-10 bg-gray-100 dark:bg-gray-800 flex gap-5 flex-col md:flex-row items-center justify-evenly '>
                <img className='w-[30rem] mx-auto rounded-xl mt-12' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXlmv7nGQtNP5PHKaPr619vslceRSr5Rqu7Q&s" alt="" />
                <div className='max-w-[30rem] px-5 text-center'>
                    <p className='text-3xl font-bold dark:text-gray-200'>STAY WITH US</p>
                    <p className='text-gray-400 text-sm my-3 '>Subscribe to our newsletters now and stay up-to-date with new collections, the latest lookbooks and exclusive offers.</p>
                    <div>
                        <div className='flex justify-center relative'>
                            <input type='email' placeholder='Email' className='border border-[#e5eaf2] dark:border-gray-600 py-3 pl-4 pr-[115px] outline-none w-full rounded-md' />
                            <span className='bg-[#3B9DF8] text-white absolute top-0 right-0 h-full px-5 flex items-center justify-center rounded-r-md cursor-pointer hover:bg-gray-400 group'>
                                Subscribe
                            </span>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Subscribe