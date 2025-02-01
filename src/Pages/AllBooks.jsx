import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router';
import { AppContext } from '../Context/AppContext';
import { FaChevronRight } from 'react-icons/fa';
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

                        {loading ? (<div className="flex justify-center items-center h-48">
                            <TailSpin
                                visible={true}
                                height="80"
                                width="80"
                                color="#4fa94d"
                                ariaLabel="tail-spin-loading"
                                radius="1"
                            />
                        </div>) : (viewType === "grid" ? (sortedAndFilteredBooks.length === 0 ? (<div className='text-center py-10
                                '><Typewriter
                                words={["No Books to show right now"]}
                                loop=""
                                cursor
                                cursorStyle='_'
                                typeSpeed={70}
                                deleteSpeed={50}
                                delaySpeed={1000}
                            /></div>) : (<div><div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                                {sortedAndFilteredBooks.map((book) => (
                                    <div>
                                        <div
                                            key={book._id}
                                            className="bg-white dark:bg-gray-800 sm:rounded-b-none rounded-lg shadow-md overflow-hidden"
                                        >
                                            <div className="w-full">
                                                <img
                                                    src={book.image}
                                                    alt={book.name}
                                                    className={`w-full h-48 object-cover`}
                                                />
                                            </div>
                                            <div className='flex flex-col justify-between'>
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
                                                </div>
                                                <div className="flex gap-3 mt-4 justify-center pb-5 px-4 sm:pb-0 sm:px-0 sm:flex-row sm:items-end sm:justify-end">
                                                    <NavLink to={`/book/${book._id}`}
                                                        className="block bg-blue-500 px-5 py-3 w-full sm:w-auto text-center text-xs font-bold uppercase text-white transition hover:bg-blue-600"
                                                    >
                                                        Details
                                                    </NavLink>
                                                    <button onClick={() => openModal(book)}
                                                        className="block bg-blue-500 px-5 py-3 w-full sm:w-auto text-center text-xs font-bold uppercase text-white transition hover:bg-blue-600"
                                                    >
                                                        Update
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div></div>)) : (<div className="overflow-x-auto">

                                {sortedAndFilteredBooks.length === 0 ? (<div className='text-center py-10
                                '><Typewriter
                                        words={["No Books to show right now"]}
                                        loop={true}
                                        cursor
                                        cursorStyle='_'
                                        typeSpeed={70}
                                        deleteSpeed={50}
                                        delaySpeed={1000}
                                    /></div>) : (<div><table className="min-w-full table-auto border-collapse border border-gray-200 dark:border-gray-600">
                                        <thead className="bg-gray-200 dark:bg-gray-700">
                                            <tr>
                                                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Image</th>
                                                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Name</th>
                                                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Author</th>
                                                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Category</th>
                                                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Rating</th>
                                                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Quantity</th>
                                                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {sortedAndFilteredBooks.map((book) => (
                                                <tr key={book._id} className="even:bg-gray-100 dark:even:bg-gray-800">
                                                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                                                        <img src={book.image} alt={book.name} className="w-16 h-16 object-cover rounded-md" />
                                                    </td>
                                                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{book.name}</td>
                                                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{book.author_name}</td>
                                                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{book.category}</td>
                                                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                                                        {[...Array(5)].map((_, index) => (
                                                            <svg
                                                                key={index}
                                                                className={`inline-block w-4 h-4 ${index < Math.floor(book.rating)
                                                                    ? 'text-yellow-400'
                                                                    : 'text-gray-300'}`}
                                                                fill="currentColor"
                                                                viewBox="0 0 20 20"
                                                            >
                                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                            </svg>
                                                        ))}
                                                        <span className="ml-2 text-gray-600 dark:text-gray-400 text-sm">({book.rating})</span>
                                                    </td>
                                                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{book.quantity}</td>
                                                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                                                        <div className="flex gap-2">
                                                            <NavLink
                                                                to={`/book/${book._id}`}
                                                                className="bg-blue-500 text-white px-2 py-1 rounded text-sm"
                                                            >
                                                                Details
                                                            </NavLink>
                                                            <button onClick={() => openModal(book)} className="bg-blue-500 text-white px-2 py-1 rounded text-sm">Update</button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table></div>)}

                            </div>)

                        )}
                        <div className='flex justify-center mt-5 items-center gap-5 dark:bg-gray-800 bg-white p-2 shadow-lg rounded-md w-fit mx-auto select-none'>
                            {/* left arrow */}
                            <div onClick={() => { updatePageNumber(pageNumber - 1) }} className='text-[12px] cursor-pointer font-semibold px-1 py-1'>
                                PREV
                            </div>
                            <div className='flex justify-center items-center gap-2 '>
                                {[...Array(page).keys()].map((item, ind) => <div key={item} onClick={() => { setPageNumber(item) }} className={`cursor-pointer hover:scale-110  border-b-2  text-sm scale-100 transition-all duration-200 px-3 ${pageNumber === item ? 'border-sky-300' : 'border-white'}   font-semibold text-gray-700 dark:text-gray-400    py-[6px] `} >
                                    {item + 1}
                                </div>)}
                            </div>
                            {/* right arrow */}
                            <div onClick={() => { updatePageNumber(pageNumber + 1) }} className='text-[12px] cursor-pointer font-semibold px-1 py-1'>
                                NEXT
                            </div>
                        </div>
                    </div>
                    {isModalOpen && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md max-h-full overflow-y-auto">
                                <h2 className="text-xl font-bold mb-4">Update Book</h2>
                                <form onSubmit={handleUpdate}>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium mb-1">Image URL</label>
                                        <input
                                            type="text"
                                            name="image"
                                            value={updatedBook.image || ''}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border rounded-md"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium mb-1">Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={updatedBook.name || ''}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border rounded-md"
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium mb-1">Author</label>
                                        <input
                                            type="text"
                                            name="author_name"
                                            value={updatedBook.author_name || ''}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border rounded-md"
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium mb-1">Category</label>
                                        <input
                                            type="text"
                                            name="category"
                                            value={updatedBook.category || ''}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border rounded-md"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium mb-1">Short Description</label>
                                        <textarea
                                            name="short_description"
                                            value={updatedBook.short_description || ""}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border rounded-md"
                                            rows="3"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium mb-1">Book Content</label>
                                        <textarea
                                            name="book_content"
                                            value={updatedBook.book_content || ""}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border rounded-md"
                                            rows="3"
                                        />
                                    </div>
                                    <div className="mb-4 ">
                                        <label className="block text-sm font-medium mb-1">Rating</label>
                                        <input
                                            type="number"
                                            name="rating"
                                            value={updatedBook.rating || ''}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border rounded-md"
                                            min="0"
                                            max="5"
                                            step="0.1"
                                        />
                                    </div>
                                    <div className="flex justify-end mt-5 gap-2 sticky bottom-0 bg-white dark:bg-gray-800 p-4">
                                        <button
                                            type="button"
                                            onClick={() => setIsModalOpen(false)}
                                            className="px-4 py-2 dark:bg-gray-700 bg-gray-300 rounded-md"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="px-4 py-2 bg-blue-500 text-white rounded-md"
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
