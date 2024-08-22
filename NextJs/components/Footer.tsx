import Image from 'next/image';

const Footer = () => {
    return (
        <footer className="bg-black text-gray-300 py-12 px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Branding and Description */}
                <div className="flex flex-col items-center md:items-start">

                    <p className="text-center md:text-left text-gray-400 mb-4">
                        Empowering investors with real-time stock insights and expert advice to make smarter financial decisions.
                    </p>
                </div>

                {/* Quick Links */}
                <div className="flex flex-col items-center">
                    <h4 className="text-lg font-semibold mb-4 text-blue-400">Quick Links</h4>
                    <ul className="space-y-2">
                        <li><a href="/about" className="hover:text-blue-400 transition duration-300">About Us</a></li>
                        <li><a href="/privacy" className="hover:text-blue-400 transition duration-300">Privacy Policy</a></li>
                        <li><a href="/terms" className="hover:text-blue-400 transition duration-300">Terms of Service</a></li>
                    </ul>
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
