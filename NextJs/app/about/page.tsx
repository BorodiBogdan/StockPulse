import React from 'react';

export default function AboutUsPage() {
    return (
        <div className="bg-gradient-to-br min-h-screen from-gray-900 to-black text-white p-6 flex flex-col items-center pt-24">
            {/* Header Section */}
            <header className="text-center py-12">
                <h1 className="text-5xl font-bold text-blue-400 mb-4">About Us</h1>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                    We are a passionate team dedicated to helping you make informed financial decisions and navigate the world of stocks with ease.
                </p>
            </header>

            {/* Mission Section */}
            <section className="text-center py-8 max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-blue-400 mb-6">Our Mission</h2>
                <p className="text-lg text-gray-400 mb-6">
                    At StockPulse, our mission is to empower everyday investors by providing real-time stock information, expert advice, and the tools needed to make informed financial decisions.
                </p>
                <p className="text-lg text-gray-400">
                    Whether you are new to investing or a seasoned trader, we are committed to giving you the insights you need to navigate the complex world of finance with confidence.
                </p>
            </section>

            {/* Team Section */}
            <section className="py-12 max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold text-blue-400 text-center mb-8">Meet the Team</h2>
                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-8">
                    {/* Team Member */}
                    <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
                        <h3 className="text-2xl font-bold text-blue-400 mb-2">Borodi Bogdan</h3>
                        <p className="text-lg text-gray-300 mb-4">CEO & Founder</p>
                        <p className="text-gray-400">
                            With over 2 years of experience in the stock market, John leads the company with a vision to democratize financial data and help everyday people invest wisely.
                            Bogdan is a seasoned entrepreneur with a passion for technology and finance and also a programmer. He built StockPulse from the ground up with the goal of making investing accessible to everyone.
                            Bogdan is currently pursuing a degree in Computer Science at the "Babes-Bolyai" University in Cluj-Napoca, Romania.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}
