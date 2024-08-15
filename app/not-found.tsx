'use client';
import React from 'react';

export default function NotFoundPage() {
    return (
        <div className="bg-gradient-to-br min-h-screen from-gray-900 to-black text-white flex flex-col items-center justify-center p-6">
            {/* Main 404 Header */}
            <h1 className="text-6xl font-bold text-blue-400 mb-4">404</h1>
            <p className="text-2xl font-bold text-gray-300 mb-4">Page Not Found</p>

            {/* Message and suggestions */}
            <p className="text-lg text-gray-400 mb-8">
                Sorry, the page you're looking for doesn't exist.
            </p>

            <a href="/" className="w-full max-w-xs p-3 rounded-md bg-blue-500 text-white font-semibold text-center transition-all hover:bg-blue-600">
                Go Back Home
            </a>
        </div>
    );
}
