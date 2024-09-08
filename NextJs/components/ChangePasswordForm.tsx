'use client'
import React from 'react'
import { changePassword } from '../actions/actions';

interface Props {
    username: string;
    email: string;
}

export default function ChangePasswordForm({ username, email }: Props) {
    const [error, setError] = React.useState<string | null>(null);

    const handlePasswordChange = async (formData: FormData) => {
        console.log('Changing password');
        try {
            const rawFormData = {
                new_password: formData.get('new_password'),
                old_password: formData.get('old_password'),
                confirm_password: formData.get('confirm_password')
            }

            if (rawFormData.new_password !== rawFormData.confirm_password) {
                setError('Passwords do not match');
                return;
            }

            // mutate data
            // revalidate cache
            if (typeof username === 'string' && typeof rawFormData.new_password === 'string' && typeof rawFormData.old_password === 'string')
                await changePassword(username, rawFormData.old_password, rawFormData.new_password)
        }
        catch (error: any) {
            if (typeof error.message === 'string')
                setError(error.message);

            setError('An error occurred');
        }
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevents page refresh
        const formData = new FormData(event.currentTarget); // Get form data
        handlePasswordChange(formData); // Call your password change handler
        event.currentTarget.reset(); // Reset the form
        setError(null); // Clear any previous errors
    };


    return (
        <div className="bg-gray-800 rounded-lg shadow-lg p-8 max-w-lg w-full mt-20">
            <h2 className="text-3xl font-bold mb-6">User Profile</h2>
            <form
                onSubmit={handleSubmit}
            >
                <div className="mb-4">
                    <label className="block text-lg font-semibold mb-1">
                        Username
                    </label>
                    <p
                        className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                    >{username}</p>
                </div>

                <div className="mb-4">
                    <label htmlFor="email" className="block text-lg font-semibold mb-1">
                        Email
                    </label>
                    <p
                        className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                    >{email}</p>
                </div>

                <div className="mb-4">
                    <label htmlFor="location" className="block text-lg font-semibold mb-1">
                        Old password
                    </label>
                    <input
                        type="password"
                        className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                        id="old_password"
                        name="old_password"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="location" className="block text-lg font-semibold mb-1">
                        New password
                    </label>
                    <input
                        id="new_password"
                        name="new_password"
                        type="password"
                        className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="location" className="block text-lg font-semibold mb-1">
                        Confirm new password
                    </label>
                    <input

                        id="confirm_password"
                        type="password"
                        name="confirm_password"
                        className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                    />
                </div>

                {error && <p className="text-red-500 pb-4">{error}</p>}

                <div className="flex items-center justify-center">
                    <button
                        type="submit"
                        className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-black rounded-lg font-semibold transition-all duration-300"
                    >
                        Change password
                    </button>
                </div>
            </form>
        </div>
    )
}