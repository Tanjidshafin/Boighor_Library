import React, { useContext, useEffect, useState } from 'react';

import ReactStars from "react-rating-stars-component";
import { AppContext } from '../Context/AppContext';
import { NavLink, useParams } from 'react-router';

const PerBooks = () => {
    const { id } = useParams();
    const { borrowBook, books } = useContext(AppContext);
    const [book, setBook] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState('details');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const foundBook = books.find((b) => b._id === id);
        if (foundBook) {
            setBook(foundBook);
            setLoading(false);
        } else {
            fetchBook();
        }
    }, [id, books]);
    const fetchBook = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`https://boighor-server-neon.vercel.app/book/${id}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            if (data.success) {
                setBook(data.data);
            } else {
                setError("Book not found");
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="text-center py-8">Loading book details...</div>;
    }

    if (error) {
        return <div className="text-center py-8 text-red-500">Error: {error}</div>;
    }

    if (!book) {
        return <div className="text-center py-8">No book details available.</div>;
    }

    return (
        <div className="mx-auto max-w-screen-xl px-4 py-8">
            <div className="flex flex-col justify-center lg:flex-row gap-8">
                <div className="lg:w-2/5">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                        <img
                            src={book.image}
                            alt={book.name}
                            className="lg:w-full mx-auto h-auto object-cover rounded-lg"
                        />
                    </div>
                </div>

                <div className="lg:w-1/2">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
                        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-[#1A365D] mb-2">
                            {book.name}
                        </h1>
                        <p className="text-xl dark:text-gray-400 text-gray-600 mb-4">by {book.author_name}</p>
                        <div className="flex items-center mb-6">
                            <ReactStars
                                count={5}
                                value={book.rating}
                                edit={false}
                                size={24}
                                activeColor="#ffd700"
                            />
                            <span className="ml-2 dark:text-gray-400 text-gray-600">({book.rating})</span>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-6">
                            {book.category.split(', ').map((cat) => (
                                <span
                                    key={cat}
                                    className="px-4 py-1.5 bg-blue-50 dark:bg-gray-700 dark:text-gray-300 text-blue-600 rounded-full text-sm font-medium hover:bg-blue-100 transition-colors"
                                >
                                    {cat}
                                </span>
                            ))}
                        </div>

                        <div className="mb-8">
                            <label className="block dark:text-gray-400 text-gray-700 font-medium mb-2">
                                Quantity Available: {book.quantity}
                            </label>

                        </div>

                        <div className="flex flex-col w-full md:w-2/3 sm:flex-row gap-4 mb-8">
                            <NavLink to="/allbooks" className="flex-1 flex justify-center bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-3 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl font-medium">
                                See More
                            </NavLink>
                            <button onClick={() => borrowBook(book._id)} className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-3 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl font-medium">
                                Borrow Now
                            </button>
                        </div>

                        <div className="border-b border-gray-200 mb-6">
                            <div className="flex gap-6">
                                <button
                                    onClick={() => setActiveTab('details')}
                                    className={`py-2 relative ${activeTab === 'details' ? 'text-blue-600' : 'text-gray-600 dark:text-gray-400 hover:text-gray-800'}`}
                                >
                                    Details
                                    {activeTab === 'details' && (
                                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600"></span>
                                    )}
                                </button>
                                <button
                                    onClick={() => setActiveTab('content')}
                                    className={`py-2 relative ${activeTab === 'content' ? 'text-blue-600' : 'text-gray-600 dark:text-gray-400 hover:text-gray-800'}`}
                                >
                                    Book Content
                                    {activeTab === 'content' && (
                                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600"></span>
                                    )}
                                </button>
                            </div>
                        </div>
                        <div className="prose max-w-none">
                            {activeTab === 'details' ? (
                                <div>
                                    <h3 className="text-lg font-semibold dark:text-gray-400 mb-3 text-gray-800">Description</h3>
                                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{book.short_description}</p>
                                </div>
                            ) : (
                                <div>
                                    <h3 className="text-lg font-semibold dark:text-gray-400 mb-3 text-gray-800">Book Content</h3>
                                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{book.book_content}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PerBooks;