import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router';
import { AppContext } from '../Context/AppContext';
import { FaChevronRight } from 'react-icons/fa';

const AllBooks = () => {
    const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    const { books, categories, user } = useContext(AppContext);
    const [viewType, setViewType] = useState('grid');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedLetter, setSelectedLetter] = useState('');
    const [sortBy, setSortBy] = useState('name');
    const [filter, setFilter] = useState(false);
    const [showAvailable, setShowAvailable] = useState(false);

    const filterToggle = () => {
        setFilter(!filter);
    };
    const filteredBooks = books
        .filter((book) => (selectedCategory === 'All' || book.category === selectedCategory))
        .filter((book) => (selectedLetter === '' || book.name.startsWith(selectedLetter)))
        .filter((book) => (!showAvailable || book.quantity > 0));

    return (
        <div>
            <section
                className="relative bg-[url(https://htmldemo.net/boighor/boighor/images/bg/6.jpg)] bg-cover bg-center bg-no-repeat"
            >
                <div className="bg-gray-900/75 sm:bg-transparent sm:from-gray-900/95 sm:to-gray-900/25 ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l"></div>

                <div className="mx-auto md:h-[30rem] justify-center items-center max-w-screen-xl px-4 py-32 sm:px-6 flex flex-col gap-5 lg:items-center lg:px-8">
                    <div className="max-w-xl flex justify-center items-center text-center ltr:sm:text-left rtl:sm:text-right">
                        <h1 className="text-2xl flex items-center text-gray-200 gap-3 font-extrabold sm:text-4xl">
                            ALL
                            <strong className="block font-extrabold text-transparent bg-clip-text bg-gradient-to-l from-blue-500 to-[#1A365D]"> BOOKS </strong>
                        </h1>
                    </div>
                    <div className="text-white">
                        <p className="text-xl">
                            <span><NavLink to="/">Home</NavLink></span> / <span>{user ? (<NavLink to="/borrowedbooks" className="text-blue-500">Borrowed Book</NavLink>) : (<NavLink to="/register" className="text-blue-500">Get Started</NavLink>)}</span>
                        </p>
                    </div>
                </div>
            </section>
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="w-full md:w-64 shrink-0">
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                            <button onClick={filterToggle} className="text-xl flex items-center gap-2 font-bold text-gray-800 dark:text-gray-200">Filters <span className="md:hidden block"><FaChevronRight /></span></button>
                            <div className={`${filter ? "block" : "hidden md:block"}`}>
                                <div className="my-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-300">Sort By</label>
                                    <select
                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                    >
                                        <option value="name">Name: A-Z</option>
                                        <option value="name-desc">Name: Z-A</option>
                                        <option value="rating">Rating: High to Low</option>
                                        <option value="rating-desc">Rating: Low to High</option>
                                    </select>
                                </div>
                                <div className="mb-6">
                                    <h3 className="text-sm font-medium text-gray-700 mb-2 dark:text-gray-300">Categories</h3>
                                    <div className="space-y-2">
                                        {categories.map((category) => (
                                            <label key={category} className="flex items-center">
                                                <input
                                                    type="radio"
                                                    name="category"
                                                    value={category}
                                                    checked={selectedCategory === category}
                                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                                    className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300"
                                                />
                                                <span className="ml-2 text-sm dark:text-gray-400 text-gray-600">{category}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                                <div className="mb-6">
                                    <h3 className="text-sm font-medium text-gray-700 mb-2 dark:text-gray-300">Status</h3>
                                    <div className="space-y-2">
                                        <label className="flex items-center">
                                            <input
                                                type="radio"
                                                name="status"
                                                value="all"
                                                checked={!showAvailable}
                                                onChange={() => setShowAvailable(false)}
                                                className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300"
                                            />
                                            <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">All Books</span>
                                        </label>
                                        <label className="flex items-center">
                                            <input
                                                type="radio"
                                                name="status"
                                                value="available"
                                                checked={showAvailable}
                                                onChange={() => setShowAvailable(true)}
                                                className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300"
                                            />
                                            <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">Available Books</span>
                                        </label>
                                    </div>
                                </div>
                                <div className="mb-6">
                                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Filter by Letter</h3>
                                    <div className="flex flex-wrap gap-1">
                                        {alphabets.map((letter) => (
                                            <button
                                                key={letter}
                                                onClick={() => setSelectedLetter(selectedLetter === letter ? '' : letter)}
                                                className={`w-7 h-7 text-sm font-medium rounded-md flex items-center justify-center
                      ${selectedLetter === letter
                                                        ? 'bg-blue-500 text-white'
                                                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200'}`}
                                            >
                                                {letter}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1">
                        <div className="mb-6 flex items-center justify-between">
                            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-[#1A365D]">
                                All Books
                            </h1>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setViewType('grid')}
                                    className={`p-2 rounded-md ${viewType === 'grid'
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-gray-100 dark:bg-gray-600 dark:text-gray-300 text-gray-600 hover:bg-gray-200'}`}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                    </svg>
                                </button>
                                <button
                                    onClick={() => setViewType('list')}
                                    className={`p-2 rounded-md ${viewType === 'list'
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-gray-100 dark:bg-gray-600 dark:text-gray-300 text-gray-600 hover:bg-gray-200'}`}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className={`${viewType === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}`}>
                            {filteredBooks.map((book) => (
                                <div
                                    key={book._id}
                                    className={`bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden ${viewType === 'list' ? 'flex' : 'flex flex-col'}`}
                                >
                                    <div className={`${viewType === 'list' ? 'w-48 flex items-center shrink-0' : 'w-full'}`}>
                                        <img
                                            src={book.image}
                                            alt={book.name}
                                            className={`w-full h-48 object-cover`}
                                        />
                                    </div>
                                    <div className="p-4 flex flex-col flex-1">
                                        <h3 className="text-lg dark:text-gray-300 font-semibold text-gray-800 mb-2">{book.name}</h3>
                                        <p className="text-gray-600 mb-2 dark:text-gray-400">by {book.author_name}</p>
                                        <div className="flex items-center mb-2">
                                            {[...Array(5)].map((_, index) => (
                                                <svg
                                                    key={index}
                                                    className={`w-5 h-5 ${index < Math.floor(book.rating)
                                                        ? 'text-yellow-400'
                                                        : 'text-gray-300'}`}
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                            ))}
                                            <span className="ml-2 text-gray-600 dark:text-gray-400 text-sm">({book.rating})</span>
                                        </div>
                                        <div className='flex items-center gap-5'>
                                            <span className="text-sm text-blue-500">{book.category}</span>
                                            <span
                                                className="inline-flex items-center w-14 justify-center rounded-full border border-blue-500 px-2.5 py-0.5 text-blue-700"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth="1.5"
                                                    stroke="currentColor"
                                                    className="-ms-1 me-1.5 size-4"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                    />
                                                </svg>

                                                <p className="whitespace-nowrap text-sm">{book.quantity}</p>
                                            </span>
                                        </div>
                                        <div className="flex gap-3 mt-4 flex-col sm:flex-row sm:items-end sm:justify-end">
                                            <NavLink to={`/book/${book._id}`}
                                                className="block bg-blue-500 px-5 py-3 text-center text-xs font-bold uppercase text-white transition hover:bg-blue-600"
                                            >
                                                Details
                                            </NavLink>
                                            <a
                                                className="block bg-blue-500 px-5 py-3 text-center text-xs font-bold uppercase text-white transition hover:bg-blue-600"
                                            >
                                                Update
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllBooks;
