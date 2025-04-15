"use client"

import { useContext, useState } from "react"
import { AppContext } from "../Context/AppContext"

const AddBook = () => {
    const [image, setImage] = useState("")
    const { addBook } = useContext(AppContext)
    const [formData, setFormData] = useState({
        name: "",
        quantity: 0,
        author_name: "",
        category: "",
        short_description: "",
        rating: 0,
        book_content: "",
        image: "",
        pages: 0,
    })
    const [message, setMessage] = useState(null)

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData((prevData) => ({ ...prevData, [name]: value }))
    }

    const handleImageChange = (e) => {
        const imageValue = e.target.value
        setImage(imageValue)
        setFormData((prevData) => ({ ...prevData, image: imageValue }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!formData.name || !formData.author_name || !formData.category) {
            setMessage({ type: "error", text: "Please fill in all required fields!" })
            return
        }
        try {
            await addBook(formData)
            setMessage({ type: "success", text: "Book added successfully!" })
            setFormData({
                name: "",
                quantity: 0,
                author_name: "",
                category: "",
                short_description: "",
                rating: 0,
                book_content: "",
                image: "",
                pages: 0,
            })
            setImage("")
        } catch (error) {
            setMessage({ type: "error", text: "Failed to add book. Please try again." })
        }
    }

    return (
        <div className="min-h-screen bg-blue-50 dark:bg-gray-900 py-12 px-2 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto overflow-hidden rounded-3xl">
                {/* Replace gradient header with solid blue */}
                <div className="relative py-8">
                    {/* Remove the pattern background div */}
                    <h1 className="relative text-4xl md:text-5xl font-extrabold text-center text-gray-800 dark:text-gray-300">
                        <span className="">Add New</span>
                        <span className="ml-2 text-blue-500">Book</span>
                    </h1>
                </div>

                <div className="md:flex">
                    {/* Image Preview Section */}
                    <div className="md:w-1/2 md:p-8 p-4 bg-white dark:bg-gray-800 relative">
                        <div className="absolute -top-6 left-8 bg-blue-600 text-white text-sm font-bold py-1 px-3 rounded-full shadow-lg">
                            Book Cover
                        </div>
                        <div className="flex flex-col">
                            <div className="mb-6 relative">
                                <label htmlFor="image-url" className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Enter Image URL
                                </label>
                                <div className="relative">
                                    <input
                                        id="image-url"
                                        type="url"
                                        placeholder="https://example.com/image.jpg"
                                        className="block w-full px-4 py-3 rounded-xl border-2 border-blue-200 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 text-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-all duration-300"
                                        value={image}
                                        onChange={handleImageChange}
                                    />
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6 text-blue-500"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div className="border-4 border-dashed border-blue-200 dark:border-blue-800 rounded-2xl overflow-hidden bg-blue-50 dark:from-gray-700 dark:to-gray-900 aspect-w-3 h-[30rem] flex items-center justify-center group transition-all duration-300 hover:border-blue-400">
                                {image ? (
                                    <img
                                        src={image || "/placeholder.svg"}
                                        alt="Book Cover"
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="text-center p-4 flex flex-col items-center">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-24 w-24 text-blue-300 mb-4"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={1}
                                                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                            />
                                        </svg>
                                        <p className="text-xl font-medium text-blue-400 dark:text-blue-300">Add a cover image</p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Paste an image URL above</p>
                                    </div>
                                )}
                            </div>

                            {/* Add page input at the bottom of book cover section */}
                            <div className="mt-6">
                                <label htmlFor="pages" className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Number of Pages
                                </label>
                                <input
                                    type="number"
                                    id="pages"
                                    name="pages"
                                    value={formData.pages || ""}
                                    className="block w-full px-4 py-3 rounded-xl border-2 border-blue-200 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 text-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-all duration-300"
                                    onChange={handleInputChange}
                                    placeholder="Enter number of pages"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Form Section */}
                    <div className="md:w-1/2 2 md:p-8 p-4 bg-white dark:bg-gray-800 relative">
                        <div className="absolute -top-6 right-8 bg-blue-600 text-white text-sm font-bold py-1 px-3 rounded-full shadow-lg">
                            Book Details
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="col-span-2">
                                    <label htmlFor="name" className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Book Title
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            required
                                            className="block w-full px-4 py-3 rounded-xl border-2 border-blue-200 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 text-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-all duration-300"
                                            onChange={handleInputChange}
                                            placeholder="Enter book title"
                                        />
                                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-6 w-6 text-blue-500"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                <div className="w-full col-span-2 md:col-span-1">
                                    <label
                                        htmlFor="author_name"
                                        className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2"
                                    >
                                        Author
                                    </label>
                                    <input
                                        type="text"
                                        id="author_name"
                                        name="author_name"
                                        value={formData.author_name}
                                        required
                                        className="block w-full px-4 py-3 rounded-xl border-2 border-blue-200 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 text-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-all duration-300"
                                        onChange={handleInputChange}
                                        placeholder="Author name"
                                    />
                                </div>

                                <div className="w-full col-span-2 md:col-span-1">
                                    <label htmlFor="category" className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Category
                                    </label>
                                    <input
                                        type="text"
                                        id="category"
                                        name="category"
                                        value={formData.category}
                                        required
                                        className="block w-full px-4 py-3 rounded-xl border-2 border-blue-200 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 text-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-all duration-300"
                                        onChange={handleInputChange}
                                        placeholder="Book category"
                                    />
                                </div>

                                <div className="w-full col-span-2 md:col-span-1">
                                    <label htmlFor="quantity" className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Quantity
                                    </label>
                                    <input
                                        type="number"
                                        id="quantity"
                                        name="quantity"
                                        value={formData.quantity}
                                        className="block w-full px-4 py-3 rounded-xl border-2 border-blue-200 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 text-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-all duration-300"
                                        onChange={handleInputChange}
                                        placeholder="0"
                                    />
                                </div>

                                <div className="w-full col-span-2 md:col-span-1">
                                    <label htmlFor="rating" className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Rating
                                    </label>
                                    <input
                                        type="number"
                                        id="rating"
                                        name="rating"
                                        value={formData.rating}
                                        min="0"
                                        max="5"
                                        step="0.1"
                                        className="block w-full px-4 py-3 rounded-xl border-2 border-blue-200 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 text-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-all duration-300"
                                        onChange={handleInputChange}
                                        placeholder="0.0"
                                    />
                                </div>

                                <div className="col-span-2">
                                    <label
                                        htmlFor="short_description"
                                        className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2"
                                    >
                                        Short Description
                                    </label>
                                    <textarea
                                        id="short_description"
                                        name="short_description"
                                        value={formData.short_description}
                                        rows="2"
                                        className="block w-full px-4 py-3 rounded-xl border-2 border-blue-200 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 text-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-all duration-300"
                                        onChange={handleInputChange}
                                        placeholder="Brief description of the book"
                                    ></textarea>
                                </div>

                                <div className="col-span-2">
                                    <label
                                        htmlFor="book_content"
                                        className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2"
                                    >
                                        Book Content
                                    </label>
                                    <textarea
                                        id="book_content"
                                        name="book_content"
                                        value={formData.book_content}
                                        rows="3"
                                        className="block w-full px-4 py-3 rounded-xl border-2 border-blue-200 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 text-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-all duration-300"
                                        onChange={handleInputChange}
                                        placeholder="Detailed content or summary"
                                    ></textarea>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full flex justify-center items-center py-4 px-6 rounded-xl text-xl font-bold text-white bg-blue-600 hover:bg-blue-700 transform hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-xl"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 mr-2"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                Add Book
                            </button>
                        </form>

                        {message && (
                            <div
                                className={`mt-6 p-4 rounded-xl ${message.type === "success"
                                    ? "bg-green-50 text-green-700 border-l-4 border-green-500 dark:bg-green-900/30 dark:text-green-300"
                                    : "bg-red-50 text-red-700 border-l-4 border-red-500 dark:bg-red-900/30 dark:text-red-300"
                                    } flex items-center shadow-md transition-all duration-500 animate-fadeIn`}
                            >
                                <div className={`mr-3 flex-shrink-0 ${message.type === "success" ? "text-green-500" : "text-red-500"}`}>
                                    {message.type === "success" ? (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                    ) : (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                    )}
                                </div>
                                <div className="font-medium">{message.text}</div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="bg-blue-600 h-2"></div>
            </div>
        </div>
    )
}

export default AddBook
