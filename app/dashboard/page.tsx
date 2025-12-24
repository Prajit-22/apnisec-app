'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Issue {
    id: string;
    title: string;
    description: string;
    type: string;
    status: string;
    createdAt: string;
}

interface User {
    id: string;
    name: string;
    email: string;
}

export default function DashboardPage() {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [issues, setIssues] = useState<Issue[]>([]);
    const [loading, setLoading] = useState(true);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        type: 'CLOUD_SECURITY',
    });
    const [filter, setFilter] = useState('');

    useEffect(() => {
        fetchUser();
        fetchIssues();
    }, [filter]);

    const fetchUser = async () => {
        try {
            const response = await fetch('/api/auth/me');
            if (!response.ok) {
                router.push('/login');
                return;
            }
            const data = await response.json();
            setUser(data.data);
        } catch (error) {
            router.push('/login');
        }
    };

    const fetchIssues = async () => {
        try {
            const url = filter ? `/api/issues?type=${filter}` : '/api/issues';
            const response = await fetch(url);
            if (!response.ok) throw new Error('Failed to fetch issues');
            const data = await response.json();
            setIssues(data.data);
        } catch (error) {
            console.error('Error fetching issues:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateIssue = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/issues', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error('Failed to create issue');

            setFormData({ title: '', description: '', type: 'CLOUD_SECURITY' });
            setShowCreateForm(false);
            fetchIssues();
        } catch (error) {
            console.error('Error creating issue:', error);
        }
    };

    const handleLogout = async () => {
        await fetch('/api/auth/logout', { method: 'POST' });
        router.push('/');
    };

    const handleDeleteIssue = async (id: string) => {
        if (!confirm('Are you sure you want to delete this issue?')) return;

        try {
            const response = await fetch(`/api/issues/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) throw new Error('Failed to delete issue');
            fetchIssues();
        } catch (error) {
            console.error('Error deleting issue:', error);
        }
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
                            <Link href="/profile" className="text-gray-300 hover:text-white transition-colors">
                                Profile
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
            <main className="container mx-auto px-6 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">
                        Welcome back, {user?.name}!
                    </h1>
                    <p className="text-gray-400">Manage your security issues and assessments</p>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                    <button
                        onClick={() => setShowCreateForm(!showCreateForm)}
                        className="px-6 py-3 bg-gradient-cyber text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
                    >
                        {showCreateForm ? 'Cancel' : 'Create New Issue'}
                    </button>

                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="px-4 py-3 bg-cyber-dark border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
                    >
                        <option value="">All Types</option>
                        <option value="CLOUD_SECURITY">Cloud Security</option>
                        <option value="RED_TEAM">Red Team</option>
                        <option value="VAPT">VAPT</option>
                    </select>
                </div>

                {/* Create Form */}
                {showCreateForm && (
                    <div className="bg-cyber-dark p-6 rounded-xl border border-gray-800 mb-8">
                        <h2 className="text-xl font-bold text-white mb-4">Create New Issue</h2>
                        <form onSubmit={handleCreateIssue} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full px-4 py-3 bg-cyber-darker border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
                                    placeholder="Issue title"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Description
                                </label>
                                <textarea
                                    required
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full px-4 py-3 bg-cyber-darker border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500 h-32"
                                    placeholder="Describe the issue..."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Type
                                </label>
                                <select
                                    value={formData.type}
                                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                    className="w-full px-4 py-3 bg-cyber-darker border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
                                >
                                    <option value="CLOUD_SECURITY">Cloud Security</option>
                                    <option value="RED_TEAM">Red Team</option>
                                    <option value="VAPT">VAPT</option>
                                </select>
                            </div>

                            <button
                                type="submit"
                                className="px-6 py-3 bg-gradient-cyber text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
                            >
                                Create Issue
                            </button>
                        </form>
                    </div>
                )}

                {/* Issues List */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {issues.length === 0 ? (
                        <div className="col-span-full text-center py-12">
                            <p className="text-gray-400">No issues found. Create your first issue to get started!</p>
                        </div>
                    ) : (
                        issues.map((issue) => (
                            <div
                                key={issue.id}
                                className="bg-cyber-dark p-6 rounded-xl border border-gray-800 card-hover"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <h3 className="text-lg font-semibold text-white">{issue.title}</h3>
                                    <button
                                        onClick={() => handleDeleteIssue(issue.id)}
                                        className="text-red-400 hover:text-red-300 transition-colors"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                                <p className="text-gray-400 text-sm mb-4 line-clamp-3">{issue.description}</p>
                                <div className="flex items-center justify-between">
                                    <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs font-semibold">
                                        {issue.type.replace(/_/g, ' ')}
                                    </span>
                                    <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-semibold">
                                        {issue.status}
                                    </span>
                                </div>
                                <div className="mt-4 text-xs text-gray-500">
                                    {new Date(issue.createdAt).toLocaleDateString()}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </main>
        </div>
    );
}
