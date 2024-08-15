'use client';
import React, { useState } from 'react';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        // Add form submission logic here
    };

    return (
        <div className="bg-gradient-to-br min-h-screen from-gray-900 to-black text-white p-6 flex flex-col items-center pt-24">
            {/* Header Section */}
            <header className="text-center py-12">
                <h1 className="text-5xl font-bold text-blue-400 mb-4">Contact Us</h1>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                    We'd love to hear from you! Whether you have a question about our services, feedback, or just want to say hello, feel free to reach out.
                </p>
            </header>

            {/* Contact Form */}
            <section className="w-full max-w-3xl bg-gray-800 p-8 rounded-lg shadow-lg">
                <form onSubmit={handleSubmit}>
                    {/* Name Field */}
                    <div className="mb-6">
                        <label htmlFor="name" className="block text-gray-300 font-semibold mb-2">
                            Your Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Email Field */}
                    <div className="mb-6">
                        <label htmlFor="email" className="block text-gray-300 font-semibold mb-2">
                            Your Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Subject Field */}
                    <div className="mb-6">
                        <label htmlFor="subject" className="block text-gray-300 font-semibold mb-2">
                            Subject
                        </label>
                        <input
                            type="text"
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            required
                            className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Message Field */}
                    <div className="mb-6">
                        <label htmlFor="message" className="block text-gray-300 font-semibold mb-2">
                            Your Message
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            className="w-full h-32 p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        ></textarea>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full p-3 rounded-md bg-blue-500 text-white font-semibold transition-all hover:bg-blue-600"
                    >
                        Send Message
                    </button>
                </form>
            </section>

            {/* Additional Contact Info */}
            <section className="text-center py-12 max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold text-blue-400 mb-4">Other Ways to Reach Us</h2>
                <p className="text-lg text-gray-400 mb-2">
                    Email: <a href="mailto:contact@stockmaster.com" className="text-blue-400">contact@stockmaster.com</a>
                </p>
                <p className="text-lg text-gray-400 mb-2">
                    Phone: <a href="tel:+1234567890" className="text-blue-400">+1 (234) 567-890</a>
                </p>
                <p className="text-lg text-gray-400">
                    Address: 123 StockMaster St, Finance City, World
                </p>
            </section>
        </div>
    );
}
