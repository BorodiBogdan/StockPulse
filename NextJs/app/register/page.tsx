'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

async function registerUser(email: string, username: string, password: string) {
    const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, username, password }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message);
    }
    return data;
}

async function getUsers() {
    const response = await fetch('/api/users');
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message);
    }
    return data;
}

const Page = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [mail, setMail] = useState('');
    const [error, setError] = useState({
        email: false,
        username: false,
        password: false,
        confirmPassword: false,
    });

    async function verifyData() {
        const users = await getUsers();
        console.log(users);

        const newErrors = {
            email: !mail.includes('@') || mail === '' || users.some((user: any) => user.email === mail),
            username: username === '' || users.some((user: any) => user.username === username),
            password: password.length < 8,
            confirmPassword: password !== confirmPassword,
        };

        if (!newErrors.email && !newErrors.username && !newErrors.password && !newErrors.confirmPassword) {
            console.log('Data is correct');
            try {
                await registerUser(mail, username, password);
                window.location.href = '/login';
                return
            } catch (error) {
                console.error('An error occurred:', error);
            }

            setUsername('');
            setPassword('');
            setConfirmPassword('');
            setMail('');

            setError({
                email: false,
                username: false,
                password: false,
                confirmPassword: false,
            });
        } else {
            setError(newErrors);
        }
    }

    useEffect(() => {
        console.log('Register page loaded');
    }, []);

    return (
        <div className='h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center text-white'>
            <form className='bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md'>
                <h2 className='text-3xl font-extrabold text-center mb-6'>Register</h2>

                <div className='mb-4'>
                    <label htmlFor='email' className='block text-gray-300 text-sm font-bold mb-2'>Email</label>
                    <input
                        type='email'
                        name='email'
                        id='email'
                        className='shadow appearance-none border border-gray-700 rounded w-full py-3 px-4 text-gray-300 bg-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                        placeholder='Email'
                        onChange={(e) => setMail(e.target.value)}
                    />
                    {error.email && <p className='text-red-500 mt-2'>Invalid email</p>}
                </div>

                <div className='mb-4'>
                    <label htmlFor='username' className='block text-gray-300 text-sm font-bold mb-2'>Username</label>
                    <input
                        type='username'
                        name='username'
                        id='username'
                        className='shadow appearance-none border border-gray-700 rounded w-full py-3 px-4 text-gray-300 bg-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                        placeholder='Username'
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    {error.username && <p className='text-red-500 mt-2'>Invalid username</p>}
                </div>

                <div className='mb-4'>
                    <label htmlFor='password' className='block text-gray-300 text-sm font-bold mb-2'>Password</label>
                    <input
                        type='password'
                        name='password'
                        id='password'
                        className='shadow appearance-none border border-gray-700 rounded w-full py-3 px-4 text-gray-300 bg-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                        placeholder='******************'
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {error.password && <p className='text-red-500 mt-2'>Password too short</p>}
                </div>

                <div className='mb-6'>
                    <label htmlFor='confirm-password' className='block text-gray-300 text-sm font-bold mb-2'>Confirm Password</label>
                    <input
                        type='password'
                        name='confirm-password'
                        id='confirm-password'
                        className='shadow appearance-none border border-gray-700 rounded w-full py-3 px-4 text-gray-300 bg-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                        placeholder='******************'
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    {error.confirmPassword && <p className='text-red-500 mt-2'>Passwords don&apos;t match</p>}
                </div>

                <div className='flex items-center justify-between'>
                    <button
                        className='bg-blue-500 hover:bg-vlue-400 text-black font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:scale-105'
                        type='button'
                        onClick={verifyData}
                    >
                        Register
                    </button>
                    <Link href="/login" className='inline-block align-baseline font-bold text-sm text-vlue-400 hover:text-vlue-300 transition duration-300 ease-in-out pl-5'>
                        Already have an account?
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default Page;
