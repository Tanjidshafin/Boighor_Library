import React, { useContext, useState } from "react";
import { AppContext } from "../Context/AppContext";

const AddBook = () => {
    const [image, setImage] = useState("");
    const { addBook } = useContext(AppContext);
    const [formData, setFormData] = useState({
        name: "",
        quantity: 0,
        author_name: "",
        category: "",
        short_description: "",
        rating: 0,
        book_content: "",
        image: "",
    });
    const [message, setMessage] = useState(null);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };
    const handleImageChange = (e) => {
        const imageValue = e.target.value;
        setImage(imageValue);
        setFormData((prevData) => ({ ...prevData, image: imageValue }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.author_name || !formData.category) {
            setMessage({ type: "error", text: "Please fill in all required fields!" });
            return;
        }
        try {
            await addBook(formData);
            setMessage({ type: "success", text: "Book added successfully!" });
            setFormData({
                name: "",
                quantity: 0,
                author_name: "",
                category: "",
                short_description: "",
                rating: 0,
                book_content: "",
                image: "",
            });
            setImage("");
        } catch (error) {
            setMessage({ type: "error", text: "Failed to add book. Please try again." });
        }
    };
    return (
        <div className="min-h-screen bg-white dark:bg-gray-800 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto rounded-2xl shadow-2xl overflow-hidden">
                <div className="text-3xl md:text-4xl font-bold dark:text-gray-200 text-center text-gray-800 pt-8 pb-4">
                    Add <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-[#1A365D]">New Book</span>
                </div>
                <div className="md:flex">
                    <div className="md:w-1/2 p-8 dark:bg-gray-800 bg-gray-50">
                        <div className="flex flex-col">
                            <div className="mb-4">
                                <label
                                    htmlFor="image-url"
                                    className="block text-lg font-medium text-gray-700 dark:text-gray-400 mb-2"
                                >
                                    Enter Image URL
                                </label>
                                <input
                                    id="image-url"
                                    type="url"
                                    placeholder="https://example.com/image.jpg"
                                    className="block w-full px-4 py-3 rounded-lg border-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-lg"
                                    value={image}
                                    onChange={handleImageChange}
                                />
                            </div>
                            <div
                                className="border-dashed border-4 border-gray-400 rounded-lg overflow-hidden dark:bg-gray-700 bg-gray-100 aspect-w-3 h-[40rem] flex items-center justify-center"
                            >
                                {image ? (
                                    <img src={image} alt="Book Cover" className="w-full mx-auto h-full object-cover" />
                                ) : (
                                    <div className="text-center p-4">
                                        <p className="text-lg font-medium text-gray-700 dark:text-gray-500">No image to display</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="md:w-1/2 p-8 bg-white dark:bg-gray-800">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {["name", "quantity", "author_name", "category", "short_description", "book_content", "rating"].map(
                                (field) => (
                                    <div key={field}>
                                        <label
                                            htmlFor={field}
                                            className="block text-lg font-medium text-gray-700 dark:text-gray-400 mb-2"
                                        >
                                            {field.charAt(0).toUpperCase() + field.slice(1).replace("_", " ")}
                                        </label>
                                        <input
                                            type={field === "quantity" || field === "rating" ? "number" : "text"}
                                            id={field}
                                            name={field}
                                            value={formData[field]}
                                            required
                                            className="block w-full px-4 py-3 rounded-lg border-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-lg"
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                )
                            )}
                            <button
                                type="submit"
                                className="w-full flex justify-center py-3 px-4 rounded-lg shadow-sm text-lg font-medium bg-indigo-600 text-white"
                            >
                                Add Book
                            </button>
                        </form>
                        {message && (
                            <div
                                className={`mt-4 p-4 rounded ${message.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                                    }`}
                            >
                                {message.text}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddBook;
