"use client"

import React, { useContext, useEffect, useState } from "react"
import { AppContext } from "../Context/AppContext"
import { NavLink, useParams } from "react-router"
import { FaStar, FaBookOpen } from "react-icons/fa"
import { TailSpin } from "react-loader-spinner"
import { motion } from "framer-motion"

const CategoricalBooks = () => {
  const { category } = useParams()
  const { books } = useContext(AppContext)
  const [loading, setLoading] = useState(true)

  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }, [])

  const [filteredBooks, setFilteredBooks] = useState([])

  useEffect(() => {
    const filtered = books.filter((book) => book.category.toLowerCase() === category.toLowerCase())
    setFilteredBooks(filtered)
  }, [category, books])

  return (
    <div className="container min-h-screen mt-20 mx-auto px-4 py-16">
      <div className="relative mb-16 text-center">
        <h2 className="text-4xl font-extrabold text-center mb-4 text-gray-800 dark:text-white">
          Books in <span className="text-blue-600 dark:text-blue-400">{category}</span> Category
        </h2>
        <div className="w-24 h-1 bg-blue-600 dark:bg-blue-500 mx-auto"></div>
        <div className="w-16 h-1 bg-blue-400 dark:bg-blue-700 mx-auto mt-1"></div>
        <div className="w-8 h-1 bg-blue-300 dark:bg-blue-800 mx-auto mt-1"></div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-48">
          <TailSpin visible={true} height="80" width="80" color="#2563EB" ariaLabel="tail-spin-loading" radius="1" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book) => (
              <motion.div
                key={book._id}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
                className="relative bg-white dark:bg-gray-900 rounded-xl shadow-xl overflow-hidden border border-blue-100 dark:border-blue-900"
              >
                <div className="absolute top-0 right-0 bg-blue-600 text-white px-4 py-2 rounded-bl-xl font-bold z-10">
                  {book.quantity} left
                </div>

                <div className="flex flex-col md:flex-row">
                  <div className="w-full md:w-2/5 p-6">
                    <div className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-lg">
                      <img
                        src={book.image || "/placeholder.svg"}
                        alt={book.name}
                        className="object-cover w-full h-full"
                      />
                      <div className="absolute inset-0 bg-blue-950/60 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                        <NavLink
                          to={`/book/${book._id}`}
                          className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-blue-50 transition duration-300 transform hover:scale-105 shadow-lg"
                        >
                          View
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

                    <div className="flex items-center text-blue-500 dark:text-blue-400">
                      <FaBookOpen className="mr-2" />
                      <span className="font-medium">Click to explore</span>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-600 dark:bg-blue-500"></div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
              <div className="w-24 h-24 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-blue-600 dark:text-blue-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">No books found</h3>
              <p className="text-gray-600 dark:text-gray-400 max-w-md">
                We couldn't find any books in the {category} category. Please check back later or explore other
                categories.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default CategoricalBooks
