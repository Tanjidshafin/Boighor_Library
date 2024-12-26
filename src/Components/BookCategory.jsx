import React, { useContext } from 'react'
import { AppContext } from '../Context/AppContext';
import { NavLink } from 'react-router';

const BookCategory = () => {
    const { categories } = useContext(AppContext)


    return (
        <section className="py-16">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-extrabold text-center mb-12 text-gray-800 dark:text-white">
                    Explore Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-[#1A365D]">Book Categories</span>
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {categories.map(category => (<NavLink to={`/category/${category}`}

                        className="relative shadow-lg hover:scale-105 duration-200 block overflow-hidden rounded-lg border dark:border-gray-700 dark:bg-gray-800 border-gray-100 p-4 sm:p-6 lg:p-8"
                    >
                        <span
                            className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-br from-purple-600 to-[#2A4A7F]"
                        ></span>

                        <div className="sm:flex sm:justify-between sm:gap-4">
                            <div>
                                <h3 className="text-lg font-bold dark:text-gray-300 text-gray-900 sm:text-xl">
                                    {category}
                                </h3>

                                <p className="mt-1 dark:text-gray-400 text-xs font-medium text-gray-600">Category Name</p>
                            </div>
                        </div>

                        <div className="mt-4">
                            <p className="text-pretty text-sm text-gray-500">
                                Discover amazing books in our {category.toLowerCase()} collection.
                            </p>
                        </div>


                    </NavLink>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BookCategory