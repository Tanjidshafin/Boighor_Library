import React, { useContext, useState } from 'react'
import { useParams } from 'react-router'
import { AppContext } from '../Context/AppContext'

const PerBooks = () => {
    const { bookId } = useParams()
    const { books } = useContext(AppContext)
    const book = books.find(book => book._id === bookId)
    console.log(book);
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState('details');
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col lg:flex-row gap-8">
                <div className="lg:w-2/5">
                    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                        <img
                            src={book.image}
                            alt={book.name}
                            className="w-full h-auto object-cover rounded-lg"
                        />
                    </div>
                </div>
                <div className="lg:w-3/5">
                    <div className="bg-white rounded-xl shadow-lg p-8">
                        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-[#1A365D] mb-2">
                            {book.name}
                        </h1>
                        <p className="text-xl text-gray-600 mb-4">by {book.author}</p>
                        <div className="flex items-center mb-6">
                            {[...Array(5)].map((_, index) => (
                                <svg
                                    key={index}
                                    className={`w-6 h-6 ${index < Math.floor(book.rating)
                                        ? 'text-yellow-400'
                                        : 'text-gray-300'
                                        }`}
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            ))}
                            <span className="ml-2 text-gray-600">({book.rating})</span>
                        </div>


                        <div className="flex flex-wrap gap-2 mb-6">
                            {book.category.split(', ').map((cat) => (
                                <span
                                    key={cat}
                                    className="px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-sm font-medium hover:bg-blue-100 transition-colors"
                                >
                                    {cat}
                                </span>
                            ))}
                        </div>


                        <div className="mb-8">
                            <label className="block text-gray-700 font-medium mb-2">
                                Quantity Available: {book.quantity}
                            </label>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center border-2 rounded-lg">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-l-lg transition-colors"
                                    >
                                        -
                                    </button>
                                    <span className="px-6 py-2 border-x-2 font-medium">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(Math.min(book.quantity, quantity + 1))}
                                        className="px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-r-lg transition-colors"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>


                        <div className="flex flex-col sm:flex-row gap-4 mb-8">
                            <button className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-3 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl font-medium">
                                Add to Collection
                            </button>
                            <button className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-3 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl font-medium">
                                Borrow Now
                            </button>
                        </div>
                        <div className="border-b border-gray-200 mb-6">
                            <div className="flex gap-6">
                                <button
                                    onClick={() => setActiveTab('details')}
                                    className={`py-2 relative ${activeTab === 'details'
                                        ? 'text-blue-600'
                                        : 'text-gray-600 hover:text-gray-800'
                                        }`}
                                >
                                    Details
                                    {activeTab === 'details' && (
                                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600"></span>
                                    )}
                                </button>
                                <button
                                    onClick={() => setActiveTab('content')}
                                    className={`py-2 relative ${activeTab === 'content'
                                        ? 'text-blue-600'
                                        : 'text-gray-600 hover:text-gray-800'
                                        }`}
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
                                    <h3 className="text-lg font-semibold mb-3 text-gray-800">Description</h3>
                                    <p className="text-gray-600 leading-relaxed">{book.short_description}</p>
                                </div>
                            ) : (
                                <div>
                                    <h3 className="text-lg font-semibold mb-3 text-gray-800">Book Content</h3>
                                    <p className="text-gray-600 leading-relaxed">{book.book_content}</p>
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