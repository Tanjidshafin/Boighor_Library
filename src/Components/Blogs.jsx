import React from 'react'
import ReactStars from "react-rating-stars-component";
import { NavLink } from 'react-router';
const Blogs = () => {
    const reviews = [
        {
            title: "The Midnight Library",
            description: "A captivating tale where a magical library allows exploration of infinite life choices, resonating with themes of regret and hope.",
            author: "Matt Haig",
            rating: 5
        },
        {
            title: "The Vanishing Half",
            description: "A powerful narrative exploring identity and race through the divergent paths of twin sisters, highlighting self-discovery and societal expectations.",
            author: "Brit Bennett",
            rating: 4
        },
        {
            title: "Project Hail Mary",
            description: "A thrilling sci-fi adventure following an astronaut on a mission to save humanity, blending humor, science, and suspense.",
            author: "Andy Weir",
            rating: 5
        },
        {
            title: "Klara and the Sun",
            description: "A thought-provoking exploration of artificial intelligence told from the perspective of an artificial friend, raising questions about humanity.",
            author: "Kazuo Ishiguro",
            rating: 4
        },
        {
            title: "The Invisible Life of Addie LaRue",
            description: "A mesmerizing tale of a young woman who makes a Faustian bargain to live forever but is forgotten by everyone.",
            author: "V.E. Schwab",
            rating: 5
        },
        {
            title: "The Guest List",
            description: "A gripping murder mystery set during a glamorous wedding on a remote island, featuring intriguing characters and a twisty plot.",
            author: "Lucy Foley",
            rating: 4
        },
        {
            title: "Caste: The Origins of Our Discontents",
            description: "A compelling examination of the unspoken caste system in America, drawing parallels with other societies to highlight systemic inequality.",
            author: "Isabel Wilkerson",
            rating: 5
        },
        {
            title: "The Night Circus",
            description: "A spellbinding tale of magic and rivalry set in a mysterious circus that appears only at night, captivating readers.",
            author: "Erin Morgenstern",
            rating: 5
        },
        {
            title: "The Seven Husbands of Evelyn Hugo",
            description: "A captivating story of a Hollywood icon revealing her glamorous yet tumultuous life through a series of revealing interviews.",
            author: "Taylor Jenkins Reid",
            rating: 5
        }
    ]

    return (
        <section className="bg-gray-50 my-10 dark:bg-gray-800">
            <div className="mx-auto max-w-screen-2xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
                <div className="md:flex md:items-end md:justify-between">
                    <div className="max-w-xl">
                        <h2 className="text-4xl dark:text-gray-200 font-bold tracking-tight text-gray-900 sm:text-5xl">
                            Readers' Choice: <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-[#1A365D]'>Trusted Reviews</span>
                        </h2>

                        <p className="mt-6 max-w-lg leading-relaxed text-gray-400">
                            Discover insightful reviews from our trusted readers, guiding you to the best books and enriching your reading experience.
                        </p>
                    </div>

                    <NavLink to="/reviews"

                        className="mt-6 inline-flex shrink-0 items-center gap-2 rounded-full border border-blue-500 px-5 py-3 text-blue-500 transition hover:bg-blue-500 hover:text-white md:mt-0"
                    >
                        <span className="font-medium"> Read all reviews </span>

                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="size-4 rtl:rotate-180"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M14 5l7 7m0 0l-7 7m7-7H3"
                            />
                        </svg>
                    </NavLink>
                </div>

                <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
                    {reviews.slice(0, 3).map(review => (<blockquote className="flex h-full flex-col justify-between bg-white dark:bg-gray-700 p-6 shadow-sm sm:p-8">
                        <div>
                            <div>
                                <ReactStars
                                    count={5}
                                    value={review.rating}
                                    edit={false}
                                    size={24}
                                    activeColor="#ffd700"
                                />
                            </div>

                            <div className="mt-4">
                                <p className="text-2xl font-bold text-blue-500 sm:text-3xl">{review.title}</p>

                                <p className="mt-4 leading-relaxed text-gray-700 dark:text-gray-400">
                                   {review.description}
                                </p>
                            </div>
                        </div>

                        <footer className="mt-4 text-sm font-medium text-gray-700 dark:text-gray-400 sm:mt-6">
                            &mdash; {review.author}
                        </footer>
                    </blockquote>))}
                </div>
            </div>
        </section>
    )
}

export default Blogs