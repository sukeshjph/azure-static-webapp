import { Link } from 'react-router-dom';
import React from 'react';
import { useAuth } from '../hooks/useAuth';

const Dashboard: React.FC = () => {
    const { user } = useAuth();

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-3xl mx-auto py-16 px-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                    {user ? `Welcome, ${user.username}` : 'Welcome'}
                </h1>
                <p className="text-gray-700 mb-8">
                    This is your dashboard protected by Azure Static Web Apps auth.
                </p>
                <Link
                    to="/logout"
                    className="inline-flex items-center justify-center rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700 transition"
                >
                    Logout
                </Link>
            </div>
        </div>
    );
};

export default Dashboard;


