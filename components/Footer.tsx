import Image from 'next/image';

const Footer = () => {
    return (
        <footer className="bg-black text-gray-300 py-12 px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Branding and Description */}
                <div className="flex flex-col items-center md:items-start">

                    <p className="text-center md:text-left text-gray-400 mb-4">
                        Empowering investors with real-time stock insights and expert advice to make smarter financial decisions.
                    </p>
                </div>

                {/* Quick Links */}
                <div className="flex flex-col items-center">
                    <h4 className="text-lg font-semibold mb-4 text-green-400">Quick Links</h4>
                    <ul className="space-y-2">
                        <li><a href="/about" className="hover:text-green-400 transition duration-300">About Us</a></li>
                        <li><a href="/contact" className="hover:text-green-400 transition duration-300">Contact</a></li>
                        <li><a href="/privacy" className="hover:text-green-400 transition duration-300">Privacy Policy</a></li>
                        <li><a href="/terms" className="hover:text-green-400 transition duration-300">Terms of Service</a></li>
                    </ul>
                </div>

                {/* Social Media & Newsletter */}
                <div className="flex flex-col items-center md:items-start">
                    <h4 className="text-lg font-semibold mb-4 text-green-400">Follow Us</h4>
                    <div className="flex space-x-4 mb-6">
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition duration-300">
                            <i className="fab fa-twitter fa-2x"></i>
                        </a>
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition duration-300">
                            <i className="fab fa-facebook fa-2x"></i>
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition duration-300">
                            <i className="fab fa-instagram fa-2x"></i>
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition duration-300">
                            <i className="fab fa-linkedin fa-2x"></i>
                        </a>
                    </div>

                    {/* Optional Newsletter Signup */}
                    <h4 className="text-lg font-semibold mb-2 text-green-400">Newsletter</h4>
                    <p className="text-gray-400 mb-4 text-center md:text-left">
                        Subscribe to receive the latest updates and news about stock markets.
                    </p>
                    <form className="flex space-x-2">
                        <input
                            type="email"
                            placeholder="Your email"
                            className="w-full p-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        <button
                            type="submit"
                            className="px-4 py-2 bg-green-500 text-black font-semibold rounded-md hover:bg-green-600 transition duration-300"
                        >
                            Subscribe
                        </button>
                    </form>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="mt-12 border-t border-gray-700 pt-4">
                <p className="text-center text-gray-400">
                    &copy; {new Date().getFullYear()} StockMaster. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
