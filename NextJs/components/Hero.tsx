import Image from "next/image";

const Hero = () => {
    return (
        <div className="h-screen bg-black bg-opacity-100 relative flex flex-col justify-center items-center text-white px-6 shadow-xl">
            <Image
                src="/images/hero.jpg"
                alt="image"
                layout="fill"
                objectFit="cover"
                className="absolute z-0"
            />
            <div className="absolute inset-0 bg-hero-pattern opacity-30 bg-black"></div>

            {/* Main Content */}
            <div className="relative z-10 text-center p-6 rounded-lg h-full w-screen flex items-center flex-col justify-center bg-black bg-opacity-40 ">
                <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6 animate-fade-in text-shadow-lg">
                    Discover Top Performing Stocks
                </h1>
                <p className="text-lg md:text-xl max-w-2xl mb-8 mx-auto animate-slide-in text-shadow-lg">
                    Get real-time insights into the market's leading stocks. Analyze trends, track performance, and make informed investment decisions with our cutting-edge stock analysis tools.
                </p>
                <a href="home" className="px-8 py-4 bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 transition-all duration-300 text-black text-lg md:text-xl font-bold rounded-full shadow-lg transform hover:scale-105">
                    Get Started
                </a>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 w-10 h-10 border-2 border-white rounded-full flex justify-center items-center animate-bounce">
                <span className="block w-3 h-3 border-b-2 border-r-2 border-white transform rotate-45 -translate-y-1"></span>
            </div>
        </div>
    );
};

export default Hero;
