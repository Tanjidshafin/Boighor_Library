"use client"

import { useContext, useEffect, useState } from "react"
import ReactStars from "react-rating-stars-component"
import { AppContext } from "../Context/AppContext"
import { NavLink, useParams } from "react-router"
import { FaBook, FaBookOpen, FaInfoCircle } from "react-icons/fa"

const PerBooks = () => {
  const { id } = useParams()
  const { borrowBook, books } = useContext(AppContext)
  const [book, setBook] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState("details")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const foundBook = books.find((b) => b._id === id)
    if (foundBook) {
      setBook(foundBook)
      setLoading(false)
    } else {
      fetchBook()
    }
  }, [id, books])

  const fetchBook = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`https://boighor-server-neon.vercel.app/book/${id}`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      if (data.success) {
        setBook(data.data)
      } else {
        setError("Book not found")
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-700 dark:text-gray-300 text-lg">Loading book details...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl text-center max-w-md">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaInfoCircle className="text-red-600 dark:text-red-400 text-2xl" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Error</h2>
          <p className="text-red-600 dark:text-red-400">{error}</p>
          <NavLink
            to="/allbooks"
            className="mt-6 inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to All Books
          </NavLink>
        </div>
      </div>
    )
  }

  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl text-center max-w-md">
          <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaInfoCircle className="text-yellow-600 dark:text-yellow-400 text-2xl" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Book Not Found</h2>
          <p className="text-gray-600 dark:text-gray-400">No book details are available for this selection.</p>
          <NavLink
            to="/allbooks"
            className="mt-6 inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Browse All Books
          </NavLink>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-screen-xl mt-20 px-1 py-12">
      <div className="flex flex-col justify-center lg:flex-row gap-6">
        <div className="lg:w-2/5">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-3 hover:shadow-xl transition-all duration-300 border border-blue-100 dark:border-blue-900">
            <div className="relative">
              <img
                src={book.image || "/placeholder.svg"}
                alt={book.name}
                className="w-full h-auto object-cover rounded-lg shadow-md"
              />
              <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                {book.quantity} left
              </div>
            </div>

            <div className="mt-6 flex justify-center">
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-1">
                    <FaBook className="text-blue-600 dark:text-blue-400" />
                  </div>
                  <span className="text-xs text-gray-600 dark:text-gray-400">Category</span>
                  <span className="font-medium text-gray-800 dark:text-white">{book.category}</span>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-blue-600 dark:text-blue-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                      />
                    </svg>
                  </div>
                  <span className="text-xs text-gray-600 dark:text-gray-400">Rating</span>
                  <span className="font-medium text-gray-800 dark:text-white">{book.rating}/5</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:w-3/5">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-blue-100 dark:border-blue-900">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">{book.name}</h1>
            <p className="text-xl text-blue-600 dark:text-blue-400 mb-4 font-medium">by {book.author_name}</p>

            <div className="flex items-center mb-6">
              <ReactStars count={5} value={book.rating} edit={false} size={24} activeColor="#ffd700" />
              <span className="ml-2 text-gray-600 dark:text-gray-400">({book.rating})</span>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {book.category.split(", ").map((cat) => (
                <span
                  key={cat}
                  className="px-4 py-1.5 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium"
                >
                  {cat}
                </span>
              ))}
            </div>

            <div className="mb-8">
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300 font-medium mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-blue-600 dark:text-blue-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Quantity Available: {book.quantity}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <NavLink
                to="/allbooks"
                className="flex-1 flex items-center justify-center gap-2 bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 border-2 border-blue-600 dark:border-blue-500 px-6 py-3 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-600 transition-all duration-300 shadow-lg font-medium"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                See More Books
              </NavLink>
              <button
                onClick={() => borrowBook(book._id)}
                className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-lg font-medium"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Borrow Now
              </button>
            </div>

            <div className="border-b border-blue-100 dark:border-blue-900 mb-6">
              <div className="flex gap-6">
                <button
                  onClick={() => setActiveTab("details")}
                  className={`py-3 relative font-medium ${activeTab === "details" ? "text-blue-600 dark:text-blue-400" : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"}`}
                >
                  Book Details
                  {activeTab === "details" && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 dark:bg-blue-400"></span>
                  )}
                </button>
                <button
                  onClick={() => setActiveTab("content")}
                  className={`py-3 relative font-medium ${activeTab === "content" ? "text-blue-600 dark:text-blue-400" : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"}`}
                >
                  Book Content
                  {activeTab === "content" && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 dark:bg-blue-400"></span>
                  )}
                </button>
              </div>
            </div>

            <div className="prose max-w-none">
              {activeTab === "details" ? (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                    <FaInfoCircle className="text-blue-600 dark:text-blue-400" />
                    Description
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border-l-4 border-blue-600 dark:border-blue-500">
                    {book.short_description}
                  </p>
                </div>
              ) : (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                    <FaBookOpen className="text-blue-600 dark:text-blue-400" />
                    Book Content
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border-l-4 border-blue-600 dark:border-blue-500">
                    {book.book_content}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PerBooks
