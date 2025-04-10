import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router';
import { AppContext } from '../Context/AppContext';
import { FaChevronRight, FaFilter, FaSearch, FaSort } from 'react-icons/fa';
import { TailSpin } from 'react-loader-spinner';
import { Typewriter } from 'react-simple-typewriter';
import { toast } from 'react-toastify';
import axios from 'axios';

const AllBooks = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);
    const [updatedBook, setUpdatedBook] = useState({});
    const [books, setBooks] = useState([])
    const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    const { categories, user, fetchBooks } = useContext(AppContext);
    const [viewType, setViewType] = useState('grid');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedLetter, setSelectedLetter] = useState('');
    const [sortBy, setSortBy] = useState('name');
    const [filter, setFilter] = useState(false);
    const [showAvailable, setShowAvailable] = useState(false);
    const [loading, setLoading] = useState(true);
    const openModal = (book) => {
        setSelectedBook(book);
        setUpdatedBook({ ...book });
        setIsModalOpen(true);
    };

    // Pagination
    const [count, setCount] = useState(0)
    const [pageNumber, setPageNumber] = useState(0)
    const booksPerPage = 6
    const page = Math.ceil(count / booksPerPage)
    const updatePageNumber = (num) => {
        if ((num > (page - 1)) || (0 > num)) { return setPageNumber(0) }
        setPageNumber(num)
    }
    axios.get("https://boighor-server-neon.vercel.app/booksCount")
        .then(res => setCount(res.data.count))
    useEffect(() => {
        axios.get(`https://boighor-server-neon.vercel.app/books?page=${pageNumber}&limit=${booksPerPage}`)
            .then(res => setBooks(res.data))
    }, [pageNumber])
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedBook({ ...updatedBook, [name]: value });
    };
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`https://boighor-server-neon.vercel.app/updatebook/${selectedBook._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedBook),
            });
            const result = await response.json();
            if (result.success) {
                toast.success('Book updated successfully!');
                setBooks((prevBooks) =>
                    prevBooks.map((book) => (book._id === selectedBook._id ? { ...book, ...updatedBook } : book))
                );
                setIsModalOpen(false);
            } else {
                toast.error(result.message || 'Failed to update book.');
            }
        } catch (error) {
            console.error("Error in handleUpdate:", error);
            toast.error('An error occurred while updating the book.');
        }
    };
    React.useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);
    const filterToggle = () => {
        setFilter(!filter);
    };
    const filteredBooks = books
        .filter((book) => (selectedCategory === 'All' || book.category === selectedCategory))
        .filter((book) => (selectedLetter === '' || book.name.startsWith(selectedLetter)))
        .filter((book) => (!showAvailable || book.quantity > 0));
    const sortedAndFilteredBooks = filteredBooks.sort((a, b) => {
        if (sortBy === 'name') {
            return a.name.localeCompare(b.name);
        } else if (sortBy === 'name-desc') {
            return b.name.localeCompare(a.name);
        } else if (sortBy === 'rating') {
            return b.rating - a.rating;
        } else if (sortBy === 'rating-desc') {
            return a.rating - b.rating;
        }
        return 0;
    });

    return (
        <div>
            <section className="relative bg-[url(https://htmldemo.net/boighor/boighor/images/bg/6.jpg)] bg-cover bg-center bg-no-repeat">
                <div className="absolute inset-0 bg-gray-900/80 dark:bg-gray-950/90"></div>

                <div className="relative mx-auto justify-center items-center max-w-screen-xl px-4 py-32 sm:px-6 flex flex-col gap-5 lg:items-center lg:px-8">
                    <div className="max-w-xl flex justify-center items-center text-center">
                        <h1 className="text-3xl flex flex-col md:flex-row items-center text-white gap-3 font-extrabold sm:text-5xl">
                            ALL
                            <span className="font-extrabold text-blue-300 relative">
                                BOOKS
                                <span className="absolute -bottom-2 left-0 w-full h-1 bg-blue-400"></span>
                            </span>
                        </h1>
                    </div>
                    <div className="text-white mt-4">
                        <p className="text-xl flex items-center gap-2">
                            <NavLink to="/" className="hover:text-blue-300 transition-colors">Home</NavLink>
                            <span className="text-blue-300">/</span>
                            {user ? (
                                <NavLink to="/borrowedbooks" className="text-blue-300 hover:text-blue-200 transition-colors">
                                    Borrowed Books
                                </NavLink>
                            ) : (
                                <NavLink to="/register" className="text-blue-300 hover:text-blue-200 transition-colors">
                                    Get Started
                                </NavLink>
                            )}
                        </p>
                    </div>
                </div>
            </section>
            <div className="container mx-auto px-2 py-12">
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="w-full md:w-64 shrink-0">
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-blue-100 dark:border-blue-900">
                            <button 
                                onClick={filterToggle} 
                                className="text-xl flex items-center gap-2 font-bold text-gray-800 dark:text-white mb-4 w-full justify-between"
                            >
                                <div className="flex items-center gap-2">
                                    <FaFilter className="text-blue-600 dark:text-blue-400" />
                                    <span>Filters</span>
                                </div>
                                <span className="md:hidden block">
                                    <FaChevronRight className={`transition-transform duration-300 ${filter ? "rotate-90" : ""}`} />
                                </span>
                            </button>
                            <div className={`${filter ? "block" : "hidden md:block"} space-y-6`}>
                                <div className="my-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-300 flex items-center gap-2">
                                        <FaSort className="text-blue-600 dark:text-blue-400" />
                                        Sort By
                                    </label>
                                    <select
                                        className="w-full p-3 border border-blue-200 dark:border-blue-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white transition-all duration-200"
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
                                    <h3 className="text-sm font-medium text-gray-700 mb-3 dark:text-gray-300 flex items-center gap-2">
                                        <span className="w-6 h-6 flex items-center justify-center bg-blue-600 dark:bg-blue-700 text-white rounded-full text-xs">
                                            C
                                        </span>
                                        Categories
                                    </h3>
                                    <div className="space-y-3 pl-2 border-l-2 border-blue-200 dark:border-blue-800">
                                        <label className="flex items-center">
                                            <input
                                                type="radio"
                                                name="category"
                                                value="All"
                                                checked={selectedCategory === 'All'}
                                                onChange={(e) => setSelectedCategory(e.target.value)}
                                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600"
                                            />
                                            <span className="ml-2 text-sm dark:text-gray-300 text-gray-700">All Categories</span>
                                        </label>
                                        {categories.map((category) => (
                                            <label key={category} className="flex items-center">
                                                <input
                                                    type="radio"
                                                    name="category"
                                                    value={category}
                                                    checked={selectedCategory === category}
                                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600"
                                                />
                                                <span className="ml-2 text-sm dark:text-gray-300 text-gray-700">{category}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                                <div className="mb-6">
                                    <h3 className="text-sm font-medium text-gray-700 mb-3 dark:text-gray-300 flex items-center gap-2">
                                        <span className="w-6 h-6 flex items-center justify-center bg-blue-600 dark:bg-blue-700 text-white rounded-full text-xs">
                                            S
                                        </span>
                                        Status
                                    </h3>
                                    <div className="space-y-3 pl-2 border-l-2 border-blue-200 dark:border-blue-800">
                                        <label className="flex items-center">
                                            <input
                                                type="radio"
                                                name="status"
                                                value="all"
                                                checked={!showAvailable}
                                                onChange={() => setShowAvailable(false)}
                                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600"
                                            />
                                            <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">All Books</span>
                                        </label>
                                        <label className="flex items-center">
                                            <input
                                                type="radio"
                                                name="status"
                                                value="available"
                                                checked={showAvailable}
                                                onChange={() => setShowAvailable(true)}
                                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600"
                                            />
                                            <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Available Books</span>
                                        </label>
                                    </div>
                                </div>
                                <div className="mb-6">
                                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                                        <span className="w-6 h-6 flex items-center justify-center bg-blue-600 dark:bg-blue-700 text-white rounded-full text-xs">
                                            A
                                        </span>
                                        Filter by Letter
                                    </h3>
                                    <div className="flex flex-wrap gap-1.5">
                                        {alphabets.map((letter) => (
                                            <button
                                                key={letter}
                                                onClick={() => setSelectedLetter(selectedLetter === letter ? '' : letter)}
                                                className={`w-7 h-7 text-sm font-medium rounded-md flex items-center justify-center transition-all duration-200
                                                    ${selectedLetter === letter
                                                        ? 'bg-blue-600 text-white shadow-md'
                                                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900'}`}
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
                        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <h1 className="text-3xl font-bold text-gray-800 dark:text-white relative inline-block">
                                All Books
                                <span className="absolute -bottom-2 left-0 w-1/3 h-1 bg-blue-600 dark:bg-blue-500"></span>
                            </h1>
                            <div className="flex gap-2 bg-white dark:bg-gray-800 p-1 rounded-lg shadow-md border border-blue-100 dark:border-blue-900">
                                <button
                                    onClick={() => setViewType('grid')}
                                    className={`p-2 rounded-md transition-all duration-200 ${viewType === 'grid'
                                        ? 'bg-blue-600 text-white shadow-md'
                                        : 'bg-transparent text-gray-600 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900'}`}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                    </svg>
                                </button>
                                <button
                                    onClick={() => setViewType('list')}
                                    className={`p-2 rounded-md transition-all duration-200 ${viewType === 'list'
                                        ? 'bg-blue-600 text-white shadow-md'
                                        : 'bg-transparent text-gray-600 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900'}`}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {loading ? (
                            <div className="flex justify-center items-center h-48 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
                                <TailSpin
                                    visible={true}
                                    height="80"
                                    width="80"
                                    color="#2563EB"
                                    ariaLabel="tail-spin-loading"
                                    radius="1"
                                />
                            </div>
                        ) : viewType === "grid" ? (
                            sortedAndFilteredBooks.length === 0 ? (
                                <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                                    <div className="w-24 h-24 mx-auto mb-6 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                                        <FaSearch className="text-4xl text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <div className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                                        <Typewriter
                                            words={["No Books to show right now"]}
                                            loop=""
                                            cursor
                                            cursorStyle='_'
                                            typeSpeed={70}
                                            deleteSpeed={50}
                                            delaySpeed={1000}
                                        />
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                                        Try adjusting your filters or check back later for new additions to our library.
                                    </p>
                                </div>
                            ) : (
                                <div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {sortedAndFilteredBooks.map((book) => (
                                            <div key={book._id} className="group">
                                                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-blue-100 dark:border-blue-900 transition-all duration-300 hover:shadow-xl hover:translate-y-[-5px]">
                                                    <div className="relative">
                                                        <img
                                                            src={book.image || "/placeholder.svg"}
                                                            alt={book.name}
                                                            className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
                                                        />
                                                        <div className="absolute top-0 right-0 bg-blue-600 text-white px-3 py-1 m-2 rounded-full text-sm font-bold">
                                                            {book.quantity} left
                                                        </div>
                                                    </div>
                                                    <div className="p-5">
                                                        <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2 line-clamp-1">{book.name}</h3>
                                                        <p className="text-blue-600 dark:text-blue-400 mb-3 font-medium">by {book.author_name}</p>
                                                        <div className="flex items-center mb-3">
                                                            {[...Array(5)].map((_, index) => (
                                                                <svg
                                                                    key={index}
                                                                    className={`w-5 h-5 ${index < Math.floor(book.rating)
                                                                        ? 'text-yellow-400'
                                                                        : 'text-gray-300 dark:text-gray-600'}`}
                                                                    fill="currentColor"
                                                                    viewBox="0 0 20 20"
                                                                >
                                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                                </svg>
                                                            ))}
                                                            <span className="ml-2 text-gray-600 dark:text-gray-400 text-sm">({book.rating})</span>
                                                        </div>
                                                        <div className="flex items-center gap-3 mb-4">
                                                            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full text-xs font-medium">
                                                                {book.category}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-2 p-5 pt-0">
                                                        <NavLink 
                                                            to={`/book/${book._id}`}
                                                            className="flex-1 bg-blue-600 text-white px-4 py-2.5 rounded-lg text-center text-sm font-medium transition-all duration-200 hover:bg-blue-700 hover:shadow-lg"
                                                        >
                                                            Details
                                                        </NavLink>
                                                        <button 
                                                            onClick={() => openModal(book)}
                                                            className="flex-1 bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 border border-blue-600 dark:border-blue-500 px-4 py-2.5 rounded-lg text-center text-sm font-medium transition-all duration-200 hover:bg-blue-50 dark:hover:bg-gray-600"
                                                        >
                                                            Update
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )
                        ) : (
                            <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-blue-100 dark:border-blue-900">
                                {sortedAndFilteredBooks.length === 0 ? (
                                    <div className="text-center py-16">
                                        <div className="w-24 h-24 mx-auto mb-6 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                                            <FaSearch className="text-4xl text-blue-600 dark:text-blue-400" />
                                        </div>
                                        <div className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                                            <Typewriter
                                                words={["No Books to show right now"]}
                                                loop={true}
                                                cursor
                                                cursorStyle='_'
                                                typeSpeed={70}
                                                deleteSpeed={50}
                                                delaySpeed={1000}
                                            />
                                        </div>
                                        <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                                            Try adjusting your filters or check back later for new additions to our library.
                                        </p>
                                    </div>
                                ) : (
                                    <div>
                                        <table className="min-w-full table-auto border-collapse">
                                            <thead className="bg-blue-50 dark:bg-blue-900/30">
                                                <tr>
                                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Image</th>
                                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Name</th>
                                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Author</th>
                                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Category</th>
                                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Rating</th>
                                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Quantity</th>
                                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-blue-100 dark:divide-blue-900">
                                                {sortedAndFilteredBooks.map((book) => (
                                                    <tr key={book._id} className="hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-150">
                                                        <td className="px-6 py-4">
                                                            <img src={book.image || "/placeholder.svg"} alt={book.name} className="w-16 h-20 object-cover rounded-md shadow-sm" />
                                                        </td>
                                                        <td className="px-6 py-4 font-medium text-gray-800 dark:text-white">{book.name}</td>
                                                        <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{book.author_name}</td>
                                                        <td className="px-6 py-4">
                                                            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full text-xs font-medium">
                                                                {book.category}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <div className="flex items-center">
                                                                {[...Array(5)].map((_, index) => (
                                                                    <svg
                                                                        key={index}
                                                                        className={`inline-block w-4 h-4 ${index < Math.floor(book.rating)
                                                                            ? 'text-yellow-400'
                                                                            : 'text-gray-300 dark:text-gray-600'}`}
                                                                        fill="currentColor"
                                                                        viewBox="0 0 20 20"
                                                                    >
                                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                                    </svg>
                                                                ))}
                                                                <span className="ml-2 text-gray-600 dark:text-gray-400 text-sm">({book.rating})</span>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full text-xs font-medium">
                                                                {book.quantity} left
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <div className="flex gap-2">
                                                                <NavLink
                                                                    to={`/book/${book._id}`}
                                                                    className="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-blue-700"
                                                                >
                                                                    Details
                                                                </NavLink>
                                                                <button 
                                                                    onClick={() => openModal(book)} 
                                                                    className="bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 border border-blue-600 dark:border-blue-500 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-blue-50 dark:hover:bg-gray-600"
                                                                >
                                                                    Update
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        )}
                        
                        <div className="flex justify-center mt-8">
                            <div className="flex items-center gap-2 bg-white dark:bg-gray-800 px-4 py-3 rounded-xl shadow-lg border border-blue-100 dark:border-blue-900">
                                <button 
                                    onClick={() => { updatePageNumber(pageNumber - 1) }} 
                                    className="text-sm font-semibold px-4 py-2 rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors duration-200"
                                >
                                    PREV
                                </button>
                                <div className="flex items-center gap-1 px-2">
                                    {[...Array(page).keys()].map((item) => (
                                        <button 
                                            key={item} 
                                            onClick={() => { setPageNumber(item) }} 
                                            className={`w-9 h-9 flex items-center justify-center rounded-lg transition-all duration-200 text-sm font-medium
                                                ${pageNumber === item 
                                                    ? 'bg-blue-600 text-white shadow-md' 
                                                    : 'text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900'}`}
                                        >
                                            {item + 1}
                                        </button>
                                    ))}
                                </div>
                                <button 
                                    onClick={() => { updatePageNumber(pageNumber + 1) }} 
                                    className="text-sm font-semibold px-4 py-2 rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors duration-200"
                                >
                                    NEXT
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    {isModalOpen && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto border border-blue-200 dark:border-blue-900">
                                <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                    Update Book
                                </h2>
                                <form onSubmit={handleUpdate} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Image URL</label>
                                        <input
                                            type="text"
                                            name="image"
                                            value={updatedBook.image || ''}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2.5 border border-blue-200 dark:border-blue-900 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={updatedBook.name || ''}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2.5 border border-blue-200 dark:border-blue-900 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Author</label>
                                        <input
                                            type="text"
                                            name="author_name"
                                            value={updatedBook.author_name || ''}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2.5 border border-blue-200 dark:border-blue-900 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
                                        <input
                                            type="text"
                                            name="category"
                                            value={updatedBook.category || ''}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2.5 border border-blue-200 dark:border-blue-900 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Short Description</label>
                                        <textarea
                                            name="short_description"
                                            value={updatedBook.short_description || ""}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2.5 border border-blue-200 dark:border-blue-900 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                                            rows="3"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Book Content</label>
                                        <textarea
                                            name="book_content"
                                            value={updatedBook.book_content || ""}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2.5 border border-blue-200 dark:border-blue-900 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                                            rows="3"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Rating</label>
                                        <input
                                            type="number"
                                            name="rating"
                                            value={updatedBook.rating || ''}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2.5 border border-blue-200 dark:border-blue-900 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                                            min="0"
                                            max="5"
                                            step="0.1"
                                        />
                                    </div>
                                    <div className="flex justify-end gap-3 pt-4 border-t border-blue-100 dark:border-blue-900">
                                        <button
                                            type="button"
                                            onClick={() => setIsModalOpen(false)}
                                            className="px-5 py-2.5 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-md"
                                        >
                                            Update
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AllBooks;
