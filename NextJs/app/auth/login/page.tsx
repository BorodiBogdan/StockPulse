"use client";

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const result = await signIn('credentials', {
            redirect: false,
            username,
            password,
        });

        if (result?.error) {
            // handle error
            console.log(result.error);
        } else {
            // redirect to home or desired page
            window.location.href = '/';
        }
    };

    return (
        <div className='h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center text-white'>
            <form onSubmit={handleSubmit} className='bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-sm'>
                <h2 className='text-3xl font-extrabold text-center mb-6'>Sign In</h2>
                <div className='mb-4'>
                    <label htmlFor='username' className='block text-gray-300 text-sm font-bold mb-2'>Username</label>
                    <input
                        type='username'
                        name='username'
                        id='username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className='shadow appearance-none border border-gray-700 rounded w-full py-3 px-4 text-gray-300 bg-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent'
                        placeholder='Enter your username'
                    />
                </div>
                <div className='mb-6'>
                    <label htmlFor='password' className='block text-gray-300 text-sm font-bold mb-2'>Password</label>
                    <input
                        type='password'
                        name='password'
                        id='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='shadow appearance-none border border-gray-700 rounded w-full py-3 px-4 text-gray-300 bg-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent'
                        placeholder='******************'
                    />
                </div>
                <div className='flex items-center justify-between'>
                    <button
                        className='bg-green-500 hover:bg-green-400 text-black font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:scale-105'
                        type='submit'>
                        Sign In
                    </button>
                    <Link href="/register" className='inline-block align-baseline font-bold text-sm text-green-400 hover:text-green-300 transition duration-300 ease-in-out'>
                        Create an Account
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default Login;
