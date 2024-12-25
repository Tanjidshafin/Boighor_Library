import React, { useState } from 'react';

const AddBook = () => {
    const [bookCover, setBookCover] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        quantity: 0,
        authorName: '',
        category: '',
        description: '',
        rating: 0,
        content: ''
    });

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => setBookCover(e.target.result);
            reader.readAsDataURL(file);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', { ...formData, bookCover });
    };

    return (
        <div className="min-h-screen bg-white dark:bg-gray-800 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto rounded-2xl shadow-2xl overflow-hidden">
                <div className="text-3xl md:text-4xl font-bold dark:text-gray-200 text-center text-gray-800 pt-8 pb-4">Add <span className=' text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-[#1A365D]'>New Book</span> </div>
                <div className="md:flex">
                    <div className="md:w-1/2 p-8 flex items-center justify-center dark:bg-gray-800 bg-gray-50">
                        <div
                            className="border-dashed border-4 border-gray-400 rounded-lg overflow-hidden dark:bg-gray-700 bg-gray-100 w-full aspect-w-3 aspect-h-4 flex items-center justify-center"
                            style={{ maxWidth: '300px', height: '400px' }}
                        >
                            {bookCover ? (
                                <img src={bookCover} alt="Book Cover" className="w-full h-full object-cover" />
                            ) : (
                                <div className="text-center p-4">
                                    <label htmlFor="image-upload" className="cursor-pointer">
                                        <svg className="mx-auto h-16 w-16 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <p className="mt-2 text-lg font-medium text-gray-700 dark:text-gray-500">Upload book cover</p>
                                        <p className="mt-1 text-sm text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                    </label>
                                    <input id="image-upload" type="file" className="hidden" onChange={handleImageUpload} accept="image/*" />
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="md:w-1/2 p-8 bg-white dark:bg-gray-800">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-lg font-medium text-gray-700 dark:text-gray-400 mb-2">Book Title</label>
                                <input type="text" id="name" name="name" required className="block w-full px-4 py-3 rounded-lg border-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-lg" onChange={handleInputChange} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="quantity" className="block dark:text-gray-400 text-lg font-medium text-gray-700 mb-2">Quantity</label>
                                    <input type="number" id="quantity" name="quantity" min="0" required className="block w-full px-4 py-3 rounded-lg border-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-lg" onChange={handleInputChange} />
                                </div>
                                <div>
                                    <label htmlFor="rating" className="block dark:text-gray-400 text-lg font-medium text-gray-700 mb-2">Rating (1-5)</label>
                                    <input type="number" id="rating" name="rating" min="1" max="5" required className="block w-full px-4 py-3 rounded-lg border-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-lg" onChange={handleInputChange} />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="authorName" className="block text-lg font-medium text-gray-700 mb-2 dark:text-gray-400">Author Name</label>
                                <input type="text" id="authorName" name="authorName" required className="block w-full px-4 py-3 rounded-lg border-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-lg" onChange={handleInputChange} />
                            </div>
                            <div>
                                <label htmlFor="category" className="block dark:text-gray-400 text-lg font-medium text-gray-700 mb-2">Category</label>
                                <select id="category" name="category" required className="block w-full px-4 py-3 rounded-lg border-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-lg" onChange={handleInputChange}>
                                    <option value="">Select a category</option>
                                    <option value="Novel">Novel</option>
                                    <option value="Thriller">Thriller</option>
                                    <option value="History">History</option>
                                    <option value="Drama">Drama</option>
                                    <option value="Sci-Fi">Sci-Fi</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="description" className="block text-lg font-medium text-gray-700 mb-2 dark:text-gray-400">Short Description</label>
                                <textarea id="description" name="description" rows="3" className="block w-full px-4 py-3 rounded-lg border-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-lg" onChange={handleInputChange}></textarea>
                            </div>
                            <div>
                                <label htmlFor="content" className="block text-lg font-medium text-gray-700 mb-2 dark:text-gray-400">Book Content</label>
                                <textarea id="content" name="content" rows="4" className="block w-full px-4 py-3 rounded-lg border-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-lg" onChange={handleInputChange}></textarea>
                            </div>
                            <div>
                                <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out">
                                    Add Book
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddBook;

