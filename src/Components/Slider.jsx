"use client"

import { useEffect, useState, useCallback, useContext } from "react"
import AOS from "aos"
import "aos/dist/aos.css"
import { Typewriter } from "react-simple-typewriter"
import { AppContext } from "../Context/AppContext"
import { NavLink } from "react-router"

const Slider = () => {
  const [currentSlider, setCurrentSlider] = useState(0)
  const { user } = useContext(AppContext)

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    })
  }, [])

  const carouselImages = [
    {
      image: "https://htmldemo.net/koparion/koparion/img/slider/6.jpg",
      title: "Books Without Borders",
      description:
        "Dive into a world of stories that transcend boundaries. Our library offers a diverse collection of books from around the globe, inviting readers of all ages to explore new cultures and perspectives.",
    },
    {
      image: "https://htmldemo.net/koparion/koparion/img/slider/1.jpg",
      title: "The Digital Shelf",
      description:
        "Experience the future of reading with our digital library. Access e-books, audiobooks, and online resources anytime, anywhere, making literature more accessible than ever before.",
    },
    {
      image: "https://htmldemo.net/koparion/koparion/img/slider/5.jpg",
      title: "Community Reads",
      description:
        "Embark on a journey through the pages of captivating novels and enlightening non-fiction. Our library is your gateway to literary adventures that spark imagination and ignite curiosity.",
    },
    {
      image: "https://htmldemo.net/koparion/koparion/img/slider/3.jpg",
      title: " Literary Adventures",
      description:
        "More than just books! Our library features a makerspace where creativity meets technology. Explore workshops, hands-on projects, and collaborative learning experiences that bring stories to life.",
    },
    {
      image: "https://htmldemo.net/koparion/koparion/img/slider/8.jpg",
      title: "Read, Learn, Grow",
      description:
        "Cultivate a love for reading and lifelong learning in our welcoming library environment. With resources for all ages, we empower individuals to discover, learn, and grow through the written word.",
    },
  ]

  const prevSlider = () =>
    setCurrentSlider((currentSlider) => (currentSlider === 0 ? carouselImages.length - 1 : currentSlider - 1))

  const nextSlider = useCallback(
    () => setCurrentSlider((currentSlider) => (currentSlider === carouselImages.length - 1 ? 0 : currentSlider + 1)),
    [carouselImages.length],
  )

  useEffect(() => {
    const intervalId = setInterval(() => {
      nextSlider()
    }, 10000)
    return () => clearInterval(intervalId)
  }, [nextSlider])

  useEffect(() => {
    AOS.refresh()
  }, [nextSlider])

  return (
    <div className="h-[40rem] mt-20 max-w-screen-2xl mx-auto w-full md:h-[30rem] lg:h-[52rem] relative overflow-hidden">
      <button
        onClick={prevSlider}
        className="absolute top-1/2 -translate-y-1/2 left-3 z-50 flex justify-center items-center rounded-full w-10 h-10 md:w-12 md:h-12 bg-white/10 backdrop-blur-md border border-blue-100 dark:border-blue-900 text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-800 transition-all duration-300 shadow-lg"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
          className="size-5"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>
      </button>

      <button
        onClick={nextSlider}
        className="absolute top-1/2 -translate-y-1/2 right-3 z-50 flex justify-center items-center rounded-full w-10 h-10 md:w-12 md:h-12 bg-white/10 backdrop-blur-md border border-blue-100 dark:border-blue-900 text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-800 transition-all duration-300 shadow-lg"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
          className="size-5"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
      </button>

      <div className="flex justify-center items-center z-50 absolute bottom-8 w-full gap-2">
        {carouselImages.map((img, idx) => (
          <button
            key={`${img}_${idx}`}
            onClick={() => setCurrentSlider(idx)}
            className={`rounded-full duration-300 ${
              currentSlider === idx
                ? "w-10 h-3 bg-blue-600 dark:bg-blue-500"
                : "w-3 h-3 bg-white/50 dark:bg-blue-900/50 hover:bg-blue-400 dark:hover:bg-blue-700"
            } transition-all`}
          ></button>
        ))}
      </div>

      <div
        className="ease-linear duration-500 flex transform-gpu"
        style={{ transform: `translateX(-${currentSlider * 100}%)` }}
      >
        {carouselImages.map((slide, idx) => (
          <div
            key={idx}
            className="relative min-w-full h-[40rem] sm:h-96 md:h-[30rem] lg:h-[52rem]"
            style={{ backgroundImage: `url(${slide.image})`, backgroundSize: "cover", backgroundPosition: "center" }}
          >
            <div className="absolute inset-0 bg-blue-950/60 dark:bg-blue-950/70">
              <div className="absolute flex items-center h-full justify-center lg:justify-start md:justify-center inset-0">
                <div className="lg:ml-[8rem] p-8 md:p-14 max-w-3xl">
                  <div
                    data-aos="fade-right"
                    className="text-white text-xl md:text-3xl lg:text-5xl font-bold mb-4 bg-blue-600/20 dark:bg-blue-900/30 backdrop-blur-sm inline-block px-6 py-3 rounded-lg border-l-4 border-blue-500 dark:border-blue-400 shadow-xl"
                  >
                    <Typewriter
                      words={[slide.title]}
                      loop={true}
                      cursor
                      cursorStyle="_"
                      typeSpeed={70}
                      deleteSpeed={50}
                      delaySpeed={1000}
                    />
                  </div>
                  <p
                    data-aos="fade-left"
                    className="mt-6 text-sm md:text-lg lg:text-xl max-w-xl text-white bg-blue-950/40 dark:bg-blue-900/40 backdrop-blur-sm p-4 rounded-lg shadow-lg border-r-4 border-blue-400 dark:border-blue-500"
                  >
                    {slide.description}
                  </p>
                  <div className="mt-10 flex flex-wrap md:flex-nowrap gap-4 text-center">
                    {user ? (
                      <NavLink
                        to="/allbooks"
                        className="block w-full rounded-lg bg-blue-600 px-8 py-4 text-sm font-medium text-white shadow-lg hover:bg-blue-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 active:bg-blue-800 transition-all duration-300 sm:w-auto"
                      >
                        All Books
                      </NavLink>
                    ) : (
                      <NavLink
                        to="/register"
                        className="block w-full rounded-lg bg-blue-600 px-8 py-4 text-sm font-medium text-white shadow-lg hover:bg-blue-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 active:bg-blue-800 transition-all duration-300 sm:w-auto"
                      >
                        Get Started
                      </NavLink>
                    )}
                    <NavLink
                      to="/not-available"
                      className="block w-full rounded-lg bg-white dark:bg-blue-950 px-8 py-4 text-sm font-medium text-blue-600 dark:text-blue-300 shadow-lg hover:bg-blue-50 dark:hover:bg-blue-900 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 active:bg-blue-100 dark:active:bg-blue-800 transition-all duration-300 sm:w-auto"
                    >
                      Learn More
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Slider
