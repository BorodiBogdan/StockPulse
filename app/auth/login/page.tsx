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
        <div className='bg-white h-screen flex items-center justify-center'>
            <form onSubmit={handleSubmit} className=''>
                <div className='mb-4'>
                    <label htmlFor='email' className='block text-gray-700 text-sm font-bold mb-2'>Username</label>
                    <input
                        type='username'
                        name='username'
                        id='username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        placeholder='username'
                    />
                </div>
                <div className='mb-6'>
                    <label htmlFor='password' className='block text-gray-700 text-sm font-bold mb-2'>Password</label>
                    <input
                        type='password'
                        name='password'
                        id='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='shadow appearance-none border border-red rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
                        placeholder='******************'
                    />
                </div>
                <div className='flex items-center justify-between'>
                    <button
                        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                        type='submit'>
                        Sign In
                    </button>
                    <Link href="/register" className='inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800'>
                        Create an Account
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default Login;
