import React from 'react'
import { NavLink } from 'react-router'
import ReactStars from "react-rating-stars-component";
const Reviews = () => {
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
        <div>
            <section className="relative bg-[url(https://htmldemo.net/boighor/boighor/images/bg/5.jpg)] bg-cover bg-center bg-no-repeat">
                <div className="bg-gray-900/75 sm:bg-transparent sm:from-gray-900/95 sm:to-gray-900/25 ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l"></div>
                <div className="mx-auto md:h-[30rem] justify-center items-center max-w-screen-xl px-4 py-32 sm:px-6 flex flex-col gap-5 lg:items-center lg:px-8">
                    <div className="max-w-xl flex justify-center items-center text-center ltr:sm:text-left rtl:sm:text-right">
                        <h1 className="text-2xl flex items-center text-gray-200 gap-3 font-extrabold sm:text-4xl">
                            RE<span className='text-transparent bg-clip-text bg-gradient-to-br from-blue-500 to-[#1A365D]'>VIEWS</span>

                        </h1>
                    </div>
                    <div className="text-white">
                        <p className="text-xl">
                            <span>
                                <NavLink to="/">Home</NavLink>
                            </span>{' '}
                            /{' '}
                            <span>
                                <NavLink to="/allbooks" className="text-blue-500">
                                    All Books
                                </NavLink>
                            </span>
                        </p>
                    </div>
                </div>
            </section>
            <div className="mt-8 mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 gap-4 md:grid-cols-3">
                {reviews.map(review => (<blockquote className="flex h-full flex-col justify-between bg-white dark:bg-gray-700 p-6 shadow-sm sm:p-8">
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
    )
}

export default Reviews