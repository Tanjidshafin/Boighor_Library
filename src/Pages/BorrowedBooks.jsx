import React from 'react'
import { NavLink } from 'react-router'

const BorrowedBooks = () => {
    const handleReturn = (bookId) => {
        console.log('Returning book:', bookId);
    };
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };
    return (
        <div>
            <section
                className="relative bg-[url(https://htmldemo.net/boighor/boighor/images/bg/5.jpg)] bg-cover bg-center bg-no-repeat"
            >
                <div
                    className="bg-gray-900/75 sm:bg-transparent sm:from-gray-900/95 sm:to-gray-900/25 ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l"
                ></div>

                <div
                    className="mx-auto md:h-[30rem] justify-center items-center  max-w-screen-xl px-4 py-32 sm:px-6 flex flex-col gap-5 lg:items-center lg:px-8"
                >
                    <div className="max-w-xl flex justify-center items-center text-center ltr:sm:text-left rtl:sm:text-right">
                        <h1 className="text-2xl flex items-center text-gray-200 gap-3 font-extrabold sm:text-4xl">
                            BORROWED
                            <strong className="block font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-blue-500 to-[#1A365D]"> BOOKS </strong>
                        </h1>

                    </div>
                    <div className='text-white'>
                        <p className='text-xl'><span><NavLink to="/">Home</NavLink></span>  /  <span><NavLink to="/allbooks" className="text-blue-500">All Books</NavLink></span></p>
                    </div>
                </div>

            </section>
            <div className="min-h-screen bg-white dark:bg-gray-800 py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-3xl md:text-4xl dark:text-gray-200 font-bold text-gray-900 mb-8 text-center">Borrowed <span className='text-blue-500'>Books</span> </h1>
                    <div className="hidden md:block">
                        <div className="bg-white dark:bg-gray-800  shadow-xl rounded-lg overflow-hidden border dark:border-gray-600 border-gray-200">
                            <div className="grid grid-cols-6 dark:bg-gray-800 gap-4 px-6 py-4 bg-gray-50 border-b dark:border-gray-600 border-gray-200">
                                <div className="col-span-2 text-sm font-semibold text-gray-700 dark:text-gray-400">BOOK DETAILS</div>
                                <div className="text-sm dark:text-gray-400 font-semibold text-gray-700">CATEGORY</div>
                                <div className="text-sm dark:text-gray-400 font-semibold text-gray-700">BORROWED DATE</div>
                                <div className="text-sm dark:text-gray-400 font-semibold text-gray-700">RETURN DATE</div>
                                <div className="text-sm dark:text-gray-400 font-semibold text-gray-700">ACTION</div>
                            </div>

                            <div

                                className="grid grid-cols-6 gap-4 px-6 py-4 dark:hover:bg-gray-700 dark:border-gray-600 hover:bg-gray-50 transition-colors duration-150 ease-in-out border-b border-gray-200 items-center"
                            >
                                <div className="col-span-2 flex items-center space-x-4">
                                    <img
                                        src=""
                                        alt=""
                                        className="h-20 w-16 object-cover rounded-md shadow-sm"
                                    />
                                    <span className="font-medium dark:text-gray-400 text-gray-900">Title</span>
                                </div>
                                <div className="text-gray-700 dark:text-gray-400">Category</div>
                                <div className="text-gray-700 dark:text-gray-400">borrowed date</div>
                                <div className="text-gray-700 dark:text-gray-400">return date</div>
                                <div>
                                    <button

                                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-150 ease-in-out"
                                    >
                                        Return
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Mobile View */}
                    <div className="md:hidden space-y-4">
                        <div className="bg-white shadow rounded-lg p-4 border border-gray-200">
                            <div className="flex items-center space-x-4 mb-4">
                                <img
                                    src=""
                                    alt=""
                                    className="h-24 w-20 object-cover rounded-md shadow-sm"
                                />
                                <div>
                                    <h3 className="font-medium text-gray-900">title</h3>
                                    <p className="text-gray-600">category</p>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-sm text-gray-500">Borrowed Date:</span>
                                    <span className="text-sm text-gray-900">date</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm text-gray-500">Return Date:</span>
                                    <span className="text-sm text-gray-900">date</span>
                                </div>
                                <button
                                    className="w-full mt-4 inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-150 ease-in-out"
                                >
                                    Return Book
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BorrowedBooks