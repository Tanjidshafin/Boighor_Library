import image from "/books.png"
const Subscribe = () => {
    return (
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-12">
            <div className="rounded-2xl h-auto md:h-[30rem] p-8 lg:p-12 bg-white dark:bg-gray-900 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                    <div className="absolute -left-20 -bottom-20 w-64 h-64 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                    <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gray-100 dark:bg-gray-800"></div>
                </div>

                <img
                    className="w-full md:w-[28rem] mx-auto transition-transform duration-300 hover:scale-105 z-10 border-4 border-white dark:border-gray-800"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXlmv7nGQtNP5PHKaPr619vslceRSr5Rqu7Q&s"
                    alt="Subscribe"
                />

                <div className="max-w-[30rem] text-center md:text-left z-10">
                    <div className="inline-block px-4 py-1 bg-blue-500 rounded-full text-white font-semibold text-sm mb-4 shadow-lg">
                        NEWSLETTER
                    </div>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-blue-500 mb-4 leading-tight">
                        Stay Connected
                    </h2>
                    <p className="text-gray-600 dark:text-gray-200 text-lg my-6 leading-relaxed">
                        Subscribe to our newsletter and never miss out on exclusive offers, new collections, and exciting updates
                        about the latest books.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center md:justify-start items-center gap-4 mt-8">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="border-2 border-gray-300 dark:border-gray-700 py-3 pl-6 pr-6 outline-none w-full sm:w-auto flex-1 rounded-full bg-white dark:bg-gray-950 dark:text-gray-100 text-lg focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-700 transition-all shadow-lg"
                        />
                        <button className="bg-blue-500 text-white px-8 py-3 font-medium rounded-full shadow-lg transition-all duration-300 hover:scale-105 text-lg">
                            Subscribe
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Subscribe
