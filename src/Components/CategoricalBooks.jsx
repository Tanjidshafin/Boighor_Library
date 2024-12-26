import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../Context/AppContext';
import { NavLink, useParams } from 'react-router';
import ReactStars from "react-rating-stars-component";
const CategoricalBooks = () => {
    const { category } = useParams();
    const { books } = useContext(AppContext);
    const [filteredBooks, setFilteredBooks] = useState([]);
    console.log(books);
    useEffect(() => {
        const filtered = books.filter(book => book.category.toLowerCase() === category.toLowerCase());
        setFilteredBooks(filtered);
    }, [category, books]);
    return (
        <div className="container mx-auto px-4 py-16">
            <h2 className="text-4xl font-extrabold text-center mb-12 text-gray-800 dark:text-white">
                Books in <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-[#1A365D]">{category}</span> Category
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredBooks.length > 0 ? (
                    filteredBooks.map(book => (
                        <a className="group rounded-xl relative block overflow-hidden" key={book._id}>
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
                    ))
                ) : (
                    <p>No books found in this category.</p>
                )}
            </div>
        </div>
    );
};

export default CategoricalBooks;