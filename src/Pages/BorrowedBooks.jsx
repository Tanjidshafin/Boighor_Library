"use client"

import React, { useContext, useEffect, useState } from "react"
import { NavLink } from "react-router"
import { AppContext } from "../Context/AppContext"
import { TailSpin } from "react-loader-spinner"
import { FaBook, FaCalendarAlt, FaUndo } from "react-icons/fa"

const BorrowedBooks = () => {
  const { borrowedBooks, fetchBorrowedBooks, returnBook, returnDate } = useContext(AppContext)
  const [loading, setLoading] = useState(true)

  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }, [])

  useEffect(() => {
    fetchBorrowedBooks()
  }, [])

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div>
      <section className="relative bg-[url(https://htmldemo.net/boighor/boighor/images/bg/5.jpg)] bg-cover bg-center bg-no-repeat">
        <div className="absolute inset-0 bg-gray-900/80 dark:bg-gray-950/90"></div>

        <div className="relative mx-auto md:h-[30rem] justify-center items-center max-w-screen-xl px-2 py-32 sm:px-6 flex flex-col gap-5 lg:items-center lg:px-8">
          <div className="max-w-xl flex justify-center items-center text-center">
            <h1 className="text-3xl flex flex-col md:flex-row items-center text-white gap-3 font-extrabold sm:text-5xl">
              BORROWED
              <span className="font-extrabold text-blue-300 relative">
                BOOKS
                <span className="absolute -bottom-2 left-0 w-full h-1 bg-blue-400"></span>
              </span>
            </h1>
          </div>
          <div className="text-white mt-4">
            <p className="text-xl flex items-center gap-2">
              <NavLink to="/" className="hover:text-blue-300 transition-colors">
                Home
              </NavLink>
              <span className="text-blue-300">/</span>
              <NavLink to="/allbooks" className="text-blue-300 hover:text-blue-200 transition-colors">
                All Books
              </NavLink>
            </p>
          </div>
        </div>
      </section>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-2 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 relative inline-block">
              Borrowed <span className="text-blue-600 dark:text-blue-400">Books</span>
              <span className="absolute -bottom-2 left-0 w-1/3 h-1 bg-blue-600 dark:bg-blue-500"></span>
            </h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Track and manage all the books you've borrowed from our library. Return them with a single click when
              you're done.
            </p>
          </div>

          {borrowedBooks.length > 0 ? (
            <>
              {/* Desktop View */}
              {loading ? (
                <div className="hidden md:flex justify-center items-center h-48 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                  <TailSpin
                    visible={true}
                    height="80"
                    width="80"
                    color="#2563EB"
                    ariaLabel="tail-spin-loading"
                    radius="1"
                  />
                </div>
              ) : (
                <div className="hidden md:block">
                  <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl overflow-hidden border border-blue-100 dark:border-blue-900">
                    <div className="grid grid-cols-6 gap-4 px-6 py-4 bg-blue-50 dark:bg-blue-900/30 border-b border-blue-100 dark:border-blue-900">
                      <div className="col-span-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                        BOOK DETAILS
                      </div>
                      <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">CATEGORY</div>
                      <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">BORROWED DATE</div>
                      <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">BOOK STATUS</div>
                      <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">ACTION</div>
                    </div>
                    {borrowedBooks.map((book) => (
                      <div
                        key={book._id}
                        className="grid grid-cols-6 gap-4 px-6 py-4 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-150 border-b border-blue-100 dark:border-blue-900 items-center"
                      >
                        <div className="col-span-2 flex items-center space-x-4">
                          <img
                            src={book.image || "/placeholder.svg"}
                            alt={book.name}
                            className="h-20 w-16 object-cover rounded-md shadow-md"
                          />
                          <div>
                            <span className="font-medium text-gray-900 dark:text-white block mb-1">{book.name}</span>
                            <span className="text-sm text-blue-600 dark:text-blue-400">
                              by {book.author_name || "Unknown Author"}
                            </span>
                          </div>
                        </div>
                        <div className="text-gray-700 dark:text-gray-300">
                          <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full text-xs font-medium">
                            {book.category}
                          </span>
                        </div>
                        <div className="text-gray-700 dark:text-gray-300 flex items-center gap-2">
                          <FaCalendarAlt className="text-blue-600 dark:text-blue-400" />
                          {formatDate(book.borrowedDate)}
                        </div>
                        <div className="text-gray-700 dark:text-gray-300">
                          {book.returnDate ? (
                            <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full text-xs font-medium">
                              Returned: {formatDate(book.returnDate)}
                            </span>
                          ) : (
                            <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 rounded-full text-xs font-medium">
                              Not Returned
                            </span>
                          )}
                        </div>
                        <div>
                          <button
                            onClick={() => returnBook(book._id)}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 shadow-md"
                          >
                            <FaUndo />
                            Return
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Mobile View */}
              {loading ? (
                <div className="flex md:hidden justify-center items-center h-48 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                  <TailSpin
                    visible={true}
                    height="80"
                    width="80"
                    color="#2563EB"
                    ariaLabel="tail-spin-loading"
                    radius="1"
                  />
                </div>
              ) : (
                <div className="md:hidden space-y-6">
                  {borrowedBooks.map((book) => (
                    <div
                      key={book._id}
                      className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-5 border border-blue-100 dark:border-blue-900"
                    >
                      <div className="flex items-center space-x-4 mb-4">
                        <img
                          src={book.image || "/placeholder.svg"}
                          alt={book.name}
                          className="h-24 w-20 object-cover rounded-lg shadow-md"
                        />
                        <div>
                          <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-1">{book.name}</h3>
                          <p className="text-blue-600 dark:text-blue-400 text-sm mb-2">
                            by {book.author_name || "Unknown Author"}
                          </p>
                          <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full text-xs font-medium">
                            {book.category}
                          </span>
                        </div>
                      </div>
                      <div className="space-y-3 border-t border-blue-100 dark:border-blue-900 pt-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                            <FaCalendarAlt className="text-blue-600 dark:text-blue-400" />
                            Borrowed Date:
                          </span>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {formatDate(book.borrowedDate)}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                            <FaBook className="text-blue-600 dark:text-blue-400" />
                            Book Status:
                          </span>
                          <span className="text-sm">
                            {book.returnDate ? (
                              <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full text-xs font-medium">
                                Returned
                              </span>
                            ) : (
                              <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 rounded-full text-xs font-medium">
                                Not Returned
                              </span>
                            )}
                          </span>
                        </div>
                        <button
                          onClick={() => returnBook(book._id)}
                          className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 shadow-md"
                        >
                          <FaUndo />
                          Return Book
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-blue-100 dark:border-blue-900">
              <div className="w-24 h-24 mx-auto mb-6 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                <FaBook className="text-4xl text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">No Borrowed Books</h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-8">
                You haven't borrowed any books yet. Explore our collection and find your next great read!
              </p>
              <NavLink
                to="/allbooks"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
                Browse Books
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default BorrowedBooks
