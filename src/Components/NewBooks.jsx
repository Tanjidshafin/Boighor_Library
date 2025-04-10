"use client"

import React, { useContext, useState } from "react"
import { AppContext } from "../Context/AppContext"
import { NavLink } from "react-router"
import { TailSpin } from "react-loader-spinner"
import { FaStar, FaBookOpen } from "react-icons/fa"
import { motion } from "framer-motion"

const NewBooks = () => {
  const { books } = useContext(AppContext)
  const [loading, setLoading] = useState(true)

  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }, [])

  const latestBooks = books.slice().reverse().slice(0, 4)

  return (
    <div className="mx-auto my-20 max-w-screen-2xl px-4 sm:px-6 lg:px-8">
      <div className="relative mb-16 text-center">
        <h2 className="text-4xl font-extrabold text-center mb-4 text-gray-800 dark:text-white">
          New <span className="text-blue-600 dark:text-blue-400">Books</span>
        </h2>
        <p className="mx-auto mb-8 text-center max-w-[55rem] text-gray-600 dark:text-gray-300">
          Discover a curated collection of contemporary literature, featuring diverse voices, innovative storytelling,
          and thought-provoking themes for today's readers. Explore now!
        </p>
        <div className="w-24 h-1 bg-blue-600 dark:bg-blue-500 mx-auto"></div>
        <div className="w-16 h-1 bg-blue-400 dark:bg-blue-700 mx-auto mt-1"></div>
        <div className="w-8 h-1 bg-blue-300 dark:bg-blue-800 mx-auto mt-1"></div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-48">
          <TailSpin visible={true} height="80" width="80" color="#2563EB" ariaLabel="tail-spin-loading" radius="1" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {latestBooks.map((book, index) => (
            <motion.div
              key={book._id || index}
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
              className="relative bg-white dark:bg-gray-900 rounded-xl shadow-xl overflow-hidden border border-blue-100 dark:border-blue-900 h-full flex flex-col"
            >
              <div className="absolute top-0 right-0 bg-blue-600 text-white px-4 py-2 rounded-bl-xl font-bold z-10">
                {book.quantity} left
              </div>

              <div className="p-4">
                <div className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-lg mb-4">
                  <img
                    src={book.image || "/placeholder.svg"}
                    alt={book.name}
                    className="object-cover w-full h-full transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-blue-950/60 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <NavLink
                      to={`/book/${book._id}`}
                      className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-blue-50 transition duration-300 transform hover:scale-105 shadow-lg"
                    >
                      View Details
                    </NavLink>
                  </div>
                </div>

                <div className="flex items-center mb-4">
                  <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full mr-2">
                    {book.category}
                  </span>
                  <div className="flex items-center text-yellow-500 dark:text-yellow-400">
                    <FaStar className="mr-1" />
                    <span className="font-semibold">{book.rating}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2 line-clamp-2">{book.name}</h3>
                <p className="text-blue-600 dark:text-blue-400 font-medium mb-2">{book.author_name}</p>

                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 text-sm">{book.book_content}</p>

                <div className="flex items-center text-blue-500 dark:text-blue-400 mt-auto">
                  <FaBookOpen className="mr-2" />
                  <span className="font-medium">Click to explore</span>
                </div>
              </div>

              <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-600 dark:bg-blue-500"></div>
            </motion.div>
          ))}
          <div className="flex justify-center items-center lg:col-span-4 mt-8">
            <NavLink
              to="/allbooks"
              className="relative inline-flex items-center justify-start py-4 pl-6 pr-14 overflow-hidden font-semibold text-blue-600 dark:text-blue-400 transition-all duration-300 ease-in-out rounded-full hover:pl-12 hover:pr-8 bg-white dark:bg-gray-900 shadow-lg group border border-blue-100 dark:border-blue-900 hover:shadow-2xl"
            >
              <span className="absolute bottom-0 left-0 w-full h-1 transition-all duration-300 ease-in-out bg-blue-600 dark:bg-blue-500 group-hover:h-full"></span>
              <span className="absolute right-0 pr-4 duration-300 ease-out group-hover:translate-x-12">
                <svg
                  className="w-6 h-6 text-blue-600 dark:text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  ></path>
                </svg>
              </span>
              <span className="absolute left-0 pl-4 -translate-x-12 group-hover:translate-x-0 ease-out duration-300">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  ></path>
                </svg>
              </span>
              <span className="relative w-full text-center transition-colors duration-300 ease-in-out group-hover:text-white text-lg font-medium">
                See All Books
              </span>
            </NavLink>
          </div>
        </div>
      )}
    </div>
  )
}

export default NewBooks
