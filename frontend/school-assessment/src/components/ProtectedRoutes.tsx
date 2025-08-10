import React from 'react'
// import { Navigate } from 'react-router-dom';
import Navbar from './Navbar';

export default function ProtectedRoutes({children}: {children: React.ReactNode}) {
    // const isAuthenticated = localStorage.getItem("accessToken");
    // if (!isAuthenticated) {
    //     return <Navigate to="/auth" />;
    // }
    return (
        <div className='min-h-screen bg-gray-50'>
            <Navbar />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {children}
            </main>
        </div>
    );
}
