import React from 'react'

import Slider from '../Components/Slider'
import BookCategory from '../Components/BookCategory'
import NewBooks from '../Components/NewBooks'

const Home = () => {
    return (
        <>
            <Slider />
            <BookCategory />
            <NewBooks />
        </>
    )
}

export default Home