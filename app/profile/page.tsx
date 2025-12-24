'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface User {
    id: string;
    name: string;
    email: string;
    createdAt: string;
}

export default function ProfilePage() {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const response = await fetch('/api/users/profile');
            if (!response.ok) {
                router.push('/login');
                return;
            }
            const data = await response.json();
            setUser(data.data);
            setFormData({
                name: data.data.name,
                email: data.data.email,
            });
        } catch (error) {
            router.push('/login');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const response = await fetch('/api/users/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error?.message || 'Update failed');
            }

            setUser(data.data);
            setEditing(false);
            setSuccess('Profile updated successfully!');
        } catch (err: any) {
            setError(err.message);
        }
    };

    const handleLogout = async () => {
        await fetch('/api/auth/logout', { method: 'POST' });
        router.push('/');
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-cyber-darker flex items-center justify-center">
                <div className="text-white text-xl">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-cyber-darker">
            {/* Header */}
            <header className="bg-cyber-dark border-b border-gray-800">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <Link href="/" className="flex items-center space-x-2">
                            <div className="w-10 h-10 bg-gradient-cyber rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-xl">A</span>
                            </div>
                            <span className="text-2xl font-bold gradient-text">ApniSec</span>
                        </Link>

                        <div className="flex items-center space-x-4">
                            <Link href="/dashboard" className="text-gray-300 hover:text-white transition-colors">
                                Dashboard
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-6 py-8 max-w-2xl">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">Profile Settings</h1>
                    <p className="text-gray-400">Manage your account information</p>
                </div>

                {success && (
                    <div className="bg-green-500/10 border border-green-500 text-green-500 px-4 py-3 rounded-lg mb-6">
                        {success}
                    </div>
                )}

                {error && (
                    <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg mb-6">
                        {error}
                    </div>
                )}

                <div className="bg-cyber-dark p-8 rounded-xl border border-gray-800">
                    {!editing ? (
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Name</label>
                                <p className="text-white text-lg">{user?.name}</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                                <p className="text-white text-lg">{user?.email}</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Member Since</label>
                                <p className="text-white text-lg">
                                    {user?.createdAt && new Date(user.createdAt).toLocaleDateString()}
                                </p>
                            </div>

                            <button
                                onClick={() => setEditing(true)}
                                className="px-6 py-3 bg-gradient-cyber text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
                            >
                                Edit Profile
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                                    Name
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-3 bg-cyber-darker border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full px-4 py-3 bg-cyber-darker border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
                                />
                            </div>

                            <div className="flex gap-4">
                                <button
                                    type="submit"
                                    className="px-6 py-3 bg-gradient-cyber text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
                                >
                                    Save Changes
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setEditing(false);
                                        setFormData({
                                            name: user?.name || '',
                                            email: user?.email || '',
                                        });
                                    }}
                                    className="px-6 py-3 border border-gray-700 text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </main>
        </div>
    );
}
