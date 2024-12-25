import React, { useContext } from 'react'
import { AppContext } from '../Context/AppContext'
import ReactStars from "react-rating-stars-component";
import { NavLink } from 'react-router';
const NewBooks = () => {
    const { books } = useContext(AppContext)
    return (
        <div className='mx-auto my-14 max-w-screen-xl px-4 sm:px-6 lg:px-8'>
            <p className="text-4xl font-extrabold text-center mb-5 text-gray-800 dark:text-white">New <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-[#1A365D]">Books</span> </p>
            <p className='mx-auto mb-12 text-center max-w-[55rem]'>Discover a curated collection of contemporary literature, featuring diverse voices, innovative storytelling, and thought-provoking themes for today's readers. Explore now!</p>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                {books.slice(0, 4).map(book => (<a className="group rounded-xl relative block overflow-hidden">
                    <button
                        className="absolute end-4 top-4 z-10 font-semibold  w-9 h-9 rounded-full bg-white p-1.5 text-gray-900 transition hover:text-gray-900/75"
                    >
                        {book.quantity}

                    </button>

                    <img
                        src={book.image}
                        alt=""
                        className="h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
                    />

                    <div className="relative border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
                        <div className='flex items-center gap-5'>
                            <p className="text-gray-700">
                                <div className='flex items-center gap-2'>
                                    <span className='font-semibold dark:text-gray-400'>{book.rating}</span>
                                    <ReactStars
                                        count={5}
                                        value={book.rating}
                                        edit={false}
                                        size={24}
                                        activeColor="#ffd700"
                                    />

                                </div>
                            </p>
                            <span className="whitespace-nowrap text-white bg-blue-500 px-3 py-1.5 text-xs font-semibold"> {book.category}</span>
                        </div>

                        <h3 className="mt-1.5 text-lg font-semibold dark:text-gray-200 text-gray-900">{book.name}</h3>
                        <h3 className="mt-1.5 dark:text-gray-300  text-md font-medium text-gray-900">{book.author_name}</h3>

                        <p className="mt-1.5 dark:text-gray-400  line-clamp-3 text-gray-700">
                            {book.book_content}
                        </p>

                        <form className="mt-4 flex gap-4">
                            <NavLink to={`/book/${book._id}`}
                                className="block dark:bg-gray-600 rounded bg-gray-100 px-4 py-3 text-sm font-medium dark:text-gray-300 text-gray-900 transition hover:scale-105"
                            >
                                Details
                            </NavLink>


                        </form>
                    </div>
                </a>
                ))}
                <div className='flex justify-center md:justify-start md:items-end '>
                    <div>
                        <button
                            className="relative inline-flex items-center justify-start py-3 pl-4 pr-12 overflow-hidden font-semibold text-blue-500 transition-all duration-150 ease-in-out rounded hover:pl-10 hover:pr-6 bg-gray-50 group">
                            <span
                                className="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-blue-500 group-hover:h-full"></span>
                            <span className="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
                                <svg className="w-5 h-5 text-green-400" fill="none" stroke="#3B9DF8" viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                                </svg>
                            </span>
                            <span
                                className="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
                                <svg className="w-5 h-5 text-green-400" fill="none" stroke="#fff" viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                                </svg>
                            </span>
                            <span className="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white">See All Books</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewBooks