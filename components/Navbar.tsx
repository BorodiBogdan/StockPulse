import Link from 'next/link'
import React from 'react'

const Navbar = () => {
    return (

        <nav className='flex justify-between items-center h-16 text-black shadow-sm font-mono absolute w-screen z-[100] bg-slate-300' role='navigation'>
            <a href='/' className='pl-8'>StockSearch</a>
            <div className='px-4 cursor-pointer md:hidden'>
                <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 12h16m-7 6h7'></path>
                </svg>
            </div>
            <div className='pr-8 md:block hidden'>
                <Link href='/' className='p-4'>Home</Link>
                <Link href='/' className='p-4'>About</Link>
                <Link href='/' className='p-4'>Contact</Link>
                <Link href='/auth/login' className='px-2 py-1 rounded-2xl bg-blue-600 text-white'>Log in</Link>
            </div>
        </nav>

    )
}

export default Navbar
