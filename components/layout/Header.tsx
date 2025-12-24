import Link from 'next/link';

export default function Header() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-cyber-darker/80 backdrop-blur-md border-b border-gray-800">
            <nav className="container mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    <Link href="/" className="flex items-center space-x-2">
                        <div className="w-10 h-10 bg-gradient-cyber rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-xl">A</span>
                        </div>
                        <span className="text-2xl font-bold gradient-text">ApniSec</span>
                    </Link>

                    <div className="hidden md:flex items-center space-x-8">
                        <Link href="/#services" className="text-gray-300 hover:text-white transition-colors">
                            Services
                        </Link>
                        <Link href="/#about" className="text-gray-300 hover:text-white transition-colors">
                            About
                        </Link>
                        <Link href="/#contact" className="text-gray-300 hover:text-white transition-colors">
                            Contact
                        </Link>
                    </div>

                    <div className="flex items-center space-x-4">
                        <Link
                            href="/login"
                            className="px-6 py-2 text-white hover:text-gray-200 transition-colors"
                        >
                            Login
                        </Link>
                        <Link
                            href="/register"
                            className="px-6 py-2 bg-gradient-cyber text-white rounded-lg hover:opacity-90 transition-opacity"
                        >
                            Get Started
                        </Link>
                    </div>
                </div>
            </nav>
        </header>
    );
}
