import React from 'react'

const Subscribe = () => {
    return (
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-lg h-auto md:h-[30rem] p-6 lg:p-12 bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-gray-800 dark:to-gray-900 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">

                <img
                    className="w-full md:w-[28rem] mx-auto rounded-2xl shadow-lg transition-transform duration-300 hover:scale-105"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXlmv7nGQtNP5PHKaPr619vslceRSr5Rqu7Q&s"
                    alt="Subscribe"
                />

                <div className="max-w-[30rem] text-center md:text-left">
                    <h2 className="text-4xl font-extrabold text-white dark:text-gray-200">
                        Stay Connected
                    </h2>
                    <p className="text-gray-200 dark:text-gray-400 text-sm my-4">
                        Subscribe to our newsletter and never miss out on exclusive offers, new collections, and exciting updates.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center md:justify-start items-center gap-4 mt-6">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="border border-gray-300 dark:border-gray-700 py-3 pl-4 pr-6 outline-none w-full sm:w-auto flex-1 rounded-md bg-white dark:bg-gray-800 dark:text-gray-200"
                        />
                        <button className="bg-white dark:bg-blue-500 dark:text-white text-blue-600 px-6 py-3 font-medium rounded-md shadow-md hover:bg-gray-200 dark:hover:bg-blue-700 transition-all">
                            Subscribe
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Subscribe