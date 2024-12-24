import React from 'react'

import Slider from '../Components/Slider'
import BookCategory from '../Components/BookCategory'
import NewBooks from '../Components/NewBooks'
import Subscribe from '../Components/Subscribe'

const Home = () => {
    return (
        <>
            <Slider />
            <BookCategory />
            <NewBooks />
            <Subscribe />
        </>
    )
}

export default Home