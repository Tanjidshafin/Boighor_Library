const Subscribe = () => {
    return (
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-12">
            <div className="rounded-2xl h-auto md:h-[30rem] p-8 lg:p-12 bg-blue-600 dark:bg-blue-900 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-blue-400 dark:bg-blue-700"></div>
                    <div className="absolute -left-20 -bottom-20 w-64 h-64 rounded-full bg-blue-400 dark:bg-blue-700"></div>
                    <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-blue-300 dark:bg-blue-800"></div>
                </div>

                <img
                    className="w-full md:w-[28rem] mx-auto rounded-2xl shadow-2xl transition-transform duration-300 hover:scale-105 z-10 border-4 border-white dark:border-blue-800"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXlmv7nGQtNP5PHKaPr619vslceRSr5Rqu7Q&s"
                    alt="Subscribe"
                />

                <div className="max-w-[30rem] text-center md:text-left z-10">
                    <div className="inline-block px-4 py-1 bg-white dark:bg-blue-950 rounded-full text-blue-600 dark:text-blue-300 font-semibold text-sm mb-4 shadow-lg">
                        NEWSLETTER
                    </div>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-white dark:text-blue-100 mb-4 leading-tight">
                        Stay Connected
                    </h2>
                    <p className="text-blue-100 dark:text-blue-200 text-lg my-6 leading-relaxed">
                        Subscribe to our newsletter and never miss out on exclusive offers, new collections, and exciting updates
                        about the latest books.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center md:justify-start items-center gap-4 mt-8">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="border-2 border-blue-300 dark:border-blue-700 py-3 pl-6 pr-6 outline-none w-full sm:w-auto flex-1 rounded-full bg-white dark:bg-blue-950 dark:text-blue-100 text-lg focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-700 transition-all shadow-lg"
                        />
                        <button className="bg-white dark:bg-blue-500 dark:text-white text-blue-600 px-8 py-3 font-medium rounded-full shadow-lg hover:bg-blue-50 dark:hover:bg-blue-600 transition-all duration-300 hover:scale-105 text-lg">
                            Subscribe
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Subscribe
