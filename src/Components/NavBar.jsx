"use client"

import { useContext, useEffect, useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CiMenuFries } from "react-icons/ci"
import { FiSun, FiMoon } from "react-icons/fi"
import { AppContext } from "../Context/AppContext"
import { Tooltip as ReactTooltip } from "react-tooltip"
import "react-tooltip/dist/react-tooltip.css"
import { NavLink, useLocation } from "react-router"

const NavBar = () => {
  const { handleLogout, user } = useContext(AppContext)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode")
    return savedMode === "true"
  })
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isOnSlider, setIsOnSlider] = useState(false)
  const location = useLocation()
  const navRef = useRef(null)

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode
    setIsDarkMode(newDarkMode)
    document.documentElement.setAttribute("data-theme", newDarkMode ? "dark" : "light")
    document.documentElement.setAttribute("data-mode", newDarkMode ? "dark" : "light")
    localStorage.setItem("darkMode", newDarkMode)
  }

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", isDarkMode ? "dark" : "light")
    document.documentElement.setAttribute("data-mode", isDarkMode ? "dark" : "light")
  }, [isDarkMode])

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY > lastScrollY) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }
      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  useEffect(() => {
    setMobileSidebarOpen(false)
  }, [])

  useEffect(() => {
    const sliderElement = document.querySelector(".slider-component")
    if (!sliderElement) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsOnSlider(entry.isIntersecting)
      },
      { threshold: 0 },
    )

    observer.observe(sliderElement)

    return () => observer.disconnect()
  }, [])

  const navBackground = isOnSlider ? "bg-transparent" : isDarkMode ? "bg-gray-900" : "bg-white"
  const textColor = isOnSlider ? "text-white" : isDarkMode ? "text-white" : "text-gray-800"

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          ref={navRef}
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{ duration: 0.3 }}
          className={`fixed top-0 left-0 right-0 z-50 shadow-lg transition-colors duration-300 ${navBackground}`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex-shrink-0">
                <p className={`text-2xl font-semibold ${textColor}`}>
                  Boi<span className="text-blue-500">Ghor</span>
                </p>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      `px-3 py-2 rounded-md text-sm font-medium ${isActive ? `bg-blue-700 text-white` : `${textColor} hover:bg-blue-500 hover:text-white`
                      }`
                    }
                  >
                    Home
                  </NavLink>
                  <NavLink
                    to="/allbooks"
                    className={({ isActive }) =>
                      `px-3 py-2 rounded-md text-sm font-medium ${isActive ? `bg-blue-700 text-white` : `${textColor} hover:bg-blue-500 hover:text-white`
                      }`
                    }
                  >
                    All Books
                  </NavLink>
                  {user && (
                    <>
                      <NavLink
                        to="/addbooks"
                        className={({ isActive }) =>
                          `px-3 py-2 rounded-md text-sm font-medium ${isActive ? `bg-blue-700 text-white` : `${textColor} hover:bg-blue-500 hover:text-white`
                          }`
                        }
                      >
                        Add Books
                      </NavLink>
                      <NavLink
                        to="/borrowedbooks"
                        className={({ isActive }) =>
                          `px-3 py-2 rounded-md text-sm font-medium ${isActive ? `bg-blue-700 text-white` : `${textColor} hover:bg-blue-500 hover:text-white`
                          }`
                        }
                      >
                        Borrowed Books
                      </NavLink>
                    </>
                  )}

                </div>
              </div>
              <div className="flex items-center">
                <motion.button
                  onClick={toggleDarkMode}
                  className={`p-2 rounded-full ${isDarkMode ? "bg-gray-800" : "bg-gray-200 text-gray-500"} mr-2`}
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={isDarkMode ? "moon" : "sun"}
                      initial={{ y: -20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 20, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {isDarkMode ? <FiMoon size={20} /> : <FiSun size={20} />}
                    </motion.div>
                  </AnimatePresence>
                </motion.button>
                {user ? (
                  <div className="flex items-center space-x-4 mr-2">
                    <img
                      src={
                        user.photoURL ||
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6LXNJFTmLzCoExghcATlCWG85kI8dsnhJng&s"
                      }
                      alt=""
                      className="w-8 h-8 rounded-full"
                      data-tip={user.displayName || user.email}
                      data-for="profileTooltip"
                    />
                    <ReactTooltip id="profileTooltip" place="bottom" effect="solid" />
                    <button
                      onClick={handleLogout}
                      className={`hidden md:block bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded`}
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="hidden md:flex space-x-4 mr-2">
                    <NavLink
                      to="/login"
                      className={`border border-blue-300 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-800 
  font-semibold py-2 px-4 rounded transition 
  ${isOnSlider ? "bg-opacity-20 hover:bg-opacity-30" : "bg-transparent"}`}
                    >
                      Login
                    </NavLink>

                    <NavLink
                      to="/register"
                      className={`bg-blue-500 hover:bg-blue-600 text-white dark:text-gray-200 font-semibold py-2 px-4 rounded transition 
  ${isOnSlider ? "bg-opacity-20 hover:bg-opacity-30" : ""}`}
                    >
                      Register
                    </NavLink>

                  </div>
                )}
                <div className="md:hidden flex items-center">
                  <button
                    onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
                    className={`${textColor} hover:text-blue-200 focus:outline-none focus:text-blue-200`}
                  >
                    <CiMenuFries className="h-6 w-6" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <AnimatePresence>
            {mobileSidebarOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className={`md:hidden ${isDarkMode ? "bg-gray-800" : "bg-white"}`}
              >
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      `block px-3 py-2 rounded-md text-base font-medium ${isActive ? `bg-blue-700 ${textColor}` : `${textColor} hover:bg-blue-500 hover:text-white`
                      }`
                    }
                  >
                    Home
                  </NavLink>
                  <NavLink
                    to="/allbooks"
                    className={({ isActive }) =>
                      `block px-3 py-2 rounded-md text-base font-medium ${isActive ? `bg-blue-700 ${textColor}` : `${textColor} hover:bg-blue-500 hover:text-white`
                      }`
                    }
                  >
                    All Books
                  </NavLink>
                  {user && (
                    <>
                      <NavLink
                        to="/addbooks"
                        className={({ isActive }) =>
                          `block px-3 py-2 rounded-md text-base font-medium ${isActive ? `bg-blue-700 ${textColor}` : `${textColor} hover:bg-blue-500 hover:text-white`
                          }`
                        }
                      >
                        Add Books
                      </NavLink>
                      <NavLink
                        to="/borrowedbooks"
                        className={({ isActive }) =>
                          `block px-3 py-2 rounded-md text-base font-medium ${isActive ? `bg-blue-700 ${textColor}` : `${textColor} hover:bg-blue-500 hover:text-white`
                          }`
                        }
                      >
                        Borrowed Books
                      </NavLink>
                    </>
                  )}

                  {user ? (
                    <button
                      onClick={handleLogout}
                      className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${textColor} hover:bg-blue-500 hover:text-white`}
                    >
                      Logout
                    </button>
                  ) : (
                    <>
                      <NavLink
                        to="/login"
                        className={`block px-3 py-2 rounded-md text-base font-medium ${textColor} hover:bg-blue-500 hover:text-white`}
                      >
                        Login
                      </NavLink>
                      <NavLink
                        to="/register"
                        className={`block px-3 py-2 rounded-md text-base font-medium ${textColor} hover:bg-blue-500 hover:text-white`}
                      >
                        Register
                      </NavLink>
                    </>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      )}
    </AnimatePresence>
  )
}

export default NavBar

