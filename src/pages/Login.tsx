import { Link } from 'react-router-dom';
import React from 'react';
import { useAuth } from '../hooks/useAuth';

const Login: React.FC = () => {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-gray-700">Checking your session...</div>
            </div>
        );
    }

    if (user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="bg-white shadow rounded-lg p-8 w-full max-w-md">
                    <h1 className="text-2xl font-semibold text-gray-900 mb-4">
                        You are signed in
                    </h1>
                    <p className="text-gray-700 mb-6">
                        Signed in as <span className="font-medium">{user.username}</span>
                    </p>
                    <Link
                        to="/dashboard"
                        className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 transition"
                    >
                        Go to Dashboard
                    </Link>
                </div>
            </div>
        );
    }

    const githubLoginUrl = '/.auth/login/github?post_login_redirect_uri=/dashboard';

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white shadow rounded-lg p-8 w-full max-w-md">
                <div className="flex flex-col items-center">
                    <svg
                        className="h-12 w-12 text-gray-900 mb-4"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        aria-hidden="true"
                    >
                        <path d="M8 0C3.58 0 0 3.73 0 8.334c0 3.68 2.292 6.797 5.47 7.897.4.077.547-.178.547-.396 0-.195-.007-.712-.01-1.398-2.226.495-2.695-1.084-2.695-1.084-.364-.952-.89-1.206-.89-1.206-.727-.51.055-.5.055-.5.804.058 1.227.842 1.227.842.714 1.255 1.872.893 2.328.683.073-.533.28-.893.508-1.097-1.777-.207-3.644-.913-3.644-4.063 0-.897.31-1.633.82-2.21-.083-.206-.355-1.036.078-2.157 0 0 .67-.219 2.2.842a7.32 7.32 0 0 1 2.004-.277c.68.003 1.366.096 2.004.277 1.53-1.061 2.2-.842 2.2-.842.434 1.121.162 1.951.08 2.157.51.577.819 1.312.819 2.21 0 3.158-1.87 3.854-3.65 4.058.287.257.543.766.543 1.545 0 1.117-.01 2.018-.01 2.292 0 .219.145.476.55.395C13.71 15.13 16 12.013 16 8.334 16 3.73 12.42 0 8 0z" />
                    </svg>
                    <h1 className="text-2xl font-semibold text-gray-900 mb-6">
                        Sign in to your account
                    </h1>
                    <a
                        href={githubLoginUrl}
                        className="inline-flex items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-white hover:bg-black transition w-full"
                    >
                        Sign in with GitHub
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Login;


