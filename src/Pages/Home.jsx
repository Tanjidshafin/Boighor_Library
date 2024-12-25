import React from 'react'

import Slider from '../Components/Slider'
import BookCategory from '../Components/BookCategory'
import NewBooks from '../Components/NewBooks'
import Subscribe from '../Components/Subscribe'
import Blogs from '../Components/Blogs'

const Home = () => {
    return (
        <>
            <Slider />
            <BookCategory />
            <NewBooks />
            <Blogs />
            <Subscribe />
        </>
    )
}

export default Home