export const FeaturesOverview = () => {
    return (
        <section className="bg-gradient-to-b from-gray-900 to-black py-16 text-white text-center min-h-[1000px] px-4">
            <h2 className="text-3xl md:text-5xl font-bold mb-8">Why Choose Us</h2>
            <p className="text-lg md:text-xl max-w-4xl mx-auto mb-12 text-gray-400">
                Our platform offers a variety of features designed to help you succeed in the stock market. Whether you’re a beginner or an experienced trader, we provide the tools you need to stay ahead of the market.
            </p>
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
                {/* Feature 1 */}
                <div className="p-8 bg-gray-800 rounded-lg shadow-lg transition transform hover:scale-105 min-h-[300px] flex flex-col">
                    <h3 className="text-xl font-semibold mb-4">Real-Time Stock Tracking</h3>
                    <p className="text-gray-400 flex-grow">
                        Stay ahead of the market with our live updates and real-time tracking. Get minute-by-minute insights on the latest stock prices and trends, empowering you to make informed decisions quickly.
                    </p>
                    <a href="#" className="text-blue-400 hover:text-blue-500 mt-6 font-semibold">
                        Learn more &rarr;
                    </a>
                </div>
                {/* Feature 2 */}
                <div className="p-8 bg-gray-800 rounded-lg shadow-lg transition transform hover:scale-105 min-h-[300px] flex flex-col">
                    <h3 className="text-xl font-semibold mb-4">In-Depth Analysis Tools</h3>
                    <p className="text-gray-400 flex-grow">
                        Dive deep into market data with our advanced analysis tools. Understand the factors that drive stock performance, track historical data, and use our expert insights to make data-driven investment decisions.
                    </p>
                    <a href="#" className="text-blue-400 hover:text-blue-500 mt-6 font-semibold">
                        Discover tools &rarr;
                    </a>
                </div>
                {/* Feature 3 */}
                <div className="p-8 bg-gray-800 rounded-lg shadow-lg transition transform hover:scale-105 min-h-[300px] flex flex-col">
                    <h3 className="text-xl font-semibold mb-4">Personalized Portfolio Management</h3>
                    <p className="text-gray-400 flex-grow">
                        Create a portfolio tailored to your investment style. Track your progress, set personalized goals, and receive tailored recommendations that match your financial objectives.
                    </p>
                    <a href="#" className="text-blue-400 hover:text-blue-500 mt-6 font-semibold">
                        Build your portfolio &rarr;
                    </a>
                </div>
                {/* Feature 4 */}
                <div className="p-8 bg-gray-800 rounded-lg shadow-lg transition transform hover:scale-105 min-h-[300px] flex flex-col">
                    <h3 className="text-xl font-semibold mb-4">Comprehensive Market News</h3>
                    <p className="text-gray-400 flex-grow">
                        Stay informed with the latest market news. Our platform provides you with up-to-date information and analysis on global markets, so you can keep track of events that impact your investments.
                    </p>
                    <a href="#" className="text-blue-400 hover:text-blue-500 mt-6 font-semibold">
                        Stay updated &rarr;
                    </a>
                </div>
                {/* Feature 5 */}
                <div className="p-8 bg-gray-800 rounded-lg shadow-lg transition transform hover:scale-105 min-h-[300px] flex flex-col">
                    <h3 className="text-xl font-semibold mb-4">Risk Management Tools</h3>
                    <p className="text-gray-400 flex-grow">
                        Minimize your risks with our built-in risk management features. Use advanced tools to set stop-loss orders, automate trades, and protect your portfolio from sudden market changes.
                    </p>
                    <a href="#" className="text-blue-400 hover:text-blue-500 mt-6 font-semibold">
                        Manage risk &rarr;
                    </a>
                </div>
                {/* Feature 6 */}
                <div className="p-8 bg-gray-800 rounded-lg shadow-lg transition transform hover:scale-105 min-h-[300px] flex flex-col">
                    <h3 className="text-xl font-semibold mb-4">Expert Advice</h3>
                    <p className="text-gray-400 flex-grow">
                        Gain insights from industry experts and seasoned traders. Access exclusive content, participate in webinars, and follow market leaders to refine your investment strategy.
                    </p>
                    <a href="#" className="text-blue-400 hover:text-blue-500 mt-6 font-semibold">
                        Get advice &rarr;
                    </a>
                </div>
            </div>
        </section>
    );
};
