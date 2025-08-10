import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';
import Navbar from './Navbar';
import { useDispatch } from 'react-redux';
import { setUser } from '../features/slicers/authSlice';
import { getUserInfo, refreshToken } from '../features/api/authAPI';

export default function ProtectedRoutes({children}: {children: React.ReactNode}) {
    const dispatch = useDispatch();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const res = await getUserInfo();
                console.log('getUserInfo response:', res)
                if (res.error && res.error.includes("Unauthorized")) {
                    const response = await refreshToken();
                    console.log('refresh token response:', response)
                    if (response.error && response.error.includes("Unauthorized")) {
                        setIsAuthenticated(false);
                    } else {
                        dispatch(setUser(response.user));
                        setIsAuthenticated(true);
                    }
                } else if (res.error) {
                    setIsAuthenticated(false);
                } else {
                    // getUserInfo returns the user object directly on success
                    dispatch(setUser(res));
                    setIsAuthenticated(true);
                }
            } catch (error) {
                console.error('Error fetching user info:', error);
                setIsAuthenticated(false);
            } finally {
                setIsLoading(false);
            }
        };
        fetchUserInfo();
    }, [dispatch]);

    // Show loading state
    if (isLoading) {
        return (
            <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    // Redirect to login if not authenticated
    if (isAuthenticated === false) {
        return <Navigate to="/login" replace />;
    }

    // Show protected content if authenticated
    return (
        <div className='min-h-screen bg-gray-50'>
            <Navbar />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {children}
            </main>
        </div>
    );
}
