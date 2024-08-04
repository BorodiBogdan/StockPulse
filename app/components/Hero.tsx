import React from 'react'
import heroImage from '../../public/images/hero.jpg'

const Hero = () => {
    return (
        <div
            className='h-[100vh] bg-cover bg-center w-screen'
            style={{ backgroundImage: `url(${heroImage.src})` }}
        >
            <div className='flex flex-col items-center justify-center h-full bg-gray-900 bg-opacity-50 z-50'>
                <h1 className='text-4xl text-white font-bold'>Welcome to our ActivityFinder</h1>
                <p className='text-white'>Find activities all over the world</p>
            </div>
        </div>
    )
}

export default Hero
