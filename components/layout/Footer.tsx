import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-cyber-darker border-t border-gray-800 mt-20">
            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <div className="flex items-center space-x-2 mb-4">
                            <div className="w-10 h-10 bg-gradient-cyber rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-xl">A</span>
                            </div>
                            <span className="text-2xl font-bold gradient-text">ApniSec</span>
                        </div>
                        <p className="text-gray-400 text-sm">
                            Your trusted cybersecurity partner for comprehensive security solutions.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-white font-semibold mb-4">Services</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/#services" className="text-gray-400 hover:text-white transition-colors text-sm">
                                    Cloud Security
                                </Link>
                            </li>
                            <li>
                                <Link href="/#services" className="text-gray-400 hover:text-white transition-colors text-sm">
                                    Red Team Assessment
                                </Link>
                            </li>
                            <li>
                                <Link href="/#services" className="text-gray-400 hover:text-white transition-colors text-sm">
                                    VAPT
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-semibold mb-4">Company</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/#about" className="text-gray-400 hover:text-white transition-colors text-sm">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/#contact" className="text-gray-400 hover:text-white transition-colors text-sm">
                                    Contact
                                </Link>
                            </li>
                            <li>
                                <Link href="/dashboard" className="text-gray-400 hover:text-white transition-colors text-sm">
                                    Dashboard
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-semibold mb-4">Legal</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                                    Privacy Policy
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                                    Terms of Service
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-8 pt-8 text-center">
                    <p className="text-gray-400 text-sm">
                        &copy; {new Date().getFullYear()} ApniSec. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
