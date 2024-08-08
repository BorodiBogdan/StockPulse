'use client';
import React, { useEffect } from 'react'
import Link from 'next/link'
import { useState } from 'react';

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
            // Send data to the server
            try {
                await registerUser(mail, username, password);
                console.log('User registered');
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
        }
        else
            setError(newErrors);

    }

    useEffect(() => {
        console.log('Register page loaded');
    }, []);

    return (
        <div className='bg-white flex items-center justify-center h-screen'>
            <form className=''>
                <div className='mb-4'>
                    <label htmlFor='email' className='block text-gray-700 text-sm font-bold mb-2'>Email</label>
                    <input type='email' name='email' id='email'
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        placeholder='Email'
                        onChange={(e) => setMail(e.target.value)} />
                    <p
                        className={`text-red-500`}
                        style={{ display: error.email ? 'block' : 'none' }}
                    >
                        Invalid email
                    </p>

                </div>
                <div className='mb-4'>
                    <label htmlFor='username' className='block text-gray-700 text-sm font-bold mb-2'>Username</label>
                    <input type='username' name='username' id='username'
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        placeholder='Username'
                        onChange={(e) => setUsername(e.target.value)} />
                    <p className={`text-red-500`}
                        style={{ display: error.username ? 'block' : 'none' }}
                    >Invalid username</p>
                </div>
                <div className='mb-4'>
                    <label htmlFor='password' className='block text-gray-700 text-sm font-bold mb-2'>Password</label>
                    <input type='password' name='password' id='password'
                        className='shadow appearance-none border border-red rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
                        placeholder='******************'
                        onChange={(e) => setPassword(e.target.value)} />
                    <p className={`text-red-500`}
                        style={{ display: error.password ? 'block' : 'none' }}
                    >Password too short</p>
                </div>
                <div className='mb-6'>
                    <label htmlFor='confirm-password' className='block text-gray-700 text-sm font-bold mb-2'>Confirm Password</label>
                    <input type='password' name='confirm-password' id='confirm-password'
                        className='shadow appearance-none border border-red rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
                        placeholder='******************'
                        onChange={(e) => setConfirmPassword(e.target.value)} />
                    <p className={`text-red-500`}
                        style={{ display: error.confirmPassword ? 'block' : 'none' }}
                    >Passwords don&apos;t match</p>
                </div>

                <div className='flex items-center justify-between'>
                    <button
                        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                        type='button'
                        onClick={verifyData}
                    >
                        Register
                    </button>
                    <Link href="/login" className='inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 pl-5'>
                        Already have an account?
                    </Link>
                </div>
            </form>
        </div>
    )
}

export default Page;
