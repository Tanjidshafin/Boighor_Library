"use client"

import { useState } from "react"
import { NavLink } from "react-router"
import ReactStars from "react-rating-stars-component"
import { motion } from "framer-motion"

const Reviews = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null)

  const reviews = [
    {
      title: "The Midnight Library",
      description:
        "A captivating tale where a magical library allows exploration of infinite life choices, resonating with themes of regret and hope.",
      author: "Matt Haig",
      rating: 5,
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "The Vanishing Half",
      description:
        "A powerful narrative exploring identity and race through the divergent paths of twin sisters, highlighting self-discovery and societal expectations.",
      author: "Brit Bennett",
      rating: 4,
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Project Hail Mary",
      description:
        "A thrilling sci-fi adventure following an astronaut on a mission to save humanity, blending humor, science, and suspense.",
      author: "Andy Weir",
      rating: 5,
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Klara and the Sun",
      description:
        "A thought-provoking exploration of artificial intelligence told from the perspective of an artificial friend, raising questions about humanity.",
      author: "Kazuo Ishiguro",
      rating: 4,
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "The Invisible Life of Addie LaRue",
      description:
        "A mesmerizing tale of a young woman who makes a Faustian bargain to live forever but is forgotten by everyone.",
      author: "V.E. Schwab",
      rating: 5,
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "The Guest List",
      description:
        "A gripping murder mystery set during a glamorous wedding on a remote island, featuring intriguing characters and a twisty plot.",
      author: "Lucy Foley",
      rating: 4,
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Caste: The Origins of Our Discontents",
      description:
        "A compelling examination of the unspoken caste system in America, drawing parallels with other societies to highlight systemic inequality.",
      author: "Isabel Wilkerson",
      rating: 5,
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "The Night Circus",
      description:
        "A spellbinding tale of magic and rivalry set in a mysterious circus that appears only at night, captivating readers.",
      author: "Erin Morgenstern",
      rating: 5,
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "The Seven Husbands of Evelyn Hugo",
      description:
        "A captivating story of a Hollywood icon revealing her glamorous yet tumultuous life through a series of revealing interviews.",
      author: "Taylor Jenkins Reid",
      rating: 5,
      color: "from-blue-500 to-blue-600",
    },
  ]

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } },
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative bg-[url(https://htmldemo.net/boighor/boighor/images/bg/5.jpg)] bg-cover bg-center bg-no-repeat"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-gray-900/70 dark:from-gray-950/95 dark:to-gray-950/80"></div>

        <div className="relative mx-auto md:h-[30rem] justify-center items-center max-w-screen-xl px-4 py-32 sm:px-6 flex flex-col gap-5 lg:items-center lg:px-8">
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-xl flex justify-center items-center text-center"
          >
            <h1 className="text-3xl flex flex-col md:flex-row items-center text-white gap-3 font-extrabold sm:text-5xl">
              READERS'
              <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 dark:from-blue-300 dark:to-blue-500 relative">
                REVIEWS
                <motion.span
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="absolute -bottom-2 left-0 h-1 bg-blue-400 dark:bg-blue-500"
                ></motion.span>
              </span>
            </h1>
          </motion.div>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-white mt-4"
          >
            <p className="text-xl flex items-center gap-2">
              <NavLink to="/" className="hover:text-blue-300 transition-colors">
                Home
              </NavLink>
              <span className="text-blue-300">/</span>
              <NavLink to="/allbooks" className="text-blue-300 hover:text-blue-200 transition-colors">
                All Books
              </NavLink>
            </p>
          </motion.div>
        </div>
      </motion.section>

      <div className="relative py-16 sm:py-24">
        <div className="absolute inset-0 z-0 opacity-20 dark:opacity-10 overflow-hidden">
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-blue-300 dark:bg-blue-900 rounded-full filter blur-3xl"></div>
          <div className="absolute top-1/2 right-0 w-80 h-80 bg-blue-300 dark:bg-blue-900 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-blue-300 dark:bg-blue-900 rounded-full filter blur-3xl"></div>
        </div>

        <div className="relative z-10 mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-12 text-center"
          >
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              What Our{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500">
                Readers
              </span>{" "}
              Are Saying
            </h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="mt-4 max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-300"
            >
              Discover insightful reviews from our trusted readers, guiding you to your next favorite book.
            </motion.p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {reviews.map((review, index) => (
              <motion.div
                key={index}
                variants={item}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="relative"
              >
                <motion.div
                  initial={{ rotate: 0 }}
                  animate={{
                    rotate: hoveredIndex === index ? -2 : 0,
                    scale: hoveredIndex === index ? 1.02 : 1,
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="absolute inset-0 rounded-2xl bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800"
                ></motion.div>

                <motion.blockquote
                  className="relative h-full flex flex-col justify-between rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-lg sm:p-8 border border-gray-100 dark:border-gray-700 overflow-hidden"
                  initial={{ rotate: 0 }}
                  animate={{
                    rotate: hoveredIndex === index ? 0 : 0,
                    scale: hoveredIndex === index ? 1.01 : 1,
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {/* Decorative gradient corner */}
                  <div
                    className={`absolute -top-10 -right-10 w-24 h-24 rounded-full bg-gradient-to-br ${review.color} opacity-20 blur-xl`}
                  ></div>

                  <div>
                    <div className="flex items-center">
                      <ReactStars count={5} value={review.rating} edit={false} size={24} activeColor="#ffd700" />
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400"
                      >
                        {review.rating}.0
                      </motion.span>
                    </div>

                    <div className="mt-4">
                      <motion.p
                        className={`text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${review.color} sm:text-3xl`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                      >
                        {review.title}
                      </motion.p>

                      <motion.p
                        className="mt-4 leading-relaxed text-gray-700 dark:text-gray-300"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                      >
                        {review.description}
                      </motion.p>
                    </div>
                  </div>

                  <motion.footer
                    className="mt-6 flex items-center gap-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                  >
                    <div
                      className={`h-8 w-8 rounded-full bg-gradient-to-r ${review.color} flex items-center justify-center text-white font-bold`}
                    >
                      {review.author.charAt(0)}
                    </div>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{review.author}</span>
                  </motion.footer>
                </motion.blockquote>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-12 text-center"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <NavLink
                to="/allbooks"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-3.5 text-white font-medium shadow-lg transition-all duration-300 hover:shadow-xl hover:from-blue-600 hover:to-blue-700"
              >
                <span>Explore all books</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-5 transform transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </NavLink>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Reviews
