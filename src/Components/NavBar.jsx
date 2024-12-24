import React, { useEffect, useState } from 'react';
import { IoIosSearch } from 'react-icons/io';
import { CiMenuFries } from 'react-icons/ci';
import { NavLink } from 'react-router';
const NavBar = () => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode === 'true';
  });
  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    document.documentElement.setAttribute('data-theme', newDarkMode ? 'dark' : 'light');
    document.documentElement.setAttribute('data-mode', newDarkMode ? 'dark' : 'light');
    localStorage.setItem('darkMode', newDarkMode);
  };
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    document.documentElement.setAttribute('data-mode', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);
  return (
    <div className='mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8'>
      <nav className='flex items-center justify-between w-full relative bg-transparent boxShadow rounded-full px-[10px] py-[8px]'>
        <p className='text-4xl font-semibold dark:text-white'>Boi<span className='text-blue-700'>Ghor</span></p>

        <ul className='items-center gap-[20px] text-[1rem] text-[#424242] dark:text-gray-400 lg:flex hidden'>
          <NavLink
            to="/"
            className={({ isActive }) => `before:w-0 hover:before:w-full before:bg-[#3B9DF8] before:h-[2px] before:transition-all before:duration-300 before:absolute relative before:rounded-full before:bottom-[-2px] hover:text-[#3B9DF8] transition-all duration-300 before:left-0 cursor-pointer capitalize ${isActive ? "before:w-full" : ""}`}
          >
            Home
          </NavLink>

          <NavLink to="/allbooks" className={({ isActive }) => `before:w-0 hover:before:w-full before:bg-[#3B9DF8] before:h-[2px] before:transition-all before:duration-300 before:absolute relative before:rounded-full before:bottom-[-2px] hover:text-[#3B9DF8] transition-all duration-300 before:left-0 cursor-pointer capitalize ${isActive ? "before:w-full" : ""}`}>
            All Books
          </NavLink>

          <NavLink to="/addbooks" className={({ isActive }) => `before:w-0 hover:before:w-full before:bg-[#3B9DF8] before:h-[2px] before:transition-all before:duration-300 before:absolute relative before:rounded-full before:bottom-[-2px] hover:text-[#3B9DF8] transition-all duration-300 before:left-0 cursor-pointer capitalize ${isActive ? "before:w-full" : ""}`}>
            Add Books
          </NavLink>

          <NavLink to="/borrowedbooks" className={({ isActive }) => `before:w-0 hover:before:w-full before:bg-[#3B9DF8] before:h-[2px] before:transition-all before:duration-300 before:absolute relative before:rounded-full before:bottom-[-2px] hover:text-[#3B9DF8] transition-all duration-300 before:left-0 cursor-pointer capitalize ${isActive ? "before:w-full" : ""}`}>
            Borrowed Books
          </NavLink>
        </ul>

        <div className='items-center gap-[10px] flex'>
          <label className='grid cursor-pointer place-items-center'>
            <input
              checked={isDarkMode}
              onChange={toggleDarkMode}
              type='checkbox'
              value='synthwave'
              className='toggle theme-controller bg-base-content col-span-2 col-start-1 row-start-1'
            />
            <svg
              className='stroke-base-100 fill-base-100 col-start-1 row-start-1'
              xmlns='http://www.w3.org/2000/svg'
              width='14'
              height='14'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'>
              <circle cx='12' cy='12' r='5' />
              <path d='M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4' />
            </svg>
            <svg
              className='stroke-base-100 fill-base-100 col-start-2 row-start-1'
              xmlns='http://www.w3.org/2000/svg'
              width='14'
              height='14'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'>
              <path d='M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z'></path>
            </svg>
          </label>
          <button className='btn w-28 lg:flex bg-[#1A365D] text-[#FFFFFF] hover:bg-[#234B82] hidden'>Login</button>

          <button className='btn lg:flex hidden w-28 bg-[#FFFFFF]  border-[#1A365D] text-[#1A365D] hover:bg-gray-300'>
            Register
          </button>

          <CiMenuFries
            className='text-[1.8rem] mr-1 text-[#424242]c cursor-pointer lg:hidden flex'
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          />
        </div>

        <aside
          className={` ${mobileSidebarOpen ? 'translate-y-0 opacity-100 z-20' : 'translate-y-[200px]  opacity-0 z-[-1]'
            } lg:hidden shadow-xl bg-white dark:bg-gray-800 boxShadow p-4 text-center absolute top-[65px] right-0 w-full rounded-md transition-all duration-300`}>
          <div className='relative mb-5'>
            <input
              className='py-1.5 pr-4 w-full pl-10 rounded-full border border-gray-200 outline-none focus:border-[#3B9DF8]'
              placeholder='Search...'
            />

            <IoIosSearch className='absolute top-[8px] left-3 text-gray-500 text-[1.3rem]' />
          </div>
          <div className='mb-5 flex justify-center gap-5'>
            <button className='btn w-28 bg-[#1A365D] text-[#FFFFFF] hover:bg-[#234B82]'>Login</button>

            <button className='btn w-28 bg-[#FFFFFF]  border-[#1A365D] text-[#1A365D] hover:bg-gray-300'>
              Register
            </button>
          </div>
          <ul className='items-start gap-[20px] text-[1rem] dark:text-gray-400 text-gray-600 flex flex-col'>
            <NavLink to="/" className={({ isActive }) => `before:w-0 hover:before:w-full before:bg-[#3B9DF8] before:h-[2px] before:transition-all before:duration-300 before:absolute relative before:rounded-full before:bottom-[-2px] hover:text-[#3B9DF8] transition-all duration-300 before:left-0 cursor-pointer capitalize ${isActive ? "before:w-full px-4" : ""}`}>
              Home
            </NavLink>

            <NavLink to="/allbooks" className={({ isActive }) => `before:w-0 hover:before:w-full before:bg-[#3B9DF8] before:h-[2px] before:transition-all before:duration-300 before:absolute relative before:rounded-full before:bottom-[-2px] hover:text-[#3B9DF8] transition-all duration-300 before:left-0 cursor-pointer capitalize ${isActive ? "before:w-full px-4" : ""}`}>
              All Books
            </NavLink>

            <NavLink to="/addbooks" className={({ isActive }) => `before:w-0 hover:before:w-full before:bg-[#3B9DF8] before:h-[2px] before:transition-all before:duration-300 before:absolute relative before:rounded-full before:bottom-[-2px] hover:text-[#3B9DF8] transition-all duration-300 before:left-0 cursor-pointer capitalize ${isActive ? "before:w-full px-4" : ""}`}>
              Add Books
            </NavLink>

            <NavLink to="/borrowedbooks" className={({ isActive }) => `before:w-0 hover:before:w-full before:bg-[#3B9DF8] before:h-[2px] before:transition-all before:duration-300 before:absolute relative before:rounded-full before:bottom-[-2px] hover:text-[#3B9DF8] transition-all duration-300 before:left-0 cursor-pointer capitalize ${isActive ? "before:w-full px-4" : ""}`}>
              Borrowed Books
            </NavLink>
          </ul>
        </aside>
      </nav>
    </div>
  );
};

export default NavBar;
