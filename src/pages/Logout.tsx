import React, { useEffect } from 'react';

const Logout: React.FC = () => {
    useEffect(() => {
        const timeout = setTimeout(() => {
            window.location.href = '/.auth/logout?post_logout_redirect_uri=/';
        }, 600);
        return () => clearTimeout(timeout);
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-gray-700">Logging you out...</div>
        </div>
    );
};

export default Logout;


