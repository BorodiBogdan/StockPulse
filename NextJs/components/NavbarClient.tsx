'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { signOut } from 'next-auth/react';
import Image from 'next/image';
import profile_picture from '../public/images/user-photo.png';

export default function NavbarClient({ session }: { session: any }) {
    const [isOpen, setIsOpen] = useState(false); // State to handle the dropdown visibility

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className='flex justify-between items-center h-20 bg-gradient-to-br from-gray-900 to-black shadow-lg text-white fixed w-full z-50 px-8'>
            <a href='/' className='text-3xl font-extrabold tracking-wider'>
                StockSearch
            </a>
            <div className='px-4 cursor-pointer md:hidden' onClick={toggleMenu}>
                <svg className='w-8 h-8' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 12h16m-7 6h7'></path>
                </svg>
            </div>
            <div className={`pr-8 md:flex hidden space-x-6 text-lg items-center`}>
                <Link href='/' className='hover:text-gray-400 transition-colors duration-200'>
                    Home
                </Link>
                {
                    session &&
                    <Link href='/stocks' className='hover:text-gray-400 transition-colors duration-200'>
                        My stocks
                    </Link>
                }
                <Link href='/portofolios' className='hover:text-gray-400 transition-colors duration-200'>
                    Portfolios
                </Link>
                <Link href='/about' className='hover:text-gray-400 transition-colors duration-200'>
                    About
                </Link>
                <Link href='/news' className='hover:text-gray-400 transition-colors duration-200'>
                    News
                </Link>

                {session ? (
                    <div className='flex flex-row items-center gap-4'>
                        <Link href='/' className='px-2 rounded-2xl bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-black font-bold'
                            onClick={async (e) => {
                                e.preventDefault()
                                await signOut({ redirect: true, callbackUrl: '/' })
                            }}
                        >log-out</Link>
                        <Link href="/profile">
                            <Image alt="profile" src={profile_picture} width={45} height={35} />
                        </Link>
                    </div>
                ) : (
                    <Link href='/auth/login' className='px-2 rounded-2xl bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-black font-bold'>log-in</Link>
                )}
            </div>

            {/* Mobile menu */}
            <div
                className={`${isOpen ? 'block' : 'hidden'
                    } md:hidden absolute top-20 left-0 w-full bg-gradient-to-br from-gray-900 to-black text-white z-40`}
            >
                <div className='flex flex-col items-center space-y-4 py-8'>
                    <Link href='/' className='text-xl hover:text-gray-400 transition-colors duration-200' onClick={toggleMenu}>
                        Home
                    </Link>
                    {
                        session &&
                        <Link href='/stocks' className='text-xl hover:text-gray-400 transition-colors duration-200'>
                            My stocks
                        </Link>
                    }
                    <Link href='/about' className='text-xl hover:text-gray-400 transition-colors duration-200' onClick={toggleMenu}>
                        About
                    </Link>
                    <Link href='/news' className='text-xl hover:text-gray-400 transition-colors duration-200' onClick={toggleMenu}>
                        News
                    </Link>
                    <Link href='/portofolios' className='text-xl hover:text-gray-400 transition-colors duration-200'>
                        Portfolios
                    </Link>
                    {session ? (
                        <div className='flex gap-4 justify-center items-center'>
                            <a href='/' className='px-2 rounded-2xl bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-black font-bold'
                                onClick={async (e) => {
                                    e.preventDefault()
                                    await signOut({ redirect: true, callbackUrl: '/' })
                                }}
                            >log-out</a>
                            <Link href="/profile">
                                <Image alt="profile" src={profile_picture} width={50} height={50} className='' />
                            </Link>
                        </div>
                    ) : (
                        <Link href='/auth/login' className='px-2 rounded-2xl bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-black font-bold'>log-in</Link>
                    )}
                </div>
            </div>
        </nav>
    );
}
