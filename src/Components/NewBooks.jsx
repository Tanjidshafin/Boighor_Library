import React, { useContext, useState } from 'react'
import { AppContext } from '../Context/AppContext'
import { NavLink } from 'react-router';
import { TailSpin } from 'react-loader-spinner';
import { FaStar, FaBookOpen } from "react-icons/fa"
import { motion } from "framer-motion"
const NewBooks = () => {
    const { books } = useContext(AppContext)
    const [loading, setLoading] = useState(true);
    React.useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);
    const latestBooks = books.slice().reverse().slice(0, 4);
    return (
        <div className='mx-auto my-14 max-w-screen-2xl px-4 sm:px-6 lg:px-8'>
            <p className="text-4xl font-extrabold text-center mb-5 text-gray-800 dark:text-white">New <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-[#1A365D]">Books</span> </p>
            <p className='mx-auto mb-12 text-center max-w-[55rem]'>Discover a curated collection of contemporary literature, featuring diverse voices, innovative storytelling, and thought-provoking themes for today's readers. Explore now!</p>
            {loading ? (<div className="flex justify-center items-center h-48">
                <TailSpin
                    visible={true}
                    height="80"
                    width="80"
                    color="#4fa94d"
                    ariaLabel="tail-spin-loading"
                    radius="1"
                />
            </div>) : (<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                {latestBooks.map(book => (
                    <motion.div
                        whileHover={{ y: -5 }}
                        transition={{ duration: 0.3 }}
                        className="relative bg-gradient-to-br from-blue-400 to-blue-100 dark:from-blue-400 dark:to-blue-900 rounded-3xl shadow-xl overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 bg-yellow-400 dark:bg-yellow-600 text-gray-900 dark:text-white px-4 py-2 rounded-bl-3xl font-bold z-10">
                            {book.quantity} left
                        </div>

                        <div className="flex flex-col md:flex-row">
                            <div className="w-full md:w-2/5 p-6">
                                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-lg">
                                    <img src={book.image || "/placeholder.svg"} alt={book.name} className="object-cover w-full h-full" />
                                    <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                                        <NavLink
                                            to={`/book/${book._id}`}
                                            className="bg-white text-blue-600 px-4 py-2 rounded-full font-semibold hover:bg-blue-50 transition duration-300"
                                        >
                                            View Details
                                        </NavLink>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full md:w-3/5 p-6">
                                <div className="flex items-center mb-4">
                                    <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full mr-2">
                                        {book.category}
                                    </span>
                                    <div className="flex items-center text-yellow-500 dark:text-yellow-400">
                                        <FaStar className="mr-1" />
                                        <span className="font-semibold">{book.rating}</span>
                                    </div>
                                </div>

                                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2 line-clamp-2">{book.name}</h3>
                                <p className="text-blue-600 dark:text-blue-400 font-medium mb-4">{book.author_name}</p>

                                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">{book.book_content}</p>

                                <div className="flex items-center text-gray-500 dark:text-gray-400">
                                    <FaBookOpen className="mr-2" />
                                    <span>Click on Books</span>
                                </div>
                            </div>
                        </div>

                        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                    </motion.div>
                ))}
                <div className='flex justify-center md:justify-start md:items-end '>
                    <div>
                        <NavLink to="/allbooks"
                            className="relative inline-flex items-center justify-start py-3 pl-4 pr-12 overflow-hidden font-semibold text-blue-500 transition-all duration-150 ease-in-out rounded hover:pl-10 hover:pr-6 bg-gray-50 dark:bg-gray-800 group">
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
                        </NavLink>
                    </div>
                </div>
            </div>)}

        </div>
    )
}

export default NewBooks;
