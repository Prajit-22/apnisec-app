import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'ApniSec - Cybersecurity Solutions | Cloud Security, Red Team, VAPT',
    description: 'Leading cybersecurity company offering Cloud Security, Red Team Assessment, and VAPT services. Protect your infrastructure with ApniSec.',
};

export default function HomePage() {
    return (
        <div className="min-h-screen">
            <Header />

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-6">
                <div className="container mx-auto text-center">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6">
                        Secure Your Digital
                        <br />
                        <span className="gradient-text">Future Today</span>
                    </h1>
                    <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
                        Comprehensive cybersecurity solutions to protect your business from evolving threats.
                        Expert assessments, proactive defense, and continuous monitoring.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/register"
                            className="px-8 py-4 bg-gradient-cyber text-white rounded-lg text-lg font-semibold hover:opacity-90 transition-opacity"
                        >
                            Get Started Free
                        </Link>
                        <Link
                            href="/#services"
                            className="px-8 py-4 border-2 border-purple-500 text-white rounded-lg text-lg font-semibold hover:bg-purple-500/10 transition-colors"
                        >
                            Explore Services
                        </Link>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section id="services" className="py-20 px-6 bg-cyber-dark/30">
                <div className="container mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-4">
                        Our <span className="gradient-text">Services</span>
                    </h2>
                    <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
                        Tailored cybersecurity solutions designed to protect your organization
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Cloud Security */}
                        <div className="bg-gradient-to-br from-cyber-dark to-cyber-darker p-8 rounded-xl border border-gray-800 card-hover">
                            <div className="w-16 h-16 bg-blue-500/20 rounded-lg flex items-center justify-center mb-6">
                                <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-white">Cloud Security</h3>
                            <p className="text-gray-400 mb-6">
                                Protect your cloud infrastructure with advanced security measures, compliance monitoring, and threat detection.
                            </p>
                            <ul className="space-y-2 text-sm text-gray-300">
                                <li className="flex items-center">
                                    <span className="text-cyber-accent mr-2">✓</span>
                                    Infrastructure Security
                                </li>
                                <li className="flex items-center">
                                    <span className="text-cyber-accent mr-2">✓</span>
                                    Compliance Auditing
                                </li>
                                <li className="flex items-center">
                                    <span className="text-cyber-accent mr-2">✓</span>
                                    24/7 Monitoring
                                </li>
                            </ul>
                        </div>

                        {/* Red Team Assessment */}
                        <div className="bg-gradient-to-br from-cyber-dark to-cyber-darker p-8 rounded-xl border border-gray-800 card-hover">
                            <div className="w-16 h-16 bg-red-500/20 rounded-lg flex items-center justify-center mb-6">
                                <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-white">Red Team Assessment</h3>
                            <p className="text-gray-400 mb-6">
                                Simulate real-world attacks to identify vulnerabilities before malicious actors do. Comprehensive security testing.
                            </p>
                            <ul className="space-y-2 text-sm text-gray-300">
                                <li className="flex items-center">
                                    <span className="text-cyber-accent mr-2">✓</span>
                                    Attack Simulation
                                </li>
                                <li className="flex items-center">
                                    <span className="text-cyber-accent mr-2">✓</span>
                                    Social Engineering
                                </li>
                                <li className="flex items-center">
                                    <span className="text-cyber-accent mr-2">✓</span>
                                    Detailed Reporting
                                </li>
                            </ul>
                        </div>

                        {/* VAPT */}
                        <div className="bg-gradient-to-br from-cyber-dark to-cyber-darker p-8 rounded-xl border border-gray-800 card-hover">
                            <div className="w-16 h-16 bg-purple-500/20 rounded-lg flex items-center justify-center mb-6">
                                <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-white">VAPT</h3>
                            <p className="text-gray-400 mb-6">
                                Vulnerability Assessment and Penetration Testing to discover and remediate security weaknesses in your systems.
                            </p>
                            <ul className="space-y-2 text-sm text-gray-300">
                                <li className="flex items-center">
                                    <span className="text-cyber-accent mr-2">✓</span>
                                    Vulnerability Scanning
                                </li>
                                <li className="flex items-center">
                                    <span className="text-cyber-accent mr-2">✓</span>
                                    Penetration Testing
                                </li>
                                <li className="flex items-center">
                                    <span className="text-cyber-accent mr-2">✓</span>
                                    Remediation Guidance
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="py-20 px-6">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-4xl font-bold mb-6">
                                Why Choose <span className="gradient-text">ApniSec</span>?
                            </h2>
                            <p className="text-gray-400 mb-6">
                                We are a team of certified cybersecurity professionals dedicated to protecting your digital assets.
                                With years of experience and cutting-edge tools, we provide comprehensive security solutions.
                            </p>
                            <div className="space-y-4">
                                <div className="flex items-start">
                                    <div className="w-6 h-6 bg-cyber-accent rounded-full flex items-center justify-center mr-4 mt-1">
                                        <span className="text-cyber-dark text-sm font-bold">✓</span>
                                    </div>
                                    <div>
                                        <h4 className="text-white font-semibold mb-1">Expert Team</h4>
                                        <p className="text-gray-400 text-sm">Certified professionals with extensive industry experience</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div className="w-6 h-6 bg-cyber-accent rounded-full flex items-center justify-center mr-4 mt-1">
                                        <span className="text-cyber-dark text-sm font-bold">✓</span>
                                    </div>
                                    <div>
                                        <h4 className="text-white font-semibold mb-1">Proven Track Record</h4>
                                        <p className="text-gray-400 text-sm">Successfully protected hundreds of organizations</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div className="w-6 h-6 bg-cyber-accent rounded-full flex items-center justify-center mr-4 mt-1">
                                        <span className="text-cyber-dark text-sm font-bold">✓</span>
                                    </div>
                                    <div>
                                        <h4 className="text-white font-semibold mb-1">24/7 Support</h4>
                                        <p className="text-gray-400 text-sm">Round-the-clock monitoring and incident response</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="w-full h-96 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-xl border border-gray-800 flex items-center justify-center">
                                <div className="text-center">
                                    <div className="text-6xl font-bold gradient-text mb-4">500+</div>
                                    <p className="text-gray-300">Organizations Protected</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section id="contact" className="py-20 px-6 bg-gradient-cyber">
                <div className="container mx-auto text-center">
                    <h2 className="text-4xl font-bold mb-6 text-white">
                        Ready to Secure Your Business?
                    </h2>
                    <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                        Join hundreds of organizations that trust ApniSec for their cybersecurity needs.
                    </p>
                    <Link
                        href="/register"
                        className="inline-block px-8 py-4 bg-white text-purple-600 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
                    >
                        Start Your Free Trial
                    </Link>
                </div>
            </section>

            <Footer />
        </div>
    );
}
