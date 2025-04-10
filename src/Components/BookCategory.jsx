"use client"

import React, { useContext, useState } from "react"
import { AppContext } from "../Context/AppContext"
import { NavLink } from "react-router"
import { TailSpin } from "react-loader-spinner"

const BookCategory = () => {
  const { categories } = useContext(AppContext)
  const [loading, setLoading] = useState(true)

  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }, [])

  // Category icons mapping (you can replace these with actual icons if needed)
  const getCategoryIcon = (category) => {
    const icons = {
      Fiction: "📚",
      Mystery: "🔍",
      Romance: "❤️",
      Fantasy: "🧙",
      Biography: "👤",
      History: "🏛️",
      Science: "🔬",
      Poetry: "📝",
      // Add more categories as needed
    }

    return icons[category] || "📖"
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="relative mb-16 text-center">
          <h2 className="text-4xl font-extrabold text-center mb-4 text-gray-800 dark:text-white">
            Explore Our <span className="text-blue-600 dark:text-blue-400">Book Categories</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
            Discover our extensive collection organized by genres to help you find your next favorite read.
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
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {categories.map((category, index) => (
              <NavLink
                key={index}
                to={`/category/${category}`}
                className="group relative bg-white dark:bg-gray-900 overflow-hidden rounded-xl border border-blue-100 dark:border-blue-900 p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-100 dark:bg-gray-800 rounded-bl-full z-0 transition-all duration-300 group-hover:bg-gray-200 dark:group-hover:bg-blue-700"></div>

                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-16 h-16 flex items-center justify-center bg-blue-600 dark:bg-blue-700 text-white rounded-lg text-2xl shadow-lg">
                      {getCategoryIcon(category)}
                    </div>
                    <div className="w-8 h-8 flex items-center justify-center bg-blue-100 dark:bg-blue-900 rounded-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-blue-600 dark:text-blue-400 transform transition-transform duration-300 group-hover:translate-x-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                    {category}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Discover amazing books in our {category.toLowerCase()} collection.
                  </p>
                </div>

                <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-600 dark:bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </NavLink>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default BookCategory
